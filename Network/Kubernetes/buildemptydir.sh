docker build -t ledger-emptydir -f docker/dockerfile-emptydir .
docker tag ledger-emptydir:latest  mabdockerid/ledger-emptydir:latest
docker push mabdockerid/ledger-emptydir:latest