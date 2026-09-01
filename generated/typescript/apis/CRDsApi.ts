// TODO: better import syntax?
import {BaseAPIRequestFactory, RequiredError, COLLECTION_FORMATS} from './baseapi';
import {Configuration} from '../configuration';
import {RequestContext, HttpMethod, ResponseContext, HttpFile, HttpInfo} from '../http/http';
import {ObjectSerializer} from '../models/ObjectSerializer';
import {ApiException} from './exception';
import {canConsumeForm, isCodeInRange} from '../util';
import {SecurityAuthentication} from '../auth/auth';


import { DeliveryFlow } from '../models/DeliveryFlow';
import { DeliveryFlowCreateRequest } from '../models/DeliveryFlowCreateRequest';
import { DeliveryFlowUpdateRequest } from '../models/DeliveryFlowUpdateRequest';
import { Destination } from '../models/Destination';
import { DestinationCreateRequest } from '../models/DestinationCreateRequest';
import { DestinationUpdateRequest } from '../models/DestinationUpdateRequest';
import { GetTenant404Response } from '../models/GetTenant404Response';
import { Ingester } from '../models/Ingester';
import { IngesterCreateRequest } from '../models/IngesterCreateRequest';
import { IngesterUpdateRequest } from '../models/IngesterUpdateRequest';
import { ListDeliveryFlows200Response } from '../models/ListDeliveryFlows200Response';
import { ListDestinations200Response } from '../models/ListDestinations200Response';
import { ListIngesters200Response } from '../models/ListIngesters200Response';

/**
 * no description
 */
export class CRDsApiRequestFactory extends BaseAPIRequestFactory {

