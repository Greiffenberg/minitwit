#!/bin/bash
cd frontend
docker build -t frontend-dev -f Dockerfile.dev .

cd ../backend
docker build -t backend-dev -f Dockerfile.dev .

cd ..
docker-compose -f frontend_devmode_docker-compose.yml up -d

