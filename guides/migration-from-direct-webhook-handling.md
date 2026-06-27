# Migration Guide: From Direct Webhook Handling to Zen

**Task ID:** GLM_P0_ZEN_STRATEGY_AND_POST_V1_ARCHITECTURE_DECISION_RECORD_R13
**Reporter:** GLM
**Reporter Slug:** glm
**Task Lane:** PublicDocs
**Decision Date:** 2026-06-27
**Status:** ASSET

## Overview

This guide shows you how to migrate from direct webhook handling (receiving webhooks in your own code) to Zen-managed webhook delivery.

**Why migrate?**

- ✅ **Automatic retries:** Zen retries failed webhooks with exponential backoff
- ✅ **Signature verification:** Zen verifies provider signatures automatically
- ✅ **Replay:** Zen stores failed webhooks for replay without contacting providers
- ✅ **Idempotency:** Zen prevents duplicate event processing
- ✅ **Audit trail:** Zen maintains complete delivery evidence
- ✅ **No code changes for providers:** Switch providers by updating configuration

## Prerequisites

- A provider account (Stripe, Shopify, GitHub, Twilio, etc.)
- A webhook endpoint in your system
- Basic understanding of webhook signatures and delivery

## Step 1: Set Up Zen

**Create a Zen account (Free tier, no credit card required):**

