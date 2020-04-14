<h4> Create and publish images for AnchorAPI and Ledger </h4>

 - Execute ./buildandpush.sh from AnchorApi and Ledger

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