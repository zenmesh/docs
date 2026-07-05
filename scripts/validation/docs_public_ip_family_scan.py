#!/usr/bin/env python3
"""DOCS019 family-based public IP scan against private patent-candidate inventory."""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from collections import Counter, defaultdict
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin, urlparse

DOCS_ROOT = Path(__file__).resolve().parents[2]
WWW_ROOT = DOCS_ROOT.parent / "zen-mesh.io"
PLATFORM_ROOT = DOCS_ROOT.parent / "zen-platform"
INVENTORY_PATH = PLATFORM_ROOT / "docs/90-INTERNAL/IP/patent-candidate-inventory.json"

SEED_LIVE_URLS = [
    "https://www.zen-mesh.io/llms.txt",
    "https://docs.zen-mesh.io/llms.txt",
    "https://www.zen-mesh.io/llms-full.txt",
    "https://www.zen-mesh.io/",
    "https://www.zen-mesh.io/use-cases",
    "https://www.zen-mesh.io/use-cases/gitops",
    "https://www.zen-mesh.io/use-cases/regulated-evidence",
    "https://www.zen-mesh.io/use-cases/edge-lite",
    "https://www.zen-mesh.io/blogs/webhook-delivery-evidence/",
    "https://docs.zen-mesh.io/docs/reference/webhook-delivery-evidence",
    "https://docs.zen-mesh.io/docs/evidence/evidence-integrity",
    "https://docs.zen-mesh.io/docs/providerflow/provider-package-lifecycle",
    "https://docs.zen-mesh.io/docs/security/trust-lab",
    "https://docs.zen-mesh.io/docs/security/webhook-access-control",
    "https://docs.zen-mesh.io/docs/api/write-safety",
    "https://docs.zen-mesh.io/docs/api/evidence",
    "https://docs.zen-mesh.io/docs/api/traces",
    "https://docs.zen-mesh.io/docs/concepts/control-surfaces",
    "https://docs.zen-mesh.io/docs/concepts/zen-mesh-concepts",
    "https://docs.zen-mesh.io/docs/guides/traffic-lifecycle",
    "https://docs.zen-mesh.io/docs/guides/evidence-and-trust",
]

HARD_BLOCK_TERMS = [
    "North Star",
    "Architecture and north star",
    "ZCC",
    "Zen Configuration Contract",
    "one contract, five surfaces",
    "one contract five surfaces",
    "same runtime model",
    "future GitOps",
    "Template Registry Roadmap",
    "GitOps Roadmap",
    "MCP write",
    "MCP draft",
    "human-only apply",
    "Merkle",
    "hash-chain",
    "root hash",
    "selective disclosure",
    "tamper-evident",
    "AttestationSink",
    "EvidencePackage",
    "public blockchain",
    "CRD source of truth",
    "rendered CRD bundle",
    "controller reconciliation",
    "server-side apply",
    "agent-pull",
    "canary rotation",
    "dynamic webhook ingester",
    "dynamic ingester",
    "runtime webhook compiler",
    "trust score",
    "golden tests",
]