1. Go to [zen-mesh.io](https://zen-mesh.io/register)
2. Create your account
3. Verify your email

**Create your first Flow:**

1. Log in to Zen dashboard
2. Click "Create Flow"
3. Enter a Flow name (e.g., "Stripe webhook delivery")
4. Add your provider as a webhook source (Stripe, Shopify, GitHub, Twilio)
5. Add your target endpoint URL

## Step 2: Update Provider Webhook URL

**Point your provider's webhook URL to Zen (not directly to your code):**

### Stripe Example

**Current setup (direct webhook):**

```
Stripe webhook endpoint: https://your-api.example.com/webhooks/stripe
```

**New setup (with Zen):**

```
Stripe webhook endpoint: https://webhook.zen-mesh.io/stripe
  → Zen verifies signature
    → Zen delivers to: https://your-api.example.com/webhooks/stripe
```

**How to update:**

1. Log in to your Stripe dashboard
2. Navigate to Webhooks → Developers
3. Edit your webhook endpoint
4. Change URL to: `https://webhook.zen-mesh.io/stripe`
5. Save changes

### Shopify Example

**Current setup:**

```
Shopify webhook URL: https://your-api.example.com/webhooks/shopify
```

**New setup:**

```
Shopify webhook URL: https://webhook.zen-mesh.io/shopify
  → Zen verifies signature
    → Zen delivers to: https://your-api.example.com/webhooks/shopify
```

**How to update:**

1. Log in to Shopify admin
2. Navigate to Settings → Notifications → Webhooks
3. Click "Edit" on each webhook
4. Update URL to: `https://webhook.zen-mesh.io/[event_type]`
5. Save changes

### GitHub Example

**Current setup:**

```
GitHub webhook URL: https://your-api.example.com/webhooks/github
```

**New setup:**

```
GitHub webhook URL: https://webhook.zen-mesh.io/github
  → Zen verifies signature
    → Zen delivers to: https://your-api.example.com/webhooks/github
```

**How to update:**

1. Log in to GitHub
2. Navigate to Settings → Webhooks → Manage webhooks
3. Click "Edit" on each webhook
4. Update payload URL to: `https://webhook.zen-mesh.io/[event_type]`
5. Save changes

### Twilio Example

**Current setup:**

```
Twilio webhook URL: https://your-api.example.com/webhooks/twilio
```

**New setup:**

```
Twilio webhook URL: https://webhook.zen-mesh.io/twilio
  → Zen verifies signature
    → Zen delivers to: https://your-api.example.com/webhooks/twilio
```

**How to update:**

1. Log in to Twilio Console
2. Navigate to Programmable SMS → Settings → Triggers
3. Click "Edit" on each webhook
4. Update webhook URL to: `https://webhook.zen-mesh.io/[event_type]`
5. Save changes

## Step 3: Update Your Webhook Handler

**Your webhook handler code stays the same!**

Zen verifies the provider signature and delivers the webhook to your endpoint. Your code continues to process events as before.

**Before (direct webhook):**

```javascript
app.post('/webhooks/stripe', async (req, res) => {
  const signature = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(
    req.body,
    signature,
    'whsec_YOUR_STRIPE_WEBHOOK_SECRET'
  );
  
  // Process event
  await processEvent(event);
  
  res.json({ received: true });
});
```

**After (with Zen):**

```javascript
app.post('/webhooks/stripe', async (req, res) => {
  // Your code stays the same!
  // Zen already verified the signature and delivered the event
  const event = req.body;
  
  // Process event
  await processEvent(event);
  
  res.json({ received: true });
});
```

**Key point:** No code changes needed for signature verification!

## Step 4: Test Your Integration

**Send a test webhook from your provider:**

1. Go to your provider dashboard (Stripe, Shopify, GitHub, Twilio)
2. Send a test webhook
3. Check Zen dashboard for delivery status
4. Verify your webhook handler receives the event

**Expected outcome:**

- ✅ Zen verifies signature
- ✅ Zen delivers event to your endpoint
- ✅ Your webhook handler processes the event
- ✅ Zen shows "Delivered" status

**If webhook failed:**

1. Check Zen dashboard for error message
2. Zen provides delivery evidence
3. Use "Replay" to send webhook again without contacting provider

## Step 5: Monitor Delivery Evidence

**Check Zen dashboard regularly:**

1. Go to your Flow in Zen dashboard
2. View delivery evidence
3. Check success/failure rates
4. Review replayable failed webhooks

**What you can see:**

- Delivery status (Delivered / Failed)
- Timestamp of delivery
- Provider signature verification status
- Error messages (if any)
- Retry history

## Step 6: Enable Replay (Optional)

**Replay failed webhooks from Zen dashboard:**

1. Find failed webhook in delivery evidence
2. Click "Replay" button
3. Zen resends webhook to your endpoint
4. Your handler processes the event

**Benefits of replay:**

- ✅ No need to contact provider again
- ✅ Same signature verification
- ✅ Faster recovery from failures

## What You Gain

**Compared to direct webhook handling:**

| Feature | Direct Webhook | With Zen |
|---------|----------------|----------|
| Signature verification | Manual code | Automatic |
| Retries | Manual implementation | Automatic (exponential backoff) |
| Replay | Manual (contact provider) | One-click from dashboard |
| Idempotency | Manual implementation | Automatic |
| Audit trail | Partial | Complete |
| Failure detection | Best-effort | Dashboard visibility |
| Provider switching | Manual code changes | Configuration only |

## Common Issues and Solutions

**Issue: Webhook delivery fails**

**Solution:** Check Zen dashboard for error message. Use Replay to resend.

**Issue: Signature verification fails**

**Solution:** This shouldn't happen. Zen verifies signature before delivery. If it does, contact Zen support.

**Issue: Events arrive out of order**

**Solution:** Zen preserves event order. Events are delivered in the order they arrive from providers.

**Issue: Can't replay webhook**

**Solution:** Replay only available for failed webhooks. Check if delivery status shows "Failed".

**Issue: My code stopped working after migration**

**Solution:** Check that your webhook handler still exists and is accessible. No code changes are needed.

## Migrating Multiple Providers

**For multiple providers, create separate Flows:**

```
Flow 1: Stripe → Target API
Flow 2: Shopify → Target API
Flow 3: GitHub → Target API
Flow 4: Twilio → Target API
```

**Benefits:**

- ✅ Granular control per provider
- ✅ Different rate policies per Flow
- ✅ Separate replay queues per Flow
- ✅ Easier debugging per provider

## Migrating to Pro+ (Optional)

**Upgrade to Pro+ to unlock:**

- Multiple targets per flow
- IP allowlist/block
- Per-target rate policies
- Security alerts

**Upgrade from dashboard:** Click "Upgrade" button in Zen dashboard.

## Migrating to Business+ (Optional)

**Upgrade to Business+ to unlock:**

- AI Transform
- Slack approval workflows
- Encrypted log/evidence downloads

**Upgrade from dashboard:** Click "Upgrade" button in Zen dashboard.

## Next Steps

**After migration:**

1. ✅ Test all providers with test webhooks
2. ✅ Monitor delivery evidence in Zen dashboard
3. ✅ Set up alerts for failed deliveries (Pro+)
4. ✅ Enable replay for critical webhooks
5. ✅ Review security checklist: [Zen Security Checklist](../security/webhook-security-checklist.md)

**Need help?**

- [Zen Documentation](https://docs.zen-mesh.io)
- [Zen Support](https://zen-mesh.io/support)
- [Zen Community](https://zen-mesh.io/community)

## Related

- [Webhook Security Checklist](../security/webhook-security-checklist.md)
- [Webhook Security Defense-in-Depth](../security/webhook-security-defense-in-depth.md)
- [Stripe Integration](./stripe)
- [Shopify Integration](./shopify)
- [GitHub Integration](./github)
- [Twilio Integration](./twilio)
