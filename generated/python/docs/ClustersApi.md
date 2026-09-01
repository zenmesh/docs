# zen_mesh_api.ClustersApi

All URIs are relative to *https://api.zen-mesh.io/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create_cluster**](ClustersApi.md#create_cluster) | **POST** /tenants/{tenant_id}/clusters | Get tenant planes
[**get_cluster**](ClustersApi.md#get_cluster) | **GET** /tenants/{tenant_id}/clusters/{cluster_id} | Get plane details
[**list_clusters**](ClustersApi.md#list_clusters) | **GET** /tenants/{tenant_id}/clusters | Get tenant planes


# **create_cluster**
> Cluster create_cluster(tenant_id, cluster_create_request)

Get tenant planes

### Example

* Bearer (Bearer) Authentication (tenantAuth):

```python
import zen_mesh_api
from zen_mesh_api.models.cluster import Cluster
from zen_mesh_api.models.cluster_create_request import ClusterCreateRequest
from zen_mesh_api.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.zen-mesh.io/v1
# See configuration.py for a list of all supported configuration parameters.
configuration = zen_mesh_api.Configuration(
    host = "https://api.zen-mesh.io/v1"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization (Bearer): tenantAuth
configuration = zen_mesh_api.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with zen_mesh_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = zen_mesh_api.ClustersApi(api_client)
    tenant_id = 'tenant_id_example' # str | 
    cluster_create_request = zen_mesh_api.ClusterCreateRequest() # ClusterCreateRequest | 

    try:
        # Get tenant planes
        api_response = api_instance.create_cluster(tenant_id, cluster_create_request)
        print("The response of ClustersApi->create_cluster:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ClustersApi->create_cluster: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenant_id** | **str**|  | 
 **cluster_create_request** | [**ClusterCreateRequest**](ClusterCreateRequest.md)|  | 

### Return type

[**Cluster**](Cluster.md)

### Authorization

[tenantAuth](../README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Cluster registered |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_cluster**
> Cluster get_cluster(tenant_id, cluster_id)

Get plane details

### Example

* Bearer (Bearer) Authentication (tenantAuth):

```python
import zen_mesh_api
from zen_mesh_api.models.cluster import Cluster
from zen_mesh_api.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.zen-mesh.io/v1
# See configuration.py for a list of all supported configuration parameters.
configuration = zen_mesh_api.Configuration(
    host = "https://api.zen-mesh.io/v1"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization (Bearer): tenantAuth
configuration = zen_mesh_api.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with zen_mesh_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = zen_mesh_api.ClustersApi(api_client)
    tenant_id = 'tenant_id_example' # str | 
    cluster_id = 'cluster_id_example' # str | The cluster (plane) ID.

    try:
        # Get plane details
        api_response = api_instance.get_cluster(tenant_id, cluster_id)
        print("The response of ClustersApi->get_cluster:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ClustersApi->get_cluster: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenant_id** | **str**|  | 
 **cluster_id** | **str**| The cluster (plane) ID. | 

### Return type

[**Cluster**](Cluster.md)

### Authorization

[tenantAuth](../README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Cluster details |  -  |
**404** | Resource not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_clusters**
> ListClusters200Response list_clusters(tenant_id)

Get tenant planes

### Example

* Bearer (Bearer) Authentication (tenantAuth):

```python
import zen_mesh_api
from zen_mesh_api.models.list_clusters200_response import ListClusters200Response
from zen_mesh_api.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.zen-mesh.io/v1
# See configuration.py for a list of all supported configuration parameters.
configuration = zen_mesh_api.Configuration(
    host = "https://api.zen-mesh.io/v1"
)

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization (Bearer): tenantAuth
configuration = zen_mesh_api.Configuration(
    access_token = os.environ["BEARER_TOKEN"]
)

# Enter a context with an instance of the API client
with zen_mesh_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = zen_mesh_api.ClustersApi(api_client)
    tenant_id = 'tenant_id_example' # str | 

    try:
        # Get tenant planes
        api_response = api_instance.list_clusters(tenant_id)
        print("The response of ClustersApi->list_clusters:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling ClustersApi->list_clusters: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenant_id** | **str**|  | 

### Return type

[**ListClusters200Response**](ListClusters200Response.md)

### Authorization

[tenantAuth](../README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | List of clusters |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

