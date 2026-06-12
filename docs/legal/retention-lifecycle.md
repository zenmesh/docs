> **DRAFT — NOT EFFECTIVE — LEGAL REVIEW REQUIRED**
> This document is a working draft. It is not legally binding, has not been reviewed by counsel, and must not be treated as final terms.

# Retention and Data Lifecycle (Draft)

## 1. Retention Periods (Proposed)

| Data Type | Free | Pro | Business/Enterprise |
|-----------|------|-----|---------------------|
| Webhook payloads | 7 days | 30 days | To be determined |
| DLQ/replay data | 7 days | 30 days | To be determined |
| Logs (API, delivery) | 1 month | 3 months | To be determined |
| Evidence (delivery receipts) | 1 month | 3 months | To be determined |
| Deletion/return period | 1 month | 3 months | To be determined |

## 2. Runtime Enforcement

**Important:** Runtime enforcement of these retention periods is **pending Hermes runtime proof**. The above periods represent the intended policy, not a verified capability.

## 3. Data Lifecycle

1. **Ingestion:** Data is received through webhooks, API calls, or MCP interactions
2. **Processing:** Data is routed, filtered, transformed, and delivered to configured destinations
3. **Storage:** Data is stored for the applicable retention period
4. **Retention:** Data is accessible for the duration of the retention period
5. **Deletion:** After the retention period, data is intended to be deleted
6. **Return:** Upon request or account termination, data is intended to be returned or deleted within the applicable period

## 4. Object-Store Fan-Out

Object-store fan-out is proposed as a V1 Day-1 feature. Runtime proof is pending. Object Lock is V1.1.

## 5. No Runtime-Live Claim

This document describes the intended retention policy. No claim is made that runtime enforcement is currently active or proven.

## 6. Legal Review Required

Retention periods and lifecycle procedures are **pending legal review**.
