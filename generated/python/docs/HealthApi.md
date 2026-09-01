# zen_mesh_api.HealthApi

All URIs are relative to *https://api.zen-mesh.io/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**health_check**](HealthApi.md#health_check) | **GET** /health | Health check
[**readiness_check**](HealthApi.md#readiness_check) | **GET** /ready | Readiness check


# **health_check**
> HealthCheck200Response health_check()

Health check

### Example


```python
import zen_mesh_api
from zen_mesh_api.models.health_check200_response import HealthCheck200Response
from zen_mesh_api.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.zen-mesh.io/v1
# See configuration.py for a list of all supported configuration parameters.
configuration = zen_mesh_api.Configuration(
    host = "https://api.zen-mesh.io/v1"
)


# Enter a context with an instance of the API client
with zen_mesh_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = zen_mesh_api.HealthApi(api_client)

    try:
        # Health check
        api_response = api_instance.health_check()
        print("The response of HealthApi->health_check:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling HealthApi->health_check: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**HealthCheck200Response**](HealthCheck200Response.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Service is healthy |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **readiness_check**
> ReadinessCheck200Response readiness_check()

Readiness check

### Example


```python
import zen_mesh_api
from zen_mesh_api.models.readiness_check200_response import ReadinessCheck200Response
from zen_mesh_api.rest import ApiException
from pprint import pprint

# Defining the host is optional and defaults to https://api.zen-mesh.io/v1
# See configuration.py for a list of all supported configuration parameters.
configuration = zen_mesh_api.Configuration(
    host = "https://api.zen-mesh.io/v1"
)


# Enter a context with an instance of the API client
with zen_mesh_api.ApiClient(configuration) as api_client:
    # Create an instance of the API class
    api_instance = zen_mesh_api.HealthApi(api_client)

    try:
        # Readiness check
        api_response = api_instance.readiness_check()
        print("The response of HealthApi->readiness_check:\n")
        pprint(api_response)
    except Exception as e:
        print("Exception when calling HealthApi->readiness_check: %s\n" % e)
```



### Parameters

This endpoint does not need any parameter.

### Return type

[**ReadinessCheck200Response**](ReadinessCheck200Response.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Service is ready |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

