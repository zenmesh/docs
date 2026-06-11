---
sidebar_label: Twilio Integration
description: Receive and process Twilio webhook events through Zen Mesh — event types, webhook setup, signature verification, and delivery. Launch target — connector validation in progress.
---

# Twilio Integration

Receive Twilio webhook events securely in your private infrastructure.

> Twilio webhook integration is planned for the initial launch window. This guide describes the target configuration — connector validation is in progress.

## Overview

Zen Mesh ingests Twilio webhook events and delivers them to your internal services. Twilio sends event notifications for SMS, voice calls, and status callbacks to Zen Mesh, which validates signatures and delivers to your configured destinations.

## Supported Event Types

Twilio sends events across SMS, voice, and status callback channels:

| Category | Example Events |
|----------|---------------|
| **SMS** | `incoming`, `sent`, `delivered`, `failed` |
| **Voice** | `incoming call`, `answered`, `completed`, `missed` |
| **Status Callbacks** | Delivery receipts, message status updates |
| **Conversations** | Conversation events, participant events |

## Setting Up Delivery

### 1. Create a Destination

Create a destination pointing to your internal service:

```
Name: twilio-sms-processor
URL: http://messaging-svc:8080/webhooks/twilio
```

See [Destinations](./destinations) for destination configuration details.

### 2. Configure the Delivery Flow

Set up a delivery flow that routes Twilio events to your destination. You can filter by event type, apply [JSONPath routing](../delivery/jsonpath-routing) rules, and set per-destination delivery policies.

### 3. Configure Twilio Webhook

In the Twilio Console, go to **Phone Numbers → Manage → Configure**:

1. **Webhook URL**: `https://ingest.zen-mesh.io/hooks/<your-hook-id>`
2. **HTTP method**: `POST`
3. **Event triggers**: Select the events you want to receive (SMS, Voice, Status Callbacks)
4. **Format**: JSON

### 4. Signature Verification

Twilio signs webhook events using the `X-Twilio-Signature` header with your Auth Token. Configure the secret in Zen Mesh:

1. Find your Twilio Auth Token in the **Twilio Console → Account → API Keys & Tokens**
2. Configure it in the Zen Mesh dashboard under your source settings
3. Zen Mesh validates the `X-Twilio-Signature` header on each incoming event
4. Events with invalid or missing signatures are rejected before delivery

## Event Payload Structure

Twilio events follow a standard format:

```json
{
  "AccountSid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "From": "+15551234567",
  "To": "+15559876543",
  "Body": "Your order is ready for pickup",
  "MessageSid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "Status": "delivered",
  "Direction": "outbound-api",
  "NumMedia": "0"
}
```

## JSONPath Transform Example

Use [JSONPath Transforms](../delivery/jsonpath-transforms) to normalize Twilio payloads to consistent internal fields:

```json
[
  { "target": "message_sid",  "source": "jsonpath", "expression": "$.MessageSid" },
  { "target": "from_number",  "source": "jsonpath", "expression": "$.From" },
  { "target": "to_number",    "source": "jsonpath", "expression": "$.To" },
  { "target": "body",         "source": "jsonpath", "expression": "$.Body" },
  { "target": "status",       "source": "jsonpath", "expression": "$.Status" }
]
```

## Related

- [Sources Overview](./sources) — supported webhook providers
- [JSONPath Transforms](../delivery/jsonpath-transforms) — payload normalization
- [JSONPath Routing](../delivery/jsonpath-routing) — event filtering and routing
- [GitHub Integration](./github) — similar setup for DevOps webhooks
