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

import { ObservableCRDsApi } from "./ObservableAPI";
import { CRDsApiRequestFactory, CRDsApiResponseProcessor} from "../apis/CRDsApi";

export interface CRDsApiCreateDeliveryFlowRequest {
    /**
     * 
     * @type string
     * @memberof CRDsApicreateDeliveryFlow
     */
    tenantId: string
    /**
     * 
     * @type string
     * @memberof CRDsApicreateDeliveryFlow
     */
    clusterId: string
    /**
     * 
     * @type DeliveryFlowCreateRequest
     * @memberof CRDsApicreateDeliveryFlow
     */
    deliveryFlowCreateRequest: DeliveryFlowCreateRequest
}

export interface CRDsApiCreateDestinationRequest {
    /**
     * 
     * @type string
     * @memberof CRDsApicreateDestination
     */
    tenantId: string
    /**
     * 
     * @type string
     * @memberof CRDsApicreateDestination
     */
    clusterId: string
    /**
     * 
     * @type DestinationCreateRequest
     * @memberof CRDsApicreateDestination
     */
    destinationCreateRequest: DestinationCreateRequest
}

export interface CRDsApiCreateIngesterRequest {
    /**
     * 
     * @type string
     * @memberof CRDsApicreateIngester
     */
    tenantId: string
    /**
     * 
     * @type string
     * @memberof CRDsApicreateIngester
     */
    clusterId: string
    /**
     * 
     * @type IngesterCreateRequest
     * @memberof CRDsApicreateIngester
     */
    ingesterCreateRequest: IngesterCreateRequest
}

export interface CRDsApiDeleteDeliveryFlowRequest {
    /**
     * 
     * @type string
     * @memberof CRDsApideleteDeliveryFlow
     */
    tenantId: string
    /**
     * 
     * @type string
     * @memberof CRDsApideleteDeliveryFlow
     */
    clusterId: string
    /**
     * 
     * @type string
     * @memberof CRDsApideleteDeliveryFlow
     */
    flowId: string
}

export interface CRDsApiDeleteDestinationRequest {
    /**
     * 
     * @type string
     * @memberof CRDsApideleteDestination
     */
    tenantId: string
    /**
     * 
     * @type string
     * @memberof CRDsApideleteDestination
     */
    clusterId: string
    /**
     * 
     * @type string
     * @memberof CRDsApideleteDestination
     */
    destinationId: string
}

export interface CRDsApiDeleteIngesterRequest {
    /**
     * 
     * @type string
     * @memberof CRDsApideleteIngester
     */
    tenantId: string
    /**
     * 
     * @type string
     * @memberof CRDsApideleteIngester
     */
    clusterId: string
    /**
     * 
     * @type string
     * @memberof CRDsApideleteIngester
     */
    ingesterId: string
}

export interface CRDsApiGetDeliveryFlowRequest {
    /**
     * 
     * @type string
     * @memberof CRDsApigetDeliveryFlow
     */
    tenantId: string
    /**
     * 
     * @type string
     * @memberof CRDsApigetDeliveryFlow
     */
    clusterId: string
    /**
     * 
     * @type string
     * @memberof CRDsApigetDeliveryFlow
     */
    flowId: string
}

export interface CRDsApiGetDestinationRequest {
    /**
     * 
     * @type string
     * @memberof CRDsApigetDestination
     */
    tenantId: string
    /**
     * 
     * @type string
     * @memberof CRDsApigetDestination
     */
    clusterId: string
    /**
     * 
     * @type string
     * @memberof CRDsApigetDestination
     */
    destinationId: string
}

export interface CRDsApiGetIngesterRequest {
    /**
     * 
     * @type string
     * @memberof CRDsApigetIngester
     */
    tenantId: string
    /**
     * 
     * @type string
     * @memberof CRDsApigetIngester
     */
    clusterId: string
    /**
     * 
     * @type string
     * @memberof CRDsApigetIngester
     */
    ingesterId: string
}

export interface CRDsApiListDeliveryFlowsRequest {
    /**
     * 
     * @type string
     * @memberof CRDsApilistDeliveryFlows
     */
    tenantId: string
    /**
     * 
     * @type string
     * @memberof CRDsApilistDeliveryFlows
     */
    clusterId: string
}

