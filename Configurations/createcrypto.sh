#make sure to expose binary file compatible with hosting OS
export PATH=${PWD}/bin:${PWD}:$PATH

#expose local configtx files
export FABRIC_CFG_PATH=${PWD}

echo
        echo "#################################################################"
        echo "### Generating crypto material for organizations              ###"
        echo "#################################################################"

if [  -d ./crypto-config ]; then
                rm -drf crypto-config
        fi

if [  -d ./channel-artifacts ]; then
                rm -drf channel-artifacts
        fi

cryptogen generate --config=./crypto-config.yaml

if [ ! -d ./channel-artifacts ]; then
                mkdir channel-artifacts
        fi

 echo
        echo "#################################################################"
        echo "### Generating channel configuration transaction 'channel.tx' ###"
        echo "#################################################################"

configtxgen -profile TwoOrgsOrdererGenesis -channelID testchainid -outputBlock ./channel-artifacts/genesis.block
configtxgen -profile TwoOrgsChannel -outputCreateChannelTx ./channel-artifacts/channel.tx -channelID "mychannel"

echo
        echo "#################################################################"
        echo "#######    Generating anchor peer update for Org1MSP   ##########"
        echo "#################################################################"
        configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/org1Anchors.tx  -channelID "mychannel" -asOrg org1MSP

        echo
        echo "#################################################################"
        echo "#######    Generating anchor peer update for Org2MSP   ##########"
        echo "#################################################################"
        configtxgen -profile TwoOrgsChannel -outputAnchorPeersUpdate ./channel-artifacts/org2Anchors.tx  -channelID "mychannel" -asOrg org2MSP
        echo
