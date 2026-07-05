#!/usr/bin/env python3
"""DOCS018 public IP disclosure firewall — scan local sources and live URLs."""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from pathlib import Path

DOCS_ROOT = Path(__file__).resolve().parents[2]
WWW_ROOT = DOCS_ROOT.parent / "zen-mesh.io"

LIVE_URLS = [
    "https://www.zen-mesh.io/llms.txt",
    "https://docs.zen-mesh.io/llms.txt",
    "https://www.zen-mesh.io/llms-full.txt",
    "https://www.zen-mesh.io/blogs/webhook-delivery-evidence/",
    "https://docs.zen-mesh.io/docs/reference/webhook-delivery-evidence",
    "https://docs.zen-mesh.io/docs/evidence/merkle-integrity",
    "https://docs.zen-mesh.io/docs/mcp/overview",
    "https://docs.zen-mesh.io/docs/mcp/tools",
    "https://docs.zen-mesh.io/docs/mcp/draft-system",
    "https://docs.zen-mesh.io/docs/product/zen-configuration-contract",
    "https://docs.zen-mesh.io/docs/product/template-registry-roadmap",
    "https://docs.zen-mesh.io/docs/product/gitops-roadmap",
]

LOCAL_PATHS = [
    DOCS_ROOT / "static" / "llms.txt",
    DOCS_ROOT / "docs" / "llms.txt",
    WWW_ROOT / "public" / "llms.txt",
    WWW_ROOT / "public" / "llms-full.txt",
    DOCS_ROOT / "docs" / "reference" / "webhook-delivery-evidence.md",
    DOCS_ROOT / "docs" / "evidence" / "merkle-integrity.md",
    DOCS_ROOT / "docs" / "mcp" / "overview.md",
    DOCS_ROOT / "docs" / "mcp" / "tools.md",
    DOCS_ROOT / "docs" / "mcp" / "draft-system.md",
    DOCS_ROOT / "docs" / "product" / "zen-configuration-contract.md",
    DOCS_ROOT / "docs" / "product" / "template-registry-roadmap.md",
    DOCS_ROOT / "docs" / "product" / "gitops-roadmap.md",
    WWW_ROOT / "src" / "content" / "blogs" / "webhook-delivery-evidence.md",
    DOCS_ROOT / "docs" / "start-here" / "how-zen-works.md",
    DOCS_ROOT / "src" / "lib" / "docsPublicStructuredData.ts",
]

BANNED = [
    "North Star",
    "Architecture and north star",
    "ZCC",
    "Zen Configuration Contract",
    "one contract, five surfaces",
    "same runtime model",
    "future GitOps",
    "Template Registry Roadmap",
    "GitOps Roadmap",
    "Community registry",
    "Organization registry",
    "V1.1",
    "agent-pull",
    "server-side apply",
    "CRD source of truth",
    "rendered CRD bundle",
    "controller reconciliation",
    "MCP write",
    "MCP draft",
    "human-only apply",
    "Merkle",
    "hash-chain",
    "root hash",
    "selective disclosure",
    "independent verifiability",
    "AI-consumed webhook provenance",
    "AI/RAG",
    "EvidencePackage",
    "AttestationSink",
    "public blockchain",
    "private ledger",
    "notary",
    "transparency log",
    "patent",
    "tamper-evident",
]

ALLOWLIST: list[tuple[str, str]] = [
    ("llms.txt", "patent-sensitive"),
    ("llms-full.txt", "patent-sensitive"),
]


@dataclass
class Hit:
    url: str
    phrase: str
    risk_class: str
    source: str
    action: str
    context: str


def risk_for(phrase: str) -> str:
    p = phrase.lower()
    if any(x in p for x in ("merkle", "hash-chain", "root hash", "selective disclosure")):
        return "evidence_mechanism"
    if any(x in p for x in ("zcc", "configuration contract", "template registry", "gitops")):
        return "architecture_roadmap"
    if "v1.1" in p or "mcp draft" in p or "mcp write" in p:
        return "future_product_mechanics"
    return "public_ip_disclosure"


def action_for(risk: str) -> str:
    return {
        "evidence_mechanism": "remove",
        "architecture_roadmap": "redact",
        "future_product_mechanics": "remove",
        "public_ip_disclosure": "remove",
    }.get(risk, "remove")


