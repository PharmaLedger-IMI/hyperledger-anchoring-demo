echo Building AnchorAPI docker image
docker build -t ledger-anchorapi -f docker/dockerfile .
docker tag ledger-anchorapi:latest  mabdockerid/ledger-anchorapi:latest
echo Push AnchorAPI image
docker push mabdockerid/ledger-anchorapi:latest