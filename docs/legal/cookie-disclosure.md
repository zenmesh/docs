> **DRAFT — NOT EFFECTIVE — LEGAL REVIEW REQUIRED**
> This document is a working draft. It is not legally binding, has not been reviewed by counsel, and must not be treated as final terms.

# Cookie and Tracker Disclosure (Draft)

## 1. Current Tracker Status

As of the current deployment, Zen Mesh does **not** actively deploy the following trackers:

- Google Analytics — **not active**
- Google Tag Manager — **not active**
- HubSpot — **not active**
- Vercel Analytics — **not active**
- Vercel Speed Insights — **not active**
- Chat widgets — **not active**
- CRM tracking pixels — **not active**

## 2. Candidate Trackers

The following trackers are candidates for future deployment, pending decision:

| Tracker | Purpose | Status |
|---------|---------|--------|
| Google Analytics | Usage analytics | Candidate — requires decision |
| HubSpot | Marketing/CRM | Candidate — requires decision |
| Vercel Analytics | Performance monitoring | Candidate — requires decision |
| Vercel Speed Insights | Speed monitoring | Candidate — requires decision |
| Google Fonts | Typography | External refs detected — self-host recommended |

## 3. Font Hosting

External Google Fonts references have been detected in the Vercel deployment configuration. Self-hosting fonts is recommended to reduce third-party dependencies.

## 4. Cookie Banner Decision

A cookie banner implementation is pending the tracker/consent decision. The recommended default is a **minimal notice** (no consent required when no trackers are active). Once trackers are added, a consent banner is expected to be required.

## 5. localStorage and Session Data

Zen Mesh may use browser localStorage or cookies for:
- Session authentication tokens
- User preferences
- UI state

These are functional cookies that do not require consent under most frameworks.

## 6. Legal Review Required

The final cookie/tracker disclosure language and consent mechanism are **pending legal review**. This draft does not constitute an effective cookie policy.
