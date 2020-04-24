#!/bin/bash
echo Build image Fabric CA

docker build -t ledger-fabric-ca -f dockerfile-ca .
docker tag ledger-fabric-ca:latest  mabdockerid/ledger-fabric-ca:latest

echo push ledger image Fabric CA
docker push mabdockerid/ledger-fabric-ca:latest

echo Build image Fabric PEER

docker build -t ledger-fabric-peer -f dockerfile-peer .
docker tag ledger-fabric-peer:latest  mabdockerid/ledger-fabric-peer:latest

echo push ledger image Fabric PEER
docker push mabdockerid/ledger-fabric-peer:latest

echo Build image Fabric ORDERER

docker build -t ledger-fabric-orderer -f dockerfile-peer .
docker tag ledger-fabric-orderer:latest  mabdockerid/ledger-fabric-orderer:latest

echo push ledger image Fabric ORDERER
docker push mabdockerid/ledger-fabric-orderer:latest