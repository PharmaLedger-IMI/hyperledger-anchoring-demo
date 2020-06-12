#!/bin/bash

### Create the namespace pharma
kubectl create namespace pharma


### Install

    helm install ./hlf-ccenv -n ccenv --namespace pharma -f ./hlf-ccenv/peer/values/peer.yaml --generate-name

