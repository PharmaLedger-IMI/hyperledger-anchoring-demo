# Chart peer demo

Commands should be run from the /helm folder

## Peer

### Set up cryptographic material

#### Peer Org admin

    ORG_CERT=$(ls ./hlf-peer/peer/crypto/admin/*.pem)

    kubectl create secret generic -n pharma hlf--peer-admincert --from-file=cert.pem=$ORG_CERT

    ORG_KEY=$(ls ./hlf-peer/peer/crypto/admin/*_sk)

    kubectl create secret generic -n pharma hlf--peer-adminkey --from-file=key.pem=$ORG_KEY

    CA_CERT=$(ls ./hlf-peer/peer/crypto/ca/*.pem)

    kubectl create secret generic -n pharma hlf--peer-cacert --from-file=cacert.pem=$CA_CERT

#### Peer node

    NODE_CERT=$(ls ./hlf-peer/peer/crypto/peer/*.pem)

    kubectl create secret generic -n pharma hlf--peer0-idcert --from-file=cert.pem=$NODE_CERT

    NODE_KEY=$(ls ./hlf-peer/peer/crypto/peer/*_sk)

    kubectl create secret generic -n pharma hlf--peer0-idkey --from-file=key.pem=$NODE_KEY

#### Genesis block

    kubectl create secret generic -n pharma hlf--channel --from-file=./hlf-peer/peer/crypto/mychannel.tx

### Install

Install helm chart of peer.

    helm install ./hlf-peer -n peer0 --namespace pharma -f ./hlf-peer/tests/values/peer.yaml

    export PEER_POD=$(kubectl get pods --namespace pharma -l "app=hlf-peer,release=peer0" -o jsonpath="{.items[0].metadata.name}")

Check that server is running

    kubectl logs -n pharma $PEER_POD | grep 'Starting peer'

### Cleanup

Delete charts we installed

    helm delete peer0 -n pharma

Delete the secrets we created

    kubectl -n pharma delete secret hlf--peer-admincert hlf--peer-adminkey hlf--peer-cacert hlf--peer0-idcert hlf--peer0-idkey hlf--channel
