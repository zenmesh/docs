# .CRDsApi

All URIs are relative to *https://api.zen-mesh.io/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createDeliveryFlow**](CRDsApi.md#createDeliveryFlow) | **POST** /tenants/{tenant_id}/clusters/{cluster_id}/delivery-flows | Create a delivery flow
[**createDestination**](CRDsApi.md#createDestination) | **POST** /tenants/{tenant_id}/clusters/{cluster_id}/destinations | Create a target (wire name: destination)
[**createIngester**](CRDsApi.md#createIngester) | **POST** /tenants/{tenant_id}/clusters/{cluster_id}/ingesters | Create an ingester
[**deleteDeliveryFlow**](CRDsApi.md#deleteDeliveryFlow) | **DELETE** /tenants/{tenant_id}/clusters/{cluster_id}/delivery-flows/{flow_id} | Delete a delivery flow
[**deleteDestination**](CRDsApi.md#deleteDestination) | **DELETE** /tenants/{tenant_id}/clusters/{cluster_id}/destinations/{destination_id} | Delete a target (wire name: destination)
[**deleteIngester**](CRDsApi.md#deleteIngester) | **DELETE** /tenants/{tenant_id}/clusters/{cluster_id}/ingesters/{ingester_id} | Delete an ingester
[**getDeliveryFlow**](CRDsApi.md#getDeliveryFlow) | **GET** /tenants/{tenant_id}/clusters/{cluster_id}/delivery-flows/{flow_id} | Get delivery flow details
[**getDestination**](CRDsApi.md#getDestination) | **GET** /tenants/{tenant_id}/clusters/{cluster_id}/destinations/{destination_id} | Get target details (wire name: destination)
[**getIngester**](CRDsApi.md#getIngester) | **GET** /tenants/{tenant_id}/clusters/{cluster_id}/ingesters/{ingester_id} | Get ingester details
[**listDeliveryFlows**](CRDsApi.md#listDeliveryFlows) | **GET** /tenants/{tenant_id}/clusters/{cluster_id}/delivery-flows | List delivery flows for plane (wire name: cluster)
[**listDestinations**](CRDsApi.md#listDestinations) | **GET** /tenants/{tenant_id}/clusters/{cluster_id}/destinations | List targets (wire name: destinations) for plane
[**listIngesters**](CRDsApi.md#listIngesters) | **GET** /tenants/{tenant_id}/clusters/{cluster_id}/ingesters | List ingesters for plane (wire name: cluster)
[**updateDeliveryFlow**](CRDsApi.md#updateDeliveryFlow) | **PUT** /tenants/{tenant_id}/clusters/{cluster_id}/delivery-flows/{flow_id} | Update a delivery flow
[**updateDestination**](CRDsApi.md#updateDestination) | **PUT** /tenants/{tenant_id}/clusters/{cluster_id}/destinations/{destination_id} | Update a target (wire name: destination)
[**updateIngester**](CRDsApi.md#updateIngester) | **PUT** /tenants/{tenant_id}/clusters/{cluster_id}/ingesters/{ingester_id} | Update an ingester


# **createDeliveryFlow**
> DeliveryFlow createDeliveryFlow(deliveryFlowCreateRequest)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CRDsApi(configuration);

let body:.CRDsApiCreateDeliveryFlowRequest = {
  // string
  tenantId: "tenant_id_example",
  // string
  clusterId: "cluster_id_example",
  // DeliveryFlowCreateRequest
  deliveryFlowCreateRequest: {
    destinationId: "destinationId_example",
    filters: [
      {},
    ],
    ingesterId: "ingesterId_example",
    name: "name_example",
    transformations: [
      {},
    ],
  },
};

apiInstance.createDeliveryFlow(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **deliveryFlowCreateRequest** | **DeliveryFlowCreateRequest**|  |
 **tenantId** | [**string**] |  | defaults to undefined
 **clusterId** | [**string**] |  | defaults to undefined


### Return type

**DeliveryFlow**

### Authorization

[tenantAuth](README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Delivery flow created |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **createDestination**
> Destination createDestination(destinationCreateRequest)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CRDsApi(configuration);

let body:.CRDsApiCreateDestinationRequest = {
  // string
  tenantId: "tenant_id_example",
  // string
  clusterId: "cluster_id_example",
  // DestinationCreateRequest
  destinationCreateRequest: {
    config: {},
    name: "name_example",
    type: "siem",
  },
};

apiInstance.createDestination(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **destinationCreateRequest** | **DestinationCreateRequest**|  |
 **tenantId** | [**string**] |  | defaults to undefined
 **clusterId** | [**string**] |  | defaults to undefined


### Return type

**Destination**

### Authorization

[tenantAuth](README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Destination created |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **createIngester**
> Ingester createIngester(ingesterCreateRequest)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CRDsApi(configuration);

let body:.CRDsApiCreateIngesterRequest = {
  // string
  tenantId: "tenant_id_example",
  // string
  clusterId: "cluster_id_example",
  // IngesterCreateRequest
  ingesterCreateRequest: {
    config: {},
    name: "name_example",
    type: "kubernetes",
  },
};

apiInstance.createIngester(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ingesterCreateRequest** | **IngesterCreateRequest**|  |
 **tenantId** | [**string**] |  | defaults to undefined
 **clusterId** | [**string**] |  | defaults to undefined


### Return type

**Ingester**

### Authorization

[tenantAuth](README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Ingester created |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteDeliveryFlow**
> void deleteDeliveryFlow()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CRDsApi(configuration);

let body:.CRDsApiDeleteDeliveryFlowRequest = {
  // string
  tenantId: "tenant_id_example",
  // string
  clusterId: "cluster_id_example",
  // string
  flowId: "flow_id_example",
};

apiInstance.deleteDeliveryFlow(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenantId** | [**string**] |  | defaults to undefined
 **clusterId** | [**string**] |  | defaults to undefined
 **flowId** | [**string**] |  | defaults to undefined


### Return type

**void**

### Authorization

[tenantAuth](README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**204** | Delivery flow deleted |  -  |
**404** | Resource not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteDestination**
> void deleteDestination()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CRDsApi(configuration);

let body:.CRDsApiDeleteDestinationRequest = {
  // string
  tenantId: "tenant_id_example",
  // string
  clusterId: "cluster_id_example",
  // string
  destinationId: "destination_id_example",
};

apiInstance.deleteDestination(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenantId** | [**string**] |  | defaults to undefined
 **clusterId** | [**string**] |  | defaults to undefined
 **destinationId** | [**string**] |  | defaults to undefined


### Return type

**void**

### Authorization

[tenantAuth](README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**204** | Destination deleted |  -  |
**404** | Resource not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **deleteIngester**
> void deleteIngester()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CRDsApi(configuration);

let body:.CRDsApiDeleteIngesterRequest = {
  // string
  tenantId: "tenant_id_example",
  // string
  clusterId: "cluster_id_example",
  // string
  ingesterId: "ingester_id_example",
};

apiInstance.deleteIngester(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenantId** | [**string**] |  | defaults to undefined
 **clusterId** | [**string**] |  | defaults to undefined
 **ingesterId** | [**string**] |  | defaults to undefined


### Return type

**void**

### Authorization

[tenantAuth](README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**204** | Ingester deleted |  -  |
**404** | Resource not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getDeliveryFlow**
> DeliveryFlow getDeliveryFlow()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CRDsApi(configuration);

let body:.CRDsApiGetDeliveryFlowRequest = {
  // string
  tenantId: "tenant_id_example",
  // string
  clusterId: "cluster_id_example",
  // string
  flowId: "flow_id_example",
};

apiInstance.getDeliveryFlow(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenantId** | [**string**] |  | defaults to undefined
 **clusterId** | [**string**] |  | defaults to undefined
 **flowId** | [**string**] |  | defaults to undefined


### Return type

**DeliveryFlow**

### Authorization

[tenantAuth](README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Delivery flow details |  -  |
**404** | Resource not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getDestination**
> Destination getDestination()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CRDsApi(configuration);

let body:.CRDsApiGetDestinationRequest = {
  // string
  tenantId: "tenant_id_example",
  // string
  clusterId: "cluster_id_example",
  // string
  destinationId: "destination_id_example",
};

apiInstance.getDestination(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenantId** | [**string**] |  | defaults to undefined
 **clusterId** | [**string**] |  | defaults to undefined
 **destinationId** | [**string**] |  | defaults to undefined


### Return type

**Destination**

### Authorization

[tenantAuth](README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Destination details |  -  |
**404** | Resource not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getIngester**
> Ingester getIngester()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CRDsApi(configuration);

let body:.CRDsApiGetIngesterRequest = {
  // string
  tenantId: "tenant_id_example",
  // string
  clusterId: "cluster_id_example",
  // string
  ingesterId: "ingester_id_example",
};

apiInstance.getIngester(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenantId** | [**string**] |  | defaults to undefined
 **clusterId** | [**string**] |  | defaults to undefined
 **ingesterId** | [**string**] |  | defaults to undefined


### Return type

**Ingester**

### Authorization

[tenantAuth](README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Ingester details |  -  |
**404** | Resource not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **listDeliveryFlows**
> ListDeliveryFlows200Response listDeliveryFlows()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CRDsApi(configuration);

let body:.CRDsApiListDeliveryFlowsRequest = {
  // string
  tenantId: "tenant_id_example",
  // string
  clusterId: "cluster_id_example",
};

apiInstance.listDeliveryFlows(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenantId** | [**string**] |  | defaults to undefined
 **clusterId** | [**string**] |  | defaults to undefined


### Return type

**ListDeliveryFlows200Response**

### Authorization

[tenantAuth](README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | List of delivery flows |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **listDestinations**
> ListDestinations200Response listDestinations()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CRDsApi(configuration);

let body:.CRDsApiListDestinationsRequest = {
  // string
  tenantId: "tenant_id_example",
  // string
  clusterId: "cluster_id_example",
};

apiInstance.listDestinations(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenantId** | [**string**] |  | defaults to undefined
 **clusterId** | [**string**] |  | defaults to undefined


### Return type

**ListDestinations200Response**

### Authorization

[tenantAuth](README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | List of destinations |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **listIngesters**
> ListIngesters200Response listIngesters()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CRDsApi(configuration);

let body:.CRDsApiListIngestersRequest = {
  // string
  tenantId: "tenant_id_example",
  // string
  clusterId: "cluster_id_example",
};

apiInstance.listIngesters(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenantId** | [**string**] |  | defaults to undefined
 **clusterId** | [**string**] |  | defaults to undefined


### Return type

**ListIngesters200Response**

### Authorization

[tenantAuth](README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | List of ingesters |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **updateDeliveryFlow**
> DeliveryFlow updateDeliveryFlow(deliveryFlowUpdateRequest)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CRDsApi(configuration);

let body:.CRDsApiUpdateDeliveryFlowRequest = {
  // string
  tenantId: "tenant_id_example",
  // string
  clusterId: "cluster_id_example",
  // string
  flowId: "flow_id_example",
  // DeliveryFlowUpdateRequest
  deliveryFlowUpdateRequest: {
    destinationId: "destinationId_example",
    filters: [
      {},
    ],
    ingesterId: "ingesterId_example",
    name: "name_example",
    transformations: [
      {},
    ],
  },
};

apiInstance.updateDeliveryFlow(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **deliveryFlowUpdateRequest** | **DeliveryFlowUpdateRequest**|  |
 **tenantId** | [**string**] |  | defaults to undefined
 **clusterId** | [**string**] |  | defaults to undefined
 **flowId** | [**string**] |  | defaults to undefined


### Return type

**DeliveryFlow**

### Authorization

[tenantAuth](README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Delivery flow updated |  -  |
**404** | Resource not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **updateDestination**
> Destination updateDestination(destinationUpdateRequest)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CRDsApi(configuration);

let body:.CRDsApiUpdateDestinationRequest = {
  // string
  tenantId: "tenant_id_example",
  // string
  clusterId: "cluster_id_example",
  // string
  destinationId: "destination_id_example",
  // DestinationUpdateRequest
  destinationUpdateRequest: {
    config: {},
    name: "name_example",
  },
};

apiInstance.updateDestination(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **destinationUpdateRequest** | **DestinationUpdateRequest**|  |
 **tenantId** | [**string**] |  | defaults to undefined
 **clusterId** | [**string**] |  | defaults to undefined
 **destinationId** | [**string**] |  | defaults to undefined


### Return type

**Destination**

### Authorization

[tenantAuth](README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Destination updated |  -  |
**404** | Resource not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **updateIngester**
> Ingester updateIngester(ingesterUpdateRequest)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .CRDsApi(configuration);

let body:.CRDsApiUpdateIngesterRequest = {
  // string
  tenantId: "tenant_id_example",
  // string
  clusterId: "cluster_id_example",
  // string
  ingesterId: "ingester_id_example",
  // IngesterUpdateRequest
  ingesterUpdateRequest: {
    config: {},
    name: "name_example",
  },
};

apiInstance.updateIngester(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **ingesterUpdateRequest** | **IngesterUpdateRequest**|  |
 **tenantId** | [**string**] |  | defaults to undefined
 **clusterId** | [**string**] |  | defaults to undefined
 **ingesterId** | [**string**] |  | defaults to undefined


### Return type

**Ingester**

### Authorization

[tenantAuth](README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Ingester updated |  -  |
**404** | Resource not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


