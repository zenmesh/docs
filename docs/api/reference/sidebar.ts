import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/reference/kubezen-back-api",
    },
    {
      type: "category",
      label: "Health",
      items: [
        {
          type: "doc",
          id: "api/reference/health-check",
          label: "Health check",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/reference/readiness-check",
          label: "Readiness check",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Tenants",
      items: [
        {
          type: "doc",
          id: "api/reference/get-tenant",
          label: "Get tenant details",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Clusters",
      items: [
        {
          type: "doc",
          id: "api/reference/list-clusters",
          label: "List clusters for tenant",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/reference/create-cluster",
          label: "Register a new cluster",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/reference/get-cluster",
          label: "Get cluster details",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "CRDs",
      items: [
        {
          type: "doc",
          id: "api/reference/list-ingesters",
          label: "List ingesters for cluster",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/reference/create-ingester",
          label: "Create an ingester",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/reference/get-ingester",
          label: "Get ingester details",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/reference/update-ingester",
          label: "Update an ingester",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/reference/delete-ingester",
          label: "Delete an ingester",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/reference/list-destinations",
          label: "List destinations for cluster",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/reference/create-destination",
          label: "Create a destination",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/reference/get-destination",
          label: "Get destination details",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/reference/update-destination",
          label: "Update a destination",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/reference/delete-destination",
          label: "Delete a destination",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/reference/list-delivery-flows",
          label: "List delivery flows for cluster",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/reference/create-delivery-flow",
          label: "Create a delivery flow",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/reference/get-delivery-flow",
          label: "Get delivery flow details",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/reference/update-delivery-flow",
          label: "Update a delivery flow",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/reference/delete-delivery-flow",
          label: "Delete a delivery flow",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Channels",
      items: [
        {
          type: "doc",
          id: "api/reference/list-channels",
          label: "List channels (bridge-only)",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/reference/create-channel",
          label: "Create a channel (bridge-only)",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/reference/get-channel",
          label: "Get channel details (bridge-only)",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/reference/delete-channel",
          label: "Delete a channel (bridge-only)",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Webhooks",
      items: [
        {
          type: "doc",
          id: "api/reference/slack-webhook",
          label: "Slack webhook endpoint",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/reference/servicenow-webhook",
          label: "ServiceNow webhook endpoint",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/reference/jira-webhook",
          label: "Jira webhook endpoint",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/reference/datadog-webhook",
          label: "Datadog webhook endpoint",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/reference/pagerduty-webhook",
          label: "PagerDuty webhook endpoint",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Integrations",
      items: [
        {
          type: "doc",
          id: "api/reference/list-integrations",
          label: "List available integrations",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
