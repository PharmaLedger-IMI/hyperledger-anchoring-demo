#!/bin/bash

### Create the namespace pharma
kubectl create namespace pharma


### Set up cryptographic material

#### Orderer Org admin

    ORG_CERT=$(ls ./hlf-ord/orderer/crypto/admin/*.pem)

    kubectl create secret generic -n pharma hlf--ord-admincert --from-file=cert.pem=$ORG_CERT

    CA_CERT=$(ls ./hlf-ord/orderer/crypto/ca/*.pem)

    kubectl create secret generic -n pharma hlf--ord-cacert --from-file=cacert.pem=$CA_CERT

#### Orderer node

    NODE_CERT=$(ls ./hlf-ord/orderer/crypto/orderer/*.pem)

    kubectl create secret generic -n pharma hlf--ord0-idcert --from-file=cert.pem=$NODE_CERT

    NODE_KEY=$(ls ./hlf-ord/orderer/crypto/orderer/*_sk)

    kubectl create secret generic -n pharma hlf--ord0-idkey --from-file=key.pem=$NODE_KEY

#### Genesis block

    kubectl create secret generic -n pharma hlf--genesis --from-file=./hlf-ord/orderer/crypto/genesis.block


#### Install helm chart of orderer.

    helm install ./hlf-ord -n ord0 --namespace pharma -f ./hlf-ord/orderer/values/orderer.yaml --generate-name

    export ORD_POD=$(kubectl get pods --namespace pharma -l "app=hlf-ord" -o jsonpath="{.items[0].metadata.name}")

    kubectl logs -n pharma $ORD_POD

#### List all pods from pharma namespace

kubectl get pods -n pharma

#### List all helm installed releases
helm list -n pharma