FAMILY_PATTERNS: dict[str, list[str]] = {
    "A_DECLARATIVE_RUNTIME": [
        r"control surfaces?",
        r"same runtime model",
        r"ZCC",
        r"Zen Configuration Contract",
        r"one contract.*five surfaces?",
        r"UI.*CLI.*API.*MCP.*Git",
        r"runtime graph",
        r"Template.*Blueprint.*Flow.*Target.*Evidence",
        r"authoring chain",
        r"runtime chain",
        r"declarative delivery contracts?",
        r"CRD bundle",
        r"runtime convergence",
    ],
    "B_VERIFIABLE_EXECUTION": [
        r"evidence spine",
        r"Traces / Evidence",
        r"delivery evidence spine",
        r"evidence graph",
        r"Evidence API",
        r"Traces API",
        r"tamper-evident",
        r"hash-chain",
        r"Merkle",
        r"audit trail.*proof",
        r"AI/RAG",
        r"evidence packages?",
    ],
    "C_SECURE_PRIVATE_DELIVERY": [
        r"outbound-only",
        r"private network",
        r"private target",
        r"behind NAT",
        r"behind firewall",
        r"Edge Lite",
        r"zen-agent",
        r"customer-owned plane",
        r"disconnected operation",
        r"safe metadata projection",
    ],
    "D_EVENT_NORMALIZATION": [
        r"CloudEvents",
        r"canonical event envelope",
        r"provider-specific extensions",
        r"provider-to-pipeline normalization",
        r"dynamic ingester",
        r"event ingestion \(ingester\)",
    ],
    "E_GOVERNED_ECOSYSTEM": [
        r"Provider Package Lifecycle",
        r"Template Registry",
        r"Official/Community",
        r"Draft/Preview/Beta/Verified/GA",
        r"quality gates",
        r"provider template packs?",
        r"trust score",
        r"validation lab",
        r"golden tests",
        r"promotion lifecycle",
    ],
    "F_RUNTIME_VALIDATION_CONVERGENCE": [
        r"Trust Lab",
        r"runtime validation",
        r"browser proof",
        r"operational proof",
        r"publication pipeline",
        r"policy/compiler",
        r"capability validation",
        r"golden tests",
    ],
    "G_AI_GOVERNED_OPERATIONS": [
        r"MCP write",
        r"MCP draft",
        r"human-only apply",
        r"AI agents?",
        r"draft/apply",
        r"governed automation",
        r"AI operation evidence",
    ],
    "H_SECRET_LIFECYCLE_ROTATION": [
        r"canary rotation",
        r"key rotation",
        r"security material",
        r"HMAC rotation",
        r"SPIFFE/SPIRE",
        r"SPIFFE",
        r"SVID",
        r"mTLS workload identity",
        r"zen-lock",
        r"AGE secret",
        r"local trust posture",
        r"air-gap handoff",
        r"Zen-managed SPIFFE",
        r"security primitives",
        r"rotation",
    ],
    "I_RELEASE_OPERATIONS_EVIDENCE": [
        r"release evidence",
        r"apply boundary",
        r"target-only diff",
        r"non-target proof",
        r"self-healing evidence",
        r"sandbox verification",
    ],
}

CLASSIFICATIONS = [
    "APPROVED_PUBLIC",
    "SAFE_ABSTRACT_PUBLIC",
    "PRICING_BOUND_NEEDS_LEONARDO_APPROVAL",
    "NEEDS_LEONARDO_APPROVAL",
    "BLOCKED_REDACT",
    "INTERNAL_ONLY_SHOULD_NOT_BE_PUBLIC",
]


@dataclass
class Hit:
    url: str
    source_file: str
    line: int
    snippet: str
    candidate_id: str
    family: str
    term: str
    risk_level: str
    classification: str
    recommended_action: str
    needs_leonardo_approval: bool
    exact_public_text: str
    suggested_safe_replacement: str
    hard_block: bool


def load_inventory() -> dict:
    if not INVENTORY_PATH.exists():
        raise FileNotFoundError(f"Private inventory not accessible: {INVENTORY_PATH}")
    return json.loads(INVENTORY_PATH.read_text())


def fetch(url: str) -> tuple[str, str]:
    proc = subprocess.run(
        ["curl", "-fsSL", "-L", url],
        capture_output=True,
        text=True,
        timeout=90,
    )
    if proc.returncode != 0:
        return "", proc.stderr.strip() or f"curl exit {proc.returncode}"
    return proc.stdout, ""


def url_to_local(url: str) -> str:
    parsed = urlparse(url)
    host = parsed.netloc
    path = parsed.path.rstrip("/")
    if host == "docs.zen-mesh.io":
        if path.startswith("/docs/"):
            rel = path[len("/docs/") :]
            if rel.endswith(".md"):
                rel = rel[:-3]
            candidate = DOCS_ROOT / "docs" / f"{rel}.md"
            if candidate.exists():
                return str(candidate)
        if path == "/llms.txt":
            return str(DOCS_ROOT / "static" / "llms.txt")
    if host in ("www.zen-mesh.io", "zen-mesh.io"):
        if path == "/llms.txt":
            return str(WWW_ROOT / "public" / "llms.txt")
        if path == "/llms-full.txt":
            return str(WWW_ROOT / "public" / "llms-full.txt")
        if path.startswith("/blogs/"):
            slug = path.strip("/").split("/")[-1]
            p = WWW_ROOT / "src" / "content" / "blogs" / f"{slug}.md"
            if p.exists():
                return str(p)
        if path.startswith("/use-cases"):
            slug = path.strip("/").replace("use-cases/", "") or "index"
            if slug == "use-cases":
                slug = "index"
            p = WWW_ROOT / "src" / "pages" / "use-cases" / f"{slug}.astro"
            if p.exists():
                return str(p)
    return ""


