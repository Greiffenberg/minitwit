docker build -t onedevopsitu/frontend:latest . -f frontend/Dockerfile.dev
docker build -t onedevopsitu/backend:latest . -f backend/Dockerfile.be
docker build -t onedevopsitu/db:latest . -f backend/Dockerfile.db
docker build -t onedevopsitu/test:latest . -f tests/Dockerfile.test
