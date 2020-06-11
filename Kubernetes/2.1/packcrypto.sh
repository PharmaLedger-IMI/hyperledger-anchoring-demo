#!/bin/bash

rm -rf ./shared/network/chaincode/*

cp -avr ./chaincode/* ./shared/network/chaincode

cd ./shared
rm network.tar.gz
tar -cf network.tar.gz ./network/

echo Crypto packed.