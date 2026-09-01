# zen_mesh_api.CRDsApi

All URIs are relative to *https://api.zen-mesh.io/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**create_delivery_flow**](CRDsApi.md#create_delivery_flow) | **POST** /tenants/{tenant_id}/clusters/{cluster_id}/delivery-flows | Create a delivery flow
[**create_destination**](CRDsApi.md#create_destination) | **POST** /tenants/{tenant_id}/clusters/{cluster_id}/destinations | Create a target (wire name: destination)
[**create_ingester**](CRDsApi.md#create_ingester) | **POST** /tenants/{tenant_id}/clusters/{cluster_id}/ingesters | Create an ingester
[**delete_delivery_flow**](CRDsApi.md#delete_delivery_flow) | **DELETE** /tenants/{tenant_id}/clusters/{cluster_id}/delivery-flows/{flow_id} | Delete a delivery flow
[**delete_destination**](CRDsApi.md#delete_destination) | **DELETE** /tenants/{tenant_id}/clusters/{cluster_id}/destinations/{destination_id} | Delete a target (wire name: destination)
[**delete_ingester**](CRDsApi.md#delete_ingester) | **DELETE** /tenants/{tenant_id}/clusters/{cluster_id}/ingesters/{ingester_id} | Delete an ingester
[**get_delivery_flow**](CRDsApi.md#get_delivery_flow) | **GET** /tenants/{tenant_id}/clusters/{cluster_id}/delivery-flows/{flow_id} | Get delivery flow details
[**get_destination**](CRDsApi.md#get_destination) | **GET** /tenants/{tenant_id}/clusters/{cluster_id}/destinations/{destination_id} | Get target details (wire name: destination)
[**get_ingester**](CRDsApi.md#get_ingester) | **GET** /tenants/{tenant_id}/clusters/{cluster_id}/ingesters/{ingester_id} | Get ingester details
[**list_delivery_flows**](CRDsApi.md#list_delivery_flows) | **GET** /tenants/{tenant_id}/clusters/{cluster_id}/delivery-flows | List delivery flows for plane (wire name: cluster)
[**list_destinations**](CRDsApi.md#list_destinations) | **GET** /tenants/{tenant_id}/clusters/{cluster_id}/destinations | List targets (wire name: destinations) for plane
[**list_ingesters**](CRDsApi.md#list_ingesters) | **GET** /tenants/{tenant_id}/clusters/{cluster_id}/ingesters | List ingesters for plane (wire name: cluster)
[**update_delivery_flow**](CRDsApi.md#update_delivery_flow) | **PUT** /tenants/{tenant_id}/clusters/{cluster_id}/delivery-flows/{flow_id} | Update a delivery flow
[**update_destination**](CRDsApi.md#update_destination) | **PUT** /tenants/{tenant_id}/clusters/{cluster_id}/destinations/{destination_id} | Update a target (wire name: destination)
[**update_ingester**](CRDsApi.md#update_ingester) | **PUT** /tenants/{tenant_id}/clusters/{cluster_id}/ingesters/{ingester_id} | Update an ingester


# **create_delivery_flow**
> DeliveryFlow create_delivery_flow(tenant_id, cluster_id, delivery_flow_create_request)

Create a delivery flow

### Example

* Bearer (Bearer) Authentication (tenantAuth):

```python
import zen_mesh_api
from zen_mesh_api.models.delivery_flow import DeliveryFlow
from zen_mesh_api.models.delivery_flow_create_request import DeliveryFlowCreateRequest
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
    api_instance = zen_mesh_api.CRDsApi(api_client)
    tenant_id = 'tenant_id_example' # str | 
    cluster_id = 'cluster_id_example' # str | 
    delivery_flow_create_request = zen_mesh_api.DeliveryFlowCreateRequest() # DeliveryFlowCreateRequest | 

    try:
        # Create a delivery flow
        api_response = api_instance.create_delivery_flow(tenant_id, cluster_id, delivery_flow_create_request)
        print("The response of CRDsApi->create_delivery_flow:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CRDsApi->create_delivery_flow: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenant_id** | **str**|  | 
 **cluster_id** | **str**|  | 
 **delivery_flow_create_request** | [**DeliveryFlowCreateRequest**](DeliveryFlowCreateRequest.md)|  | 

### Return type

[**DeliveryFlow**](DeliveryFlow.md)

### Authorization

[tenantAuth](../README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Delivery flow created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **create_destination**
> Destination create_destination(tenant_id, cluster_id, destination_create_request)

Create a target (wire name: destination)

### Example

* Bearer (Bearer) Authentication (tenantAuth):

```python
import zen_mesh_api
from zen_mesh_api.models.destination import Destination
from zen_mesh_api.models.destination_create_request import DestinationCreateRequest
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
    api_instance = zen_mesh_api.CRDsApi(api_client)
    tenant_id = 'tenant_id_example' # str | 
    cluster_id = 'cluster_id_example' # str | 
    destination_create_request = zen_mesh_api.DestinationCreateRequest() # DestinationCreateRequest | 

    try:
        # Create a target (wire name: destination)
        api_response = api_instance.create_destination(tenant_id, cluster_id, destination_create_request)
        print("The response of CRDsApi->create_destination:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CRDsApi->create_destination: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenant_id** | **str**|  | 
 **cluster_id** | **str**|  | 
 **destination_create_request** | [**DestinationCreateRequest**](DestinationCreateRequest.md)|  | 

### Return type

[**Destination**](Destination.md)

### Authorization

[tenantAuth](../README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Destination created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **create_ingester**
> Ingester create_ingester(tenant_id, cluster_id, ingester_create_request)

Create an ingester

### Example

* Bearer (Bearer) Authentication (tenantAuth):

```python
import zen_mesh_api
from zen_mesh_api.models.ingester import Ingester
from zen_mesh_api.models.ingester_create_request import IngesterCreateRequest
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
    api_instance = zen_mesh_api.CRDsApi(api_client)
    tenant_id = 'tenant_id_example' # str | 
    cluster_id = 'cluster_id_example' # str | 
    ingester_create_request = zen_mesh_api.IngesterCreateRequest() # IngesterCreateRequest | 

    try:
        # Create an ingester
        api_response = api_instance.create_ingester(tenant_id, cluster_id, ingester_create_request)
        print("The response of CRDsApi->create_ingester:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CRDsApi->create_ingester: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenant_id** | **str**|  | 
 **cluster_id** | **str**|  | 
 **ingester_create_request** | [**IngesterCreateRequest**](IngesterCreateRequest.md)|  | 

### Return type

[**Ingester**](Ingester.md)

### Authorization

[tenantAuth](../README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**201** | Ingester created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **delete_delivery_flow**
> delete_delivery_flow(tenant_id, cluster_id, flow_id)

Delete a delivery flow

### Example

* Bearer (Bearer) Authentication (tenantAuth):

```python
import zen_mesh_api
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
    api_instance = zen_mesh_api.CRDsApi(api_client)
    tenant_id = 'tenant_id_example' # str | 
    cluster_id = 'cluster_id_example' # str | 
    flow_id = 'flow_id_example' # str | 

    try:
        # Delete a delivery flow
        api_instance.delete_delivery_flow(tenant_id, cluster_id, flow_id)
    except Exception as e:
        print("Exception when calling CRDsApi->delete_delivery_flow: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenant_id** | **str**|  | 
 **cluster_id** | **str**|  | 
 **flow_id** | **str**|  | 

### Return type

void (empty response body)

### Authorization

[tenantAuth](../README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**204** | Delivery flow deleted |  -  |
**404** | Resource not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **delete_destination**
> delete_destination(tenant_id, cluster_id, destination_id)

Delete a target (wire name: destination)

### Example

* Bearer (Bearer) Authentication (tenantAuth):

```python
import zen_mesh_api
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
    api_instance = zen_mesh_api.CRDsApi(api_client)
    tenant_id = 'tenant_id_example' # str | 
    cluster_id = 'cluster_id_example' # str | 
    destination_id = 'destination_id_example' # str | 

    try:
        # Delete a target (wire name: destination)
        api_instance.delete_destination(tenant_id, cluster_id, destination_id)
    except Exception as e:
        print("Exception when calling CRDsApi->delete_destination: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenant_id** | **str**|  | 
 **cluster_id** | **str**|  | 
 **destination_id** | **str**|  | 

### Return type

void (empty response body)

### Authorization

[tenantAuth](../README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**204** | Destination deleted |  -  |
**404** | Resource not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **delete_ingester**
> delete_ingester(tenant_id, cluster_id, ingester_id)

Delete an ingester

### Example

* Bearer (Bearer) Authentication (tenantAuth):

```python
import zen_mesh_api
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
    api_instance = zen_mesh_api.CRDsApi(api_client)
    tenant_id = 'tenant_id_example' # str | 
    cluster_id = 'cluster_id_example' # str | 
    ingester_id = 'ingester_id_example' # str | 

    try:
        # Delete an ingester
        api_instance.delete_ingester(tenant_id, cluster_id, ingester_id)
    except Exception as e:
        print("Exception when calling CRDsApi->delete_ingester: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenant_id** | **str**|  | 
 **cluster_id** | **str**|  | 
 **ingester_id** | **str**|  | 

### Return type

void (empty response body)

### Authorization

[tenantAuth](../README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**204** | Ingester deleted |  -  |
**404** | Resource not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_delivery_flow**
> DeliveryFlow get_delivery_flow(tenant_id, cluster_id, flow_id)

Get delivery flow details

### Example

* Bearer (Bearer) Authentication (tenantAuth):

```python
import zen_mesh_api
from zen_mesh_api.models.delivery_flow import DeliveryFlow
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
    api_instance = zen_mesh_api.CRDsApi(api_client)
    tenant_id = 'tenant_id_example' # str | 
    cluster_id = 'cluster_id_example' # str | 
    flow_id = 'flow_id_example' # str | 

    try:
        # Get delivery flow details
        api_response = api_instance.get_delivery_flow(tenant_id, cluster_id, flow_id)
        print("The response of CRDsApi->get_delivery_flow:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CRDsApi->get_delivery_flow: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenant_id** | **str**|  | 
 **cluster_id** | **str**|  | 
 **flow_id** | **str**|  | 

### Return type

[**DeliveryFlow**](DeliveryFlow.md)

### Authorization

[tenantAuth](../README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Delivery flow details |  -  |
**404** | Resource not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_destination**
> Destination get_destination(tenant_id, cluster_id, destination_id)

Get target details (wire name: destination)

### Example

* Bearer (Bearer) Authentication (tenantAuth):

```python
import zen_mesh_api
from zen_mesh_api.models.destination import Destination
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
    api_instance = zen_mesh_api.CRDsApi(api_client)
    tenant_id = 'tenant_id_example' # str | 
    cluster_id = 'cluster_id_example' # str | 
    destination_id = 'destination_id_example' # str | 

    try:
        # Get target details (wire name: destination)
        api_response = api_instance.get_destination(tenant_id, cluster_id, destination_id)
        print("The response of CRDsApi->get_destination:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CRDsApi->get_destination: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenant_id** | **str**|  | 
 **cluster_id** | **str**|  | 
 **destination_id** | **str**|  | 

### Return type

[**Destination**](Destination.md)

### Authorization

[tenantAuth](../README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Destination details |  -  |
**404** | Resource not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **get_ingester**
> Ingester get_ingester(tenant_id, cluster_id, ingester_id)

Get ingester details

### Example

* Bearer (Bearer) Authentication (tenantAuth):

```python
import zen_mesh_api
from zen_mesh_api.models.ingester import Ingester
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
    api_instance = zen_mesh_api.CRDsApi(api_client)
    tenant_id = 'tenant_id_example' # str | 
    cluster_id = 'cluster_id_example' # str | 
    ingester_id = 'ingester_id_example' # str | 

    try:
        # Get ingester details
        api_response = api_instance.get_ingester(tenant_id, cluster_id, ingester_id)
        print("The response of CRDsApi->get_ingester:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CRDsApi->get_ingester: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenant_id** | **str**|  | 
 **cluster_id** | **str**|  | 
 **ingester_id** | **str**|  | 

### Return type

[**Ingester**](Ingester.md)

### Authorization

[tenantAuth](../README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Ingester details |  -  |
**404** | Resource not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_delivery_flows**
> ListDeliveryFlows200Response list_delivery_flows(tenant_id, cluster_id)

List delivery flows for plane (wire name: cluster)

### Example

* Bearer (Bearer) Authentication (tenantAuth):

```python
import zen_mesh_api
from zen_mesh_api.models.list_delivery_flows200_response import ListDeliveryFlows200Response
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
    api_instance = zen_mesh_api.CRDsApi(api_client)
    tenant_id = 'tenant_id_example' # str | 
    cluster_id = 'cluster_id_example' # str | 

    try:
        # List delivery flows for plane (wire name: cluster)
        api_response = api_instance.list_delivery_flows(tenant_id, cluster_id)
        print("The response of CRDsApi->list_delivery_flows:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CRDsApi->list_delivery_flows: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenant_id** | **str**|  | 
 **cluster_id** | **str**|  | 

### Return type

[**ListDeliveryFlows200Response**](ListDeliveryFlows200Response.md)

### Authorization

[tenantAuth](../README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | List of delivery flows |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_destinations**
> ListDestinations200Response list_destinations(tenant_id, cluster_id)

List targets (wire name: destinations) for plane

### Example

* Bearer (Bearer) Authentication (tenantAuth):

```python
import zen_mesh_api
from zen_mesh_api.models.list_destinations200_response import ListDestinations200Response
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
    api_instance = zen_mesh_api.CRDsApi(api_client)
    tenant_id = 'tenant_id_example' # str | 
    cluster_id = 'cluster_id_example' # str | 

    try:
        # List targets (wire name: destinations) for plane
        api_response = api_instance.list_destinations(tenant_id, cluster_id)
        print("The response of CRDsApi->list_destinations:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CRDsApi->list_destinations: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenant_id** | **str**|  | 
 **cluster_id** | **str**|  | 

### Return type

[**ListDestinations200Response**](ListDestinations200Response.md)

### Authorization

[tenantAuth](../README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | List of destinations |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **list_ingesters**
> ListIngesters200Response list_ingesters(tenant_id, cluster_id)

List ingesters for plane (wire name: cluster)

### Example

* Bearer (Bearer) Authentication (tenantAuth):

```python
import zen_mesh_api
from zen_mesh_api.models.list_ingesters200_response import ListIngesters200Response
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
    api_instance = zen_mesh_api.CRDsApi(api_client)
    tenant_id = 'tenant_id_example' # str | 
    cluster_id = 'cluster_id_example' # str | 

    try:
        # List ingesters for plane (wire name: cluster)
        api_response = api_instance.list_ingesters(tenant_id, cluster_id)
        print("The response of CRDsApi->list_ingesters:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CRDsApi->list_ingesters: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenant_id** | **str**|  | 
 **cluster_id** | **str**|  | 

### Return type

[**ListIngesters200Response**](ListIngesters200Response.md)

### Authorization

[tenantAuth](../README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | List of ingesters |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **update_delivery_flow**
> DeliveryFlow update_delivery_flow(tenant_id, cluster_id, flow_id, delivery_flow_update_request)

Update a delivery flow

### Example

* Bearer (Bearer) Authentication (tenantAuth):

```python
import zen_mesh_api
from zen_mesh_api.models.delivery_flow import DeliveryFlow
from zen_mesh_api.models.delivery_flow_update_request import DeliveryFlowUpdateRequest
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
    api_instance = zen_mesh_api.CRDsApi(api_client)
    tenant_id = 'tenant_id_example' # str | 
    cluster_id = 'cluster_id_example' # str | 
    flow_id = 'flow_id_example' # str | 
    delivery_flow_update_request = zen_mesh_api.DeliveryFlowUpdateRequest() # DeliveryFlowUpdateRequest | 

    try:
        # Update a delivery flow
        api_response = api_instance.update_delivery_flow(tenant_id, cluster_id, flow_id, delivery_flow_update_request)
        print("The response of CRDsApi->update_delivery_flow:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CRDsApi->update_delivery_flow: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenant_id** | **str**|  | 
 **cluster_id** | **str**|  | 
 **flow_id** | **str**|  | 
 **delivery_flow_update_request** | [**DeliveryFlowUpdateRequest**](DeliveryFlowUpdateRequest.md)|  | 

### Return type

[**DeliveryFlow**](DeliveryFlow.md)

### Authorization

[tenantAuth](../README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Delivery flow updated |  -  |
**404** | Resource not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **update_destination**
> Destination update_destination(tenant_id, cluster_id, destination_id, destination_update_request)

Update a target (wire name: destination)

### Example

* Bearer (Bearer) Authentication (tenantAuth):

```python
import zen_mesh_api
from zen_mesh_api.models.destination import Destination
from zen_mesh_api.models.destination_update_request import DestinationUpdateRequest
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
    api_instance = zen_mesh_api.CRDsApi(api_client)
    tenant_id = 'tenant_id_example' # str | 
    cluster_id = 'cluster_id_example' # str | 
    destination_id = 'destination_id_example' # str | 
    destination_update_request = zen_mesh_api.DestinationUpdateRequest() # DestinationUpdateRequest | 

    try:
        # Update a target (wire name: destination)
        api_response = api_instance.update_destination(tenant_id, cluster_id, destination_id, destination_update_request)
        print("The response of CRDsApi->update_destination:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CRDsApi->update_destination: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenant_id** | **str**|  | 
 **cluster_id** | **str**|  | 
 **destination_id** | **str**|  | 
 **destination_update_request** | [**DestinationUpdateRequest**](DestinationUpdateRequest.md)|  | 

### Return type

[**Destination**](Destination.md)

### Authorization

[tenantAuth](../README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Destination updated |  -  |
**404** | Resource not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **update_ingester**
> Ingester update_ingester(tenant_id, cluster_id, ingester_id, ingester_update_request)

Update an ingester

### Example

* Bearer (Bearer) Authentication (tenantAuth):

```python
import zen_mesh_api
from zen_mesh_api.models.ingester import Ingester
from zen_mesh_api.models.ingester_update_request import IngesterUpdateRequest
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
    api_instance = zen_mesh_api.CRDsApi(api_client)
    tenant_id = 'tenant_id_example' # str | 
    cluster_id = 'cluster_id_example' # str | 
    ingester_id = 'ingester_id_example' # str | 
    ingester_update_request = zen_mesh_api.IngesterUpdateRequest() # IngesterUpdateRequest | 

    try:
        # Update an ingester
        api_response = api_instance.update_ingester(tenant_id, cluster_id, ingester_id, ingester_update_request)
        print("The response of CRDsApi->update_ingester:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling CRDsApi->update_ingester: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenant_id** | **str**|  | 
 **cluster_id** | **str**|  | 
 **ingester_id** | **str**|  | 
 **ingester_update_request** | [**IngesterUpdateRequest**](IngesterUpdateRequest.md)|  | 

### Return type

[**Ingester**](Ingester.md)

### Authorization

[tenantAuth](../README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Ingester updated |  -  |
**404** | Resource not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