def candidate_for_term(term: str, family: str, inventory: dict) -> tuple[str, str]:
    term_l = term.lower()
    for c in inventory.get("candidates", []):
        if c.get("family") != family:
            continue
        for s in c.get("sensitive_terms_public_blocklist", []):
            if s.lower() in term_l or term_l in s.lower():
                return c["candidate_id"], c.get("public_safe_summary", "")
        if any(w in term_l for w in c.get("title", "").lower().split()[:4]):
            return c["candidate_id"], c.get("public_safe_summary", "")
    # family fallback
    for c in inventory.get("candidates", []):
        if c.get("family") == family:
            return c["candidate_id"], c.get("public_safe_summary", "")
    return "FAMILY_MATCH", inventory.get("families", {}).get(family, {}).get("summary", "")


def classify_hit(term: str, family: str, snippet: str, inventory: dict) -> tuple[str, str, str, bool, bool]:
    snippet_l = snippet.lower()
    term_l = term.lower()
    hard_block = any(b.lower() in snippet_l for b in HARD_BLOCK_TERMS) or any(
        b.lower() in term_l for b in HARD_BLOCK_TERMS
    )

    _, safe_summary = candidate_for_term(term, family, inventory)

    if hard_block:
        return "critical", "BLOCKED_REDACT", "remove or replace with approved safe copy", True, True

    mechanism_markers = [
        "ingester",
        "zen-ingester",
        "zen-egress",
        "zen-bridge",
        "runtime graph",
        "object graph",
        "quality gates",
        "official/community",
        "draft/preview/beta",
        "air-gap",
        "rotation",
        "zen-lock survival",
        "evidence spine",
        "control surfaces",
        "authoring chain",
        "runtime chain",
        "internal evidence source of truth",
    ]
    if any(m in snippet_l for m in mechanism_markers):
        if family in ("E_GOVERNED_ECOSYSTEM", "A_DECLARATIVE_RUNTIME", "H_SECRET_LIFECYCLE_ROTATION"):
            return "high", "BLOCKED_REDACT", "redact mechanism; use family safe summary", True, True
        if family in ("B_VERIFIABLE_EXECUTION", "G_AI_GOVERNED_OPERATIONS"):
            return "high", "INTERNAL_ONLY_SHOULD_NOT_BE_PUBLIC", "noindex or stub page", True, True

    safe_abstract_markers = [
        "outbound-only",
        "private network",
        "delivery receipts",
        "operational metadata",
        "business waitlist open",
        "edge lite",
        "docker run",
        "provider template packs",
        "mTLS",
        "SPIFFE/SPIRE",
        "HMAC",
    ]
    if any(m in snippet_l for m in safe_abstract_markers) and family in (
        "C_SECURE_PRIVATE_DELIVERY",
        "B_VERIFIABLE_EXECUTION",
        "H_SECRET_LIFECYCLE_ROTATION",
        "E_GOVERNED_ECOSYSTEM",
    ):
        return "medium", "SAFE_ABSTRACT_PUBLIC", "keep high-level wording; no mechanism expansion", False, False

    pricing_markers = ["pricing", "plan", "pro early bird", "business waitlist", "enterprise pilot"]
    if any(m in snippet_l for m in pricing_markers):
        return "medium", "PRICING_BOUND_NEEDS_LEONARDO_APPROVAL", "confirm exact pricing copy with Leonardo", True, False

    if family in ("F_RUNTIME_VALIDATION_CONVERGENCE", "E_GOVERNED_ECOSYSTEM", "B_VERIFIABLE_EXECUTION", "G_AI_GOVERNED_OPERATIONS"):
        return "medium", "NEEDS_LEONARDO_APPROVAL", "request Leonardo approval for exact public text", True, False

    return "low", "NEEDS_LEONARDO_APPROVAL", "classify with Leonardo before expanding copy", True, False


