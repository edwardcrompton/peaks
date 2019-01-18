#!/bin/bash

# Helper script for deploying latest to Heroku.
# This assumes at the moment that the Heroku CLI is installed locally. In
# future we could make this part of the docker stack so that it doesn't
# have to be installed separately.

# The name of the app on Heroku
APP_NAME='ebwc-peaks'

docker build -t web .
heroku container:push web --app "$APP_NAME"
heroku container:release web --app "$APP_NAME"
heroku open --app "$APP_NAME"

