---
sidebar_label: V1 Roadmap
---

# V1 Roadmap

Canonical roadmap for Zen Mesh V1 launch readiness. Statuses: **Available**, **V1 blocker**, **Planned**, **Business waitlist**, **Enterprise custom**, **Not available**.

---

## 1. V1 Launch Blockers

P0 — must be wired, surfaced, and proven before V1 launch:

| Blocker | Status | Owner |
|---------|--------|-------|
| IP allow/block filtering | V1 blocker | Hermes |
| Header allow/block filtering | V1 blocker | Hermes |
| Header transform/rewrite | V1 blocker | Hermes |
| DLQ visibility | V1 blocker | Hermes |
| Retry | V1 blocker | Hermes |
| Replay | V1 blocker | Hermes |
| Retention display/enforcement | V1 blocker | Hermes |
| Traffic route completeness | V1 blocker | Hermes |
| Billing/plan entitlement visibility | V1 blocker | Hermes |
| Labs dev experience surfacing | V1 blocker | Hermes |
| Trust/Security consolidation | V1 blocker | Hermes |
| Public plan copy consistency | V1 blocker | DocsAI |
| Production deployment proof | V1 blocker | Hermes |

---

## 2. Traffic / Recovery Roadmap

### Traffic
- **Delivery visibility** — V1 blocker
- **Failure classification** — V1 blocker
- **Synthetic vs live event labeling** — V1 blocker
- **No fake live traffic claims** — enforced

### DLQ
- List failed deliveries — V1 blocker
- Filters (status, source, date range) — V1 blocker
- Detail view with error category — V1 blocker
- Retention window enforcement — V1 blocker
- Plan gating — Business+ editable unless later changed

### Retry
- Automatic retry — V1 blocker
- Manual retry — V1 blocker
- Queued vs succeeded language — V1 blocker
- Tenant/audit safety — V1 blocker
- No fake retry success claims — enforced

### Replay
- Single replay — V1 blocker
- Batch replay — Planned (post-V1)
- Dry-run replay — Planned (post-V1)
- Replay requires retained payload/context — V1 blocker
- Replay must respect retention and plan — V1 blocker
- No fake replay success claims — enforced

---

## 3. Policy Controls Roadmap

### IP allow/block
- Source IP/CIDR policy — V1 blocker
- Trusted proxy / X-Forwarded-For safety — V1 blocker
- Tenant-scoped — V1 blocker
- Fail-closed on invalid config — V1 blocker
- Business+ editable unless later changed — default

### Header allow/block
- Exact/prefix matching — V1 blocker
- Case-insensitive header names — V1 blocker
- Sensitive header value redaction — V1 blocker
- Tenant-scoped — V1 blocker
- Business+ editable unless later changed — default

### Header transform/rewrite
- Egress/destination-side only — V1 blocker
- No inbound provider signature mutation — enforced
- Restricted headers denied — V1 blocker
- Static set/remove/rename only if safe — V1 blocker
- `secretRef` required for sensitive values — V1 blocker
- Business+ / Enterprise unless later changed — default

---

## 4. Data, Retention, and Evidence Roadmap

### Free
- 7-day event/log retention — Available
- Basic delivery visibility — Available

### Pro
- 30-day retention — Available
- S3 delivery log export — Available
- Better retry/replay/labs history if implemented — Planned

### Business+
- Longer retention — Planned
- Payload export — Planned (not live)
- S3 Object Lock — Planned (not live)
- Audit/evidence retention — Planned
- Team workflows — Planned
- Object-level permissions — Planned

### Enterprise
- Custom retention/export/data residency — Enterprise custom

Do not claim payload export or Object Lock live unless proven.

---

## 5. Labs Developer Experience Roadmap

### Labs IA
- Sandbox — V1 blocker
- Playground — V1 blocker
- Payload Builder — V1 blocker
- Webhook Simulator — V1 blocker
- Fixture Runner — Planned

### Plan ladder

**Free:**
- Basic sandbox — V1 blocker
- Manual payload playground — V1 blocker
- Manual JSON payload builder — V1 blocker
- Limited synthetic simulator if safe — Planned

**Pro:**
- Saved sessions — Planned
- Saved fixtures — Planned
- Provider examples/schemas — Planned
- Provider signature simulation where available — Planned
- Higher limits — Planned

