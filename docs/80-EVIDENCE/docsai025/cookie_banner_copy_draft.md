# Cookie Banner Copy Draft — DOCSAI025

## Status: Draft — Only Implement If Non-Essential Trackers Active

## Banner Copy (If Needed)

> We use limited analytics to improve our site. No personal data is sold. Manage preferences.

## Buttons
- "Accept" — stores consent preference
- "Decline" — stores decline preference
- "Manage" — opens detailed preferences (optional for V1)

## Consent Categories
1. **Essential** — always on (site functionality)
2. **Analytics** — opt-in (site traffic insights)
3. **Marketing** — opt-in (future: HubSpot or similar)

## Implementation Notes
- Store preference in localStorage
- No third-party consent management platform for V1
- Banner should not claim legal compliance
- Cookie policy page must exist before banner is shown
- Legal review of copy required before deployment

## Current Recommendation
Do NOT implement banner until RN-1 is resolved and non-essential trackers are confirmed active.
