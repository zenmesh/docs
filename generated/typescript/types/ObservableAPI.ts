import { ResponseContext, RequestContext, HttpFile, HttpInfo } from '../http/http';
import { Configuration} from '../configuration'
import { Observable, of, from } from '../rxjsStub';
import {mergeMap, map} from  '../rxjsStub';
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

import { CRDsApiRequestFactory, CRDsApiResponseProcessor} from "../apis/CRDsApi";
export class ObservableCRDsApi {
    private requestFactory: CRDsApiRequestFactory;
    private responseProcessor: CRDsApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: CRDsApiRequestFactory,
        responseProcessor?: CRDsApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new CRDsApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new CRDsApiResponseProcessor();
    }

    /**
     * Create a delivery flow
     * @param tenantId 
     * @param clusterId 
     * @param deliveryFlowCreateRequest 
     */
    public createDeliveryFlowWithHttpInfo(tenantId: string, clusterId: string, deliveryFlowCreateRequest: DeliveryFlowCreateRequest, _options?: Configuration): Observable<HttpInfo<DeliveryFlow>> {
        const requestContextPromise = this.requestFactory.createDeliveryFlow(tenantId, clusterId, deliveryFlowCreateRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.createDeliveryFlowWithHttpInfo(rsp)));
            }));
    }

    /**
     * Create a delivery flow
     * @param tenantId 
     * @param clusterId 
     * @param deliveryFlowCreateRequest 
     */
    public createDeliveryFlow(tenantId: string, clusterId: string, deliveryFlowCreateRequest: DeliveryFlowCreateRequest, _options?: Configuration): Observable<DeliveryFlow> {
        return this.createDeliveryFlowWithHttpInfo(tenantId, clusterId, deliveryFlowCreateRequest, _options).pipe(map((apiResponse: HttpInfo<DeliveryFlow>) => apiResponse.data));
    }

    /**
     * Create a target (wire name: destination)
     * @param tenantId 
     * @param clusterId 
     * @param destinationCreateRequest 
     */
    public createDestinationWithHttpInfo(tenantId: string, clusterId: string, destinationCreateRequest: DestinationCreateRequest, _options?: Configuration): Observable<HttpInfo<Destination>> {
        const requestContextPromise = this.requestFactory.createDestination(tenantId, clusterId, destinationCreateRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.createDestinationWithHttpInfo(rsp)));
            }));
    }

    /**
     * Create a target (wire name: destination)
     * @param tenantId 
     * @param clusterId 
     * @param destinationCreateRequest 
     */
    public createDestination(tenantId: string, clusterId: string, destinationCreateRequest: DestinationCreateRequest, _options?: Configuration): Observable<Destination> {
        return this.createDestinationWithHttpInfo(tenantId, clusterId, destinationCreateRequest, _options).pipe(map((apiResponse: HttpInfo<Destination>) => apiResponse.data));
    }

    /**
     * Create an ingester
     * @param tenantId 
     * @param clusterId 
     * @param ingesterCreateRequest 
     */
    public createIngesterWithHttpInfo(tenantId: string, clusterId: string, ingesterCreateRequest: IngesterCreateRequest, _options?: Configuration): Observable<HttpInfo<Ingester>> {
        const requestContextPromise = this.requestFactory.createIngester(tenantId, clusterId, ingesterCreateRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.createIngesterWithHttpInfo(rsp)));
            }));
    }

    /**
     * Create an ingester
     * @param tenantId 
     * @param clusterId 
     * @param ingesterCreateRequest 
     */
    public createIngester(tenantId: string, clusterId: string, ingesterCreateRequest: IngesterCreateRequest, _options?: Configuration): Observable<Ingester> {
        return this.createIngesterWithHttpInfo(tenantId, clusterId, ingesterCreateRequest, _options).pipe(map((apiResponse: HttpInfo<Ingester>) => apiResponse.data));
    }

    /**
     * Delete a delivery flow
     * @param tenantId 
     * @param clusterId 
     * @param flowId 
     */
    public deleteDeliveryFlowWithHttpInfo(tenantId: string, clusterId: string, flowId: string, _options?: Configuration): Observable<HttpInfo<void>> {
        const requestContextPromise = this.requestFactory.deleteDeliveryFlow(tenantId, clusterId, flowId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.deleteDeliveryFlowWithHttpInfo(rsp)));
            }));
    }

    /**
     * Delete a delivery flow
     * @param tenantId 
     * @param clusterId 
     * @param flowId 
     */
    public deleteDeliveryFlow(tenantId: string, clusterId: string, flowId: string, _options?: Configuration): Observable<void> {
        return this.deleteDeliveryFlowWithHttpInfo(tenantId, clusterId, flowId, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * Delete a target (wire name: destination)
     * @param tenantId 
     * @param clusterId 
     * @param destinationId 
     */
    public deleteDestinationWithHttpInfo(tenantId: string, clusterId: string, destinationId: string, _options?: Configuration): Observable<HttpInfo<void>> {
        const requestContextPromise = this.requestFactory.deleteDestination(tenantId, clusterId, destinationId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.deleteDestinationWithHttpInfo(rsp)));
            }));
    }

    /**
     * Delete a target (wire name: destination)
     * @param tenantId 
     * @param clusterId 
     * @param destinationId 
     */
    public deleteDestination(tenantId: string, clusterId: string, destinationId: string, _options?: Configuration): Observable<void> {
        return this.deleteDestinationWithHttpInfo(tenantId, clusterId, destinationId, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * Delete an ingester
     * @param tenantId 
     * @param clusterId 
     * @param ingesterId 
     */
    public deleteIngesterWithHttpInfo(tenantId: string, clusterId: string, ingesterId: string, _options?: Configuration): Observable<HttpInfo<void>> {
        const requestContextPromise = this.requestFactory.deleteIngester(tenantId, clusterId, ingesterId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.deleteIngesterWithHttpInfo(rsp)));
            }));
    }

    /**
     * Delete an ingester
     * @param tenantId 
     * @param clusterId 
     * @param ingesterId 
     */
    public deleteIngester(tenantId: string, clusterId: string, ingesterId: string, _options?: Configuration): Observable<void> {
        return this.deleteIngesterWithHttpInfo(tenantId, clusterId, ingesterId, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * Get delivery flow details
     * @param tenantId 
     * @param clusterId 
     * @param flowId 
     */
    public getDeliveryFlowWithHttpInfo(tenantId: string, clusterId: string, flowId: string, _options?: Configuration): Observable<HttpInfo<DeliveryFlow>> {
        const requestContextPromise = this.requestFactory.getDeliveryFlow(tenantId, clusterId, flowId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getDeliveryFlowWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get delivery flow details
     * @param tenantId 
     * @param clusterId 
     * @param flowId 
     */
    public getDeliveryFlow(tenantId: string, clusterId: string, flowId: string, _options?: Configuration): Observable<DeliveryFlow> {
        return this.getDeliveryFlowWithHttpInfo(tenantId, clusterId, flowId, _options).pipe(map((apiResponse: HttpInfo<DeliveryFlow>) => apiResponse.data));
    }

    /**
     * Get target details (wire name: destination)
     * @param tenantId 
     * @param clusterId 
     * @param destinationId 
     */
    public getDestinationWithHttpInfo(tenantId: string, clusterId: string, destinationId: string, _options?: Configuration): Observable<HttpInfo<Destination>> {
        const requestContextPromise = this.requestFactory.getDestination(tenantId, clusterId, destinationId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getDestinationWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get target details (wire name: destination)
     * @param tenantId 
     * @param clusterId 
     * @param destinationId 
     */
    public getDestination(tenantId: string, clusterId: string, destinationId: string, _options?: Configuration): Observable<Destination> {
        return this.getDestinationWithHttpInfo(tenantId, clusterId, destinationId, _options).pipe(map((apiResponse: HttpInfo<Destination>) => apiResponse.data));
    }

    /**
     * Get ingester details
     * @param tenantId 
     * @param clusterId 
     * @param ingesterId 
     */
    public getIngesterWithHttpInfo(tenantId: string, clusterId: string, ingesterId: string, _options?: Configuration): Observable<HttpInfo<Ingester>> {
        const requestContextPromise = this.requestFactory.getIngester(tenantId, clusterId, ingesterId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getIngesterWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get ingester details
     * @param tenantId 
     * @param clusterId 
     * @param ingesterId 
     */
    public getIngester(tenantId: string, clusterId: string, ingesterId: string, _options?: Configuration): Observable<Ingester> {
        return this.getIngesterWithHttpInfo(tenantId, clusterId, ingesterId, _options).pipe(map((apiResponse: HttpInfo<Ingester>) => apiResponse.data));
    }

    /**
     * List delivery flows for plane (wire name: cluster)
     * @param tenantId 
     * @param clusterId 
     */
    public listDeliveryFlowsWithHttpInfo(tenantId: string, clusterId: string, _options?: Configuration): Observable<HttpInfo<ListDeliveryFlows200Response>> {
        const requestContextPromise = this.requestFactory.listDeliveryFlows(tenantId, clusterId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.listDeliveryFlowsWithHttpInfo(rsp)));
            }));
    }

    /**
     * List delivery flows for plane (wire name: cluster)
     * @param tenantId 
     * @param clusterId 
     */
    public listDeliveryFlows(tenantId: string, clusterId: string, _options?: Configuration): Observable<ListDeliveryFlows200Response> {
        return this.listDeliveryFlowsWithHttpInfo(tenantId, clusterId, _options).pipe(map((apiResponse: HttpInfo<ListDeliveryFlows200Response>) => apiResponse.data));
    }

    /**
     * List targets (wire name: destinations) for plane
     * @param tenantId 
     * @param clusterId 
     */
    public listDestinationsWithHttpInfo(tenantId: string, clusterId: string, _options?: Configuration): Observable<HttpInfo<ListDestinations200Response>> {
        const requestContextPromise = this.requestFactory.listDestinations(tenantId, clusterId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.listDestinationsWithHttpInfo(rsp)));
            }));
    }

    /**
     * List targets (wire name: destinations) for plane
     * @param tenantId 
     * @param clusterId 
     */
    public listDestinations(tenantId: string, clusterId: string, _options?: Configuration): Observable<ListDestinations200Response> {
        return this.listDestinationsWithHttpInfo(tenantId, clusterId, _options).pipe(map((apiResponse: HttpInfo<ListDestinations200Response>) => apiResponse.data));
    }

    /**
     * List ingesters for plane (wire name: cluster)
     * @param tenantId 
     * @param clusterId 
     */
    public listIngestersWithHttpInfo(tenantId: string, clusterId: string, _options?: Configuration): Observable<HttpInfo<ListIngesters200Response>> {
        const requestContextPromise = this.requestFactory.listIngesters(tenantId, clusterId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.listIngestersWithHttpInfo(rsp)));
            }));
    }

    /**
     * List ingesters for plane (wire name: cluster)
     * @param tenantId 
     * @param clusterId 
     */
    public listIngesters(tenantId: string, clusterId: string, _options?: Configuration): Observable<ListIngesters200Response> {
        return this.listIngestersWithHttpInfo(tenantId, clusterId, _options).pipe(map((apiResponse: HttpInfo<ListIngesters200Response>) => apiResponse.data));
    }

    /**
     * Update a delivery flow
     * @param tenantId 
     * @param clusterId 
     * @param flowId 
     * @param deliveryFlowUpdateRequest 
     */
    public updateDeliveryFlowWithHttpInfo(tenantId: string, clusterId: string, flowId: string, deliveryFlowUpdateRequest: DeliveryFlowUpdateRequest, _options?: Configuration): Observable<HttpInfo<DeliveryFlow>> {
        const requestContextPromise = this.requestFactory.updateDeliveryFlow(tenantId, clusterId, flowId, deliveryFlowUpdateRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.updateDeliveryFlowWithHttpInfo(rsp)));
            }));
    }

    /**
     * Update a delivery flow
     * @param tenantId 
     * @param clusterId 
     * @param flowId 
     * @param deliveryFlowUpdateRequest 
     */
    public updateDeliveryFlow(tenantId: string, clusterId: string, flowId: string, deliveryFlowUpdateRequest: DeliveryFlowUpdateRequest, _options?: Configuration): Observable<DeliveryFlow> {
        return this.updateDeliveryFlowWithHttpInfo(tenantId, clusterId, flowId, deliveryFlowUpdateRequest, _options).pipe(map((apiResponse: HttpInfo<DeliveryFlow>) => apiResponse.data));
    }

    /**
     * Update a target (wire name: destination)
     * @param tenantId 
     * @param clusterId 
     * @param destinationId 
     * @param destinationUpdateRequest 
     */
    public updateDestinationWithHttpInfo(tenantId: string, clusterId: string, destinationId: string, destinationUpdateRequest: DestinationUpdateRequest, _options?: Configuration): Observable<HttpInfo<Destination>> {
        const requestContextPromise = this.requestFactory.updateDestination(tenantId, clusterId, destinationId, destinationUpdateRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.updateDestinationWithHttpInfo(rsp)));
            }));
    }

    /**
     * Update a target (wire name: destination)
     * @param tenantId 
     * @param clusterId 
     * @param destinationId 
     * @param destinationUpdateRequest 
     */
    public updateDestination(tenantId: string, clusterId: string, destinationId: string, destinationUpdateRequest: DestinationUpdateRequest, _options?: Configuration): Observable<Destination> {
        return this.updateDestinationWithHttpInfo(tenantId, clusterId, destinationId, destinationUpdateRequest, _options).pipe(map((apiResponse: HttpInfo<Destination>) => apiResponse.data));
    }

    /**
     * Update an ingester
     * @param tenantId 
     * @param clusterId 
     * @param ingesterId 
     * @param ingesterUpdateRequest 
     */
    public updateIngesterWithHttpInfo(tenantId: string, clusterId: string, ingesterId: string, ingesterUpdateRequest: IngesterUpdateRequest, _options?: Configuration): Observable<HttpInfo<Ingester>> {
        const requestContextPromise = this.requestFactory.updateIngester(tenantId, clusterId, ingesterId, ingesterUpdateRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.updateIngesterWithHttpInfo(rsp)));
            }));
    }

    /**
     * Update an ingester
     * @param tenantId 
     * @param clusterId 
     * @param ingesterId 
     * @param ingesterUpdateRequest 
     */
    public updateIngester(tenantId: string, clusterId: string, ingesterId: string, ingesterUpdateRequest: IngesterUpdateRequest, _options?: Configuration): Observable<Ingester> {
        return this.updateIngesterWithHttpInfo(tenantId, clusterId, ingesterId, ingesterUpdateRequest, _options).pipe(map((apiResponse: HttpInfo<Ingester>) => apiResponse.data));
    }

}

