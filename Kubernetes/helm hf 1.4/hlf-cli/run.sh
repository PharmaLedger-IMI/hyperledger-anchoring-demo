#!/bin/bash

### Create the namespace pharma
kubectl create namespace pharma


### Install

    helm install ./hlf-cli -n cli0 --namespace pharma -f ./hlf-cli/peer/values/peer.yaml --generate-name

