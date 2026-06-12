---
sidebar_label: Legal Readiness Packet
---

# Legal Full Text Readiness Packet

> **Owner:** Legal (Leonardo to route)
> **Created by:** DocsAI021
> **Status:** Legal review needed — no legal stubs are effective until Legal approves

## Current State

Legal pages exist on helper branches (HELPER032, HELPER037) but are NOT yet merged to main. The sidebar previously referenced legal pages that don't exist on the current branch. DocsAI021 has removed those sidebar references to prevent broken links.

## Legal Documents Inventory

### Existing Drafts (on helper branches, NOT merged to main)

| Document | Path | Status | Action Needed |
|----------|------|--------|---------------|
| Terms of Service | `docs/legal/terms-of-service.md` | Draft/Not Effective | Legal full text review and approval |
| Privacy Policy | `docs/legal/privacy-policy.md` | Draft/Not Effective | Legal full text review and approval |
| Acceptable Use Policy | `docs/legal/acceptable-use.md` | Draft/Not Effective | Legal full text review and approval |
| Cookie Policy | `docs/legal/cookie-policy.md` | Draft/Not Effective | Legal full text review and approval |
| Data Processing Agreement | `docs/legal/dpa.md` | Draft/Not Effective | Legal full text review and approval |

### Site Legal Pages (on site branch)

| Document | Path | Status | Action Needed |
|----------|------|--------|---------------|
| Terms | `src/pages/terms.astro` | Draft/Not Effective | Legal full text review and approval |
| Privacy | `src/pages/privacy.astro` | Draft/Not Effective | Legal full text review and approval |
| AUP | `src/pages/aup.astro` | Draft/Not Effective | Legal full text review and approval |
| DPA | `src/pages/dpa.astro` | Draft/Not Effective | Legal full text review and approval |
| Cookies | `src/pages/cookies.astro` | Draft/Not Effective | Legal full text review and approval |

### Missing Legal Documents (not yet drafted)

| Document | Status | Impact if Missing |
|----------|--------|-----------------|
| Subprocessor List | Not drafted | Required for DPA effectiveness; blocks enterprise sales |
| Responsible Disclosure Policy | Not drafted | Security best practice; nice-to-have for launch |
| Security Contact Page | Not drafted | Standard security practice; `security@zen-mesh.io` referenced in contracts |
| Support Payload Access Policy (Legal) | Not drafted | Legal backing for metadata-first support approach |
| Data Deletion/Export Policy | Not drafted | GDPR/art.17 alignment; blocks EU customers |
| Evidence Retention/Redaction Policy | Not drafted | Data lifecycle; relates to webhook evidence export |
| Data Export Policy | Not drafted | GDPR/art.20 alignment; portability rights |

## Legal Owner Actions Required

### Before Public Signup (Blockers)
1. Review and approve Terms of Service full text
2. Review and approve Privacy Policy full text
3. Review and approve Cookie Policy full text
4. Review and approve Acceptable Use Policy full text
5. Review and approve DPA full text
6. Decide cookie/tracker approach (consent banner, analytics, essential-only)

### Before Enterprise Sales (Blockers)
7. Approve DPA for enterprise customers
8. Draft and approve subprocessor list
9. Draft and approve data deletion/export policy

### Best Effort (Non-blockers for Launch)
10. Responsible disclosure policy
11. Security contact page
12. Evidence retention policy

## Questions for Legal

1. Should Terms/Privacy/AUP/DPA/Cookie be merged to main before or after legal review?
2. Can cookie policy use "essential cookies only" approach without consent banner?
3. Is a subprocessor list required for the Free tier or only for DPA customers?
4. What is the minimum viable legal text for public signup?
5. Should evidence retention period be defined by customer or by platform default?

## Impact if Not Approved

- **No legal text merged = no public signup flow** — users cannot create accounts without accepting Terms
- **No Cookie Policy = site cannot use any cookies** (or must use essential-only without consent)
- **No DPA = no enterprise or EU customer sales**
- **No deletion/export policy = GDPR risk for EU users**

## DocsAI Actions Taken

- Removed Legal sidebar section from docs (pages don't exist on main)
- Confirmed all legal pages on helper branches have draft/non-effective markers
- No legal approval claimed anywhere in docs or site
- Legal pages will be re-added to sidebar once merged to main with Legal approval
