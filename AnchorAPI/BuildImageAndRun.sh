docker build -t ledger-anchorapi -f docker/Dockerfile .
#docker run -it -p 3000:3000 --name=anchorapi --network=test ledger-anchorapi 

docker-compose -f docker/docker-compose-anchorapi.yaml up -d