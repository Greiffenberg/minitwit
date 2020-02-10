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

### Needed installations
You have to install MongoDB to use it, follow the steps here:
https://tecadmin.net/install-mongodb-on-ubuntu/

### Database
bla-bla-bla
Vi har PT en test MongoDB hosted på free tier hos Atlas:
https://cloud.mongodb.com/v2/5e41a597014b76a14ab74984#clusters
User: OneDevOpsUser
Pass: OneDevOpsPassword
(The stuff above should of course never be in a readme, but here they are for you to read)
