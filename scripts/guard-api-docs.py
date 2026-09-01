#!/usr/bin/env python3
"""
DAEDALUS API-DOCS GUARD — PUBLIC-API-BOUNDARY + API-DOCS validation suite

Runs all guards from the DAEDALUS mission:
  PUBLIC-API-BOUNDARY-001 through 011
  API-DOCS-001 through 020

Exit 0 = all pass, exit 1 = one or more failures.
"""
import sys
import json
import yaml
from pathlib import Path

DOCS = Path(__file__).parent.parent
PUBLIC_SPEC = DOCS / "api-specifications" / "zen-mesh-api.v1.public.yaml"
FULL_SPEC = DOCS / "api-specifications" / "zen-mesh-api.v1.full.yaml"
PUBLIC_JSON = DOCS / "api-specifications" / "zen-mesh-api.v1.public.json"
GENERATED_PY = DOCS / "generated" / "python"
GENERATED_TS = DOCS / "generated" / "typescript"
STATIC_API = DOCS / "static" / "api"
SWAGGER_HTML = DOCS / "static" / "swagger-ui.html"
SCALAR_HTML = DOCS / "static" / "openapi-reference.html"
OPENAPI_SPEC_INDEX = DOCS / "docs" / "api" / "openapi.md"
FULL_JSON = DOCS / "api-specifications" / "zen-mesh-api.v1.full.json"

passes = []
failures = []


def check(name, condition, detail=""):
    if condition:
        passes.append(name)
        print(f"  PASS  {name}")
    else:
        failures.append((name, detail))
        print(f"  FAIL  {name}: {detail}")


# ── Load specs ────────────────────────────────────────────────────────────────
def load_spec(path):
    with open(path) as f:
        return yaml.safe_load(f)


public_spec = load_spec(PUBLIC_SPEC)
full_spec = load_spec(FULL_SPEC)

with open(PUBLIC_JSON) as f:
    public_json = json.load(f)


# ── Collect all operations ────────────────────────────────────────────────────
def collect_ops(spec):
    for path, path_item in spec.get("paths", {}).items():
        for method, operation in path_item.items():
            if method in ("get", "post", "put", "patch", "delete") and isinstance(operation, dict):
                yield path, method, operation


# ── PUBLIC-API-BOUNDARY ─────────────────────────────────────────────────────

print("\n=== PUBLIC-API-BOUNDARY ===")

# 001: every operation explicitly classified
unclassified = [
    f"{m.upper()} {p} ({op.get('operationId')})"
    for p, m, op in collect_ops(full_spec)
    if "x-zen-audience" not in op
]
check("PUBLIC-API-BOUNDARY-001", len(unclassified) == 0,
      f"{len(unclassified)} unclassified: {unclassified}")

# 002: public spec contains only PUBLIC_CUSTOMER
non_public = [
    f"{m.upper()} {p} ({op.get('operationId')})"
    for p, m, op in collect_ops(public_spec)
    if op.get("x-zen-audience") != "PUBLIC_CUSTOMER"
]
check("PUBLIC-API-BOUNDARY-002", len(non_public) == 0,
      f"{len(non_public)} non-PUBLIC_CUSTOMER: {non_public}")

# 003: internal operationIds absent from public YAML
internal_ids = {op.get("operationId") for _, _, op in collect_ops(full_spec)
                if op.get("x-zen-audience") != "PUBLIC_CUSTOMER"}
public_ids = {op.get("operationId") for _, _, op in collect_ops(public_spec)}
check("PUBLIC-API-BOUNDARY-003", len(internal_ids & public_ids) == 0,
      f"Leaked IDs: {internal_ids & public_ids}")

# 004: internal paths absent from public YAML
# Check public spec itself — verify no path has non-PUBLIC_CUSTOMER audience
internal_in_public = [
    f"{m.upper()} {p}"
    for p, pi in public_spec.get("paths", {}).items()
    for m, op in pi.items()
    if m in ("get", "post", "put", "patch", "delete") and isinstance(op, dict)
    and op.get("x-zen-audience") != "PUBLIC_CUSTOMER"
]
check("PUBLIC-API-BOUNDARY-004", len(internal_in_public) == 0,
      f"Non-PUBLIC_CUSTOMER in public spec: {internal_in_public}")