import { ClustersApiRequestFactory, ClustersApiResponseProcessor} from "../apis/ClustersApi";
export class ObservableClustersApi {
    private requestFactory: ClustersApiRequestFactory;
    private responseProcessor: ClustersApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: ClustersApiRequestFactory,
        responseProcessor?: ClustersApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new ClustersApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new ClustersApiResponseProcessor();
    }

    /**
     * Get tenant planes
     * @param tenantId 
     * @param clusterCreateRequest 
     */
    public createClusterWithHttpInfo(tenantId: string, clusterCreateRequest: ClusterCreateRequest, _options?: Configuration): Observable<HttpInfo<Cluster>> {
        const requestContextPromise = this.requestFactory.createCluster(tenantId, clusterCreateRequest, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.createClusterWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get tenant planes
     * @param tenantId 
     * @param clusterCreateRequest 
     */
    public createCluster(tenantId: string, clusterCreateRequest: ClusterCreateRequest, _options?: Configuration): Observable<Cluster> {
        return this.createClusterWithHttpInfo(tenantId, clusterCreateRequest, _options).pipe(map((apiResponse: HttpInfo<Cluster>) => apiResponse.data));
    }

    /**
     * Get plane details
     * @param tenantId 
     * @param clusterId The cluster (plane) ID.
     */
    public getClusterWithHttpInfo(tenantId: string, clusterId: string, _options?: Configuration): Observable<HttpInfo<Cluster>> {
        const requestContextPromise = this.requestFactory.getCluster(tenantId, clusterId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getClusterWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get plane details
     * @param tenantId 
     * @param clusterId The cluster (plane) ID.
     */
    public getCluster(tenantId: string, clusterId: string, _options?: Configuration): Observable<Cluster> {
        return this.getClusterWithHttpInfo(tenantId, clusterId, _options).pipe(map((apiResponse: HttpInfo<Cluster>) => apiResponse.data));
    }

    /**
     * Get tenant planes
     * @param tenantId 
     */
    public listClustersWithHttpInfo(tenantId: string, _options?: Configuration): Observable<HttpInfo<ListClusters200Response>> {
        const requestContextPromise = this.requestFactory.listClusters(tenantId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.listClustersWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get tenant planes
     * @param tenantId 
     */
    public listClusters(tenantId: string, _options?: Configuration): Observable<ListClusters200Response> {
        return this.listClustersWithHttpInfo(tenantId, _options).pipe(map((apiResponse: HttpInfo<ListClusters200Response>) => apiResponse.data));
    }

}

import { HealthApiRequestFactory, HealthApiResponseProcessor} from "../apis/HealthApi";
export class ObservableHealthApi {
    private requestFactory: HealthApiRequestFactory;
    private responseProcessor: HealthApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: HealthApiRequestFactory,
        responseProcessor?: HealthApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new HealthApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new HealthApiResponseProcessor();
    }

    /**
     * Health check
     */
    public healthCheckWithHttpInfo(_options?: Configuration): Observable<HttpInfo<HealthCheck200Response>> {
        const requestContextPromise = this.requestFactory.healthCheck(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.healthCheckWithHttpInfo(rsp)));
            }));
    }

    /**
     * Health check
     */
    public healthCheck(_options?: Configuration): Observable<HealthCheck200Response> {
        return this.healthCheckWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<HealthCheck200Response>) => apiResponse.data));
    }

    /**
     * Readiness check
     */
    public readinessCheckWithHttpInfo(_options?: Configuration): Observable<HttpInfo<ReadinessCheck200Response>> {
        const requestContextPromise = this.requestFactory.readinessCheck(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.readinessCheckWithHttpInfo(rsp)));
            }));
    }

    /**
     * Readiness check
     */
    public readinessCheck(_options?: Configuration): Observable<ReadinessCheck200Response> {
        return this.readinessCheckWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<ReadinessCheck200Response>) => apiResponse.data));
    }

}

