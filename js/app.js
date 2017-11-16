$(document).ready(() => {
  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  $('.position').change(() => $('#notices').html('Using a manually entered position.'));

  $('#submitposition').click(() => {
    let homeLatitude = $('#latitude').val();
    let homeLongitude = $('#longitude').val();

    const peaks = geodata.peaks;

    const orderedPeaks = [];

    $('.peakrow').remove();

    if (!isNumber(homeLatitude) || !isNumber(homeLongitude)) {
      homeLatitude = 52.787016;
      homeLongitude = -3.687855;
      $('#latitude').val(homeLatitude);
      $('#longitude').val(homeLongitude);
    }

    $.each(peaks, (index, element) => {
      const latitude = element.Latitude;
      const longitude = element.Longitude;

      const homePoint = new LatLon(homeLatitude, homeLongitude);
      const awayPoint = new LatLon(latitude, longitude);

      const distance = homePoint.distanceTo(awayPoint) / 1000;
      const prominence = element.Height / distance;

      if (distance < 100 && distance > 0) {
        const compassBearing = homePoint.bearingTo(awayPoint);

        orderedPeaks.push({
          Name: element['Hill Name'],
          Distance: distance.toFixed(2),
          Bearing: compassBearing.toFixed(2),
          Prominence: prominence,
        });
      }
    });

    orderedPeaks.sort((a, b) => b.Prominence - a.Prominence);

    $.each(orderedPeaks, (index, element) => $('#peakslist tr:last').after(
      `<tr class="peakrow">
        <td>${index}</td>
        <td>${element.Name}</td>
        <td>${element.Distance}</td>
        <td>${element.Bearing}</td>
      </tr>`
    ));

    // Plot the peaks on the plotly chart.
    layout.geo.center = {
      lon: homeLongitude,
      lat: homeLatitude,
    };

    Plotly.newPlot('compass', data, layout);
  });

  $('#getlocation').click(() => {
    // Geolocation function from https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        $('#latitude').val(position.coords.latitude);
        $('#longitude').val(position.coords.longitude);
        $('#notices').html(`Using your location with an accuracy of ${position.coords.accuracy}m.`);
      },
      (error) => {
        $('#notices').html(`An error occured. Error code: ${error.code}`);
      }, { enableHighAccuracy: true });
    }
    else {
      $('#notices').html('Geolocation is not supported by this browser.');
    }
  });

  // Register a service worker.
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js');
  }
});
