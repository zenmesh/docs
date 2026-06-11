---
sidebar_label: First Twilio Webhook (Launch Target)
description: Set up Twilio webhook delivery through Zen Mesh. Launch target — connector validation in progress. Planned workflow described.
---

# Your First Twilio Webhook (Launch Target)

Connect Twilio to Zen Mesh and receive SMS, voice, and status callback events.

Twilio sends webhook notifications for incoming messages, voice calls, and communication status changes. Zen Mesh will validate Twilio's signature at ingestion and route events to your configured destinations.

> Twilio integration is a launch target. This guide describes the intended workflow — connector validation is in progress. The Twilio source type will be selectable in the dashboard once the connector ships.

**Status:** Launch target — not yet available.

## What Twilio Webhooks Provide

| Event Category | Example Events |
|----------------|---------------|
| **SMS** | Incoming messages, message status callbacks |
| **Voice** | Incoming calls, call status callbacks |
| **Conversations** | Participant events, message delivery receipts |
| **Fax / SIP** | Fax status, SIP registration events |

## Prerequisites

- A [Zen Mesh account](https://zen-mesh.io)
- A Twilio account with at least one [phone number](https://console.twilio.com)
- A [target](./create-first-target) configured and reachable

## Step-by-Step (Planned)

These steps are based on the planned connector behavior and may change during validation.

### 1. Create a Twilio Source

1. In the Zen Mesh dashboard, go to **Sources → Add Source**
2. Enter a name, for example `twilio-sms-inbound`
3. Select **Twilio** as the provider type
4. Under **Verification**, configure the Twilio Auth Token:

   ```
   verification:
     method: "signature_based"
     secret: "your_twilio_auth_token"
     header: "X-Twilio-Signature"
   ```

   The Auth Token is found in the [Twilio Console](https://console.twilio.com) under **Account → Auth Token**. Zen Mesh uses it to validate Twilio's `X-Twilio-Signature` header.

5. Save the source and copy the ingestion URL

   ```
   https://ingest.zen-mesh.io/hooks/hook_stu012vwx345
   ```

### 2. Create a Target

1. Go to **Targets → Add Target**
2. Enter a name, for example `sms-processor`
3. Enter the URL of your service that will handle Twilio events
4. If the service is on a private network, select your connected cluster
5. Click **Save**

### 3. Create a Route

1. Go to **Routes → Add Route**
2. Enter a name, for example `twilio-sms-to-processor`
3. Select the Twilio source
4. Select the target
5. Optionally add filters for specific event types:

   ```yaml
   filters:
     event_types:
       - sms.inbound
       - sms.status
       - voice.inbound
   ```

6. Click **Save** and toggle the route to **Active**

### 4. Configure Twilio Console

1. In the [Twilio Console](https://console.twilio.com), go to **Phone Numbers → Manage → Active Numbers**
2. Click on the phone number you want to configure
3. Under **Messaging**, paste your Zen Mesh ingestion URL into **A message comes in**

   ```
   https://ingest.zen-mesh.io/hooks/hook_stu012vwx345
   ```

4. Set **HTTP method** to `POST`
5. Under **Voice**, paste the same URL into **A call comes in**
6. Click **Save**

### 5. Add Labels

```
labels:
  team: communications
  service: twilio
```

## Test Your Integration

> Testing instructions will be available once the Twilio connector is validated.

Planned test approach: Send an SMS from a test phone to your Twilio number and verify the event appears in Zen Mesh **Deliveries**. You can also use the Twilio Console **Test webhook** tool during validation.

## See Also

- [Twilio Integration Guide](../guides/twilio) — full reference and event catalog
- [Send a Test Webhook](./send-test-webhook)
- [Read Delivery Evidence](./read-delivery-evidence)
- [Plans & Limits](../start-here/limits)
- [Support](../start-here/support)