import { IntegrationsApiRequestFactory, IntegrationsApiResponseProcessor} from "../apis/IntegrationsApi";
export class ObservableIntegrationsApi {
    private requestFactory: IntegrationsApiRequestFactory;
    private responseProcessor: IntegrationsApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: IntegrationsApiRequestFactory,
        responseProcessor?: IntegrationsApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new IntegrationsApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new IntegrationsApiResponseProcessor();
    }

    /**
     * List available integrations
     */
    public listIntegrationsWithHttpInfo(_options?: Configuration): Observable<HttpInfo<ListIntegrations200Response>> {
        const requestContextPromise = this.requestFactory.listIntegrations(_options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.listIntegrationsWithHttpInfo(rsp)));
            }));
    }

    /**
     * List available integrations
     */
    public listIntegrations(_options?: Configuration): Observable<ListIntegrations200Response> {
        return this.listIntegrationsWithHttpInfo(_options).pipe(map((apiResponse: HttpInfo<ListIntegrations200Response>) => apiResponse.data));
    }

}

import { TenantsApiRequestFactory, TenantsApiResponseProcessor} from "../apis/TenantsApi";
export class ObservableTenantsApi {
    private requestFactory: TenantsApiRequestFactory;
    private responseProcessor: TenantsApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: TenantsApiRequestFactory,
        responseProcessor?: TenantsApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new TenantsApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new TenantsApiResponseProcessor();
    }

    /**
     * Get tenant details
     * @param tenantId 
     */
    public getTenantWithHttpInfo(tenantId: string, _options?: Configuration): Observable<HttpInfo<Tenant>> {
        const requestContextPromise = this.requestFactory.getTenant(tenantId, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.getTenantWithHttpInfo(rsp)));
            }));
    }

    /**
     * Get tenant details
     * @param tenantId 
     */
    public getTenant(tenantId: string, _options?: Configuration): Observable<Tenant> {
        return this.getTenantWithHttpInfo(tenantId, _options).pipe(map((apiResponse: HttpInfo<Tenant>) => apiResponse.data));
    }

}

