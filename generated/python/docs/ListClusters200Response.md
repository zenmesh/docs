# ListClusters200Response


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**clusters** | [**List[Cluster]**](Cluster.md) |  | [optional] 

## Example

```python
from zen_mesh_api.models.list_clusters200_response import ListClusters200Response

# TODO update the JSON string below
json = "{}"
# create an instance of ListClusters200Response from a JSON string
list_clusters200_response_instance = ListClusters200Response.from_json(json)
# print the JSON string representation of the object
print(ListClusters200Response.to_json())

# convert the object into a dict
list_clusters200_response_dict = list_clusters200_response_instance.to_dict()
# create an instance of ListClusters200Response from a dict
list_clusters200_response_from_dict = ListClusters200Response.from_dict(list_clusters200_response_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


