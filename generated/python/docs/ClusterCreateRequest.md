# ClusterCreateRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**certificate_mode** | **str** | Certificate management mode | [optional] [default to 'platform-managed']
**certificate_owner** | **str** | Owner of the certificate | [optional] 
**environment** | **str** | Deployment environment | [optional] 
**ingress_host** | **str** | Canonical Data Plane ingress host for this cluster | [optional] 
**ingress_public_ip** | **str** | Static IP for dedicated plans | [optional] 
**name** | **str** |  | 
**provider** | **str** | Cloud provider (aws, gcp, azure, on-prem) | [optional] 
**region** | **str** | Cloud region | [optional] 
**rotation_policy** | **str** | Certificate rotation policy | [optional] 

## Example

```python
from zen_mesh_api.models.cluster_create_request import ClusterCreateRequest

# TODO update the JSON string below
json = "{}"
# create an instance of ClusterCreateRequest from a JSON string
cluster_create_request_instance = ClusterCreateRequest.from_json(json)
# print the JSON string representation of the object
print(ClusterCreateRequest.to_json())

# convert the object into a dict
cluster_create_request_dict = cluster_create_request_instance.to_dict()
# create an instance of ClusterCreateRequest from a dict
cluster_create_request_from_dict = ClusterCreateRequest.from_dict(cluster_create_request_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


