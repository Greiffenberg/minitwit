#!/bin/bash

cd frontend
docker build -t frontend-dev -f Dockerfile.dev .
docker rm frontend_dev_01
docker run -d --name frontend_dev_01 -p 3000:3000 -it --rm frontend-dev

cd ../backend/docker
sh docker_run_all.sh

