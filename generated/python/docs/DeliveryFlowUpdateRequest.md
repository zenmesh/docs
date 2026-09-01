# DeliveryFlowUpdateRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**destination_id** | **str** |  | [optional] 
**filters** | **List[object]** |  | [optional] 
**ingester_id** | **str** |  | [optional] 
**name** | **str** |  | [optional] 
**transformations** | **List[object]** |  | [optional] 

## Example

```python
from zen_mesh_api.models.delivery_flow_update_request import DeliveryFlowUpdateRequest

# TODO update the JSON string below
json = "{}"
# create an instance of DeliveryFlowUpdateRequest from a JSON string
delivery_flow_update_request_instance = DeliveryFlowUpdateRequest.from_json(json)
# print the JSON string representation of the object
print(DeliveryFlowUpdateRequest.to_json())

# convert the object into a dict
delivery_flow_update_request_dict = delivery_flow_update_request_instance.to_dict()
# create an instance of DeliveryFlowUpdateRequest from a dict
delivery_flow_update_request_from_dict = DeliveryFlowUpdateRequest.from_dict(delivery_flow_update_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


