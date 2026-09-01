# .ClustersApi

All URIs are relative to *https://api.zen-mesh.io/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createCluster**](ClustersApi.md#createCluster) | **POST** /tenants/{tenant_id}/clusters | Get tenant planes
[**getCluster**](ClustersApi.md#getCluster) | **GET** /tenants/{tenant_id}/clusters/{cluster_id} | Get plane details
[**listClusters**](ClustersApi.md#listClusters) | **GET** /tenants/{tenant_id}/clusters | Get tenant planes


# **createCluster**
> Cluster createCluster(clusterCreateRequest)


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .ClustersApi(configuration);

let body:.ClustersApiCreateClusterRequest = {
  // string
  tenantId: "tenant_id_example",
  // ClusterCreateRequest
  clusterCreateRequest: {
    certificateMode: "platform-managed",
    certificateOwner: "zen",
    environment: "environment_example",
    ingressHost: "ingressHost_example",
    ingressPublicIp: "ingressPublicIp_example",
    name: "name_example",
    provider: "provider_example",
    region: "region_example",
    rotationPolicy: "canary",
  },
};

apiInstance.createCluster(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **clusterCreateRequest** | **ClusterCreateRequest**|  |
 **tenantId** | [**string**] |  | defaults to undefined


### Return type

**Cluster**

### Authorization

[tenantAuth](README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Cluster registered |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **getCluster**
> Cluster getCluster()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .ClustersApi(configuration);

let body:.ClustersApiGetClusterRequest = {
  // string
  tenantId: "tenant_id_example",
  // string | The cluster (plane) ID.
  clusterId: "cluster_id_example",
};

apiInstance.getCluster(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenantId** | [**string**] |  | defaults to undefined
 **clusterId** | [**string**] | The cluster (plane) ID. | defaults to undefined


### Return type

**Cluster**

### Authorization

[tenantAuth](README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Cluster details |  -  |
**404** | Resource not found |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)

# **listClusters**
> ListClusters200Response listClusters()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .ClustersApi(configuration);

let body:.ClustersApiListClustersRequest = {
  // string
  tenantId: "tenant_id_example",
};

apiInstance.listClusters(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenantId** | [**string**] |  | defaults to undefined


### Return type

**ListClusters200Response**

### Authorization

[tenantAuth](README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | List of clusters |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


