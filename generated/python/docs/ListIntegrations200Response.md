# ListIntegrations200Response


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**integrations** | [**List[Integration]**](Integration.md) |  | [optional] 

## Example

```python
from zen_mesh_api.models.list_integrations200_response import ListIntegrations200Response

# TODO update the JSON string below
json = "{}"
# create an instance of ListIntegrations200Response from a JSON string
list_integrations200_response_instance = ListIntegrations200Response.from_json(json)
# print the JSON string representation of the object
print(ListIntegrations200Response.to_json())

# convert the object into a dict
list_integrations200_response_dict = list_integrations200_response_instance.to_dict()
# create an instance of ListIntegrations200Response from a dict
list_integrations200_response_from_dict = ListIntegrations200Response.from_dict(list_integrations200_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