export interface CRDsApiListDestinationsRequest {
    /**
     * 
     * @type string
     * @memberof CRDsApilistDestinations
     */
    tenantId: string
    /**
     * 
     * @type string
     * @memberof CRDsApilistDestinations
     */
    clusterId: string
}

export interface CRDsApiListIngestersRequest {
    /**
     * 
     * @type string
     * @memberof CRDsApilistIngesters
     */
    tenantId: string
    /**
     * 
     * @type string
     * @memberof CRDsApilistIngesters
     */
    clusterId: string
}

export interface CRDsApiUpdateDeliveryFlowRequest {
    /**
     * 
     * @type string
     * @memberof CRDsApiupdateDeliveryFlow
     */
    tenantId: string
    /**
     * 
     * @type string
     * @memberof CRDsApiupdateDeliveryFlow
     */
    clusterId: string
    /**
     * 
     * @type string
     * @memberof CRDsApiupdateDeliveryFlow
     */
    flowId: string
    /**
     * 
     * @type DeliveryFlowUpdateRequest
     * @memberof CRDsApiupdateDeliveryFlow
     */
    deliveryFlowUpdateRequest: DeliveryFlowUpdateRequest
}

export interface CRDsApiUpdateDestinationRequest {
    /**
     * 
     * @type string
     * @memberof CRDsApiupdateDestination
     */
    tenantId: string
    /**
     * 
     * @type string
     * @memberof CRDsApiupdateDestination
     */
    clusterId: string
    /**
     * 
     * @type string
     * @memberof CRDsApiupdateDestination
     */
    destinationId: string
    /**
     * 
     * @type DestinationUpdateRequest
     * @memberof CRDsApiupdateDestination
     */
    destinationUpdateRequest: DestinationUpdateRequest
}

export interface CRDsApiUpdateIngesterRequest {
    /**
     * 
     * @type string
     * @memberof CRDsApiupdateIngester
     */
    tenantId: string
    /**
     * 
     * @type string
     * @memberof CRDsApiupdateIngester
     */
    clusterId: string
    /**
     * 
     * @type string
     * @memberof CRDsApiupdateIngester
     */
    ingesterId: string
    /**
     * 
     * @type IngesterUpdateRequest
     * @memberof CRDsApiupdateIngester
     */
    ingesterUpdateRequest: IngesterUpdateRequest
}

export class ObjectCRDsApi {
    private api: ObservableCRDsApi

