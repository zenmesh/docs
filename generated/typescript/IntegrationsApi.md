# .IntegrationsApi

All URIs are relative to *https://api.zen-mesh.io/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**listIntegrations**](IntegrationsApi.md#listIntegrations) | **GET** /integrations | List available integrations


# **listIntegrations**
> ListIntegrations200Response listIntegrations()


### Example


```typescript
import {  } from '';
import * as fs from 'fs';

const configuration = .createConfiguration();
const apiInstance = new .IntegrationsApi(configuration);

let body:any = {};

apiInstance.listIntegrations(body).then((data:any) => {
  console.log('API called successfully. Returned data: ' + data);
}).catch((error:any) => console.error(error));
```


### Parameters
This endpoint does not need any parameter.


### Return type

**ListIntegrations200Response**

### Authorization

[tenantAuth](README.md#tenantAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | List of available integrations |  -  |

[[Back to top]](#) [[Back to API list]](README.md#documentation-for-api-endpoints) [[Back to Model list]](README.md#documentation-for-models) [[Back to README]](README.md)


