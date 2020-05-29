# Hyperledger fabric 2.1 using chaincode as external service on Kubernetes

https://hyperledger-fabric.readthedocs.io/en/release-2.1/cc_service.html

```shell script

#NOTE: sometimes the commands could fail, try them again
#NOTE: crypto is packed for testing purposes
#NOTE: If crypto is regenerated, make sure to have in ${PWD}/bin the platform specific fabric binaries. Update ./shared/network folder with changes and exec packcrypto.sh.

#deploy the basic network 
./start.sh

#org1-cli kubectl exec : 

#create the channel and join it
peer channel create -o orderer0:7050 -c mychannel -f ./scripts/channel-artifacts/channel.tx --tls true --cafile $ORDERER_CA
peer channel join -b mychannel.block

#build the metadata for chaincode container, so the peer will know where it is

cd /opt/gopath/src/github.com/marbles/packaging
tar cfz code.tar.gz connection.json
tar cfz marbles-org1.tgz code.tar.gz metadata.json

#install the chaincode metadata
peer lifecycle chaincode install marbles-org1.tgz

#get chaincode id from console
#update yaml file -f ./chaincode/k8s for the chaincode container 
#NOTE: chaincode use a custom image. It is build using ./ccimage.sh . Currentlly it is published with marbles chaincode.

#deploy chaincode container -f/chaincode/k8s
kubectl apply -f ./chaincode/k8s

#after is up and running go back to org1-cli container
#NOTE: Update the  --package-id with the package chaincode  id got above
#check for aprrove. Every organization must approve it. In out case we have 1 organization
peer lifecycle chaincode approveformyorg --channelID mychannel --name marbles --version 1.0 --init-required --package-id marbles:5fcd27e6bd036cbc37a2130c03c3b4175d531fda46c99c53b4b5d8c5a8b69ae6 --sequence 1 -o orderer0:7050 --tls --cafile $ORDERER_CA

#check readiness. it will show who approved and who not
peer lifecycle chaincode checkcommitreadiness --channelID mychannel --name marbles --version 1.0 --init-required --sequence 1 -o -orderer0:7050 --tls --cafile $ORDERER_CA

#commit the chaincode
peer lifecycle chaincode commit -o orderer0:7050 --channelID mychannel --name marbles --version 1.0 --sequence 1 --init-required --tls true --cafile $ORDERER_CA --peerAddresses peer0-org1:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1/peers/peer0-org1/tls/ca.crt 

#invoke and initialize the chaincode
peer chaincode invoke -o orderer0:7050 --isInit --tls true --cafile $ORDERER_CA -C mychannel -n marbles --peerAddresses peer0-org1:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1/peers/peer0-org1/tls/ca.crt -c '{"Args":["initMarble","marble1","blue","35","tom"]}' --waitForEvent

#execute some invokes on Init method of the chaincode
peer chaincode invoke -o orderer0:7050 --tls true --cafile $ORDERER_CA -C mychannel -n marbles --peerAddresses peer0-org1:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1/peers/peer0-org1/tls/ca.crt  -c '{"Args":["initMarble","marble1","blue","35","tom"]}' --waitForEvent

peer chaincode invoke -o orderer0:7050 --tls true --cafile $ORDERER_CA -C mychannel -n marbles --peerAddresses peer0-org1:7051 --tlsRootCertFiles /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1/peers/peer0-org1/tls/ca.crt  -c '{"Args":["initMarble","marble2","red","50","tom"]}' --waitForEvent

#execute query on the ledger on the chaincode based on the inputs above. 

peer chaincode query -C mychannel -n marbles -c '{"Args":["readMarble","marble1"]}'

peer chaincode query -C mychannel -n marbles -c '{"Args":["readMarble","marble2"]}'

```
