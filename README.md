Peaks
=====

Shows the distance and bearing of peaks that can be seen from a particular latitude and longitude. The results are ordered by the ratio of the height to the peak to its distance away.

Designed run off line as a Progressive Web App on a mobile device.

Ideas for further development
-----------------------------

- Make the filtering and ordering of the listed peaks more intelligent, so that it lists the ones you are likely to be able to see from the specified latitube and longitude.
- Create a graphic to show the distances and bearings of the peaks which can be used with a compass to orientate the mobile device.
- Use the mobile device's inbuilt compass to align the graphic.
- Present the names of the peaks on a camera overlay for an augmented reality experience.

Current progress
----------------

There seems to be inaccuracies in the bearings as compared to those calculated 
manually on an OS map, and at http://www.movable-type.co.uk/scripts/latlong.html
it might be better to use the libraries here https://github.com/chrisveness/geodesy.
These are the libraries that the moveabletype link uses. There's an Npm module.

Service workers appear to work to cache and retrieve assets offline. Consider
extending to automatically fetch new versions of assets:
https://developers.google.com/web/fundamentals/getting-started/codelabs/your-first-pwapp/

Consider using RequireJS to provide a more module structure with multiple js files.

Try building in compass orientation so that we can see a graphical pointer to all
the mountains.

Work out how to show few mountains, and which to choose for the list.