**Business+:**
- Shared team sandboxes — Planned
- Private templates/custom schemas — Planned
- CI-style fixture packs — Planned
- Evidence/audit retention — Planned
- Approval workflows — Planned

### Safety
- Synthetic events must be labeled `synthetic` / `sandbox` / `test` — enforced
- Not live provider traffic — enforced
- Not production delivery proof — enforced
- Not compliance evidence unless saved by real evidence feature — enforced

---

## 6. Plan Ladder Sync

| Feature | Free Forever | Pro Early Bird | Business | Enterprise |
|---------|:---:|:---:|:---:|:---:|
| First success | Available | Available | Planned | Enterprise custom |
| Basic templates | Available | Available | Planned | Enterprise custom |
| Basic endpoints/targets/flows | Available | Available | Planned | Enterprise custom |
| Basic Labs | V1 blocker | Planned | Planned | Enterprise custom |
| Short retention (7d) | Available | — | — | — |
| 30-day retention | — | Available | — | — |
| Longer retention | — | — | Planned | Enterprise custom |
| No advanced policy controls | Available | — | — | — |
| Higher quotas | — | Available | Planned | Enterprise custom |
| S3 delivery-log export | — | Available | Planned | Enterprise custom |
| Advanced dev experience | — | Planned | Planned | Enterprise custom |
| Saved sessions/fixtures | — | Planned | Planned | Enterprise custom |
| Better retry/replay | — | Planned | Planned | Enterprise custom |
| Multi-seat | — | — | Planned | Enterprise custom |
| Object-level permissions | — | — | Planned | Enterprise custom |
| Multi-target fanout | — | — | Planned | Enterprise custom |
| IP/header policies | — | — | V1 blocker | Enterprise custom |
| Header transform/rewrite | — | — | V1 blocker | Enterprise custom |
| Advanced DLQ/replay | — | — | Planned | Enterprise custom |
| Payload export/Object Lock | — | — | Planned | Enterprise custom |
| Team/shared Labs | — | — | Planned | Enterprise custom |
| Audit/evidence retention | — | — | Planned | Enterprise custom |
| Custom retention/export | — | — | — | Enterprise custom |
| Dedicated infra/data plane | — | — | — | Enterprise custom |
| Custom security/procurement | — | — | — | Enterprise custom |
| Custom support/data residency | — | — | — | Enterprise custom |

---

## 7. Public Pricing Alignment Notes

Do not update public pricing to claim these features as available until Hermes produces the accepted V1 plan-feature contract.

**Allowed public copy:**
- Planned
- Business waitlist
- Business+ planned
- Contact us

**Forbidden public copy:**
- ❌ IP blocking available
- ❌ Header transforms available
- ❌ Payload export live
- ❌ Object Lock live
- ❌ DLQ/replay fully available

All of the above require implementation and browser/API proof before public claim.

---

## 8. Ownership

| Role | Scope |
|------|-------|
| **Hermes** | zen-platform implementation, BFF/backend/UI wiring, browser/API proof, V1 feature contract |
| **DocsAI** | Roadmap/readiness docs, public docs/website consistency, llms surfaces, claim hygiene |
| **GLM** | Product specs, matrices, read-only review/verifier tasks |
| **Leonardo** | Final product/pricing/business decisions |

---

## 9. V1 Exit Criteria

V1 cannot be marked launch-ready until:

- [ ] Final nav is correct and browser-proven
- [ ] Traffic works or has honest state
- [ ] DLQ/retry/replay are real or explicitly scoped
- [ ] IP/header policies are implemented/surfaced or honestly marked Business+ planned
- [ ] Labs has a useful Free path
- [ ] Plan locks are visible
- [ ] Trust claims are clean
- [ ] Public website/pricing/llms align
- [ ] Production deploy proof exists
- [ ] V1 live claim is intentionally flipped only after deploy proof

---

## Related

- [Current Status](../start-here/current-status) — evidence maturity
- [Plans and Limits](../start-here/plans-and-limits) — feature quotas by plan
- [Launch Status](../start-here/launch-status) — launch phase
- [V1 Live Truth Matrix](../launch/v1-live-truth-matrix) — launch readiness state
- [V1 Security Readiness Checklist](../security/v1-security-readiness-checklist)
- [Public Pricing](https://www.zen-mesh.io/pricing)
- [OSS Page](https://www.zen-mesh.io/oss)
