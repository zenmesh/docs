import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'

import { Channel } from '../models/Channel';
import { ChannelCreateRequest } from '../models/ChannelCreateRequest';
import { Cluster } from '../models/Cluster';
import { ClusterCreateRequest } from '../models/ClusterCreateRequest';
import { DeliveryFlow } from '../models/DeliveryFlow';
import { DeliveryFlowCreateRequest } from '../models/DeliveryFlowCreateRequest';
import { DeliveryFlowUpdateRequest } from '../models/DeliveryFlowUpdateRequest';
import { Destination } from '../models/Destination';
import { DestinationCreateRequest } from '../models/DestinationCreateRequest';
import { DestinationUpdateRequest } from '../models/DestinationUpdateRequest';
import { GetTenant404Response } from '../models/GetTenant404Response';
import { HealthCheck200Response } from '../models/HealthCheck200Response';
import { Ingester } from '../models/Ingester';
import { IngesterCreateRequest } from '../models/IngesterCreateRequest';
import { IngesterUpdateRequest } from '../models/IngesterUpdateRequest';
import { Integration } from '../models/Integration';
import { ListClusters200Response } from '../models/ListClusters200Response';
import { ListDeliveryFlows200Response } from '../models/ListDeliveryFlows200Response';
import { ListDestinations200Response } from '../models/ListDestinations200Response';
import { ListIngesters200Response } from '../models/ListIngesters200Response';
import { ListIntegrations200Response } from '../models/ListIntegrations200Response';
import { ReadinessCheck200Response } from '../models/ReadinessCheck200Response';
import { Tenant } from '../models/Tenant';
import { ObservableCRDsApi } from './ObservableAPI';

import { CRDsApiRequestFactory, CRDsApiResponseProcessor} from "../apis/CRDsApi";
export class PromiseCRDsApi {
    private api: ObservableCRDsApi

