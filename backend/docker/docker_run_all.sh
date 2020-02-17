# docker system prune -f
# docker image rm minitwit/dbserver

echo ''
echo '-----------------BUILDING DOCKER IMAGES----------'
echo ''

# docker build -f ./../Dockerfile.db -t minitwit/dbserver .
echo ''
docker build -f ./../Dockerfile.be -t minitwit/backendserver .

echo ''
echo '-----------------RUNNING DOCKER COMPOSE----------'
echo ''

docker-compose up --no-recreate
