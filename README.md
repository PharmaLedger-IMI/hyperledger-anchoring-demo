# Anchoring-demo

# Deploy simple test network
**1. Download Hyperledge fabric binaries and docker images.**
Change directory to PharmaLedger-IMI/anchoring-demo/AnchorAPI/Network/Hyperledger/Fabric/ 
Run ./scripts/boostrap.sh 2.0.1 1.4.6 0.4.18 -s 
or run ./scripts/DownloadBinaries_2.0.1.sh 

**2. Deploy the basic network**
Change directory to PharmaLedger-IMI/anchoring-demo/AnchorAPI/Network/DockerSimpleNetwork
Run ./network-deploy.sh
It will create a network composed of :
 - 2 organizations ,each with one peer using couchdb
 - certification authorities for each of those organizations
 - 1 orderer
 - each organization will have administrators and one user defined
Administrator : admin with password adminpw
User1 : user1 with user1pw

After the network is created, a channel will be created between peers.

After is finished, run : 
docker ps -a
to check the network.

**3. Deploy the chain code**
Run ./scripts/deployCC.sh
The script will copy the *.js and package json file in separate directory in order to build the package.

**4. Update the connection.json following the instruction in AnchorAPI/Hyperledger/readme** 

**5. run npm install in AnchorAPI directory**

**6. run npm test**
This will run the tests for :
 - api
 - json anchor validation
 - create the authorization information to execute chanincode on the network
 - creating and getting an anchor from the network
If the certificates are not correctly filled on connection.json, handshake exceptions will show up. 

**7. In order to update the chaincode :**
Change directory to PharmaLedger-IMI/anchoring-demo/AnchorAPI/Network/DockerSimpleNetwork
run ./scripts/upgradeCC versionNumber
versionNumber must be the next version to be installed. By default the installation will be made with version 1.
In case the versionNumber is wrong, the script will fail.

**8. In order to clean up the network :**
Change directory to PharmaLedger-IMI/anchoring-demo/AnchorAPI/Network/DockerSimpleNetwork
run ./network.sh down
If you executed the tests, remove the 'wallet' directory, otherwise in case you bring a new network up, authorization exceptions will be raised.

After it's complete, if you want to clear all docker images as well, run : docker system prune -af


