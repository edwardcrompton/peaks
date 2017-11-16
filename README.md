Peaks
=====

Shows the distance and bearing of peaks that can be seen from a particular latitude and longitude. The results are ordered by the ratio of the height to the peak to its distance away.

Designed to run off line as a Progressive Web App on a mobile device.

See https://edwardcrompton.github.io/peaks

Ideas for further development
-----------------------------

- Make the filtering and ordering of the listed peaks more intelligent, so that it lists the ones you are likely to be able to see from the specified latitude and longitude.
- Create a graphic to show the distances and bearings of the peaks which can be used with a compass to orientate the mobile device. Carlos suggested d3 may be a good library for this https://github.com/d3/d3/wiki
- Use the mobile device's inbuilt compass to align the graphic.
- Present the names of the peaks on a camera overlay for an augmented reality experience.

Current progress
----------------

Now using the library https://github.com/chrisveness/geodesy as a git submodule.
Hopefully this increases the accuracy of the bearings. Test with OS coordinates.
http://www.movable-type.co.uk/scripts/latlong.html

Service workers appear to work to cache and retrieve assets offline. Consider
extending to automatically fetch new versions of assets:
https://developers.google.com/web/fundamentals/getting-started/codelabs/your-first-pwapp/

Consider using RequireJS to provide a more module structure with multiple js files.

Try building in compass orientation so that we can see a graphical pointer to all
the mountains.

Work out how to show few mountains, and which to choose for the list.
