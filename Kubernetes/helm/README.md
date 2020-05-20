# Hyperledger Fabric Helm Charts

Directory structure:


```bash
+---hlf-createchannel
+---hlf-joinchannel
+---hlf-ord
|   +---orderer
|   |   +---crypto
|   |   |   +---admin
|   |   |   +---ca
|   |   |   \---orderer
|   |   \---values
|   \---templates
\---hlf-peer
    +---peer
    |   +---crypto
    |   |   +---admin
    |   |   +---ca
    |   |   \---peer
    |   \---values
    \---templates
```

# Directory hlf-ord

It will contains the helm chart and demo code to run a solo orderer.

Execute : 
> ./hlf-ord/run.sh
 
to install the orderer using demo values. Execute 
>./hlf-ord/clean.sh

to remove the installation.

# Directory hlf-peer

It will contains the helm chart and demo code to run a peer.

Execute : 
> ./hlf-peer/run.sh
 
to install the peer using demo values. Execute 
>./hlf-peer/clean.sh

to remove the installation.

# Check peer - orderer

Deploy create channel and join channel or  :
```bash
// get the orderer cluster ip
$ kubectl get services -n pharma
```
than execute in the peer pod:
```bash

peer channel create -o <orderer-ip>:7050 -c mychannel -f ./hl_config/channel/hlf--channel/mychannel.tx

// switch to admin to invoke channel join
export CORE_PEER_MSPCONFIGPATH=/var/hyperledger/admin_msp
peer channel join -b mychannel.block

//revert changes
export CORE_PEER_MSPCONFIGPATH=/var/hyperledger/msp

peer channel list
// it should list mychannel
```
