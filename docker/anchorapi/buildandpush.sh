#!/bin/bash
echo build ledger-anchorapi image
docker build -t ledger-anchorapi -f docker/dockerfile .
docker tag ledger-anchorapi:latest  mabdockerid/ledger-anchorapi:latest

echo push ledger-anchorapi
docker push mabdockerid/ledger-anchorapi:latest