    /**
     * Create a delivery flow
     * @param tenantId 
     * @param clusterId 
     * @param deliveryFlowCreateRequest 
     */
    public async createDeliveryFlow(tenantId: string, clusterId: string, deliveryFlowCreateRequest: DeliveryFlowCreateRequest, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'tenantId' is not null or undefined
        if (tenantId === null || tenantId === undefined) {
            throw new RequiredError("CRDsApi", "createDeliveryFlow", "tenantId");
        }


        // verify required parameter 'clusterId' is not null or undefined
        if (clusterId === null || clusterId === undefined) {
            throw new RequiredError("CRDsApi", "createDeliveryFlow", "clusterId");
        }


        // verify required parameter 'deliveryFlowCreateRequest' is not null or undefined
        if (deliveryFlowCreateRequest === null || deliveryFlowCreateRequest === undefined) {
            throw new RequiredError("CRDsApi", "createDeliveryFlow", "deliveryFlowCreateRequest");
        }


        // Path Params
        const localVarPath = '/tenants/{tenant_id}/clusters/{cluster_id}/delivery-flows'
            .replace('{' + 'tenant_id' + '}', encodeURIComponent(String(tenantId)))
            .replace('{' + 'cluster_id' + '}', encodeURIComponent(String(clusterId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(deliveryFlowCreateRequest, "DeliveryFlowCreateRequest", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["tenantAuth"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Create a target (wire name: destination)
     * @param tenantId 
     * @param clusterId 
     * @param destinationCreateRequest 
     */
    public async createDestination(tenantId: string, clusterId: string, destinationCreateRequest: DestinationCreateRequest, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'tenantId' is not null or undefined
        if (tenantId === null || tenantId === undefined) {
            throw new RequiredError("CRDsApi", "createDestination", "tenantId");
        }


        // verify required parameter 'clusterId' is not null or undefined
        if (clusterId === null || clusterId === undefined) {
            throw new RequiredError("CRDsApi", "createDestination", "clusterId");
        }


        // verify required parameter 'destinationCreateRequest' is not null or undefined
        if (destinationCreateRequest === null || destinationCreateRequest === undefined) {
            throw new RequiredError("CRDsApi", "createDestination", "destinationCreateRequest");
        }


        // Path Params
        const localVarPath = '/tenants/{tenant_id}/clusters/{cluster_id}/destinations'
            .replace('{' + 'tenant_id' + '}', encodeURIComponent(String(tenantId)))
            .replace('{' + 'cluster_id' + '}', encodeURIComponent(String(clusterId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(destinationCreateRequest, "DestinationCreateRequest", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["tenantAuth"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Create an ingester
     * @param tenantId 
     * @param clusterId 
     * @param ingesterCreateRequest 
     */
    public async createIngester(tenantId: string, clusterId: string, ingesterCreateRequest: IngesterCreateRequest, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'tenantId' is not null or undefined
        if (tenantId === null || tenantId === undefined) {
            throw new RequiredError("CRDsApi", "createIngester", "tenantId");
        }


        // verify required parameter 'clusterId' is not null or undefined
        if (clusterId === null || clusterId === undefined) {
            throw new RequiredError("CRDsApi", "createIngester", "clusterId");
        }


        // verify required parameter 'ingesterCreateRequest' is not null or undefined
        if (ingesterCreateRequest === null || ingesterCreateRequest === undefined) {
            throw new RequiredError("CRDsApi", "createIngester", "ingesterCreateRequest");
        }


        // Path Params
        const localVarPath = '/tenants/{tenant_id}/clusters/{cluster_id}/ingesters'
            .replace('{' + 'tenant_id' + '}', encodeURIComponent(String(tenantId)))
            .replace('{' + 'cluster_id' + '}', encodeURIComponent(String(clusterId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.POST);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(ingesterCreateRequest, "IngesterCreateRequest", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["tenantAuth"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Delete a delivery flow
     * @param tenantId 
     * @param clusterId 
     * @param flowId 
     */
    public async deleteDeliveryFlow(tenantId: string, clusterId: string, flowId: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'tenantId' is not null or undefined
        if (tenantId === null || tenantId === undefined) {
            throw new RequiredError("CRDsApi", "deleteDeliveryFlow", "tenantId");
        }


        // verify required parameter 'clusterId' is not null or undefined
        if (clusterId === null || clusterId === undefined) {
            throw new RequiredError("CRDsApi", "deleteDeliveryFlow", "clusterId");
        }


        // verify required parameter 'flowId' is not null or undefined
        if (flowId === null || flowId === undefined) {
            throw new RequiredError("CRDsApi", "deleteDeliveryFlow", "flowId");
        }


        // Path Params
        const localVarPath = '/tenants/{tenant_id}/clusters/{cluster_id}/delivery-flows/{flow_id}'
            .replace('{' + 'tenant_id' + '}', encodeURIComponent(String(tenantId)))
            .replace('{' + 'cluster_id' + '}', encodeURIComponent(String(clusterId)))
            .replace('{' + 'flow_id' + '}', encodeURIComponent(String(flowId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.DELETE);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["tenantAuth"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Delete a target (wire name: destination)
     * @param tenantId 
     * @param clusterId 
     * @param destinationId 
     */
    public async deleteDestination(tenantId: string, clusterId: string, destinationId: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'tenantId' is not null or undefined
        if (tenantId === null || tenantId === undefined) {
            throw new RequiredError("CRDsApi", "deleteDestination", "tenantId");
        }


        // verify required parameter 'clusterId' is not null or undefined
        if (clusterId === null || clusterId === undefined) {
            throw new RequiredError("CRDsApi", "deleteDestination", "clusterId");
        }


        // verify required parameter 'destinationId' is not null or undefined
        if (destinationId === null || destinationId === undefined) {
            throw new RequiredError("CRDsApi", "deleteDestination", "destinationId");
        }


        // Path Params
        const localVarPath = '/tenants/{tenant_id}/clusters/{cluster_id}/destinations/{destination_id}'
            .replace('{' + 'tenant_id' + '}', encodeURIComponent(String(tenantId)))
            .replace('{' + 'cluster_id' + '}', encodeURIComponent(String(clusterId)))
            .replace('{' + 'destination_id' + '}', encodeURIComponent(String(destinationId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.DELETE);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["tenantAuth"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Delete an ingester
     * @param tenantId 
     * @param clusterId 
     * @param ingesterId 
     */
    public async deleteIngester(tenantId: string, clusterId: string, ingesterId: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'tenantId' is not null or undefined
        if (tenantId === null || tenantId === undefined) {
            throw new RequiredError("CRDsApi", "deleteIngester", "tenantId");
        }


        // verify required parameter 'clusterId' is not null or undefined
        if (clusterId === null || clusterId === undefined) {
            throw new RequiredError("CRDsApi", "deleteIngester", "clusterId");
        }


        // verify required parameter 'ingesterId' is not null or undefined
        if (ingesterId === null || ingesterId === undefined) {
            throw new RequiredError("CRDsApi", "deleteIngester", "ingesterId");
        }


        // Path Params
        const localVarPath = '/tenants/{tenant_id}/clusters/{cluster_id}/ingesters/{ingester_id}'
            .replace('{' + 'tenant_id' + '}', encodeURIComponent(String(tenantId)))
            .replace('{' + 'cluster_id' + '}', encodeURIComponent(String(clusterId)))
            .replace('{' + 'ingester_id' + '}', encodeURIComponent(String(ingesterId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.DELETE);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["tenantAuth"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Get delivery flow details
     * @param tenantId 
     * @param clusterId 
     * @param flowId 
     */
    public async getDeliveryFlow(tenantId: string, clusterId: string, flowId: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'tenantId' is not null or undefined
        if (tenantId === null || tenantId === undefined) {
            throw new RequiredError("CRDsApi", "getDeliveryFlow", "tenantId");
        }


        // verify required parameter 'clusterId' is not null or undefined
        if (clusterId === null || clusterId === undefined) {
            throw new RequiredError("CRDsApi", "getDeliveryFlow", "clusterId");
        }


        // verify required parameter 'flowId' is not null or undefined
        if (flowId === null || flowId === undefined) {
            throw new RequiredError("CRDsApi", "getDeliveryFlow", "flowId");
        }


        // Path Params
        const localVarPath = '/tenants/{tenant_id}/clusters/{cluster_id}/delivery-flows/{flow_id}'
            .replace('{' + 'tenant_id' + '}', encodeURIComponent(String(tenantId)))
            .replace('{' + 'cluster_id' + '}', encodeURIComponent(String(clusterId)))
            .replace('{' + 'flow_id' + '}', encodeURIComponent(String(flowId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["tenantAuth"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Get target details (wire name: destination)
     * @param tenantId 
     * @param clusterId 
     * @param destinationId 
     */
    public async getDestination(tenantId: string, clusterId: string, destinationId: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'tenantId' is not null or undefined
        if (tenantId === null || tenantId === undefined) {
            throw new RequiredError("CRDsApi", "getDestination", "tenantId");
        }


        // verify required parameter 'clusterId' is not null or undefined
        if (clusterId === null || clusterId === undefined) {
            throw new RequiredError("CRDsApi", "getDestination", "clusterId");
        }


        // verify required parameter 'destinationId' is not null or undefined
        if (destinationId === null || destinationId === undefined) {
            throw new RequiredError("CRDsApi", "getDestination", "destinationId");
        }


        // Path Params
        const localVarPath = '/tenants/{tenant_id}/clusters/{cluster_id}/destinations/{destination_id}'
            .replace('{' + 'tenant_id' + '}', encodeURIComponent(String(tenantId)))
            .replace('{' + 'cluster_id' + '}', encodeURIComponent(String(clusterId)))
            .replace('{' + 'destination_id' + '}', encodeURIComponent(String(destinationId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["tenantAuth"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Get ingester details
     * @param tenantId 
     * @param clusterId 
     * @param ingesterId 
     */
    public async getIngester(tenantId: string, clusterId: string, ingesterId: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'tenantId' is not null or undefined
        if (tenantId === null || tenantId === undefined) {
            throw new RequiredError("CRDsApi", "getIngester", "tenantId");
        }


        // verify required parameter 'clusterId' is not null or undefined
        if (clusterId === null || clusterId === undefined) {
            throw new RequiredError("CRDsApi", "getIngester", "clusterId");
        }


        // verify required parameter 'ingesterId' is not null or undefined
        if (ingesterId === null || ingesterId === undefined) {
            throw new RequiredError("CRDsApi", "getIngester", "ingesterId");
        }


        // Path Params
        const localVarPath = '/tenants/{tenant_id}/clusters/{cluster_id}/ingesters/{ingester_id}'
            .replace('{' + 'tenant_id' + '}', encodeURIComponent(String(tenantId)))
            .replace('{' + 'cluster_id' + '}', encodeURIComponent(String(clusterId)))
            .replace('{' + 'ingester_id' + '}', encodeURIComponent(String(ingesterId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["tenantAuth"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * List delivery flows for plane (wire name: cluster)
     * @param tenantId 
     * @param clusterId 
     */
    public async listDeliveryFlows(tenantId: string, clusterId: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'tenantId' is not null or undefined
        if (tenantId === null || tenantId === undefined) {
            throw new RequiredError("CRDsApi", "listDeliveryFlows", "tenantId");
        }


        // verify required parameter 'clusterId' is not null or undefined
        if (clusterId === null || clusterId === undefined) {
            throw new RequiredError("CRDsApi", "listDeliveryFlows", "clusterId");
        }


        // Path Params
        const localVarPath = '/tenants/{tenant_id}/clusters/{cluster_id}/delivery-flows'
            .replace('{' + 'tenant_id' + '}', encodeURIComponent(String(tenantId)))
            .replace('{' + 'cluster_id' + '}', encodeURIComponent(String(clusterId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["tenantAuth"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * List targets (wire name: destinations) for plane
     * @param tenantId 
     * @param clusterId 
     */
    public async listDestinations(tenantId: string, clusterId: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'tenantId' is not null or undefined
        if (tenantId === null || tenantId === undefined) {
            throw new RequiredError("CRDsApi", "listDestinations", "tenantId");
        }


        // verify required parameter 'clusterId' is not null or undefined
        if (clusterId === null || clusterId === undefined) {
            throw new RequiredError("CRDsApi", "listDestinations", "clusterId");
        }


        // Path Params
        const localVarPath = '/tenants/{tenant_id}/clusters/{cluster_id}/destinations'
            .replace('{' + 'tenant_id' + '}', encodeURIComponent(String(tenantId)))
            .replace('{' + 'cluster_id' + '}', encodeURIComponent(String(clusterId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["tenantAuth"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * List ingesters for plane (wire name: cluster)
     * @param tenantId 
     * @param clusterId 
     */
    public async listIngesters(tenantId: string, clusterId: string, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'tenantId' is not null or undefined
        if (tenantId === null || tenantId === undefined) {
            throw new RequiredError("CRDsApi", "listIngesters", "tenantId");
        }


        // verify required parameter 'clusterId' is not null or undefined
        if (clusterId === null || clusterId === undefined) {
            throw new RequiredError("CRDsApi", "listIngesters", "clusterId");
        }


        // Path Params
        const localVarPath = '/tenants/{tenant_id}/clusters/{cluster_id}/ingesters'
            .replace('{' + 'tenant_id' + '}', encodeURIComponent(String(tenantId)))
            .replace('{' + 'cluster_id' + '}', encodeURIComponent(String(clusterId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.GET);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["tenantAuth"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Update a delivery flow
     * @param tenantId 
     * @param clusterId 
     * @param flowId 
     * @param deliveryFlowUpdateRequest 
     */
    public async updateDeliveryFlow(tenantId: string, clusterId: string, flowId: string, deliveryFlowUpdateRequest: DeliveryFlowUpdateRequest, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'tenantId' is not null or undefined
        if (tenantId === null || tenantId === undefined) {
            throw new RequiredError("CRDsApi", "updateDeliveryFlow", "tenantId");
        }


        // verify required parameter 'clusterId' is not null or undefined
        if (clusterId === null || clusterId === undefined) {
            throw new RequiredError("CRDsApi", "updateDeliveryFlow", "clusterId");
        }


        // verify required parameter 'flowId' is not null or undefined
        if (flowId === null || flowId === undefined) {
            throw new RequiredError("CRDsApi", "updateDeliveryFlow", "flowId");
        }


        // verify required parameter 'deliveryFlowUpdateRequest' is not null or undefined
        if (deliveryFlowUpdateRequest === null || deliveryFlowUpdateRequest === undefined) {
            throw new RequiredError("CRDsApi", "updateDeliveryFlow", "deliveryFlowUpdateRequest");
        }


        // Path Params
        const localVarPath = '/tenants/{tenant_id}/clusters/{cluster_id}/delivery-flows/{flow_id}'
            .replace('{' + 'tenant_id' + '}', encodeURIComponent(String(tenantId)))
            .replace('{' + 'cluster_id' + '}', encodeURIComponent(String(clusterId)))
            .replace('{' + 'flow_id' + '}', encodeURIComponent(String(flowId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PUT);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(deliveryFlowUpdateRequest, "DeliveryFlowUpdateRequest", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["tenantAuth"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Update a target (wire name: destination)
     * @param tenantId 
     * @param clusterId 
     * @param destinationId 
     * @param destinationUpdateRequest 
     */
    public async updateDestination(tenantId: string, clusterId: string, destinationId: string, destinationUpdateRequest: DestinationUpdateRequest, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'tenantId' is not null or undefined
        if (tenantId === null || tenantId === undefined) {
            throw new RequiredError("CRDsApi", "updateDestination", "tenantId");
        }


        // verify required parameter 'clusterId' is not null or undefined
        if (clusterId === null || clusterId === undefined) {
            throw new RequiredError("CRDsApi", "updateDestination", "clusterId");
        }


        // verify required parameter 'destinationId' is not null or undefined
        if (destinationId === null || destinationId === undefined) {
            throw new RequiredError("CRDsApi", "updateDestination", "destinationId");
        }


        // verify required parameter 'destinationUpdateRequest' is not null or undefined
        if (destinationUpdateRequest === null || destinationUpdateRequest === undefined) {
            throw new RequiredError("CRDsApi", "updateDestination", "destinationUpdateRequest");
        }


        // Path Params
        const localVarPath = '/tenants/{tenant_id}/clusters/{cluster_id}/destinations/{destination_id}'
            .replace('{' + 'tenant_id' + '}', encodeURIComponent(String(tenantId)))
            .replace('{' + 'cluster_id' + '}', encodeURIComponent(String(clusterId)))
            .replace('{' + 'destination_id' + '}', encodeURIComponent(String(destinationId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PUT);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(destinationUpdateRequest, "DestinationUpdateRequest", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["tenantAuth"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

    /**
     * Update an ingester
     * @param tenantId 
     * @param clusterId 
     * @param ingesterId 
     * @param ingesterUpdateRequest 
     */
    public async updateIngester(tenantId: string, clusterId: string, ingesterId: string, ingesterUpdateRequest: IngesterUpdateRequest, _options?: Configuration): Promise<RequestContext> {
        let _config = _options || this.configuration;

        // verify required parameter 'tenantId' is not null or undefined
        if (tenantId === null || tenantId === undefined) {
            throw new RequiredError("CRDsApi", "updateIngester", "tenantId");
        }


        // verify required parameter 'clusterId' is not null or undefined
        if (clusterId === null || clusterId === undefined) {
            throw new RequiredError("CRDsApi", "updateIngester", "clusterId");
        }


        // verify required parameter 'ingesterId' is not null or undefined
        if (ingesterId === null || ingesterId === undefined) {
            throw new RequiredError("CRDsApi", "updateIngester", "ingesterId");
        }


        // verify required parameter 'ingesterUpdateRequest' is not null or undefined
        if (ingesterUpdateRequest === null || ingesterUpdateRequest === undefined) {
            throw new RequiredError("CRDsApi", "updateIngester", "ingesterUpdateRequest");
        }


        // Path Params
        const localVarPath = '/tenants/{tenant_id}/clusters/{cluster_id}/ingesters/{ingester_id}'
            .replace('{' + 'tenant_id' + '}', encodeURIComponent(String(tenantId)))
            .replace('{' + 'cluster_id' + '}', encodeURIComponent(String(clusterId)))
            .replace('{' + 'ingester_id' + '}', encodeURIComponent(String(ingesterId)));

        // Make Request Context
        const requestContext = _config.baseServer.makeRequestContext(localVarPath, HttpMethod.PUT);
        requestContext.setHeaderParam("Accept", "application/json, */*;q=0.8")


        // Body Params
        const contentType = ObjectSerializer.getPreferredMediaType([
            "application/json"
        ]);
        requestContext.setHeaderParam("Content-Type", contentType);
        const serializedBody = ObjectSerializer.stringify(
            ObjectSerializer.serialize(ingesterUpdateRequest, "IngesterUpdateRequest", ""),
            contentType
        );
        requestContext.setBody(serializedBody);

        let authMethod: SecurityAuthentication | undefined;
        // Apply auth methods
        authMethod = _config.authMethods["tenantAuth"]
        if (authMethod?.applySecurityAuthentication) {
            await authMethod?.applySecurityAuthentication(requestContext);
        }
        
        const defaultAuth: SecurityAuthentication | undefined = _options?.authMethods?.default || this.configuration?.authMethods?.default
        if (defaultAuth?.applySecurityAuthentication) {
            await defaultAuth?.applySecurityAuthentication(requestContext);
        }

        return requestContext;
    }

}

export class CRDsApiResponseProcessor {

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to createDeliveryFlow
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async createDeliveryFlowWithHttpInfo(response: ResponseContext): Promise<HttpInfo<DeliveryFlow >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: DeliveryFlow = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DeliveryFlow", ""
            ) as DeliveryFlow;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: DeliveryFlow = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DeliveryFlow", ""
            ) as DeliveryFlow;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to createDestination
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async createDestinationWithHttpInfo(response: ResponseContext): Promise<HttpInfo<Destination >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: Destination = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Destination", ""
            ) as Destination;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: Destination = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Destination", ""
            ) as Destination;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to createIngester
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async createIngesterWithHttpInfo(response: ResponseContext): Promise<HttpInfo<Ingester >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("201", response.httpStatusCode)) {
            const body: Ingester = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Ingester", ""
            ) as Ingester;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: Ingester = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Ingester", ""
            ) as Ingester;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to deleteDeliveryFlow
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async deleteDeliveryFlowWithHttpInfo(response: ResponseContext): Promise<HttpInfo<void >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("204", response.httpStatusCode)) {
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, undefined);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: GetTenant404Response = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "GetTenant404Response", ""
            ) as GetTenant404Response;
            throw new ApiException<GetTenant404Response>(response.httpStatusCode, "Resource not found", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: void = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "void", ""
            ) as void;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to deleteDestination
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async deleteDestinationWithHttpInfo(response: ResponseContext): Promise<HttpInfo<void >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("204", response.httpStatusCode)) {
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, undefined);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: GetTenant404Response = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "GetTenant404Response", ""
            ) as GetTenant404Response;
            throw new ApiException<GetTenant404Response>(response.httpStatusCode, "Resource not found", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: void = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "void", ""
            ) as void;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to deleteIngester
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async deleteIngesterWithHttpInfo(response: ResponseContext): Promise<HttpInfo<void >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("204", response.httpStatusCode)) {
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, undefined);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: GetTenant404Response = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "GetTenant404Response", ""
            ) as GetTenant404Response;
            throw new ApiException<GetTenant404Response>(response.httpStatusCode, "Resource not found", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: void = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "void", ""
            ) as void;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getDeliveryFlow
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async getDeliveryFlowWithHttpInfo(response: ResponseContext): Promise<HttpInfo<DeliveryFlow >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: DeliveryFlow = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DeliveryFlow", ""
            ) as DeliveryFlow;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: GetTenant404Response = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "GetTenant404Response", ""
            ) as GetTenant404Response;
            throw new ApiException<GetTenant404Response>(response.httpStatusCode, "Resource not found", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: DeliveryFlow = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DeliveryFlow", ""
            ) as DeliveryFlow;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getDestination
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async getDestinationWithHttpInfo(response: ResponseContext): Promise<HttpInfo<Destination >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: Destination = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Destination", ""
            ) as Destination;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: GetTenant404Response = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "GetTenant404Response", ""
            ) as GetTenant404Response;
            throw new ApiException<GetTenant404Response>(response.httpStatusCode, "Resource not found", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: Destination = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Destination", ""
            ) as Destination;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to getIngester
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async getIngesterWithHttpInfo(response: ResponseContext): Promise<HttpInfo<Ingester >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: Ingester = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Ingester", ""
            ) as Ingester;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: GetTenant404Response = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "GetTenant404Response", ""
            ) as GetTenant404Response;
            throw new ApiException<GetTenant404Response>(response.httpStatusCode, "Resource not found", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: Ingester = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Ingester", ""
            ) as Ingester;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to listDeliveryFlows
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async listDeliveryFlowsWithHttpInfo(response: ResponseContext): Promise<HttpInfo<ListDeliveryFlows200Response >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ListDeliveryFlows200Response = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ListDeliveryFlows200Response", ""
            ) as ListDeliveryFlows200Response;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ListDeliveryFlows200Response = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ListDeliveryFlows200Response", ""
            ) as ListDeliveryFlows200Response;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to listDestinations
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async listDestinationsWithHttpInfo(response: ResponseContext): Promise<HttpInfo<ListDestinations200Response >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ListDestinations200Response = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ListDestinations200Response", ""
            ) as ListDestinations200Response;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ListDestinations200Response = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ListDestinations200Response", ""
            ) as ListDestinations200Response;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to listIngesters
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async listIngestersWithHttpInfo(response: ResponseContext): Promise<HttpInfo<ListIngesters200Response >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: ListIngesters200Response = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ListIngesters200Response", ""
            ) as ListIngesters200Response;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: ListIngesters200Response = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "ListIngesters200Response", ""
            ) as ListIngesters200Response;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to updateDeliveryFlow
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async updateDeliveryFlowWithHttpInfo(response: ResponseContext): Promise<HttpInfo<DeliveryFlow >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: DeliveryFlow = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DeliveryFlow", ""
            ) as DeliveryFlow;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: GetTenant404Response = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "GetTenant404Response", ""
            ) as GetTenant404Response;
            throw new ApiException<GetTenant404Response>(response.httpStatusCode, "Resource not found", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: DeliveryFlow = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "DeliveryFlow", ""
            ) as DeliveryFlow;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to updateDestination
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async updateDestinationWithHttpInfo(response: ResponseContext): Promise<HttpInfo<Destination >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: Destination = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Destination", ""
            ) as Destination;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: GetTenant404Response = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "GetTenant404Response", ""
            ) as GetTenant404Response;
            throw new ApiException<GetTenant404Response>(response.httpStatusCode, "Resource not found", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: Destination = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Destination", ""
            ) as Destination;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

    /**
     * Unwraps the actual response sent by the server from the response context and deserializes the response content
     * to the expected objects
     *
     * @params response Response returned by the server for a request to updateIngester
     * @throws ApiException if the response code was not in [200, 299]
     */
     public async updateIngesterWithHttpInfo(response: ResponseContext): Promise<HttpInfo<Ingester >> {
        const contentType = ObjectSerializer.normalizeMediaType(response.headers["content-type"]);
        if (isCodeInRange("200", response.httpStatusCode)) {
            const body: Ingester = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Ingester", ""
            ) as Ingester;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }
        if (isCodeInRange("404", response.httpStatusCode)) {
            const body: GetTenant404Response = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "GetTenant404Response", ""
            ) as GetTenant404Response;
            throw new ApiException<GetTenant404Response>(response.httpStatusCode, "Resource not found", body, response.headers);
        }

        // Work around for missing responses in specification, e.g. for petstore.yaml
        if (response.httpStatusCode >= 200 && response.httpStatusCode <= 299) {
            const body: Ingester = ObjectSerializer.deserialize(
                ObjectSerializer.parse(await response.body.text(), contentType),
                "Ingester", ""
            ) as Ingester;
            return new HttpInfo(response.httpStatusCode, response.headers, response.body, body);
        }

        throw new ApiException<string | Blob | undefined>(response.httpStatusCode, "Unknown API Status Code!", await response.getBodyAsAny(), response.headers);
    }

}
