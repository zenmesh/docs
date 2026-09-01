# ChannelCreateRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**config** | **Dict[str, object]** |  | 
**name** | **str** |  | 

## Example

```python
from zen_mesh_api.models.channel_create_request import ChannelCreateRequest

# TODO update the JSON string below
json = "{}"
# create an instance of ChannelCreateRequest from a JSON string
channel_create_request_instance = ChannelCreateRequest.from_json(json)
# print the JSON string representation of the object
print(ChannelCreateRequest.to_json())

# convert the object into a dict
channel_create_request_dict = channel_create_request_instance.to_dict()
# create an instance of ChannelCreateRequest from a dict
channel_create_request_from_dict = ChannelCreateRequest.from_dict(channel_create_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