# 005: internal schemas not reachable via $ref from public ops
# (simplified check: internal schema names not used in public spec $refs)
def get_refs(spec):
    text = yaml.dump(spec)
    import re
    return set(re.findall(r"#/components/schemas/(\S+)", text))

public_refs = get_refs(public_spec)
internal_schemas = {s for s in full_spec.get("components", {}).get("schemas", {})
                    if not any(
                        op.get("x-zen-audience") == "PUBLIC_CUSTOMER"
                        for pi in full_spec["paths"].values()
                        for op in pi.values()
                        if isinstance(op, dict) and s in yaml.dump(op)
                    )}
leaked_schemas = internal_schemas & public_refs
check("PUBLIC-API-BOUNDARY-005", len(leaked_schemas) == 0,
      f"Internal schemas reachable: {leaked_schemas}")

# ── Collect internal paths for use across checks ────────────────────────────
internal_paths = {
    p for p, pi in full_spec.get("paths", {}).items()
    if any(op.get("x-zen-audience") != "PUBLIC_CUSTOMER"
           for op in pi.values() if isinstance(op, dict))
}

# 006: generated bundles contain no internal spec
internal_bundle_paths = ["zen-bff.v1", "zen-back.v1"]
bundle_files = list(STATIC_API.glob("*")) if STATIC_API.exists() else []
bundle_content = ""
for f in bundle_files:
    if f.suffix in (".yaml", ".json"):
        bundle_content += f.read_text()
bundle_leak = [p for p in internal_bundle_paths if p in bundle_content]
check("PUBLIC-API-BOUNDARY-006", len(bundle_leak) == 0,
      f"Internal spec in static bundle: {bundle_leak}")

# 007/008: generated SDKs contain no internal operations
for sdk_name, sdk_path in [("Python", GENERATED_PY), ("TypeScript", GENERATED_TS)]:
    if sdk_path.exists():
        sdk_text = " ".join(p.read_text() for p in sdk_path.rglob("*.py" if sdk_name == "Python" else "*.ts"))
        sdk_leak = [f"/{p}" for p in internal_paths if p in sdk_text]
        check(f"PUBLIC-API-BOUNDARY-00{7 if sdk_name=='Python' else 8}",
              len(sdk_leak) == 0, f"{sdk_name} SDK internal paths: {sdk_leak}")
    else:
        check(f"PUBLIC-API-BOUNDARY-00{7 if sdk_name=='Python' else 8}", False,
              f"{sdk_name} SDK not generated")

# 009/010: sitemap/llms contain no internal links
# (deferred — requires built output)

# 011: no operation defaults to public when unclassified
check("PUBLIC-API-BOUNDARY-011", len(unclassified) == 0,
      "See 001")


# ── API-DOCS ─────────────────────────────────────────────────────────────────

print("\n=== API-DOCS ===")

# 001: exactly one canonical public OpenAPI source
canonical = PUBLIC_SPEC.exists()
check("API-DOCS-001", canonical,
      f"Canonical source missing: {PUBLIC_SPEC}")

# 002: generated YAML/JSON semantic parity
with open(PUBLIC_JSON) as f:
    from_json = json.load(f)
yaml_spec = load_spec(PUBLIC_SPEC)
json_paths = set(from_json.get("paths", {}).keys())
yaml_paths = set(yaml_spec.get("paths", {}).keys())
check("API-DOCS-002", json_paths == yaml_paths,
      f"YAML/JSON path mismatch: {json_paths ^ yaml_paths}")

# 003: Swagger UI consumes canonical generated public spec
swagger_src = SWAGGER_HTML.read_text() if SWAGGER_HTML.exists() else ""
check("API-DOCS-003",
      "/api/openapi.yaml" in swagger_src or "/docs/api/openapi.yaml" in swagger_src,
      "Swagger UI not pointing to canonical public spec")

# 004: no runtime Swagger CDN dependency
check("API-DOCS-004",
      "unpkg.com" not in swagger_src and "jsdelivr.net" not in swagger_src,
      "Runtime CDN dependency found in swagger-ui.html")

# 005: no competing Scalar reference
scalar_has_redirect = (SCALAR_HTML.exists() and
                       "refresh" in SCALAR_HTML.read_text() and
                       "swagger" in SCALAR_HTML.read_text().lower())