    public constructor(
        configuration: Configuration,
        requestFactory?: CRDsApiRequestFactory,
        responseProcessor?: CRDsApiResponseProcessor
    ) {
        this.api = new ObservableCRDsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create a delivery flow
     * @param tenantId 
     * @param clusterId 
     * @param deliveryFlowCreateRequest 
     */
    public createDeliveryFlowWithHttpInfo(tenantId: string, clusterId: string, deliveryFlowCreateRequest: DeliveryFlowCreateRequest, _options?: Configuration): Promise<HttpInfo<DeliveryFlow>> {
        const result = this.api.createDeliveryFlowWithHttpInfo(tenantId, clusterId, deliveryFlowCreateRequest, _options);
        return result.toPromise();
    }

    /**
     * Create a delivery flow
     * @param tenantId 
     * @param clusterId 
     * @param deliveryFlowCreateRequest 
     */
    public createDeliveryFlow(tenantId: string, clusterId: string, deliveryFlowCreateRequest: DeliveryFlowCreateRequest, _options?: Configuration): Promise<DeliveryFlow> {
        const result = this.api.createDeliveryFlow(tenantId, clusterId, deliveryFlowCreateRequest, _options);
        return result.toPromise();
    }

    /**
     * Create a target (wire name: destination)
     * @param tenantId 
     * @param clusterId 
     * @param destinationCreateRequest 
     */
    public createDestinationWithHttpInfo(tenantId: string, clusterId: string, destinationCreateRequest: DestinationCreateRequest, _options?: Configuration): Promise<HttpInfo<Destination>> {
        const result = this.api.createDestinationWithHttpInfo(tenantId, clusterId, destinationCreateRequest, _options);
        return result.toPromise();
    }

    /**
     * Create a target (wire name: destination)
     * @param tenantId 
     * @param clusterId 
     * @param destinationCreateRequest 
     */
    public createDestination(tenantId: string, clusterId: string, destinationCreateRequest: DestinationCreateRequest, _options?: Configuration): Promise<Destination> {
        const result = this.api.createDestination(tenantId, clusterId, destinationCreateRequest, _options);
        return result.toPromise();
    }

    /**
     * Create an ingester
     * @param tenantId 
     * @param clusterId 
     * @param ingesterCreateRequest 
     */
    public createIngesterWithHttpInfo(tenantId: string, clusterId: string, ingesterCreateRequest: IngesterCreateRequest, _options?: Configuration): Promise<HttpInfo<Ingester>> {
        const result = this.api.createIngesterWithHttpInfo(tenantId, clusterId, ingesterCreateRequest, _options);
        return result.toPromise();
    }

    /**
     * Create an ingester
     * @param tenantId 
     * @param clusterId 
     * @param ingesterCreateRequest 
     */
    public createIngester(tenantId: string, clusterId: string, ingesterCreateRequest: IngesterCreateRequest, _options?: Configuration): Promise<Ingester> {
        const result = this.api.createIngester(tenantId, clusterId, ingesterCreateRequest, _options);
        return result.toPromise();
    }

    /**
     * Delete a delivery flow
     * @param tenantId 
     * @param clusterId 
     * @param flowId 
     */
    public deleteDeliveryFlowWithHttpInfo(tenantId: string, clusterId: string, flowId: string, _options?: Configuration): Promise<HttpInfo<void>> {
        const result = this.api.deleteDeliveryFlowWithHttpInfo(tenantId, clusterId, flowId, _options);
        return result.toPromise();
    }

    /**
     * Delete a delivery flow
     * @param tenantId 
     * @param clusterId 
     * @param flowId 
     */
    public deleteDeliveryFlow(tenantId: string, clusterId: string, flowId: string, _options?: Configuration): Promise<void> {
        const result = this.api.deleteDeliveryFlow(tenantId, clusterId, flowId, _options);
        return result.toPromise();
    }

    /**
     * Delete a target (wire name: destination)
     * @param tenantId 
     * @param clusterId 
     * @param destinationId 
     */
    public deleteDestinationWithHttpInfo(tenantId: string, clusterId: string, destinationId: string, _options?: Configuration): Promise<HttpInfo<void>> {
        const result = this.api.deleteDestinationWithHttpInfo(tenantId, clusterId, destinationId, _options);
        return result.toPromise();
    }

    /**
     * Delete a target (wire name: destination)
     * @param tenantId 
     * @param clusterId 
     * @param destinationId 
     */
    public deleteDestination(tenantId: string, clusterId: string, destinationId: string, _options?: Configuration): Promise<void> {
        const result = this.api.deleteDestination(tenantId, clusterId, destinationId, _options);
        return result.toPromise();
    }

    /**
     * Delete an ingester
     * @param tenantId 
     * @param clusterId 
     * @param ingesterId 
     */
    public deleteIngesterWithHttpInfo(tenantId: string, clusterId: string, ingesterId: string, _options?: Configuration): Promise<HttpInfo<void>> {
        const result = this.api.deleteIngesterWithHttpInfo(tenantId, clusterId, ingesterId, _options);
        return result.toPromise();
    }

    /**
     * Delete an ingester
     * @param tenantId 
     * @param clusterId 
     * @param ingesterId 
     */
    public deleteIngester(tenantId: string, clusterId: string, ingesterId: string, _options?: Configuration): Promise<void> {
        const result = this.api.deleteIngester(tenantId, clusterId, ingesterId, _options);
        return result.toPromise();
    }

    /**
     * Get delivery flow details
     * @param tenantId 
     * @param clusterId 
     * @param flowId 
     */
    public getDeliveryFlowWithHttpInfo(tenantId: string, clusterId: string, flowId: string, _options?: Configuration): Promise<HttpInfo<DeliveryFlow>> {
        const result = this.api.getDeliveryFlowWithHttpInfo(tenantId, clusterId, flowId, _options);
        return result.toPromise();
    }

    /**
     * Get delivery flow details
     * @param tenantId 
     * @param clusterId 
     * @param flowId 
     */
    public getDeliveryFlow(tenantId: string, clusterId: string, flowId: string, _options?: Configuration): Promise<DeliveryFlow> {
        const result = this.api.getDeliveryFlow(tenantId, clusterId, flowId, _options);
        return result.toPromise();
    }

    /**
     * Get target details (wire name: destination)
     * @param tenantId 
     * @param clusterId 
     * @param destinationId 
     */
    public getDestinationWithHttpInfo(tenantId: string, clusterId: string, destinationId: string, _options?: Configuration): Promise<HttpInfo<Destination>> {
        const result = this.api.getDestinationWithHttpInfo(tenantId, clusterId, destinationId, _options);
        return result.toPromise();
    }

    /**
     * Get target details (wire name: destination)
     * @param tenantId 
     * @param clusterId 
     * @param destinationId 
     */
    public getDestination(tenantId: string, clusterId: string, destinationId: string, _options?: Configuration): Promise<Destination> {
        const result = this.api.getDestination(tenantId, clusterId, destinationId, _options);
        return result.toPromise();
    }

    /**
     * Get ingester details
     * @param tenantId 
     * @param clusterId 
     * @param ingesterId 
     */
    public getIngesterWithHttpInfo(tenantId: string, clusterId: string, ingesterId: string, _options?: Configuration): Promise<HttpInfo<Ingester>> {
        const result = this.api.getIngesterWithHttpInfo(tenantId, clusterId, ingesterId, _options);
        return result.toPromise();
    }

    /**
     * Get ingester details
     * @param tenantId 
     * @param clusterId 
     * @param ingesterId 
     */
    public getIngester(tenantId: string, clusterId: string, ingesterId: string, _options?: Configuration): Promise<Ingester> {
        const result = this.api.getIngester(tenantId, clusterId, ingesterId, _options);
        return result.toPromise();
    }

    /**
     * List delivery flows for plane (wire name: cluster)
     * @param tenantId 
     * @param clusterId 
     */
    public listDeliveryFlowsWithHttpInfo(tenantId: string, clusterId: string, _options?: Configuration): Promise<HttpInfo<ListDeliveryFlows200Response>> {
        const result = this.api.listDeliveryFlowsWithHttpInfo(tenantId, clusterId, _options);
        return result.toPromise();
    }

    /**
     * List delivery flows for plane (wire name: cluster)
     * @param tenantId 
     * @param clusterId 
     */
    public listDeliveryFlows(tenantId: string, clusterId: string, _options?: Configuration): Promise<ListDeliveryFlows200Response> {
        const result = this.api.listDeliveryFlows(tenantId, clusterId, _options);
        return result.toPromise();
    }

    /**
     * List targets (wire name: destinations) for plane
     * @param tenantId 
     * @param clusterId 
     */
    public listDestinationsWithHttpInfo(tenantId: string, clusterId: string, _options?: Configuration): Promise<HttpInfo<ListDestinations200Response>> {
        const result = this.api.listDestinationsWithHttpInfo(tenantId, clusterId, _options);
        return result.toPromise();
    }

    /**
     * List targets (wire name: destinations) for plane
     * @param tenantId 
     * @param clusterId 
     */
    public listDestinations(tenantId: string, clusterId: string, _options?: Configuration): Promise<ListDestinations200Response> {
        const result = this.api.listDestinations(tenantId, clusterId, _options);
        return result.toPromise();
    }

    /**
     * List ingesters for plane (wire name: cluster)
     * @param tenantId 
     * @param clusterId 
     */
    public listIngestersWithHttpInfo(tenantId: string, clusterId: string, _options?: Configuration): Promise<HttpInfo<ListIngesters200Response>> {
        const result = this.api.listIngestersWithHttpInfo(tenantId, clusterId, _options);
        return result.toPromise();
    }

    /**
     * List ingesters for plane (wire name: cluster)
     * @param tenantId 
     * @param clusterId 
     */
    public listIngesters(tenantId: string, clusterId: string, _options?: Configuration): Promise<ListIngesters200Response> {
        const result = this.api.listIngesters(tenantId, clusterId, _options);
        return result.toPromise();
    }

    /**
     * Update a delivery flow
     * @param tenantId 
     * @param clusterId 
     * @param flowId 
     * @param deliveryFlowUpdateRequest 
     */
    public updateDeliveryFlowWithHttpInfo(tenantId: string, clusterId: string, flowId: string, deliveryFlowUpdateRequest: DeliveryFlowUpdateRequest, _options?: Configuration): Promise<HttpInfo<DeliveryFlow>> {
        const result = this.api.updateDeliveryFlowWithHttpInfo(tenantId, clusterId, flowId, deliveryFlowUpdateRequest, _options);
        return result.toPromise();
    }

    /**
     * Update a delivery flow
     * @param tenantId 
     * @param clusterId 
     * @param flowId 
     * @param deliveryFlowUpdateRequest 
     */
    public updateDeliveryFlow(tenantId: string, clusterId: string, flowId: string, deliveryFlowUpdateRequest: DeliveryFlowUpdateRequest, _options?: Configuration): Promise<DeliveryFlow> {
        const result = this.api.updateDeliveryFlow(tenantId, clusterId, flowId, deliveryFlowUpdateRequest, _options);
        return result.toPromise();
    }

    /**
     * Update a target (wire name: destination)
     * @param tenantId 
     * @param clusterId 
     * @param destinationId 
     * @param destinationUpdateRequest 
     */
    public updateDestinationWithHttpInfo(tenantId: string, clusterId: string, destinationId: string, destinationUpdateRequest: DestinationUpdateRequest, _options?: Configuration): Promise<HttpInfo<Destination>> {
        const result = this.api.updateDestinationWithHttpInfo(tenantId, clusterId, destinationId, destinationUpdateRequest, _options);
        return result.toPromise();
    }

    /**
     * Update a target (wire name: destination)
     * @param tenantId 
     * @param clusterId 
     * @param destinationId 
     * @param destinationUpdateRequest 
     */
    public updateDestination(tenantId: string, clusterId: string, destinationId: string, destinationUpdateRequest: DestinationUpdateRequest, _options?: Configuration): Promise<Destination> {
        const result = this.api.updateDestination(tenantId, clusterId, destinationId, destinationUpdateRequest, _options);
        return result.toPromise();
    }

    /**
     * Update an ingester
     * @param tenantId 
     * @param clusterId 
     * @param ingesterId 
     * @param ingesterUpdateRequest 
     */
    public updateIngesterWithHttpInfo(tenantId: string, clusterId: string, ingesterId: string, ingesterUpdateRequest: IngesterUpdateRequest, _options?: Configuration): Promise<HttpInfo<Ingester>> {
        const result = this.api.updateIngesterWithHttpInfo(tenantId, clusterId, ingesterId, ingesterUpdateRequest, _options);
        return result.toPromise();
    }

    /**
     * Update an ingester
     * @param tenantId 
     * @param clusterId 
     * @param ingesterId 
     * @param ingesterUpdateRequest 
     */
    public updateIngester(tenantId: string, clusterId: string, ingesterId: string, ingesterUpdateRequest: IngesterUpdateRequest, _options?: Configuration): Promise<Ingester> {
        const result = this.api.updateIngester(tenantId, clusterId, ingesterId, ingesterUpdateRequest, _options);
        return result.toPromise();
    }


}



import { ObservableClustersApi } from './ObservableAPI';

import { ClustersApiRequestFactory, ClustersApiResponseProcessor} from "../apis/ClustersApi";
export class PromiseClustersApi {
    private api: ObservableClustersApi