    public constructor(configuration: Configuration, requestFactory?: CRDsApiRequestFactory, responseProcessor?: CRDsApiResponseProcessor) {
        this.api = new ObservableCRDsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Create a delivery flow
     * @param param the request object
     */
    public createDeliveryFlowWithHttpInfo(param: CRDsApiCreateDeliveryFlowRequest, options?: Configuration): Promise<HttpInfo<DeliveryFlow>> {
        return this.api.createDeliveryFlowWithHttpInfo(param.tenantId, param.clusterId, param.deliveryFlowCreateRequest,  options).toPromise();
    }

    /**
     * Create a delivery flow
     * @param param the request object
     */
    public createDeliveryFlow(param: CRDsApiCreateDeliveryFlowRequest, options?: Configuration): Promise<DeliveryFlow> {
        return this.api.createDeliveryFlow(param.tenantId, param.clusterId, param.deliveryFlowCreateRequest,  options).toPromise();
    }

    /**
     * Create a target (wire name: destination)
     * @param param the request object
     */
    public createDestinationWithHttpInfo(param: CRDsApiCreateDestinationRequest, options?: Configuration): Promise<HttpInfo<Destination>> {
        return this.api.createDestinationWithHttpInfo(param.tenantId, param.clusterId, param.destinationCreateRequest,  options).toPromise();
    }

    /**
     * Create a target (wire name: destination)
     * @param param the request object
     */
    public createDestination(param: CRDsApiCreateDestinationRequest, options?: Configuration): Promise<Destination> {
        return this.api.createDestination(param.tenantId, param.clusterId, param.destinationCreateRequest,  options).toPromise();
    }

    /**
     * Create an ingester
     * @param param the request object
     */
    public createIngesterWithHttpInfo(param: CRDsApiCreateIngesterRequest, options?: Configuration): Promise<HttpInfo<Ingester>> {
        return this.api.createIngesterWithHttpInfo(param.tenantId, param.clusterId, param.ingesterCreateRequest,  options).toPromise();
    }

    /**
     * Create an ingester
     * @param param the request object
     */
    public createIngester(param: CRDsApiCreateIngesterRequest, options?: Configuration): Promise<Ingester> {
        return this.api.createIngester(param.tenantId, param.clusterId, param.ingesterCreateRequest,  options).toPromise();
    }

    /**
     * Delete a delivery flow
     * @param param the request object
     */
    public deleteDeliveryFlowWithHttpInfo(param: CRDsApiDeleteDeliveryFlowRequest, options?: Configuration): Promise<HttpInfo<void>> {
        return this.api.deleteDeliveryFlowWithHttpInfo(param.tenantId, param.clusterId, param.flowId,  options).toPromise();
    }

    /**
     * Delete a delivery flow
     * @param param the request object
     */
    public deleteDeliveryFlow(param: CRDsApiDeleteDeliveryFlowRequest, options?: Configuration): Promise<void> {
        return this.api.deleteDeliveryFlow(param.tenantId, param.clusterId, param.flowId,  options).toPromise();
    }

    /**
     * Delete a target (wire name: destination)
     * @param param the request object
     */
    public deleteDestinationWithHttpInfo(param: CRDsApiDeleteDestinationRequest, options?: Configuration): Promise<HttpInfo<void>> {
        return this.api.deleteDestinationWithHttpInfo(param.tenantId, param.clusterId, param.destinationId,  options).toPromise();
    }

    /**
     * Delete a target (wire name: destination)
     * @param param the request object
     */
    public deleteDestination(param: CRDsApiDeleteDestinationRequest, options?: Configuration): Promise<void> {
        return this.api.deleteDestination(param.tenantId, param.clusterId, param.destinationId,  options).toPromise();
    }

    /**
     * Delete an ingester
     * @param param the request object
     */
    public deleteIngesterWithHttpInfo(param: CRDsApiDeleteIngesterRequest, options?: Configuration): Promise<HttpInfo<void>> {
        return this.api.deleteIngesterWithHttpInfo(param.tenantId, param.clusterId, param.ingesterId,  options).toPromise();
    }

    /**
     * Delete an ingester
     * @param param the request object
     */
    public deleteIngester(param: CRDsApiDeleteIngesterRequest, options?: Configuration): Promise<void> {
        return this.api.deleteIngester(param.tenantId, param.clusterId, param.ingesterId,  options).toPromise();
    }

    /**
     * Get delivery flow details
     * @param param the request object
     */
    public getDeliveryFlowWithHttpInfo(param: CRDsApiGetDeliveryFlowRequest, options?: Configuration): Promise<HttpInfo<DeliveryFlow>> {
        return this.api.getDeliveryFlowWithHttpInfo(param.tenantId, param.clusterId, param.flowId,  options).toPromise();
    }

    /**
     * Get delivery flow details
     * @param param the request object
     */
    public getDeliveryFlow(param: CRDsApiGetDeliveryFlowRequest, options?: Configuration): Promise<DeliveryFlow> {
        return this.api.getDeliveryFlow(param.tenantId, param.clusterId, param.flowId,  options).toPromise();
    }

    /**
     * Get target details (wire name: destination)
     * @param param the request object
     */
    public getDestinationWithHttpInfo(param: CRDsApiGetDestinationRequest, options?: Configuration): Promise<HttpInfo<Destination>> {
        return this.api.getDestinationWithHttpInfo(param.tenantId, param.clusterId, param.destinationId,  options).toPromise();
    }

    /**
     * Get target details (wire name: destination)
     * @param param the request object
     */
    public getDestination(param: CRDsApiGetDestinationRequest, options?: Configuration): Promise<Destination> {
        return this.api.getDestination(param.tenantId, param.clusterId, param.destinationId,  options).toPromise();
    }

    /**
     * Get ingester details
     * @param param the request object
     */
    public getIngesterWithHttpInfo(param: CRDsApiGetIngesterRequest, options?: Configuration): Promise<HttpInfo<Ingester>> {
        return this.api.getIngesterWithHttpInfo(param.tenantId, param.clusterId, param.ingesterId,  options).toPromise();
    }

    /**
     * Get ingester details
     * @param param the request object
     */
    public getIngester(param: CRDsApiGetIngesterRequest, options?: Configuration): Promise<Ingester> {
        return this.api.getIngester(param.tenantId, param.clusterId, param.ingesterId,  options).toPromise();
    }

    /**
     * List delivery flows for plane (wire name: cluster)
     * @param param the request object
     */
    public listDeliveryFlowsWithHttpInfo(param: CRDsApiListDeliveryFlowsRequest, options?: Configuration): Promise<HttpInfo<ListDeliveryFlows200Response>> {
        return this.api.listDeliveryFlowsWithHttpInfo(param.tenantId, param.clusterId,  options).toPromise();
    }

    /**
     * List delivery flows for plane (wire name: cluster)
     * @param param the request object
     */
    public listDeliveryFlows(param: CRDsApiListDeliveryFlowsRequest, options?: Configuration): Promise<ListDeliveryFlows200Response> {
        return this.api.listDeliveryFlows(param.tenantId, param.clusterId,  options).toPromise();
    }

    /**
     * List targets (wire name: destinations) for plane
     * @param param the request object
     */
    public listDestinationsWithHttpInfo(param: CRDsApiListDestinationsRequest, options?: Configuration): Promise<HttpInfo<ListDestinations200Response>> {
        return this.api.listDestinationsWithHttpInfo(param.tenantId, param.clusterId,  options).toPromise();
    }

    /**
     * List targets (wire name: destinations) for plane
     * @param param the request object
     */
    public listDestinations(param: CRDsApiListDestinationsRequest, options?: Configuration): Promise<ListDestinations200Response> {
        return this.api.listDestinations(param.tenantId, param.clusterId,  options).toPromise();
    }

    /**
     * List ingesters for plane (wire name: cluster)
     * @param param the request object
     */
    public listIngestersWithHttpInfo(param: CRDsApiListIngestersRequest, options?: Configuration): Promise<HttpInfo<ListIngesters200Response>> {
        return this.api.listIngestersWithHttpInfo(param.tenantId, param.clusterId,  options).toPromise();
    }

    /**
     * List ingesters for plane (wire name: cluster)
     * @param param the request object
     */
    public listIngesters(param: CRDsApiListIngestersRequest, options?: Configuration): Promise<ListIngesters200Response> {
        return this.api.listIngesters(param.tenantId, param.clusterId,  options).toPromise();
    }

    /**
     * Update a delivery flow
     * @param param the request object
     */
    public updateDeliveryFlowWithHttpInfo(param: CRDsApiUpdateDeliveryFlowRequest, options?: Configuration): Promise<HttpInfo<DeliveryFlow>> {
        return this.api.updateDeliveryFlowWithHttpInfo(param.tenantId, param.clusterId, param.flowId, param.deliveryFlowUpdateRequest,  options).toPromise();
    }

    /**
     * Update a delivery flow
     * @param param the request object
     */
    public updateDeliveryFlow(param: CRDsApiUpdateDeliveryFlowRequest, options?: Configuration): Promise<DeliveryFlow> {
        return this.api.updateDeliveryFlow(param.tenantId, param.clusterId, param.flowId, param.deliveryFlowUpdateRequest,  options).toPromise();
    }

    /**
     * Update a target (wire name: destination)
     * @param param the request object
     */
    public updateDestinationWithHttpInfo(param: CRDsApiUpdateDestinationRequest, options?: Configuration): Promise<HttpInfo<Destination>> {
        return this.api.updateDestinationWithHttpInfo(param.tenantId, param.clusterId, param.destinationId, param.destinationUpdateRequest,  options).toPromise();
    }

    /**
     * Update a target (wire name: destination)
     * @param param the request object
     */
    public updateDestination(param: CRDsApiUpdateDestinationRequest, options?: Configuration): Promise<Destination> {
        return this.api.updateDestination(param.tenantId, param.clusterId, param.destinationId, param.destinationUpdateRequest,  options).toPromise();
    }

    /**
     * Update an ingester
     * @param param the request object
     */
    public updateIngesterWithHttpInfo(param: CRDsApiUpdateIngesterRequest, options?: Configuration): Promise<HttpInfo<Ingester>> {
        return this.api.updateIngesterWithHttpInfo(param.tenantId, param.clusterId, param.ingesterId, param.ingesterUpdateRequest,  options).toPromise();
    }

    /**
     * Update an ingester
     * @param param the request object
     */
    public updateIngester(param: CRDsApiUpdateIngesterRequest, options?: Configuration): Promise<Ingester> {
        return this.api.updateIngester(param.tenantId, param.clusterId, param.ingesterId, param.ingesterUpdateRequest,  options).toPromise();
    }

}

import { ObservableClustersApi } from "./ObservableAPI";
import { ClustersApiRequestFactory, ClustersApiResponseProcessor} from "../apis/ClustersApi";

export interface ClustersApiCreateClusterRequest {
    /**
     * 
     * @type string
     * @memberof ClustersApicreateCluster
     */
    tenantId: string
    /**
     * 
     * @type ClusterCreateRequest
     * @memberof ClustersApicreateCluster
     */
    clusterCreateRequest: ClusterCreateRequest
}

export interface ClustersApiGetClusterRequest {
    /**
     * 
     * @type string
     * @memberof ClustersApigetCluster
     */
    tenantId: string
    /**
     * The cluster (plane) ID.
     * @type string
     * @memberof ClustersApigetCluster
     */
    clusterId: string
}

export interface ClustersApiListClustersRequest {
    /**
     * 
     * @type string
     * @memberof ClustersApilistClusters
     */
    tenantId: string
}

export class ObjectClustersApi {
    private api: ObservableClustersApi