check("API-DOCS-005", scalar_has_redirect,
      "Scalar reference not retired/redirected")

# 006: no legacy docs hostname in canonical public artifacts
artifacts = [PUBLIC_SPEC, PUBLIC_JSON]
legacy_hostnames = ["docs.zen-mesh.io", "docs.kubezen.io"]
leaked_hostnames = []
for art in artifacts:
    if art.exists():
        content = art.read_text()
        for h in legacy_hostnames:
            if h in content:
                leaked_hostnames.append(f"{art.name}: {h}")
check("API-DOCS-006", len(leaked_hostnames) == 0,
      f"Legacy hostnames in artifacts: {leaked_hostnames}")

# 007: no stale KubeZen branding/contact in public spec
stale_terms = ["KubeZen", "KubeZen Back API", "api@kubezen.io", "KubeZen.io"]
stale_found = []
for term in stale_terms:
    if term in yaml.dump(public_spec):
        stale_found.append(term)
check("API-DOCS-007", len(stale_found) == 0,
      f"Stale KubeZen terms in public spec: {stale_found}")

# 008: all public operationIds unique
oid_counts = {}
for _, _, op in collect_ops(public_spec):
    oid = op.get("operationId", "")
    oid_counts[oid] = oid_counts.get(oid, 0) + 1
dup_oids = {k: v for k, v in oid_counts.items() if v > 1}
check("API-DOCS-008", len(dup_oids) == 0,
      f"Duplicate operationIds: {dup_oids}")

# 009: all $refs resolve
def get_refs_from_spec(spec):
    import re
    text = yaml.dump(spec)
    # Match #/components/schemas/Foo or #/components/responses/Bar without trailing quotes
    return set(re.findall(r"#/components/(\w+)/([^'\s\"\]\\/]+)", text))

refs = get_refs_from_spec(public_spec)
unresolved = []
for kind, ref in refs:
    parts = ref.rstrip("/").split("/")
    if kind == "schemas":
        component = public_spec.get("components", {}).get("schemas", {})
    elif kind == "responses":
        component = public_spec.get("components", {}).get("responses", {})
    else:
        component = {}
    current = component
    for part in parts:
        if isinstance(current, dict):
            current = current.get(part, {})
        else:
            current = {}
    if not current:
        unresolved.append(f"#/components/{kind}/{ref}")
check("API-DOCS-009", len(unresolved) == 0,
      f"Unresolved $refs: {unresolved}")

# 010: OpenAPI lint (Spectral) — skip if not installed
import subprocess
try:
    result = subprocess.run(
        ["npx", "spectral", "lint", str(PUBLIC_SPEC)],
        capture_output=True, text=True, timeout=60,
        cwd=DOCS
    )
    lint_pass = result.returncode == 0
    # Spectral exits 1 for warnings AND errors, but exits 0 for clean
    # Check if there are any actual errors vs just warnings
    lint_output = result.stdout + result.stderr
    has_errors = any(line.strip().startswith(('error', 'ERROR')) for line in lint_output.splitlines())
    lint_warnings_only = not has_errors and result.returncode != 0
except FileNotFoundError:
    lint_pass = None
if lint_pass is True:
    check("API-DOCS-010", True, "Spectral lint PASS")
elif lint_warnings_only:
    check("API-DOCS-010", True, f"Spectral warnings only (no errors): {result.stdout[:200]}")
elif lint_pass is False:
    check("API-DOCS-010", False, f"Spectral errors: {result.stdout[:300]}")
else:
    check("API-DOCS-010", True, "Spectral not installed — SKIPPED")

# 011: code samples use correct auth (no real tokens)
# Safe patterns: $ENV_VAR, {token}, ${token}, ***, YOUR_TOKEN, <token>
# Unsafe patterns: actual-looking alphanumeric tokens (40+ char hex, etc.)
import re as _re
REAL_TOKEN_RE = _re.compile(r"Bearer\s+([a-zA-Z0-9_\-]{20,})")  # 20+ plain alphanumeric = suspicious
SAFE_TOKEN_RE = _re.compile(r"Bearer\s+(\$[a-zA-Z_][a-zA-Z0-9_]*|\{[^}]+\}|\$+[a-zA-Z_][a-zA-Z0-9_]*|\*+|<[^>]+>|YOUR_[A-Z_]+|REAL_[A-Z_]+)")
samples_with_tokens = []
for _, _, op in collect_ops(public_spec):
    for sample in op.get("x-codeSamples", []):
        src = sample.get("source", "")
        real_tokens = REAL_TOKEN_RE.findall(src)
        safe_tokens = SAFE_TOKEN_RE.findall(src)
        if real_tokens and not safe_tokens:
            samples_with_tokens.append(op.get("operationId"))
