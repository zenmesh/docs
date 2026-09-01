# zen_mesh_api.WebhooksApi

All URIs are relative to *https://api.zen-mesh.io/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**datadog_webhook**](WebhooksApi.md#datadog_webhook) | **POST** /webhooks/datadog | Datadog webhook endpoint
[**jira_webhook**](WebhooksApi.md#jira_webhook) | **POST** /webhooks/jira | Jira webhook endpoint
[**pagerduty_webhook**](WebhooksApi.md#pagerduty_webhook) | **POST** /webhooks/pagerduty | PagerDuty webhook endpoint
[**servicenow_webhook**](WebhooksApi.md#servicenow_webhook) | **POST** /webhooks/servicenow | ServiceNow webhook endpoint
[**slack_webhook**](WebhooksApi.md#slack_webhook) | **POST** /webhooks/slack | Slack webhook endpoint


# **datadog_webhook**
> datadog_webhook(body)

Datadog webhook endpoint

### Example


```python
import zen_mesh_api
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
    api_instance = zen_mesh_api.WebhooksApi(api_client)
    body = None # object | 

    try:
        # Datadog webhook endpoint
        api_instance.datadog_webhook(body)
    except Exception as e:
        print("Exception when calling WebhooksApi->datadog_webhook: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **object**|  | 

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Webhook processed |  -  |
**401** | Authentication required or failed |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **jira_webhook**
> jira_webhook(body)

Jira webhook endpoint

### Example


```python
import zen_mesh_api
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
    api_instance = zen_mesh_api.WebhooksApi(api_client)
    body = None # object | 

    try:
        # Jira webhook endpoint
        api_instance.jira_webhook(body)
    except Exception as e:
        print("Exception when calling WebhooksApi->jira_webhook: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **object**|  | 

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Webhook processed |  -  |
**401** | Authentication required or failed |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **pagerduty_webhook**
> pagerduty_webhook(body)

PagerDuty webhook endpoint

### Example


```python
import zen_mesh_api
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
    api_instance = zen_mesh_api.WebhooksApi(api_client)
    body = None # object | 

    try:
        # PagerDuty webhook endpoint
        api_instance.pagerduty_webhook(body)
    except Exception as e:
        print("Exception when calling WebhooksApi->pagerduty_webhook: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **object**|  | 

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Webhook processed |  -  |
**401** | Authentication required or failed |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **servicenow_webhook**
> servicenow_webhook(body)

ServiceNow webhook endpoint

### Example


```python
import zen_mesh_api
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
    api_instance = zen_mesh_api.WebhooksApi(api_client)
    body = None # object | 

    try:
        # ServiceNow webhook endpoint
        api_instance.servicenow_webhook(body)
    except Exception as e:
        print("Exception when calling WebhooksApi->servicenow_webhook: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **object**|  | 

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Webhook processed |  -  |
**401** | Authentication required or failed |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **slack_webhook**
> slack_webhook(body)

Slack webhook endpoint

### Example


```python
import zen_mesh_api
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
    api_instance = zen_mesh_api.WebhooksApi(api_client)
    body = None # object | 

    try:
        # Slack webhook endpoint
        api_instance.slack_webhook(body)
    except Exception as e:
        print("Exception when calling WebhooksApi->slack_webhook: %s\n" % e)
```



### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **object**|  | 

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

### HTTP response details

| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | Webhook processed |  -  |
**401** | Authentication required or failed |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