    public constructor(configuration: Configuration, requestFactory?: ClustersApiRequestFactory, responseProcessor?: ClustersApiResponseProcessor) {
        this.api = new ObservableClustersApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Get tenant planes
     * @param param the request object
     */
    public createClusterWithHttpInfo(param: ClustersApiCreateClusterRequest, options?: Configuration): Promise<HttpInfo<Cluster>> {
        return this.api.createClusterWithHttpInfo(param.tenantId, param.clusterCreateRequest,  options).toPromise();
    }

    /**
     * Get tenant planes
     * @param param the request object
     */
    public createCluster(param: ClustersApiCreateClusterRequest, options?: Configuration): Promise<Cluster> {
        return this.api.createCluster(param.tenantId, param.clusterCreateRequest,  options).toPromise();
    }

    /**
     * Get plane details
     * @param param the request object
     */
    public getClusterWithHttpInfo(param: ClustersApiGetClusterRequest, options?: Configuration): Promise<HttpInfo<Cluster>> {
        return this.api.getClusterWithHttpInfo(param.tenantId, param.clusterId,  options).toPromise();
    }

    /**
     * Get plane details
     * @param param the request object
     */
    public getCluster(param: ClustersApiGetClusterRequest, options?: Configuration): Promise<Cluster> {
        return this.api.getCluster(param.tenantId, param.clusterId,  options).toPromise();
    }

    /**
     * Get tenant planes
     * @param param the request object
     */
    public listClustersWithHttpInfo(param: ClustersApiListClustersRequest, options?: Configuration): Promise<HttpInfo<ListClusters200Response>> {
        return this.api.listClustersWithHttpInfo(param.tenantId,  options).toPromise();
    }

    /**
     * Get tenant planes
     * @param param the request object
     */
    public listClusters(param: ClustersApiListClustersRequest, options?: Configuration): Promise<ListClusters200Response> {
        return this.api.listClusters(param.tenantId,  options).toPromise();
    }

}

import { ObservableHealthApi } from "./ObservableAPI";
import { HealthApiRequestFactory, HealthApiResponseProcessor} from "../apis/HealthApi";

export interface HealthApiHealthCheckRequest {
}

export interface HealthApiReadinessCheckRequest {
}

export class ObjectHealthApi {
    private api: ObservableHealthApi

