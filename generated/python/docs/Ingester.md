# Ingester


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**cluster_id** | **str** |  | [optional] 
**config** | **Dict[str, object]** |  | [optional] 
**created_at** | **datetime** |  | [optional] 
**id** | **str** |  | [optional] 
**name** | **str** |  | [optional] 
**rendered_yaml** | **str** |  | [optional] 
**tenant_id** | **str** |  | [optional] 
**type** | **str** |  | [optional] 
**updated_at** | **datetime** |  | [optional] 

## Example

```python
from zen_mesh_api.models.ingester import Ingester

# TODO update the JSON string below
json = "{}"
# create an instance of Ingester from a JSON string
ingester_instance = Ingester.from_json(json)
# print the JSON string representation of the object
print(Ingester.to_json())

# convert the object into a dict
ingester_dict = ingester_instance.to_dict()
# create an instance of Ingester from a dict
ingester_from_dict = Ingester.from_dict(ingester_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


