docker build -t ledger-anchorapi -f docker/dockerfile .
docker tag ledger-anchorapi:latest  mabdockerid/ledger-anchorapi:latest
docker push mabdockerid/ledger-anchorapi:latest