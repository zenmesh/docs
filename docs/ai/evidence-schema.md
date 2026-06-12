---
sidebar_label: Evidence Schema
---

# Evidence Schema

The AI evidence endpoints use a consistent JSON schema structure. All fields are documented below.

## Allowed Statuses

| Status | Meaning |
|---|---|
| `implementation_present` | Code exists but no execution proof artifact |
| `local_mock_proven` | Proven in deterministic local/mock harness only |
| `live_proven` | Proven with live/sandbox evidence |
| `planned` | Design documented, implementation not started |
| `blocked` | Cannot proceed due to known blocker |
| `not_claimed` | Explicitly not claimed |
| `maps_to` | Aligns with a compliance framework control |
| `supports` | Supports a compliance framework control |
| `inherits` | Inherited from underlying platform/component |
| `not_applicable` | Not relevant to this capability |

## Forbidden Statuses

The following statuses must NOT appear in any AI evidence artifact unless legally and evidentially validated:

- `certified`
- `authorized`
- `compliant`
- `satisfied`
- `guaranteed`

## Manifest Entry Shape

```json
{
  "id": "cap-hmac-integrity",
  "name": "HMAC payload integrity",
  "proof_status": "local_mock_proven",
  "evidence_refs": ["zen-platform:docs/80-EVIDENCE/security/hmac_trust_execution.json"],
  "validator_refs": ["make hmac-trust-execution-check"],
  "merkle": {
    "enabled": true,
    "purpose": "evidence_integrity",
    "root_ref": "zen-platform Merkle validator"
  },
  "non_claims": ["not_pci_certification", "not_production_zero_trust"]
}
```

## Compliance Mapping Entry Shape

```json
{
  "compliance_id": "cm-hmac-pci",
  "framework": "PCI-DSS v4.0",
  "control_id": "4.2.1",
  "technical_feature": "Webhook payload HMAC signing",
  "relationship": "supports",
  "claim_status": "maps_to",
  "evidence_refs": ["zen-platform:docs/80-EVIDENCE/security/hmac_trust_execution.json"],
  "notes": "Supports cryptographic protection of transmitted data channels — not a PCI compliance certification."
}
```

## Non-Claim Entry Shape

```json
{
  "id": "nc-pci-compliance",
  "category": "compliance",
  "claim": "PCI DSS compliant",
  "scope": "No PCI DSS certification or validation has been performed",
  "evidence_status": "not_claimed"
}
```

## Schema Files

| Schema | URL |
|---|---|
| Manifest | `/ai/evidence-schema/manifest.schema.json` |
| Compliance Map | `/ai/evidence-schema/compliance-map.schema.json` |
