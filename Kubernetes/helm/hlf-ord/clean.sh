#!/bin/bash

### Get orderer pod
export ORD_POD=$(kubectl get pods --namespace pharma -l "app=hlf-ord" -o jsonpath="{.items[0].metadata.name}")


### Delete secrets
kubectl -n pharma delete secret hlf--ord-admincert hlf--ord-cacert hlf--ord0-idcert hlf--ord0-idkey hlf--genesis

### Delete release
#helm delete ORD_RELEASE_NAME -n pharma

helm list -n pharma

### List all pharma pods
kubectl get pods -n pharma
