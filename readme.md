# MiniTwit Project - Group "LearnIT > GitHub"
## Second repo
We are using [Travis-CI](https://github.itu.dk/mahn/OneDevOps/wiki/Travis-CI) to run our pipeline, but since Travis-CI can only connect and watch private repo's we have a second private repo, where the code from the master branch in this public repo is pushed to in our deploy script

## Controlling the project
A control script has yet to be implemented - see
 the individual system readme files for information on operations.

### Frontend project
Located in the subdirectory: `/frontend/`

This project uses ReactJS and can be launched independently of the backend.

### Backend project
Located in the subdirectory: `/backend/`

This project uses NodeJS and Express to expose a MongoDB database through
 a REST API for consumption from the frontend and simulation tool.

The project can be launched independently of the backend.

### Legacy project
Located in the subdirectory: `/legacy_project/`

The original code, running on python flask - refactored to run on linux 18_04 distros.


# SLA
### Definitions
- **"Downtime"** means unavailability by lack of connection or response from the services and endpoints.
- **"Error"** means failure to handle valid requests or to serve intended content and responses.
- **"Expected uptime"** for our services and endpoints is atleast 95% of non-downtime.
- **"Expected error rate"** for our services and endpoints is of less than 2% of requests met by an error.
- **"Expected performance"** is of less than a second in all api endpoint response times, with less
 than 1000 returned objects (?no =< 1000). This time is excluding the **client** time to ping, for slow networks or remote regions.
