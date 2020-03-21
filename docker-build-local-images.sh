docker build -t onedevopsitu/frontend:latest . -f frontend/Dockerfile.dev
docker build -t onedevopsitu/backend:latest . -f backend/Dockerfile.be
docker build -t onedevopsitu/db:latest . -f backend/Dockerfile.db
docker build -t onedevopsitu/test:latest . -f tests/Dockerfile.test
docker build -t onedevopsitu/grafana:latest . -f mon-log/grafana/Dockerfile
docker build -t onedevopsitu/prometheus:latest . -f mon-log/prometheus/Dockerfile
docker build -t onedevopsitu/elasticsearch:latest . -f mon-log/elasticsearch/Dockerfile
docker build -t onedevopsitu/logstash:latest . -f mon-log/logstash/Dockerfile
docker build -t onedevopsitu/kibana:latest . -f mon-log/kibana/Dockerfile