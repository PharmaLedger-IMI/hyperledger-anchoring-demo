# Anchoring-demo

**1. Download Hyperledge fabric binaries and docker images.**<br/>

Change directory to PharmaLedger-IMI/anchoring-demo/AnchorAPI/Network/Hyperledger/Fabric/ <br/>
Run ./scripts/boostrap.sh 2.0.1 1.4.6 0.4.18 -s <br/>
or run ./scripts/DownloadBinaries_2.0.1.sh <br/>

**2. Deploy the basic network**<br/>

Change directory to PharmaLedger-IMI/anchoring-demo/AnchorAPI/Network/DockerSimpleNetwork<br/>
Run ./network-deploy.sh<br/>
It will create a network composed of :
 - 2 organizations ,each with one peer using couchdb
 - certification authorities for each of those organizations
 - 1 orderer
 - each organization will have administrators and one user defined
 
Administrator : admin with password adminpw<br/>
User1 : user1 with user1pw<br/>

After the network is created, a channel will be created between peers.

Run :<br/> 
docker ps -a<br/>
to check the network.<br/>

**3. Deploy the chain code**<br/>

Run ./scripts/deployCC.sh<br/>
The script will copy the *.js and package json file in separate directory in order to build the package.<br/>

**4. Update the connection.json following the instruction in AnchorAPI/Hyperledger/readme** 

**5. run npm install in AnchorAPI directory**

**6. run npm test**<br/>

This will run the tests for :
 - api
 - json anchor validation
 - create the authorization information to execute chanincode on the network
 - creating and getting an anchor from the network
 
If the certificates are not correctly filled in connection.json, handshake exceptions will be raised. 

**7. In order to update the chaincode :**<br/>

Change directory to PharmaLedger-IMI/anchoring-demo/AnchorAPI/Network/DockerSimpleNetwork<br/>
run ./scripts/upgradeCC versionNumber<br/>
**versionNumber** must be the next number version to be installed. By default the installation will be made with version 1.<br/>
In case the **versionNumber** is wrong, the script will fail.<br/>

**8. In order to clean up the network :**<br/>

Change directory to PharmaLedger-IMI/anchoring-demo/AnchorAPI/Network/DockerSimpleNetwork<br/>
run ./network.sh down<br/>
If you executed the tests, remove the 'wallet' directory, otherwise in case you bring a new network up, authorization exceptions will be raised.<br/>

After it's complete, if you want to clear all docker images as well, run : docker system prune -af<br/>
<br/>
<br/>


