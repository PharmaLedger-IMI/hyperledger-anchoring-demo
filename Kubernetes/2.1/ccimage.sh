#!/bin/bash

echo Building CC base docker image
docker build -t ledgerccmarbles -f chaincode/dockerfile .
docker tag ledgerccmarbles:latest  mabdockerid/ledgerccmarbles:latest
echo Push ledgerCCmarbles image
docker push mabdockerid/ledgerccmarbles:latest