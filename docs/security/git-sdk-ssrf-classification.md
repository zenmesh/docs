---
sidebar_label: Git SDK SSRF Classification
---

# Git Provider SDK SSRF Classification

This document defines the Server-Side Request Forgery (SSRF) risk classification
for Git provider SDKs (GitHub, GitLab, Bitbucket) in Zen Mesh V1.

## General Rule

> Fixed SaaS provider BaseURLs are lower SSRF risk. User-controlled or
> self-hosted BaseURLs require hardening before exposure.

Before any user-controlled BaseURL is exposed, the following controls are required:

- Allowlist of permitted domains/hosts
- Scheme restrictions (HTTPS only)
- Private IP / RFC1918 / link-local / cloud metadata endpoint blocking
- DNS rebinding protection
- Redirect policy (block or validate redirects)
- Audit logging of BaseURL configuration

## GitHub SDK

**Classification: V1_PARTIAL**

| Aspect | Detail |
|--------|--------|
| `credentials.BaseURL` | User-configurable in `models.GitCredentials` |
| `Authenticate()` | Passes BaseURL to `NewEnterpriseClient()` without SSRF hardening |
| V1 delivery paths | Do **not** set BaseURL — default to SaaS GitHub |
| V1 blocker? | No — only because current V1 paths do not expose user-controlled BaseURL |
| V1.1 requirement | Transport hardening required before self-hosted/enterprise BaseURL exposure |

**If user-controlled BaseURL is exposed in V1, SSRF validation becomes a V1 blocker.**

Do not assume third-party SDK eliminates SSRF risk. The `NewEnterpriseClient()`
constructor accepts an arbitrary URL. If that URL is user-controlled without
validation, SSRF is exploitable.

## GitLab SDK

**Classification: V1_SAFE_WITH_DOC**

| Aspect | Detail |
|--------|--------|
| BaseURL | Comes from operator/env config in V1 |
| Self-hosted constructor | Exists but **not used** in V1 delivery paths |
| V1 blocker? | No |

GitLab BaseURL is operator-controlled in V1. The self-hosted path exists in the
SDK but is not exercised by V1 delivery paths. Document that enabling
self-hosted GitLab requires the same SSRF hardening controls listed above.

## Bitbucket SDK

**Classification: V1_SAFE_WITH_DOC**

| Aspect | Detail |
|--------|--------|
| BaseURL | Operator/env-only in V1 |
| Raw SSRF risk | **Higher** due to bare `http.Client` concatenating endpoints |
| V1 exposure | Not user-exposed in V1 |
| V1 blocker? | No |

Bitbucket's raw `http.Client` endpoint construction has a higher inherent SSRF
risk than the GitHub/GitLab SDKs. This is acceptable in V1 only because BaseURL
is not user-controlled. Hardening is required before self-hosted exposure.

## Hardening Checklist (Before Any User BaseURL Exposure)

- [ ] Domain/URL allowlist enforced
- [ ] HTTPS-only scheme restriction
- [ ] Private IP ranges blocked (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, 127.0.0.0/8, 169.254.0.0/16)
- [ ] Cloud metadata endpoints blocked (169.254.169.254, fd00:ec2::254)
- [ ] DNS rebinding protection (resolve before connect, validate resolved IP)
- [ ] Redirect policy defined (block or validate redirect targets)
- [ ] Audit logging of BaseURL configuration changes

## Summary

| SDK | Classification | V1 Blocker | User BaseURL in V1? |
|-----|---------------|------------|---------------------|
| GitHub | V1_PARTIAL | No (paths don't expose) | No |
| GitLab | V1_SAFE_WITH_DOC | No | No |
| Bitbucket | V1_SAFE_WITH_DOC | No | No |

All three require SSRF hardening before user-controlled or self-hosted BaseURL
exposure in any future release.
