# IngesterUpdateRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**config** | **Dict[str, object]** |  | [optional] 
**name** | **str** |  | [optional] 

## Example

```python
from zen_mesh_api.models.ingester_update_request import IngesterUpdateRequest

# TODO update the JSON string below
json = "{}"
# create an instance of IngesterUpdateRequest from a JSON string
ingester_update_request_instance = IngesterUpdateRequest.from_json(json)
# print the JSON string representation of the object
print(IngesterUpdateRequest.to_json())

# convert the object into a dict
ingester_update_request_dict = ingester_update_request_instance.to_dict()
# create an instance of IngesterUpdateRequest from a dict
ingester_update_request_from_dict = IngesterUpdateRequest.from_dict(ingester_update_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


