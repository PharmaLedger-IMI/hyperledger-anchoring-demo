<h4> Deploy Hyperledger Fabric network with Anchor chaincode </h4>

 Check the instructions from the 2.1 folder in order how to do so.

<h4> Deploy AnchorAPI </h4>

 - kubectl apply -f AnchorApiPod.yml
 - kubectl apply -f AnchorService-definition.yml

Check for running instance:

 - kubectl get services
 - kubectl get pods


<h4> Operate the AnchorAPI : </h4> 

AnchorAPI will be exposed on port 3000 <br/>
Available POST operations :

 - createAnchor
 - updateAnchor
 - getAnchor
 - deleteAnchor

Import in PostMan the file AnchorApi_PostManCollectionv2.json, update the external-ip with the one obtained, in order to check the API