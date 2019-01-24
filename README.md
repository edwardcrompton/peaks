Peaks
=====

Shows the distance and bearing of peaks that can be seen from a particular
latitude and longitude. The results are ordered by the ratio of the height of
the peak to its distance away.

Designed to run off line as a Progressive Web App on a mobile device.

See https://ebwc-peaks.herokuapp.com/

Local development setup
-----------------------

You need to have docker and docker-compose installed locally to run the docker
stack.

Clone the repository from github:

> git clone git@github.com:edwardcrompton/peaks.git

Change directory into the app:

> cd peaks

Start the app docker containers

> docker-compose up -d

You should now be able to access the app at http://localhost:8080

Gulp tasks for Sass and Service Worker
--------------------------------------

Gulp is installed in its down Docker container in order to partly automate the
compilation of Sass and recreation of the service worker.

If it's not running already, start the environment running on localhost:8080
> docker-compose up -d

Gulp will watch the sass folder and recompile the css folder (inside the web
root) automatically as long as the Docker containers are running.

When the service worker needs recompiling this has to be triggered manually:
> docker-compose run node gulp generate-service-worker

Deploying to Heroku
-------------------

You'll need the heroku CLI installed and a heroku app already created in your
Heroku account to use the bash script for deploying to Heroku.

From the root folder of the code base, run this:

> ./deploy-to-heroku.sh

This will build a Docker container with all the code dependencies, push it to
Heroku and then open the Heroku app page in your browser. You will need to edit
the bash script to use the app name you created in Heroku.

Further development details
---------------------------

Further details can be found in the Wiki

https://github.com/edwardcrompton/peaks/wiki

