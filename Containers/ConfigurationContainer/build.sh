#!/bin/bash
echo Build image

docker build -t ledger-emptydir -f dockerfile .
docker tag ledger-emptydir:latest  mabdockerid/ledger-emptydir:latest

echo push ledger image
docker push mabdockerid/ledger-emptydir:latest