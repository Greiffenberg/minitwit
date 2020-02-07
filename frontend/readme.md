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
$ npm init react-app MiniTwit
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
