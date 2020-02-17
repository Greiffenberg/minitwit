# docker system prune -f
# docker image rm minitwit/dbserver
docker build -f ./db/Dockerfile -t minitwit/dbserver .
docker build -f ./backend/Dockerfile -t minitwit/backendserver .
docker-compose up -d --no-recreate