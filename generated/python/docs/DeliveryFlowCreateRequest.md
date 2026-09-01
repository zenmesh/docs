# DeliveryFlowCreateRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**destination_id** | **str** |  | 
**filters** | **List[object]** |  | [optional] 
**ingester_id** | **str** |  | 
**name** | **str** |  | 
**transformations** | **List[object]** |  | [optional] 

## Example

```python
from zen_mesh_api.models.delivery_flow_create_request import DeliveryFlowCreateRequest

# TODO update the JSON string below
json = "{}"
# create an instance of DeliveryFlowCreateRequest from a JSON string
delivery_flow_create_request_instance = DeliveryFlowCreateRequest.from_json(json)
# print the JSON string representation of the object
print(DeliveryFlowCreateRequest.to_json())

# convert the object into a dict
delivery_flow_create_request_dict = delivery_flow_create_request_instance.to_dict()
# create an instance of DeliveryFlowCreateRequest from a dict
delivery_flow_create_request_from_dict = DeliveryFlowCreateRequest.from_dict(delivery_flow_create_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


