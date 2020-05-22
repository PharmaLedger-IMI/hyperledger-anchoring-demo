#!/bin/bash




### Delete secrets
kubectl -n pharma delete secret hlf--peer-admincert hlf--peer-adminkey hlf--peer-cacert hlf--peer0-idcert hlf--peer0-idkey hlf--channel

### Delete release


helm list -n pharma

### List all pharma pods
kubectl get pods -n pharma
