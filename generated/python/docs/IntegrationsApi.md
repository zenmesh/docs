# zen_mesh_api.IntegrationsApi

All URIs are relative to *https://api.zen-mesh.io/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**list_integrations**](IntegrationsApi.md#list_integrations) | **GET** /integrations | List available integrations


# **list_integrations**
> ListIntegrations200Response list_integrations()

List available integrations

### Example

* Bearer (Bearer) Authentication (tenantAuth):

```python
import zen_mesh_api
from zen_mesh_api.models.list_integrations200_response import ListIntegrations200Response
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
    api_instance = zen_mesh_api.IntegrationsApi(api_client)

    try:
        # List available integrations
        api_response = api_instance.list_integrations()
        print("The response of IntegrationsApi->list_integrations:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling IntegrationsApi->list_integrations: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**ListIntegrations200Response**](ListIntegrations200Response.md)

### Authorization

[tenantAuth](../README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | List of available integrations |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

