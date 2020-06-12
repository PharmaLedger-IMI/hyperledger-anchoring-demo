'use strict';

const FabricCAServices = require('fabric-ca-client');
const {Wallets}  = require('fabric-network');
const fs = require('fs');
const path = require('path');

const EnrollFabricUsers = {
  enrollAdmin : async function(){
      try {
          // load the network configuration
          const ccpPath = path.resolve(__dirname, 'connection.json');
          let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

          // Create a new CA client for interacting with the CA.
          const caURL = ccp.certificateAuthorities['ca-org1'].url;
          const ca = new FabricCAServices(caURL);
            console.log(caURL);

            // Create a new file system based wallet for managing identities.
          // create wallet either in process.cwd() or in current directory. We will create it in current directory
          //todo : refactor to have a common place to get the wallet
          const walletPath = path.join(process.cwd(), 'wallet');
          const wallet = await Wallets.newFileSystemWallet(walletPath);
          console.log(`Admin Wallet path: ${walletPath}`);

          // Check to see if we've already enrolled the admin user.
          const adminExists = await wallet.get('admin');
          if (adminExists) {
              console.log('An identity for the admin user "admin" already exists in the wallet');
              return true;
          }

          // Enroll the admin user, and import the new identity into the wallet.
          const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
          const x509Identity = {
              credentials: {
                  certificate: enrollment.certificate,
                  privateKey: enrollment.key.toBytes(),
              },
              mspId: 'org1MSP',
              type: 'X.509',
          };
          await wallet.put('admin', x509Identity);
          console.log('Successfully enrolled admin user "admin" and imported it into the wallet');

      } catch (error) {
          console.error(`Failed to enroll admin user "admin": ${error}`);
          return false;
      }
      return true;
  } ,
  enrollUser : async function(){
      try {
          // load the network configuration
          const ccpPath = path.resolve(__dirname, 'connection.json');
          const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

          // Create a new CA client for interacting with the CA.
          const caURL = ccp.certificateAuthorities['ca-org1'].url;
          const ca = new FabricCAServices(caURL);

          // Create a new file system based wallet for managing identities.
          // create wallet either in process.cwd() or in current directory. We will create it in current directory
          //todo : refactor to have a common place to get the wallet
          const walletPath = path.join(process.cwd(), 'wallet');
          const wallet = await Wallets.newFileSystemWallet(walletPath);
          console.log(`User Wallet path: ${walletPath}`);

          // Check to see if we've already enrolled the user.
          const userExists = await wallet.get('user2');
          if (userExists) {
              console.log('An identity for the user "user2" already exists in the wallet');
              return true;
          }

          // Check to see if we've already enrolled the admin user.
          const adminIdentity = await wallet.get('admin');
          if (!adminIdentity) {
              console.log('An identity for the admin user "admin" does not exist in the wallet');
              console.log('Run the enrollAdmin.js application before retrying');
              return false;
          }

          // build a user object for authenticating with the CA
          const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
          const adminUser = await provider.getUserContext(adminIdentity, 'admin');

         /* await ca.revoke({
              enrollmentID: 'user1',
          }, adminUser);
*/
          const enrollment = await ca.reenroll(adminUser,[{
             name:'user2',
              optional: true
         }]);

          //return true;
          // Register the user, enroll the user, and import the new identity into the wallet.
        /*  const secret = await ca.register({
              affiliation: 'org1.department1',
              enrollmentID: 'user2',
              role: 'client'
          }, adminUser);
          const enrollment = await ca.enroll({
              enrollmentID: 'user2',
              enrollmentSecret: secret
          });*/
          const x509Identity = {
              credentials: {
                  certificate: enrollment.certificate,
                  privateKey: enrollment.key.toBytes(),
              },
              mspId: 'org1MSP',
              type: 'X.509',
          };
          await wallet.put('user2', x509Identity);

          console.log('Successfully registered and enrolled admin user "user2" and imported it into the wallet');

      } catch (error) {
          console.error(`Failed to register user "user2": ${error}`);
          return false;
      }
      return true;
  },
    enroll : async function()
    {
        return await this.enrollAdmin() && await this.enrollUser();
    }
};


module.exports = EnrollFabricUsers;