#!/bin/bash

kubectl apply -f ./pvc
echo sleep 15 untill pvc are filled
sleep 15
kubectl apply -f ./orderer-service
echo sleep 15
sleep 15
kubectl apply -f ./org1
echo sleep 15
sleep 15
kubectl get pods