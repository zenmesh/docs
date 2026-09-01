# IngesterCreateRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**config** | **Dict[str, object]** |  | 
**name** | **str** |  | 
**type** | **str** |  | 

## Example

```python
from zen_mesh_api.models.ingester_create_request import IngesterCreateRequest

# TODO update the JSON string below
json = "{}"
# create an instance of IngesterCreateRequest from a JSON string
ingester_create_request_instance = IngesterCreateRequest.from_json(json)
# print the JSON string representation of the object
print(IngesterCreateRequest.to_json())

# convert the object into a dict
ingester_create_request_dict = ingester_create_request_instance.to_dict()
# create an instance of IngesterCreateRequest from a dict
ingester_create_request_from_dict = IngesterCreateRequest.from_dict(ingester_create_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