    public constructor(configuration: Configuration, requestFactory?: HealthApiRequestFactory, responseProcessor?: HealthApiResponseProcessor) {
        this.api = new ObservableHealthApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Health check
     * @param param the request object
     */
    public healthCheckWithHttpInfo(param: HealthApiHealthCheckRequest = {}, options?: Configuration): Promise<HttpInfo<HealthCheck200Response>> {
        return this.api.healthCheckWithHttpInfo( options).toPromise();
    }

    /**
     * Health check
     * @param param the request object
     */
    public healthCheck(param: HealthApiHealthCheckRequest = {}, options?: Configuration): Promise<HealthCheck200Response> {
        return this.api.healthCheck( options).toPromise();
    }

    /**
     * Readiness check
     * @param param the request object
     */
    public readinessCheckWithHttpInfo(param: HealthApiReadinessCheckRequest = {}, options?: Configuration): Promise<HttpInfo<ReadinessCheck200Response>> {
        return this.api.readinessCheckWithHttpInfo( options).toPromise();
    }

    /**
     * Readiness check
     * @param param the request object
     */
    public readinessCheck(param: HealthApiReadinessCheckRequest = {}, options?: Configuration): Promise<ReadinessCheck200Response> {
        return this.api.readinessCheck( options).toPromise();
    }

}

import { ObservableIntegrationsApi } from "./ObservableAPI";
import { IntegrationsApiRequestFactory, IntegrationsApiResponseProcessor} from "../apis/IntegrationsApi";

export interface IntegrationsApiListIntegrationsRequest {
}

export class ObjectIntegrationsApi {
    private api: ObservableIntegrationsApi