import { WebhooksApiRequestFactory, WebhooksApiResponseProcessor} from "../apis/WebhooksApi";
export class ObservableWebhooksApi {
    private requestFactory: WebhooksApiRequestFactory;
    private responseProcessor: WebhooksApiResponseProcessor;
    private configuration: Configuration;

    public constructor(
        configuration: Configuration,
        requestFactory?: WebhooksApiRequestFactory,
        responseProcessor?: WebhooksApiResponseProcessor
    ) {
        this.configuration = configuration;
        this.requestFactory = requestFactory || new WebhooksApiRequestFactory(configuration);
        this.responseProcessor = responseProcessor || new WebhooksApiResponseProcessor();
    }

    /**
     * Datadog webhook endpoint
     * @param body 
     */
    public datadogWebhookWithHttpInfo(body: any, _options?: Configuration): Observable<HttpInfo<void>> {
        const requestContextPromise = this.requestFactory.datadogWebhook(body, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.datadogWebhookWithHttpInfo(rsp)));
            }));
    }

    /**
     * Datadog webhook endpoint
     * @param body 
     */
    public datadogWebhook(body: any, _options?: Configuration): Observable<void> {
        return this.datadogWebhookWithHttpInfo(body, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * Jira webhook endpoint
     * @param body 
     */
    public jiraWebhookWithHttpInfo(body: any, _options?: Configuration): Observable<HttpInfo<void>> {
        const requestContextPromise = this.requestFactory.jiraWebhook(body, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.jiraWebhookWithHttpInfo(rsp)));
            }));
    }

    /**
     * Jira webhook endpoint
     * @param body 
     */
    public jiraWebhook(body: any, _options?: Configuration): Observable<void> {
        return this.jiraWebhookWithHttpInfo(body, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * PagerDuty webhook endpoint
     * @param body 
     */
    public pagerdutyWebhookWithHttpInfo(body: any, _options?: Configuration): Observable<HttpInfo<void>> {
        const requestContextPromise = this.requestFactory.pagerdutyWebhook(body, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.pagerdutyWebhookWithHttpInfo(rsp)));
            }));
    }

    /**
     * PagerDuty webhook endpoint
     * @param body 
     */
    public pagerdutyWebhook(body: any, _options?: Configuration): Observable<void> {
        return this.pagerdutyWebhookWithHttpInfo(body, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * ServiceNow webhook endpoint
     * @param body 
     */
    public servicenowWebhookWithHttpInfo(body: any, _options?: Configuration): Observable<HttpInfo<void>> {
        const requestContextPromise = this.requestFactory.servicenowWebhook(body, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.servicenowWebhookWithHttpInfo(rsp)));
            }));
    }

    /**
     * ServiceNow webhook endpoint
     * @param body 
     */
    public servicenowWebhook(body: any, _options?: Configuration): Observable<void> {
        return this.servicenowWebhookWithHttpInfo(body, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

    /**
     * Slack webhook endpoint
     * @param body 
     */
    public slackWebhookWithHttpInfo(body: any, _options?: Configuration): Observable<HttpInfo<void>> {
        const requestContextPromise = this.requestFactory.slackWebhook(body, _options);

        // build promise chain
        let middlewarePreObservable = from<RequestContext>(requestContextPromise);
        for (let middleware of this.configuration.middleware) {
            middlewarePreObservable = middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => middleware.pre(ctx)));
        }

        return middlewarePreObservable.pipe(mergeMap((ctx: RequestContext) => this.configuration.httpApi.send(ctx))).
            pipe(mergeMap((response: ResponseContext) => {
                let middlewarePostObservable = of(response);
                for (let middleware of this.configuration.middleware) {
                    middlewarePostObservable = middlewarePostObservable.pipe(mergeMap((rsp: ResponseContext) => middleware.post(rsp)));
                }
                return middlewarePostObservable.pipe(map((rsp: ResponseContext) => this.responseProcessor.slackWebhookWithHttpInfo(rsp)));
            }));
    }

    /**
     * Slack webhook endpoint
     * @param body 
     */
    public slackWebhook(body: any, _options?: Configuration): Observable<void> {
        return this.slackWebhookWithHttpInfo(body, _options).pipe(map((apiResponse: HttpInfo<void>) => apiResponse.data));
    }

}
