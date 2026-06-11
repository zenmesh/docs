---
sidebar_label: Invite Users and Groups
description: Add team members to your Zen Mesh organization and control access with label-based policies.
---

# Invite Users and Groups

Collaboration is limited by plan. The Free plan is single-user; the Pro plan supports up to 5 team members with role assignment.

## Plan Comparison

| Capability | Free | Pro |
|------------|------|-----|
| Team members | 1 (you) | Up to 5 |
| Role assignment | — | Label-based policies |
| Groups (RBAC) | — | Planned |
| SSO/SAML | — | Planned |

## Adding Team Members (Pro)

### Step 1: Navigate to Team

1. In the dashboard, go to **Settings → Team**
2. Click **Invite Member**

### Step 2: Enter Email Address

```
Email: colleague@company.com
```

An invitation email is sent to the address. The recipient must have a Zen Mesh account.

### Step 3: Assign Labels (Optional)

Labels on the invitation define the scope of resources the user can access:

```
Labels:
  team: payments
  environment: production
```

At this stage, labels are informational for the invited user. When RBAC ships (see below), these labels will enforce which resources the user can view or modify.

### Step 4: Send Invitation

1. Click **Send Invite**
2. The user appears in the team list with status **Pending**

```
Team
├── you@company.com         ● Owner
├── colleague@company.com   ⏳ Pending
└── devops@company.com      ● Member
```

### Invite Acceptance Flow

1. The recipient receives an email with a sign-in link
2. They log in (or create an account) and land in the shared organization
3. Their dashboard shows the resources they have access to
4. The status changes from **Pending** to **Active**

Invitations expire after 7 days.

## Groups, RBAC, and ABAC

:::danger
Groups and label-based RBAC/ABAC are a **launch hard gate** — planned capabilities that are not yet available. The following describes intended behavior.
:::

In a future release, Zen Mesh will support:

- **Groups**: Named collections of users (e.g., `payments-team`, `devops`)
- **Role-Based Access Control (RBAC)**: Roles like `admin`, `editor`, `viewer` mapped to groups
- **Attribute-Based Access Control (ABAC)**: Dynamic policies using resource and user labels

Example planned policy:

```yaml
# Planned — not yet functional
policies:
  - group: payments-team
    role: editor
    match:
      labels:
        team: payments
  - group: devops
    role: admin
    match:
      labels:
        environment: production
```

### MCP and Policy

The Zen Mesh MCP server is limited to reading resource state. MCP cannot:

- Invite or remove users
- Create or modify groups
- Apply RBAC policies
- Change role assignments

All policy and user management changes must be applied by a human through the RBAC interface once available. MCP's [read-only v1 policy](../mcp/read-only-v1-policy) documents this constraint.

## Removing Users

1. Go to **Settings → Team**
2. Find the user
3. Click **Remove**
4. Confirm

Removed users lose access to the organization immediately.

## Next Steps

Once your team is set up, [organize resources with labels](./use-labels) and explore [upgrading to Pro](./upgrade-free-to-pro) if you haven't already.

## See Also

- [Use Labels](./use-labels)
- [Upgrade from Free to Pro](./upgrade-free-to-pro)
- [MCP Read-Only v1 Policy](../mcp/read-only-v1-policy)
- [Security Model](../architecture/security-model)
