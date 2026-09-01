# Cluster


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**certificate_mode** | **str** | Certificate management mode | [optional] [default to 'platform-managed']
**certificate_owner** | **str** | Owner of the certificate (optional, for customer-managed mode) | [optional] 
**created_at** | **datetime** |  | [optional] 
**environment** | **str** | Deployment environment (production, staging, dev) | [optional] 
**id** | **str** |  | [optional] 
**ingress_host** | **str** | Canonical Data Plane ingress host (&lt;provider&gt;-&lt;region&gt;.ingesters[.&lt;env&gt;].zen-mesh.io) | [optional] 
**ingress_public_ip** | **str** | Static IP for dedicated plans (optional) | [optional] 
**last_seen** | **datetime** | Last time the cluster was seen | [optional] 
**name** | **str** |  | [optional] 
**provider** | **str** | Cloud provider (aws, gcp, azure, on-prem) | [optional] 
**region** | **str** | Cloud region where the cluster is deployed | [optional] 
**rotation_policy** | **str** | Certificate rotation policy (optional) | [optional] 
**status** | **str** |  | [optional] 
**tenant_id** | **str** |  | [optional] 
**updated_at** | **datetime** |  | [optional] 
**version** | **str** | Kubernetes version | [optional] 
**zen_bridge_endpoint** | **str** | Bridge endpoint for PORTAL URL construction (deprecated, use ingress_host) | [optional] 

## Example

```python
from zen_mesh_api.models.cluster import Cluster

# TODO update the JSON string below
json = "{}"
# create an instance of Cluster from a JSON string
cluster_instance = Cluster.from_json(json)
# print the JSON string representation of the object
print(Cluster.to_json())

# convert the object into a dict
cluster_dict = cluster_instance.to_dict()
# create an instance of Cluster from a dict
cluster_from_dict = Cluster.from_dict(cluster_dict)
```
[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)


