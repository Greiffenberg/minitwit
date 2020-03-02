# MiniTwit Project - Group "LearnIT > GitHub"

## Installation and Setup Instructions
For development, you will only need Node.js installed on your environment.
### Node
[Node](https://nodejs.org/en/about/) is really easy to install and now also includes [NPM](https://www.npmjs.com/).
##### Node installation on Linux
Run the following command to install it.
```console
$ sudo apt install nodejs
```
To check whether it is installed, run the following commands and check the installed versions.
```console
$ node --version
v8.10.0
```
```console
$ npm --version
3.5.2
```
## How To Run It
### Install project
```console
$ git clone https://github.itu.dk/mahn/OneDevOps.git
$ cd OneDevOps
$ npm install
```
### Start project
```console
$ npm start
```
### Simple build for production
```console
$ npm run build
```
## Language and Tools
### React
#### Create react app
Check version of npm - make sure you have latest stable
Create create app via npm script
```console
$ npm --version
$ npm init react-app minitwit
```
The React app creation in this project was done on OSX with npm version 6.13.7

## Folder Structure
Consists of three outer folders; backend, frontend, legacy_project
### Frontend folder
The frontend folder contains a React application which consists of:
- src
  - App.js
  - Index.js
  - Folder of components
  - Folder of pages
- public
- package.json

## Architecture Decisions

## Launching frontend with Docker
In the root folder of the frontend folder there are three files:
- Dockerfile.prod (Dockerfile for production)
- Dockerfile.dev (Dockerfile for development)
- launch_frontend_devmode.sh (script for launching a frontend container in addition to calling the launch_backend_devmode.sh script)

The Dockerfile for production should be used on the production server. It spawns a container where the fontend is being build in order to serve static content to the user.

The Dockerfile for development should be used locally to develop and test the frontend in a similar environment as production. The environment can vary a bit, for example if the Dockerfile is used on OSX or Microsoft, it will spawn a linux VM that may differ from production linux distro and version. The dependencies of the frontend React project will be the same in the same versions.
Instead of building and serving static content, the Dockerfile.dev will spawn a webpack-development-server in the container. 

