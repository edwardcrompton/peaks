$(document).ready(() => {
  // Haversine distance calculation from https://github.com/dcousens/haversine-distance
  const atan2 = Math.atan2;
  const cos = Math.cos;
  const sin = Math.sin;
  const sqrt = Math.sqrt;
  const PI = Math.PI;

  // (mean) radius of Earth (meters)
  const R = 6378137;

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function squared(x) {
    return x * x;
  }
  function toRad(x) {
    return (x * PI) / 180.0;
  }
  function toDegree(x) {
    return (x * 180) / PI;
  }

  // https://stackoverflow.com/questions/1502590/calculate-distance-between-two-points-in-google-maps-v3
  function haversineDistance(a, b) {
    const aLat = a.latitude || a.lat;
    const bLat = b.latitude || b.lat;
    const aLng = a.longitude || a.lng;
    const bLng = b.longitude || b.lng;

    const dLat = toRad(bLat - aLat);
    const dLon = toRad(bLng - aLng);

    const f = squared(sin(dLat / 2.0)) + (
      cos(toRad(aLat)) * cos(toRad(bLat)) * squared(sin(dLon / 2.0))
    );
    const c = 2 * atan2(sqrt(f), sqrt(1 - f));

    return Math.round((R * c) / 1000);
  }

  // Bearing calculation from https://stackoverflow.com/questions/11415106/issue-with-calcuating-compass-bearing-between-two-gps-coordinates#11415329
  function bearing(lat1, lng1, lat2, lng2) {
    const dLon = (lng2 - lng1);
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = (Math.cos(lat1) * Math.sin(lat2)) - (
      Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon)
    );
    const brng = toDegree(Math.atan2(y, x));
    return Math.round(360 - ((brng + 360) % 360));
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

      const a = { latitude: homeLatitude, longitude: homeLongitude };
      const b = { latitude, longitude };

      const distance = haversineDistance(a, b);
      const prominence = element.Height / distance;

      let compassBearing;

      if (distance < 100 && distance > 0) {
        compassBearing = bearing(homeLatitude, homeLongitude, latitude, longitude);

        orderedPeaks.push({
          Name: element['Hill Name'],
          Distance: distance,
          Bearing: compassBearing,
          Prominence: prominence,
        });
      }
    });

    orderedPeaks.sort((a, b) => b.Prominence - a.Prominence);

    $.each(orderedPeaks, (index, element) => $('#peakslist tr:last').after(
      `<tr class="peakrow">
        <td>${element.Name}</td>
        <td>${element.Distance}</td>
        <td>${element.Bearing}</td>
      </tr>`));
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
