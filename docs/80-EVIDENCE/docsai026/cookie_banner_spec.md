# Cookie Banner Specification

## Status: Draft — Awaiting Leonardo Tracker Decision (L-1)

## Current State
No non-essential trackers are active. Full cookie banner not required at this time.

## If Non-Essential Trackers Are Activated Later

### Banner Requirements
- **Necessary cookies**: Always on (session, security, consent preference)
- **Analytics cookies**: Off by default, opt-in
- **Preferences**: User can manage individual categories
- **Reject all**: One-click reject all non-essential
- **Accept all**: One-click accept all (not recommended as default)
- **Manage preferences**: Granular control

### Implementation Notes
- Do NOT auto-accept all cookies
- Do NOT use dark patterns to encourage acceptance
- Cookie consent preference must be persisted
- Banner must appear before any non-essential cookies are set
- Must not claim legal compliance (only "best effort" or "recommended practice")

### Current Recommendation
- No banner needed if no non-essential trackers
- Minimal privacy notice in footer sufficient
- If trackers activated later, implement this spec

## NOT CLAIMED
- Legal compliance of this banner
- GDPR/CCPA/PIPEDA compliance
- Adequate consent mechanism (requires legal review)