    public constructor(configuration: Configuration, requestFactory?: IntegrationsApiRequestFactory, responseProcessor?: IntegrationsApiResponseProcessor) {
        this.api = new ObservableIntegrationsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * List available integrations
     * @param param the request object
     */
    public listIntegrationsWithHttpInfo(param: IntegrationsApiListIntegrationsRequest = {}, options?: Configuration): Promise<HttpInfo<ListIntegrations200Response>> {
        return this.api.listIntegrationsWithHttpInfo( options).toPromise();
    }

    /**
     * List available integrations
     * @param param the request object
     */
    public listIntegrations(param: IntegrationsApiListIntegrationsRequest = {}, options?: Configuration): Promise<ListIntegrations200Response> {
        return this.api.listIntegrations( options).toPromise();
    }

}

import { ObservableTenantsApi } from "./ObservableAPI";
import { TenantsApiRequestFactory, TenantsApiResponseProcessor} from "../apis/TenantsApi";

export interface TenantsApiGetTenantRequest {
    /**
     * 
     * @type string
     * @memberof TenantsApigetTenant
     */
    tenantId: string
}

export class ObjectTenantsApi {
    private api: ObservableTenantsApi

    public constructor(configuration: Configuration, requestFactory?: TenantsApiRequestFactory, responseProcessor?: TenantsApiResponseProcessor) {
        this.api = new ObservableTenantsApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Get tenant details
     * @param param the request object
     */
    public getTenantWithHttpInfo(param: TenantsApiGetTenantRequest, options?: Configuration): Promise<HttpInfo<Tenant>> {
        return this.api.getTenantWithHttpInfo(param.tenantId,  options).toPromise();
    }

    /**
     * Get tenant details
     * @param param the request object
     */
    public getTenant(param: TenantsApiGetTenantRequest, options?: Configuration): Promise<Tenant> {
        return this.api.getTenant(param.tenantId,  options).toPromise();
    }

}

import { ObservableWebhooksApi } from "./ObservableAPI";
import { WebhooksApiRequestFactory, WebhooksApiResponseProcessor} from "../apis/WebhooksApi";

export interface WebhooksApiDatadogWebhookRequest {
    /**
     * 
     * @type any
     * @memberof WebhooksApidatadogWebhook
     */
    body: any
}

export interface WebhooksApiJiraWebhookRequest {
    /**
     * 
     * @type any
     * @memberof WebhooksApijiraWebhook
     */
    body: any
}

export interface WebhooksApiPagerdutyWebhookRequest {
    /**
     * 
     * @type any
     * @memberof WebhooksApipagerdutyWebhook
     */
    body: any
}

export interface WebhooksApiServicenowWebhookRequest {
    /**
     * 
     * @type any
     * @memberof WebhooksApiservicenowWebhook
     */
    body: any
}

export interface WebhooksApiSlackWebhookRequest {
    /**
     * 
     * @type any
     * @memberof WebhooksApislackWebhook
     */
    body: any
}

export class ObjectWebhooksApi {
    private api: ObservableWebhooksApi

