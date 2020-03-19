# MiniTwit Backend project
This project is the backend rest API for the MiniTwit MERN stack project.

### Setup and operations

To run the project, run `npm install`

If you do not have Nodemon installed, please do so by running:
```bash
npm install nodemon
```

To start the application, run ```npm start```.

This will launch the project on localhost:3005, using Nodemon.

### Project structure
The main application is hosted from the `api.minitwit.js` file, using node and express.js.

The `api-routers.js` manages the direction of all the incoming requests to correct route controllers.

The `dbconnector.js` grants access to database connections and manages the lifetime of such connections and connection pools.

In the `src` folder, the `Controllers` handle specifik buissness logic controls and request/response tasks.

Also in `src`, the `DatabaseActions` provides some database action and request helper functions, 
responsible for dealing with the database layer in an abstract manner for cleaner database refactoring or replacement.

### Project tests
All tests are located at `/tests/`. Currently, there is only a postman request collection, and no test-suite.

## Database setup

If you have not installed MongoDB, see MongoDB Installation below.

### Getting started
First, run the test_users.js file by command: ```/tests/mongodb_tests/test_user.js```
If that runs with output, your DB is setup correctly. If not, try to look at the installation guide below.

If you comment out the delete call in ```function run``` in ```test_user.js``` file, the user should be created.
Comment out the create-call to only delete the user, from your local db.

When a user exists, try to retrieve it by visiting http://localhost:3005/users

### MongoDB installation
You have to install MongoDB to use it, follow the steps here:
https://tecadmin.net/install-mongodb-on-ubuntu/

### Freetier online DB at atlast for testing purposes
https://cloud.mongodb.com/v2/5e41a597014b76a14ab74984#clusters
User: OneDevOpsUser
Pass: OneDevOpsPassword

### Compas connector for MongoDB
Module connection string:
mongodb+srv://OneDevOpsUser:<password>@cluster0-kjjf5.mongodb.net/test

## Local
MongoDB Compas can be downloaded here:
https://downloads.mongodb.com/compass/mongodb-compass-community_1.20.5_amd64.deb
(After download just click to install)