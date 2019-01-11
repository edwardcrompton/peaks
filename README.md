Peaks
=====

Shows the distance and bearing of peaks that can be seen from a particular latitude and longitude. The results are ordered by the ratio of the height to the peak to its distance away.

Designed to run off line as a Progressive Web App on a mobile device.

See https://edwardcrompton.github.io/peaks

Local development setup
-----------------------

You need to have docker and docker-compose installed locally to run the docker stack.

Clone the repository from github:

> git clone git@github.com:edwardcrompton/peaks.git

Change directory into the app:

> cd peaks

Start the app docker containers

> docker-compose up -d

You should now be able to access the app at http://localhost:8080

Deploying to Heroku
-------------------

You'll need the heroku CLI installed and a heroku app already created in your heroku account to use the commands below:

Build the docker web container:

> docker build -t web .

Push the web container to Heroku:

> heroku container:push web --app <APPNAME>

Release the web container on Heroku:

> heroku container:release web --app <APPNAME>

Open the app in your browser:

> heroku open --app ebwc-peaks

Service Worker
--------------

There's now a dockerised gulp process that compiles the service worker for us. The application can also be hosted locally using an nginx server in docker.

Start the environment running on localhost:8080:
> docker-compose up -d

When the service worker needs recompiling:
> docker-compose run node gulp

The service worker wasn't working on github pages - it seemed to not load from the cache when offline. I think this was because the app was in a subfolder. I've since deployed to Heroku and the page seems to work correctly offline. Try on a phone using airplane mode.

Ideas for further development
-----------------------------

- It should be possible to run the application from github pages instead of Heroku. There should be a way of configuring the service worker so that the application will run from a subdirectory of the domain. The advantage of Heroku is that the workflow can be entirely docker based. However, the free Heroku account sleeps after 30 minutes.
- Make the filtering and ordering of the listed peaks more intelligent, so that it lists the ones you are likely to be able to see from the specified latitude and longitude.
- Create a graphic to show the distances and bearings of the peaks which can be used with a compass to orientate the mobile device. Carlos suggested d3 may be a good library for this https://github.com/d3/d3/wiki
- Use the mobile device's inbuilt compass to align the graphic.
- Present the names of the peaks on a camera overlay for an augmented reality experience.

Git management
--------------

- Work currently goes on in the master branch. However, because the web root is not the same as the git root, we need to push separately to the gh-pages branch:
> git subtree push --prefix web origin gh-pages

Docker management
-----------------

I've been experimenting with deploying to Heroku using docker.
The docker-compose.yml file is still valid for running the application in development. This has an nginx container and a node container. The node container is only required for updating development dependencies and packaging everything up.

This talks about how to deploy an nginx container to heroku:

https://ntotten.com/2018/07/22/nginx-on-heroku/

Once the nginx container is on Drupal I think we can use it to server our js app.

The dir structure seems to require that a Dockerfile for the image we wnat to push to Heroku is in the root of the application directory. Other Dockerfiles for other docker containers can be elsewhere in the docker/ folder.

The example from the link seems to just use nginx to proxy the example.com domain. We actually want to serve our own content.



Current progress
----------------
Chrome on Android shows the browser toolbar and greys out the form controls when in aeroplane mode. Find out why.

Prettify the form controls.

Now using the library https://github.com/chrisveness/geodesy as a git submodule.
Hopefully this increases the accuracy of the bearings. Test with OS coordinates.
http://www.movable-type.co.uk/scripts/latlong.html

Need a marker in the centre of the graphic where the user is located.

Optimise the graphic for mobile: Remove margins and make width responsive.

Service workers appear to work to cache and retrieve assets offline. Consider
extending to automatically fetch new versions of assets:
https://developers.google.com/web/fundamentals/getting-started/codelabs/your-first-pwapp/

Work out how to show few mountains, and which to choose for the list.

Libraries used
--------------

This libraries are included in the codebase:
https://github.com/chrisveness/geodesy
https://github.com/plotly/plotly.js
jQuery