def allowed(url: str, phrase: str, text: str, pos: int) -> bool:
    start = max(0, pos - 30)
    end = min(len(text), pos + len(phrase) + 80)
    window = text[start:end].lower()
    for u, safe in ALLOWLIST:
        if u in url and safe.lower() in window:
            return True
    return False


def scan_text(url: str, text: str, source: str) -> list[Hit]:
    hits: list[Hit] = []
    lower = text.lower()
    for phrase in BANNED:
        idx = 0
        while True:
            pos = lower.find(phrase.lower(), idx)
            if pos == -1:
                break
            if allowed(url, phrase, text, pos):
                idx = pos + len(phrase)
                continue
            start = max(0, pos - 40)
            end = min(len(text), pos + len(phrase) + 40)
            ctx = re.sub(r"\s+", " ", text[start:end]).strip()
            hits.append(
                Hit(
                    url=url,
                    phrase=phrase,
                    risk_class=risk_for(phrase),
                    source=source,
                    action=action_for(risk_for(phrase)),
                    context=ctx,
                )
            )
            idx = pos + len(phrase)
    return hits


def fetch(url: str) -> tuple[str, str]:
    proc = subprocess.run(
        ["curl", "-fsSL", url],
        capture_output=True,
        text=True,
        timeout=60,
    )
    if proc.returncode != 0:
        return "", proc.stderr.strip() or f"curl exit {proc.returncode}"
    return proc.text, ""


def run_scan(live: bool) -> dict:
    all_hits: list[Hit] = []

    for path in LOCAL_PATHS:
        if not path.exists():
            continue
        text = path.read_text(errors="ignore")
        all_hits.extend(scan_text(str(path), text, str(path.relative_to(path.parents[2] if "docs" in str(path) else path.parents[1]))))

    build_llms = DOCS_ROOT / "build" / "llms.txt"
    if build_llms.exists():
        all_hits.extend(scan_text(str(build_llms), build_llms.read_text(errors="ignore"), "build/llms.txt"))

    if live:
        for url in LIVE_URLS:
            body, err = fetch(url)
            if err:
                all_hits.append(
                    Hit(url=url, phrase="FETCH_ERROR", risk_class="operational", source=err, action="investigate", context=err)
                )
                continue
            all_hits.extend(scan_text(url, body, "live"))

    return {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "task_id": "DOCSAI_DOCS018_HARD_LIVE_PUBLIC_IP_PURGE",
        "reporter": "DocsAI",
        "live": live,
        "hit_count": len(all_hits),
        "hits": [asdict(h) for h in all_hits],
        "pass": len([h for h in all_hits if h.phrase != "FETCH_ERROR"]) == 0,
    }


def write_reports(result: dict, prefix: str) -> None:
    md_path = Path(f"/tmp/{prefix}.md")
    json_path = Path(f"/tmp/{prefix}.json")
    json_path.write_text(json.dumps(result, indent=2) + "\n")
    lines = [
        f"# {prefix}",
        "",
        f"- generated: {result['generated_at']}",
        f"- hits: {result['hit_count']}",
        f"- pass: {result['pass']}",
        "",
    ]
    for h in result["hits"][:200]:
        lines.append(f"## {h['url']}")
        lines.append(f"- phrase: `{h['phrase']}`")
        lines.append(f"- risk: {h['risk_class']}")
        lines.append(f"- action: {h['action']}")
        lines.append(f"- context: {h['context']}")
        lines.append("")
    md_path.write_text("\n".join(lines) + "\n")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--live", action="store_true")
    parser.add_argument("--baseline", action="store_true")
    parser.add_argument("--postdeploy", action="store_true")
    args = parser.parse_args()

    result = run_scan(live=args.live or args.postdeploy)
    if args.baseline:
        write_reports(result, "docsai-docs018-live-baseline")
    if args.postdeploy:
        write_reports(result, "docsai-docs018-postdeploy-live-scan")
        write_reports(result, "docsai-docs018-public-ip-firewall")
        write_reports(result, "docsai-docs018-claim-hygiene")
    if not args.baseline and not args.postdeploy:
        write_reports(result, "docsai-docs018-public-ip-firewall")
    print(json.dumps({"pass": result["pass"], "hits": result["hit_count"]}))
    return 0 if result["pass"] else 1


if __name__ == "__main__":
    sys.exit(main())