def scan_text(url: str, text: str, inventory: dict) -> list[Hit]:
    hits: list[Hit] = []
    source = url_to_local(url) or ""
    lines = text.splitlines()

    def add_hit(line_no: int, snippet: str, family: str, term: str, pattern: str):
        risk, classification, action, needs_leo, hard_block = classify_hit(term, family, snippet, inventory)
        cid, safe = candidate_for_term(term, family, inventory)
        hits.append(
            Hit(
                url=url,
                source_file=source,
                line=line_no,
                snippet=snippet.strip()[:240],
                candidate_id=cid,
                family=family,
                term=term,
                risk_level=risk,
                classification=classification,
                recommended_action=action,
                needs_leonardo_approval=needs_leo,
                exact_public_text=snippet.strip()[:500],
                suggested_safe_replacement=safe or "Use inventory public_safe_summary for this family.",
                hard_block=hard_block,
            )
        )

    for family, patterns in FAMILY_PATTERNS.items():
        for pattern in patterns:
            regex = re.compile(pattern, re.IGNORECASE)
            for i, line in enumerate(lines, start=1):
                for m in regex.finditer(line):
                    add_hit(i, line, family, m.group(0), pattern)

    for c in inventory.get("candidates", []):
        for term in c.get("sensitive_terms_public_blocklist", []):
            regex = re.compile(re.escape(term), re.IGNORECASE)
            for i, line in enumerate(lines, start=1):
                if regex.search(line):
                    add_hit(i, line, c["family"], term, "inventory_blocklist")

    return hits


def extract_llms_links(text: str, base_url: str, cap: int = 40) -> list[str]:
    links: list[str] = []
    for m in re.finditer(r"\((https?://[^)]+)\)", text):
        url = m.group(1)
        host = urlparse(url).netloc
        if host in ("docs.zen-mesh.io", "www.zen-mesh.io", "zen-mesh.io"):
            links.append(url)
        if len(links) >= cap:
            break
    return links


def dedupe_hits(hits: list[Hit]) -> list[Hit]:
    seen: set[tuple[str, str, str, int]] = set()
    out: list[Hit] = []
    for h in hits:
        key = (h.url, h.family, h.term.lower(), h.line)
        if key in seen:
            continue
        seen.add(key)
        out.append(h)
    return out


def write_inventory_report(urls: dict[str, str], errors: dict[str, str]) -> None:
    payload = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "task_id": "DOCSAI_DOCS019_FAMILY_BASED_PUBLIC_IP_SCAN_AND_APPROVAL_CLASSIFICATION",
        "reporter": "DocsAI",
        "url_count": len(urls),
        "urls": [{"url": u, "bytes": len(b), "error": errors.get(u, "")} for u, b in urls.items()],
    }
    Path("/tmp/docsai-docs019-live-family-scan-inventory.json").write_text(json.dumps(payload, indent=2) + "\n")
    md = ["# DOCS019 live family scan inventory", "", f"URLs fetched: {len(urls)}", ""]
    for u, body in urls.items():
        md.append(f"## {u}")
        md.append(f"- bytes: {len(body)}")
        if errors.get(u):
            md.append(f"- error: {errors[u]}")
        md.append("")
    Path("/tmp/docsai-docs019-live-family-scan-inventory.md").write_text("\n".join(md) + "\n")


def write_disclosure_map(hits: list[Hit]) -> dict:
    payload = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "task_id": "DOCSAI_DOCS019_FAMILY_BASED_PUBLIC_IP_SCAN_AND_APPROVAL_CLASSIFICATION",
        "reporter": "DocsAI",
        "hit_count": len(hits),
        "hits": [asdict(h) for h in hits],
        "by_family": dict(Counter(h.family for h in hits)),
        "by_classification": dict(Counter(h.classification for h in hits)),
    }
    Path("/tmp/docsai-docs019-family-disclosure-map.json").write_text(json.dumps(payload, indent=2) + "\n")
    md = [
        "# DOCS019 family disclosure map",
        "",
        f"Total hits: {len(hits)}",
        "",
        "## By family",
    ]
    for fam, count in sorted(payload["by_family"].items()):
        md.append(f"- {fam}: {count}")
    md.extend(["", "## By classification"])
    for cls, count in sorted(payload["by_classification"].items()):
        md.append(f"- {cls}: {count}")
    md.append("")
    for h in hits[:150]:
        md.extend(
            [
                f"### {h.url} ({h.family})",
                f"- term: `{h.term}`",
                f"- classification: **{h.classification}**",
                f"- candidate: {h.candidate_id}",
                f"- snippet: {h.snippet[:180]}",
                f"- action: {h.recommended_action}",
                "",
            ]
        )
    Path("/tmp/docsai-docs019-family-disclosure-map.md").write_text("\n".join(md) + "\n")
    return payload


