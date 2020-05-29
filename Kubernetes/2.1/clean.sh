#!/bin/bash

kubectl delete -f ./chaincode/k8s
kubectl delete -f ./org1
kubectl delete -f ./orderer-service
kubectl delete -f ./pvc

kubectl get pods
kubectl get services