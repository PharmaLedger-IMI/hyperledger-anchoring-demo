docker build -t ledger-anchorapi -f docker/Dockerfile .
docker-compose -f docker/docker-compose-anchorapi.yaml up -d