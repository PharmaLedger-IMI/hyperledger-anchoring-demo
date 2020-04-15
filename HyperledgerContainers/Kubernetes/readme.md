Deploying AnchorAPI

kubectl create -f AnchorApiDefinition.yml

kubectl create -f AnchorService-definition.yml

Check for running instance:

kubectl get services --output=wide