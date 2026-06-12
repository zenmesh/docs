# DOCSAI023 Support Operations Readiness Packet

> **Task ID:** DOCSAI023
> **Date:** 2026-06-12
> **Status:** DRAFT — Support is email-only (support@zen-mesh.io), not live-operational

## Support Intake

- **Channel:** Email only (support@zen-mesh.io)
- **Slack:** Not confirmed — do not claim Slack support
- **Discord:** Not created — do not claim Discord support
- **Status:** support@zen-mesh.io mailbox exists but no responder/SLA operational (PC-003)
- **Onboarding path:** Customer sends email → manual triage → response

## Escalation Path

1. Customer emails support@zen-mesh.io
2. Triage: technical vs billing vs security vs legal
3. Technical: route to engineering (manual)
4. Billing: route to Leonardo (manual)
5. Security: route to security@ (manual, not yet operational)
6. Legal: route to legal counsel (manual)

## Security Incident Response

- **Report channel:** support@zen-mesh.io with subject "Security Incident"
- **Response time target:** Not defined — no SLA claims
- **Evidence preservation:** Delivery logs and Merkle receipts preserved per data lifecycle
- **Comms:** Not yet defined

## Abuse Reporting

- **Report channel:** support@zen-mesh.io with subject "AUP Violation Report"
- **Process:** Documented in legal/acceptable-use.md
- **Resolution:** Manual review → warning/suspension/termination per Terms

## Metadata-First Support Guidance

- Customer requests should include:
  - Tenant/org ID
  - Webhook source (Stripe, GitHub, etc.)
  - Target endpoint URL (or first few chars for privacy)
  - Delivery event ID (from logs or evidence)
  - Timestamp range
- Raw payload content: NOT default — customer-authorized payload grant is a future/controlled path
- No public Leonardo name in support docs

## Customer-Authorized Payload Access

- **Status:** Future/controlled — not available at launch
- **Current approach:** Metadata-only diagnostics
- **Payload access would require:** Customer authorization flow, data access logging, retention policy alignment
- **Docs reference:** guides/troubleshooting.md (metadata-first guidance)

## Support-Live Criteria

Support becomes "live" when ALL of:
1. [ ] Automated ticket routing operational
2. [ ] Response time targets defined and published
3. [ ] Knowledge base (docs) covers top-20 support scenarios
4. [ ] Escalation playbook documented and tested
5. [ ] Support staff onboarding complete

## Current Readiness: PARTIAL

- Email channel exists ✓
- Triage categories defined ✓
- Abuse reporting documented ✓
- No automated routing ✗
- No response targets ✗
- No support staff onboarding ✗