    public constructor(
        configuration: Configuration,
        requestFactory?: ClustersApiRequestFactory,
        responseProcessor?: ClustersApiResponseProcessor
    ) {
        this.api = new ObservableClustersApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Get tenant planes
     * @param tenantId 
     * @param clusterCreateRequest 
     */
    public createClusterWithHttpInfo(tenantId: string, clusterCreateRequest: ClusterCreateRequest, _options?: Configuration): Promise<HttpInfo<Cluster>> {
        const result = this.api.createClusterWithHttpInfo(tenantId, clusterCreateRequest, _options);
        return result.toPromise();
    }

    /**
     * Get tenant planes
     * @param tenantId 
     * @param clusterCreateRequest 
     */
    public createCluster(tenantId: string, clusterCreateRequest: ClusterCreateRequest, _options?: Configuration): Promise<Cluster> {
        const result = this.api.createCluster(tenantId, clusterCreateRequest, _options);
        return result.toPromise();
    }

    /**
     * Get plane details
     * @param tenantId 
     * @param clusterId The cluster (plane) ID.
     */
    public getClusterWithHttpInfo(tenantId: string, clusterId: string, _options?: Configuration): Promise<HttpInfo<Cluster>> {
        const result = this.api.getClusterWithHttpInfo(tenantId, clusterId, _options);
        return result.toPromise();
    }

    /**
     * Get plane details
     * @param tenantId 
     * @param clusterId The cluster (plane) ID.
     */
    public getCluster(tenantId: string, clusterId: string, _options?: Configuration): Promise<Cluster> {
        const result = this.api.getCluster(tenantId, clusterId, _options);
        return result.toPromise();
    }

    /**
     * Get tenant planes
     * @param tenantId 
     */
    public listClustersWithHttpInfo(tenantId: string, _options?: Configuration): Promise<HttpInfo<ListClusters200Response>> {
        const result = this.api.listClustersWithHttpInfo(tenantId, _options);
        return result.toPromise();
    }

    /**
     * Get tenant planes
     * @param tenantId 
     */
    public listClusters(tenantId: string, _options?: Configuration): Promise<ListClusters200Response> {
        const result = this.api.listClusters(tenantId, _options);
        return result.toPromise();
    }


}



import { ObservableHealthApi } from './ObservableAPI';

import { HealthApiRequestFactory, HealthApiResponseProcessor} from "../apis/HealthApi";
export class PromiseHealthApi {
    private api: ObservableHealthApi

