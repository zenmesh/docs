# zen_mesh_api.TenantsApi

All URIs are relative to *https://api.zen-mesh.io/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_tenant**](TenantsApi.md#get_tenant) | **GET** /tenants/{tenant_id} | Get tenant details


# **get_tenant**
> Tenant get_tenant(tenant_id)

Get tenant details

### Example

* Bearer (Bearer) Authentication (tenantAuth):

```python
import zen_mesh_api
from zen_mesh_api.models.tenant import Tenant
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
    api_instance = zen_mesh_api.TenantsApi(api_client)
    tenant_id = 'tenant_id_example' # str | 

    try:
        # Get tenant details
        api_response = api_instance.get_tenant(tenant_id)
        print("The response of TenantsApi->get_tenant:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling TenantsApi->get_tenant: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **tenant_id** | **str**|  | 

### Return type

[**Tenant**](Tenant.md)

### Authorization

[tenantAuth](../README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Tenant details |  -  |
**404** | Resource not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

