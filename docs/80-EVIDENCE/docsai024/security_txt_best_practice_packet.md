# Security.txt Best-Practice Packet — DOCSAI024

> **DRAFT — FOR LEONARDO REVIEW**
> This is a best-practice recommendation, not legal advice. Implement after legal review.

## What is security.txt?
A text file at `.well-known/security.txt` (or `/security.txt`) that tells security researchers how to report vulnerabilities. It is an RFC standard (RFC 9116).

## Best-Practice Content

```
Contact: security@zen-mesh.io
Contact: mailto:security@zen-mesh.io
Preferred-Languages: en
Canonical: https://zen-mesh.io/.well-known/security.txt
Policy: https://zen-mesh.io/security
Acknowledgments: https://zen-mesh.io/security#acknowledgments

# Zen Mesh vulnerability disclosure
# See https://zen-mesh.io/security for full policy

Expires: 2027-06-12T00:00:00.000Z
```

## Decisions for Leonardo

| Field | Current Recommendation | Notes |
|-------|----------------------|-------|
| Contact | security@zen-mesh.io | Requires mailbox setup — confirmed pending |
| Preferred-Languages | en | English only for now |
| Canonical URL | zen-mesh.io/.well-known/security.txt | Standard location |
| Policy page | /security | Links to public security page |
| Acknowledgments | /security#acknowledgments | Optional — if you want to credit researchers |
| Expires | 12 months from launch | Must be renewed annually |
| Encryption key | Optional | If you want PGP-encrypted reports |

## Implementation Notes
1. Place file at `public/.well-known/security.txt` in the site repo
2. Also place at `public/security.txt` for backward compatibility
3. Update the Expires field annually
4. Set up the security@zen-mesh.io mailbox before publishing
5. Create a vulnerability disclosure policy on the /security page
6. Consider a bug bounty program post-launch (not for V1)

## Status
- [ ] security@zen-mesh.io mailbox confirmed
- [ ] security.txt placed in site repo
- [ ] Vulnerability disclosure policy drafted
- [ ] Legal review of policy language
- [ ] File published at .well-known/security.txt
