#!/bin/bash

echo Building CC anchor base docker image
docker build -t ledgerccanchor -f chaincode/dockerfile .
docker tag ledgerccanchor:latest  mabdockerid/ledgerccanchor:latest
echo Push ledgerCCanchor image
docker push mabdockerid/ledgerccanchor:latest