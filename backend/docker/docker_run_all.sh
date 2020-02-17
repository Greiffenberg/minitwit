# docker system prune -f
# docker image rm minitwit/dbserver

echo ''
echo '-----------------BUILDING DOCKER IMAGES----------'
echo ''

docker build -f ./db/Dockerfile -t minitwit/dbserver .
docker build -f ./backend/Dockerfile -t minitwit/backendserver .

echo ''
echo '-----------------RUNNING DOCKER COMPOSE----------'
echo ''

docker-compose up -d --no-recreate