    public constructor(
        configuration: Configuration,
        requestFactory?: HealthApiRequestFactory,
        responseProcessor?: HealthApiResponseProcessor
    ) {
        this.api = new ObservableHealthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Health check
     */
    public healthCheckWithHttpInfo(_options?: Configuration): Promise<HttpInfo<HealthCheck200Response>> {
        const result = this.api.healthCheckWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Health check
     */
    public healthCheck(_options?: Configuration): Promise<HealthCheck200Response> {
        const result = this.api.healthCheck(_options);
        return result.toPromise();
    }

    /**
     * Readiness check
     */
    public readinessCheckWithHttpInfo(_options?: Configuration): Promise<HttpInfo<ReadinessCheck200Response>> {
        const result = this.api.readinessCheckWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * Readiness check
     */
    public readinessCheck(_options?: Configuration): Promise<ReadinessCheck200Response> {
        const result = this.api.readinessCheck(_options);
        return result.toPromise();
    }


}



import { ObservableIntegrationsApi } from './ObservableAPI';

import { IntegrationsApiRequestFactory, IntegrationsApiResponseProcessor} from "../apis/IntegrationsApi";
export class PromiseIntegrationsApi {
    private api: ObservableIntegrationsApi

    public constructor(
        configuration: Configuration,
        requestFactory?: IntegrationsApiRequestFactory,
        responseProcessor?: IntegrationsApiResponseProcessor
    ) {
        this.api = new ObservableIntegrationsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * List available integrations
     */
    public listIntegrationsWithHttpInfo(_options?: Configuration): Promise<HttpInfo<ListIntegrations200Response>> {
        const result = this.api.listIntegrationsWithHttpInfo(_options);
        return result.toPromise();
    }

    /**
     * List available integrations
     */
    public listIntegrations(_options?: Configuration): Promise<ListIntegrations200Response> {
        const result = this.api.listIntegrations(_options);
        return result.toPromise();
    }


}



import { ObservableTenantsApi } from './ObservableAPI';

import { TenantsApiRequestFactory, TenantsApiResponseProcessor} from "../apis/TenantsApi";
export class PromiseTenantsApi {
    private api: ObservableTenantsApi

    public constructor(
        configuration: Configuration,
        requestFactory?: TenantsApiRequestFactory,
        responseProcessor?: TenantsApiResponseProcessor
    ) {
        this.api = new ObservableTenantsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Get tenant details
     * @param tenantId 
     */
    public getTenantWithHttpInfo(tenantId: string, _options?: Configuration): Promise<HttpInfo<Tenant>> {
        const result = this.api.getTenantWithHttpInfo(tenantId, _options);
        return result.toPromise();
    }

    /**
     * Get tenant details
     * @param tenantId 
     */
    public getTenant(tenantId: string, _options?: Configuration): Promise<Tenant> {
        const result = this.api.getTenant(tenantId, _options);
        return result.toPromise();
    }


}



import { ObservableWebhooksApi } from './ObservableAPI';

import { WebhooksApiRequestFactory, WebhooksApiResponseProcessor} from "../apis/WebhooksApi";
export class PromiseWebhooksApi {
    private api: ObservableWebhooksApi

    public constructor(
        configuration: Configuration,
        requestFactory?: WebhooksApiRequestFactory,
        responseProcessor?: WebhooksApiResponseProcessor
    ) {
        this.api = new ObservableWebhooksApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Datadog webhook endpoint
     * @param body 
     */
    public datadogWebhookWithHttpInfo(body: any, _options?: Configuration): Promise<HttpInfo<void>> {
        const result = this.api.datadogWebhookWithHttpInfo(body, _options);
        return result.toPromise();
    }

    /**
     * Datadog webhook endpoint
     * @param body 
     */
    public datadogWebhook(body: any, _options?: Configuration): Promise<void> {
        const result = this.api.datadogWebhook(body, _options);
        return result.toPromise();
    }

    /**
     * Jira webhook endpoint
     * @param body 
     */
    public jiraWebhookWithHttpInfo(body: any, _options?: Configuration): Promise<HttpInfo<void>> {
        const result = this.api.jiraWebhookWithHttpInfo(body, _options);
        return result.toPromise();
    }

    /**
     * Jira webhook endpoint
     * @param body 
     */
    public jiraWebhook(body: any, _options?: Configuration): Promise<void> {
        const result = this.api.jiraWebhook(body, _options);
        return result.toPromise();
    }

    /**
     * PagerDuty webhook endpoint
     * @param body 
     */
    public pagerdutyWebhookWithHttpInfo(body: any, _options?: Configuration): Promise<HttpInfo<void>> {
        const result = this.api.pagerdutyWebhookWithHttpInfo(body, _options);
        return result.toPromise();
    }

    /**
     * PagerDuty webhook endpoint
     * @param body 
     */
    public pagerdutyWebhook(body: any, _options?: Configuration): Promise<void> {
        const result = this.api.pagerdutyWebhook(body, _options);
        return result.toPromise();
    }

    /**
     * ServiceNow webhook endpoint
     * @param body 
     */
    public servicenowWebhookWithHttpInfo(body: any, _options?: Configuration): Promise<HttpInfo<void>> {
        const result = this.api.servicenowWebhookWithHttpInfo(body, _options);
        return result.toPromise();
    }

    /**
     * ServiceNow webhook endpoint
     * @param body 
     */
    public servicenowWebhook(body: any, _options?: Configuration): Promise<void> {
        const result = this.api.servicenowWebhook(body, _options);
        return result.toPromise();
    }

    /**
     * Slack webhook endpoint
     * @param body 
     */
    public slackWebhookWithHttpInfo(body: any, _options?: Configuration): Promise<HttpInfo<void>> {
        const result = this.api.slackWebhookWithHttpInfo(body, _options);
        return result.toPromise();
    }

    /**
     * Slack webhook endpoint
     * @param body 
     */
    public slackWebhook(body: any, _options?: Configuration): Promise<void> {
        const result = this.api.slackWebhook(body, _options);
        return result.toPromise();
    }


}



