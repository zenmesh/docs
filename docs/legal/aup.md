> **DRAFT — NOT EFFECTIVE — LEGAL REVIEW REQUIRED**
> This document is a working draft. It is not legally binding, has not been reviewed by counsel, and must not be treated as final terms.

# Acceptable Use Policy (Draft)

## 1. Purpose

This AUP establishes proposed guidelines for acceptable use of the Zen Mesh platform. All enforcement mechanisms are **pending legal review**.

## 2. Prohibited Activities

Users must not:

- Send spam, unsolicited, or abusive webhook payloads
- Attempt replay attacks or credential stuffing
- Misuse credentials, API keys, or secrets
- Transmit illegal content through webhooks
- Attempt to compromise platform integrity or other tenants
- Circumvent security controls or access restrictions
- Use the service for denial-of-service attacks

## 3. Webhook-Specific Abuse

- Automated replay of previously delivered events without legitimate purpose
- Payload injection targeting other tenants
- Exceeding rate limits to degrade platform availability
- Falsifying HMAC signatures or delivery evidence

## 4. Credential and Secret Misuse

- Sharing or exposing API keys and webhook secrets
- Using credentials intended for another account or tenant
- Storing credentials in publicly accessible locations

## 5. Security Testing

If you discover a vulnerability, please report it to security@zen-mesh.io. See [Responsible Disclosure](./responsible-disclosure.md).

Do not perform security testing without prior coordination.

## 6. Suspension and Termination

Zen Mesh may suspend or terminate access for violations of this AUP. The specific enforcement procedures and appeal processes are **pending legal review**.

## 7. No Enforcement Overclaim

Zen Mesh does not claim real-time enforcement capabilities beyond documented rate limiting and access controls.