    public constructor(configuration: Configuration, requestFactory?: WebhooksApiRequestFactory, responseProcessor?: WebhooksApiResponseProcessor) {
        this.api = new ObservableWebhooksApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * Datadog webhook endpoint
     * @param param the request object
     */
    public datadogWebhookWithHttpInfo(param: WebhooksApiDatadogWebhookRequest, options?: Configuration): Promise<HttpInfo<void>> {
        return this.api.datadogWebhookWithHttpInfo(param.body,  options).toPromise();
    }

    /**
     * Datadog webhook endpoint
     * @param param the request object
     */
    public datadogWebhook(param: WebhooksApiDatadogWebhookRequest, options?: Configuration): Promise<void> {
        return this.api.datadogWebhook(param.body,  options).toPromise();
    }

    /**
     * Jira webhook endpoint
     * @param param the request object
     */
    public jiraWebhookWithHttpInfo(param: WebhooksApiJiraWebhookRequest, options?: Configuration): Promise<HttpInfo<void>> {
        return this.api.jiraWebhookWithHttpInfo(param.body,  options).toPromise();
    }

    /**
     * Jira webhook endpoint
     * @param param the request object
     */
    public jiraWebhook(param: WebhooksApiJiraWebhookRequest, options?: Configuration): Promise<void> {
        return this.api.jiraWebhook(param.body,  options).toPromise();
    }

    /**
     * PagerDuty webhook endpoint
     * @param param the request object
     */
    public pagerdutyWebhookWithHttpInfo(param: WebhooksApiPagerdutyWebhookRequest, options?: Configuration): Promise<HttpInfo<void>> {
        return this.api.pagerdutyWebhookWithHttpInfo(param.body,  options).toPromise();
    }

    /**
     * PagerDuty webhook endpoint
     * @param param the request object
     */
    public pagerdutyWebhook(param: WebhooksApiPagerdutyWebhookRequest, options?: Configuration): Promise<void> {
        return this.api.pagerdutyWebhook(param.body,  options).toPromise();
    }

    /**
     * ServiceNow webhook endpoint
     * @param param the request object
     */
    public servicenowWebhookWithHttpInfo(param: WebhooksApiServicenowWebhookRequest, options?: Configuration): Promise<HttpInfo<void>> {
        return this.api.servicenowWebhookWithHttpInfo(param.body,  options).toPromise();
    }

    /**
     * ServiceNow webhook endpoint
     * @param param the request object
     */
    public servicenowWebhook(param: WebhooksApiServicenowWebhookRequest, options?: Configuration): Promise<void> {
        return this.api.servicenowWebhook(param.body,  options).toPromise();
    }

    /**
     * Slack webhook endpoint
     * @param param the request object
     */
    public slackWebhookWithHttpInfo(param: WebhooksApiSlackWebhookRequest, options?: Configuration): Promise<HttpInfo<void>> {
        return this.api.slackWebhookWithHttpInfo(param.body,  options).toPromise();
    }

    /**
     * Slack webhook endpoint
     * @param param the request object
     */
    public slackWebhook(param: WebhooksApiSlackWebhookRequest, options?: Configuration): Promise<void> {
        return this.api.slackWebhook(param.body,  options).toPromise();
    }

}
