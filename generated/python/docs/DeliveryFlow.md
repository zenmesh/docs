# DeliveryFlow


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**cluster_id** | **str** |  | [optional] 
**created_at** | **datetime** |  | [optional] 
**destination_id** | **str** |  | [optional] 
**filters** | **List[object]** |  | [optional] 
**id** | **str** |  | [optional] 
**ingester_id** | **str** |  | [optional] 
**name** | **str** |  | [optional] 
**rendered_yaml** | **str** |  | [optional] 
**tenant_id** | **str** |  | [optional] 
**transformations** | **List[object]** |  | [optional] 
**updated_at** | **datetime** |  | [optional] 

## Example

```python
from zen_mesh_api.models.delivery_flow import DeliveryFlow

# TODO update the JSON string below
json = "{}"
# create an instance of DeliveryFlow from a JSON string
delivery_flow_instance = DeliveryFlow.from_json(json)
# print the JSON string representation of the object
print(DeliveryFlow.to_json())

# convert the object into a dict
delivery_flow_dict = delivery_flow_instance.to_dict()
# create an instance of DeliveryFlow from a dict
delivery_flow_from_dict = DeliveryFlow.from_dict(delivery_flow_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


