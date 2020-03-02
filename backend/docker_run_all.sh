echo ''
echo '-----------------BUILDING DOCKER IMAGES----------'
echo ''

docker build -f Dockerfile.db -t onedevopsitu/db .
echo ''
docker build -f Dockerfile.be -t onedevopsitu/backend .

echo ''
echo '-----------------RUNNING DOCKER COMPOSE----------'
echo ''

#cd docker && docker-compose up --no-recreate