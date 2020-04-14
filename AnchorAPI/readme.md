# AnchorAPI

  **1. Requirements**
  
 Make sure to update the contents of `connection.json` and have access to am Hyperledger fabric network with chaincode deployed
 <br/>
  
  **2. `npm install` in AnchorAPI directory**
  
  **3. `npm test` to execute the tests<br/>**
  
  This will run the tests for :
   - api
   - json anchor validation
   - create the authorization information to execute chanincode on the network
   - creating and getting an anchor from the network
   
  If the certificates are not correctly filled in connection.json, handshake exceptions will be raised. 
 
 AnchorAPI will be exposed on port 3000 <br/>
 Available POST operations :
 
  - createAnchor
  - updateAnchor
  - getAnchor
  - deleteAnchor