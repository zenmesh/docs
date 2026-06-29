---
sidebar_label: Provider Test Account Checklist
---

# Provider Test Account Checklist

This checklist defines the account requirements for live post-cloud validation
of each V1 provider. Leonardo provisions these accounts after production cloud
deployment.

## Stripe

| Requirement | Detail | Evidence |
|-------------|--------|----------|
| Account type | Stripe test mode account | `acct_...` with test credentials |
| Webhook endpoint | Registered with cloud endpoint URL | Dashboard > Developers > Webhooks |
| Webhook signing secret | `whsec_...` for HMAC verification | Store in platform secrets |
| Event generation | Ability to trigger `payment_intent.succeeded`, `charge.*` events | stripe CLI or Dashboard |
| API key scope | Test mode `sk_test_...` with webhook read | Dashboard > Developers > API keys |
| Teardown | Deactivate test webhook endpoint after validation | Confirm in Dashboard |

## GitHub

| Requirement | Detail | Evidence |
|-------------|--------|----------|
| Account type | Personal account or organization with at least one repository | GitHub account |
| Webhook scope | Repository webhook or org webhook with `push`, `dispatch` events | Settings > Webhooks |
| Webhook secret | HMAC secret (arbitrary string, shared with platform) | Configured in webhook settings |
| Event generation | Ability to trigger push events (commit to repo) or `repository_dispatch` API calls | `gh` CLI or git push |
| Access token | Classic PAT with `admin:repo_hook` scope | Settings > Developer settings > Tokens |
| Teardown | Remove test webhook from repository after validation | Settings > Webhooks > Delete |

## Shopify

| Requirement | Detail | Evidence |
|-------------|--------|----------|
| Account type | Shopify development store or partner account | `*.myshopify.com` store URL |
| Webhook configuration | Webhook set up in Settings > Notifications > Webhooks | Store admin |
| Webhook secret | HMAC secret for X-Shopify-Hmac-SHA256 | Configured in webhook settings |
| Event generation | Ability to trigger `orders/create` via Admin API or store checkout | Create draft order via API |
| API access | Admin API access token with `write_orders`, `read_webhooks` scopes | Apps > Admin API |
| Teardown | Delete test webhook from store, clean up test orders | Store admin |

## Twilio

| Requirement | Detail | Evidence |
|-------------|--------|----------|
| Account type | Twilio account with SMS-capable phone number | Trial or production account |
| Webhook URL | Phone number > Messaging > Incoming messages URL | Twilio Console |
| Signature validation | Auth Token used for X-Twilio-Signature verification | Account > Auth Token |
| Event generation | Verified caller ID that can send SMS to the Twilio number | Twilio Console > Verified Caller IDs |
| Status callback | Optional: StatusCallback URL for delivery status | Configure in API calls |
| Teardown | Remove webhook URL from phone number config | Twilio Console |

## General Requirements (All Providers)

- ✅ Each provider account is provisioned at the minimum tier that permits
  webhook event generation and webhook endpoint configuration.
- ✅ API keys and secrets are stored in platform secrets management, not in
  source code or documentation.
- ✅ Credentials are rotated or deactivated after validation completes.
- ✅ No live billing or payment processing is triggered during validation
  (test mode / development store / trial account).
- ✅ Evidence artifacts do not contain live credentials.

## Teardown Procedure

1. Deactivate each provider webhook endpoint from provider dashboard.
2. Revoke or rotate API keys/tokens used for validation.
3. Confirm no further webhook events are being sent to the cloud endpoint.
4. Delete any test data created (test orders, test repos, test messages).
5. Update provider validation evidence with teardown confirmation.

## Related

- [Post-Cloud Provider Validation Overview](./post-cloud-provider-validation-overview)
- [V1 Live Truth Matrix](../launch/v1-live-truth-matrix)