def write_approval_needed(hits: list[Hit]) -> None:
    grouped: dict[str, list[Hit]] = defaultdict(list)
    for h in hits:
        if h.classification in (
            "NEEDS_LEONARDO_APPROVAL",
            "PRICING_BOUND_NEEDS_LEONARDO_APPROVAL",
        ):
            grouped[h.family].append(h)

    rows = []
    for family, items in sorted(grouped.items()):
        for h in items[:20]:
            rows.append(asdict(h))

    payload = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "task_id": "DOCSAI_DOCS019",
        "reporter": "DocsAI",
        "count": len(rows),
        "by_family": {k: len(v) for k, v in grouped.items()},
        "items": rows,
    }
    Path("/tmp/docsai-docs019-leonardo-approval-needed.json").write_text(json.dumps(payload, indent=2) + "\n")
    md = ["# DOCS019 Leonardo approval needed", "", f"Items: {len(rows)}", ""]
    for family, items in sorted(grouped.items()):
        md.append(f"## {family} ({len(items)})")
        for h in items[:12]:
            md.append(f"- `{h.term}` @ {h.url} — {h.snippet[:120]}")
        md.append("")
    Path("/tmp/docsai-docs019-leonardo-approval-needed.md").write_text("\n".join(md) + "\n")


def run_scan(live: bool) -> tuple[list[Hit], list[str], dict]:
    inventory = load_inventory()
    urls: dict[str, str] = {}
    errors: dict[str, str] = {}

    if live:
        to_fetch = list(SEED_LIVE_URLS)
        for seed in ("https://www.zen-mesh.io/llms.txt", "https://docs.zen-mesh.io/llms.txt"):
            body, err = fetch(seed)
            if not err:
                to_fetch.extend(extract_llms_links(body, seed))
        seen = set()
        ordered = []
        for u in to_fetch:
            if u not in seen:
                seen.add(u)
                ordered.append(u)
        for url in ordered:
            body, err = fetch(url)
            if err:
                errors[url] = err
                urls[url] = ""
            else:
                urls[url] = body
        write_inventory_report(urls, errors)
    else:
        local_files = [
            DOCS_ROOT / "static" / "llms.txt",
            WWW_ROOT / "public" / "llms.txt",
            WWW_ROOT / "public" / "llms-full.txt",
        ]
        for p in local_files:
            if p.exists():
                urls[f"file://{p}"] = p.read_text(errors="ignore")

    all_hits: list[Hit] = []
    for url, body in urls.items():
        if body:
            all_hits.extend(scan_text(url, body, inventory))

    all_hits = dedupe_hits(all_hits)
    scanned = list(urls.keys())
    return all_hits, scanned, inventory


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--live", action="store_true")
    parser.add_argument("--write-reports", action="store_true", default=True)
    args = parser.parse_args()

    try:
        hits, scanned, inventory = run_scan(live=args.live)
    except FileNotFoundError as e:
        print(json.dumps({"blocked": True, "error": str(e)}))
        return 2

    if args.write_reports:
        map_payload = write_disclosure_map(hits)
        write_approval_needed(hits)

    blocked = [h for h in hits if h.classification == "BLOCKED_REDACT" or h.hard_block]
    summary = {
        "pass_family_scan": True,
        "inventory_version": inventory.get("schema_version"),
        "candidate_count": len(inventory.get("candidates", [])),
        "family_count": len(inventory.get("families", {})),
        "live_urls_scanned": len(scanned),
        "total_hits": len(hits),
        "blocked_count": len(blocked),
        "approval_needed_count": len(
            [h for h in hits if h.classification in ("NEEDS_LEONARDO_APPROVAL", "PRICING_BOUND_NEEDS_LEONARDO_APPROVAL")]
        ),
        "safe_public_count": len(
            [h for h in hits if h.classification in ("SAFE_ABSTRACT_PUBLIC", "APPROVED_PUBLIC")]
        ),
        "by_family": dict(Counter(h.family for h in hits)),
        "by_classification": dict(Counter(h.classification for h in hits)),
    }
    print(json.dumps(summary))
    return 0


if __name__ == "__main__":
    sys.exit(main())