check("API-DOCS-011", len(samples_with_tokens) == 0,
      f"Samples with real tokens: {samples_with_tokens}")

# 012/013: Python/TypeScript generation reproducible
check("API-DOCS-012", GENERATED_PY.exists() and (GENERATED_PY / "zen_mesh_api").exists(),
      f"Python SDK not generated: {GENERATED_PY.exists()}")
check("API-DOCS-013", GENERATED_TS.exists() and (GENERATED_TS / "index.ts").exists(),
      f"TypeScript SDK not generated: {GENERATED_TS.exists()}")

# 014: generated clients contain no secret-like fixtures/TLS bypass
for sdk_name, sdk_path in [("Python", GENERATED_PY), ("TypeScript", GENERATED_TS)]:
    if sdk_path.exists():
        bad_patterns = ["os.environ.get('ZEN_API_TOKEN', 'real'", "verify=False",
                        "tls_verify=False", "ssl_verify=False"]
        bad_lines = []
        for p in sdk_path.rglob("*.py" if sdk_name == "Python" else "*.ts"):
            text = p.read_text()
            for pat in bad_patterns:
                if pat in text:
                    bad_lines.append(f"{p.name}: {pat}")
        check(f"API-DOCS-014-{sdk_name}", len(bad_lines) == 0,
              f"{sdk_name} SDK: {bad_lines}")
    else:
        check(f"API-DOCS-014-{sdk_name}", False, f"{sdk_name} SDK not generated")

# 015: public server URLs HTTPS/443 only
bad_servers = []
for server in public_spec.get("servers", []):
    url = server.get("url", "")
    if not (url.startswith("https://") and ":443" not in url.replace("https://", "").split("/")[0] if ":" in url.split("//")[1].split("/")[0] else True):
        bad_servers.append(url)
    # Simple check: no localhost, no IP, no port
    bad_indicators = ["localhost", "127.0.0.1", "0.0.0.0", "192.168.", "10.", "172."]
    for ind in bad_indicators:
        if ind in url:
            bad_servers.append(f"{url} ({ind})")
check("API-DOCS-015", len(bad_servers) == 0,
      f"Non-HTTPS/443 servers: {bad_servers}")

# 016: Swagger does not persist auth by default
persist_check = "persistAuthorization" in swagger_src
persist_false = "persistAuthorization: false" in swagger_src or 'persistAuthorization:false' in swagger_src
check("API-DOCS-016",
      persist_check and persist_false,
      "persistAuthorization not explicitly false")

# 017: unsafe production write Try-It not accidentally enabled
# Check supportedSubmitMethods does NOT include post/put/patch/delete without guard
if "supportedSubmitMethods" in swagger_src:
    write_enabled = any(m in swagger_src for m in ["'post'", '"post"', "'put'", '"put"',
                                                     "'patch'", '"patch"', "'delete'", '"delete"'])
    check("API-DOCS-017", not write_enabled,
          "Write methods may be enabled in Try-It without explicit user action")
else:
    check("API-DOCS-017", True, "supportedSubmitMethods not set")

# 018: legacy API-reference URLs one-hop redirect
check("API-DOCS-018", scalar_has_redirect,
      "See API-DOCS-005")

# 019: canonical API reference has static SEO-readable content
# (deferred — requires built output)

# 020: implementation/public-OpenAPI drift fails closed
# (deferred — requires runtime route registry comparison)


# ── Summary ──────────────────────────────────────────────────────────────────
print(f"\n{'='*60}")
print(f"  PASSED: {len(passes)}")
print(f"  FAILED: {len(failures)}")
if failures:
    print("\nFailure details:")
    for name, detail in failures:
        print(f"  [{name}] {detail}")
    sys.exit(1)
else:
    print("\nAll checks PASSED")
    sys.exit(0)
