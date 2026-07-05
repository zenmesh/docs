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
- Pro includes IP allow/block management; Business+ adds advanced policy controls

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
| Pricing | $0 | $29/mo Early Bird (ref $49) | Business waitlist open | Pilot program |
| Trial | Always free | 6-month free trial | Waitlist | Pilot |
| Public webhook endpoints | 3 on shared IPs | 50 | Included + overages | Custom |
| Webhooks/month | 25,000 | 500,000 | Included + overages | Custom |
| Max payload | 256 KB | 1 MB | Higher/custom | Custom |
| Targets | 3 | 25 | Included + overages | Custom |
| Flows/routes | 3 | 50 | Included + overages | Custom |
| Templates | All public | All public | Public + private/custom | Custom |
| Signature/HMAC validation | Where supported | Where supported | Where supported | Included/custom |
| Delivery mode | Single target | Single target | Multi-target fanout | Custom |
| MCP/API/CLI/UI | Included | Included | Included | Included/custom |
| Event/log retention | 7 days | 30 days | Longer retention | Custom |
| DLQ/recovery retention | 3 days basic | 7 days advanced | 30+ days | Custom |
| Retry | Basic | Advanced/manual | Bulk/team/audited | Custom |
| DLQ visibility | Basic | Advanced | Team workflows | Custom |
| Replay | Locked/limited | Manual if available | Batch/dry-run/audited | Custom |
| IP allow/block | No editing | Available | Advanced policy | Custom |
| Header allow/block | No | Limited/preview | Available | Custom |
| Header transform/rewrite | No | No | Planned / Business+ | Custom |
| Delivery logs to S3 | No | Available | Advanced export | Custom |
| Payload export | No | No | Planned / Business+ | Custom |
| S3 Object Lock | No | No | Planned / Business+ | Custom |
| Dedicated adapters | No | No | Yes | Multiple/custom |
| Multi-seat team access | No | No | Available | Custom |
| Object-level permissions | No | No | Available | Custom |
| Metered overages | No | No | Available | Custom |
| Multi-target fanout | No | No | Available | Custom |
| Labs: Sandbox | Basic | Saved sessions | Team/shared | Custom |
| Labs: Playground | Manual | Saved/history | Shared/team | Custom |
| Labs: Payload Builder | Manual JSON | Provider examples | Private schemas | Custom |
| Labs: Webhook Simulator | Limited | Higher limits | Team/audit | Custom |
| Labs: Fixture Runner | Samples only | Saved fixtures | CI-style packs | Custom |
| Support | Community/best-effort | Email + Slack/Discord | SLA/on-call options | Custom support |
| Evidence/audit retention | No | No | Planned / Business+ | Custom |
| DPA/compliance posture | No | No | DPA workflow | Custom MSA/DPA |
| Dedicated receive IP add-on | No | No | Add-on eligible | Custom multiple |

---

## 7. Public Pricing Alignment Notes

The public pricing page at zen-mesh.io/pricing has been updated with plan
detail pages at /pricing/free, /pricing/pro, /pricing/business, and
/pricing/enterprise. The plan definitions reflect the public pricing ladder:

- **Free Forever** — $0, real private webhook delivery, 3 endpoints on
  shared IPs, 25K webhooks/month, 3-day basic retry/DLQ, community support.
  V1 launch plan.
- **Pro Early Bird** — $29/mo (ref $49), 6-month free trial, 50 endpoints,
  500K webhooks/month, IP allow/block, S3 delivery logs, 7-day advanced
  retry/DLQ, saved playground. V1 launch plan.
- **Business** — Business waitlist open. Not generally available at V1.
- **Enterprise** — Enterprise pilot program. Dedicated data plane, custom
  infrastructure, residency, support, procurement. Apply for pilot.
  Not a GA self-serve plan.

All features claimed as "Available" on the pricing page have implementation
and browser/API proof. Planned and waitlist features are honestly marked.
No fake live claims. Comparison hub at /compare with sourced competitor
comparison pages (Hookdeck, Svix, Hook0, ngrok, Tailscale, Webhook Relay).

---

## 8. Public documentation scope

Detailed configuration contract, registry, and GitOps documentation is published only when approved for public release. See [How Zen Works](../start-here/how-zen-works) for the current product model.

---

## 9. Ownership

| Role | Scope |
|------|-------|
| **Hermes** | zen-platform implementation, BFF/backend/UI wiring, browser/API proof, V1 feature contract |
| **DocsAI** | Roadmap/readiness docs, public docs/website consistency, llms surfaces, claim hygiene |
| **GLM** | Product specs, matrices, read-only review/verifier tasks |
| **Leonardo** | Final product/pricing/business decisions |

---

## 11. V1 Exit Criteria

V1 cannot be marked launch-ready until:

- [ ] Final nav is correct and browser-proven
- [ ] Traffic works or has honest state
- [ ] DLQ/retry/replay are real or explicitly scoped
- [ ] IP policy is implemented/surfaced for Pro; header policy and transform controls are honestly marked Business+ or planned where appropriate
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
