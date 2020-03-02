# MiniTwit Project - Group "LearnIT > GitHub"
## Second repo
We are using [Travis-CI](https://github.itu.dk/mahn/OneDevOps/wiki/Travis-CI) to run our pipeline, but since Travis-CI can only connect and watch private repo's we have a second private repo, where the code from the master branch in this public repo is pushed to in our deply script

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
11
