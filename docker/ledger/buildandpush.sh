#!/bin/bash
echo Build image

docker build -t ledger-emptydir -f docker/dockerfile-emptydir .
docker tag ledger-emptydir:latest  mabdockerid/ledger-emptydir:latest

echo push ledger image
docker push mabdockerid/ledger-emptydir:latest