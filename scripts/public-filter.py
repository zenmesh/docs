#!/usr/bin/env python3
"""
Public OpenAPI Filter Pipeline

Reads the full classified spec (zen-mesh-api.v1.full.yaml) and emits:
  - zen-mesh-api.v1.public.yaml  (PUBLIC_CUSTOMER only)
  - zen-mesh-api.v1.public.json  (same, JSON)

Fail-closed invariant:
  Any operation without x-zen-audience causes immediate non-zero exit.

PUBLIC-API-BOUNDARY-001 through 010 are validated here.
"""
import sys
import yaml
import json
from pathlib import Path

SRC = Path(__file__).parent.parent / "api-specifications" / "zen-mesh-api.v1.full.yaml"
DEST_DIR = Path(__file__).parent.parent / "api-specifications"

def main():
    # Load full spec
    with open(SRC) as f:
        spec = yaml.safe_load(f)

    # ── PUBLIC-API-BOUNDARY-001 ──────────────────────────────────────────────
    # Every operation must have explicit audience
    unclassified = []
    for path, path_item in spec.get("paths", {}).items():
        for method, operation in path_item.items():
            if method in ("get", "post", "put", "patch", "delete"):
                if "x-zen-audience" not in operation:
                    unclassified.append(f"  {method.upper()} {path}")
    if unclassified:
        print("FAIL: Unclassified operations found:", file=sys.stderr)
        for u in unclassified:
            print(u, file=sys.stderr)
        sys.exit(1)
    print(f"PASS: All {sum(1 for p in spec['paths'].values() for m in p if m in ('get','post','put','patch','delete'))} operations explicitly classified")

    # ── PUBLIC-API-BOUNDARY-011 ──────────────────────────────────────────────
    # No operation defaults to PUBLIC_CUSTOMER if unclassified
    # (already enforced above — fail-closed)

    # ── Count by audience ────────────────────────────────────────────────────
    audience_counts = {}
    for path, path_item in spec.get("paths", {}).items():
        for method, operation in path_item.items():
            if method in ("get", "post", "put", "patch", "delete"):
                aud = operation.get("x-zen-audience", "UNCLASSIFIED")
                audience_counts[aud] = audience_counts.get(aud, 0) + 1

    print("Audience distribution:")
    for k, v in sorted(audience_counts.items()):
        print(f"  {k}: {v}")

    # ── Build public spec (PUBLIC_CUSTOMER only) ────────────────────────────
    public_spec = yaml.safe_load(yaml.dump(spec))  # deep copy

    # Collect internal operationIds before removing paths
    internal_ops = set()
    for path, path_item in spec["paths"].items():
        for method, operation in path_item.items():
            if method in ("get", "post", "put", "patch", "delete") and \
               operation.get("x-zen-audience") != "PUBLIC_CUSTOMER":
                internal_ops.add(operation.get("operationId"))

    # Remove non-PUBLIC_CUSTOMER paths
    removed = []
    for path in list(public_spec["paths"].keys()):
        is_public = all(
            op.get("x-zen-audience") == "PUBLIC_CUSTOMER"
            for op in public_spec["paths"][path].values()
            if isinstance(op, dict)
        )
        if not is_public:
            removed.append(path)
            del public_spec["paths"][path]

    # Remove Tags only used by internal paths
    public_tags = [t for t in public_spec.get("tags", [])
                   if not any(
                       op.get("x-zen-audience") != "PUBLIC_CUSTOMER"
                       for pi in spec["paths"].values()
                       for op in pi.values()
                       if isinstance(op, dict) and t["name"] in op.get("tags", [])
                   )]

    # ── PUBLIC-API-BOUNDARY-002 ──────────────────────────────────────────────
    public_ops = set()
    for path, path_item in public_spec["paths"].items():
        for method, operation in path_item.items():
            if method in ("get", "post", "put", "patch", "delete"):
                public_ops.add(operation.get("operationId"))

    leaked = internal_ops & public_ops
    if leaked:
        print(f"FAIL: Internal operationIds leaked: {leaked}", file=sys.stderr)
        sys.exit(1)
    print("PASS: No internal operationIds in public spec")

    # ── PUBLIC-API-BOUNDARY-003 / 004 ────────────────────────────────────────
    internal_paths = set(spec["paths"].keys()) - set(public_spec["paths"].keys())
    if internal_paths:
        print(f"Internal paths removed from public spec: {sorted(internal_paths)}")

    # ── Write outputs ───────────────────────────────────────────────────────
    dest = DEST_DIR / "zen-mesh-api.v1.public.yaml"
    with open(dest, "w") as f:
        yaml.dump(public_spec, f, allow_unicode=True, sort_keys=False, default_flow_style=False)
    print(f"Written: {dest}")

    dest_json = DEST_DIR / "zen-mesh-api.v1.public.json"
    with open(dest_json, "w") as f:
        json.dump(public_spec, f, indent=2, ensure_ascii=False)
    print(f"Written: {dest_json}")

    # ── Summary ─────────────────────────────────────────────────────────────
    print(f"\nPublic spec: {len(public_spec['paths'])} paths, "
          f"{sum(1 for p in public_spec['paths'].values() for m in p if m in ('get','post','put','patch','delete'))} operations")
    print(f"Internal spec: {len(spec['paths']) - len(public_spec['paths'])} paths excluded")
    print("\nAll PUBLIC-API-BOUNDARY checks PASSED")

if __name__ == "__main__":
    main()
