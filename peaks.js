$(document).ready(function() {
    $("#submitposition").click(function() {
      var homeLatitude = $("#latitude").val();
      var homeLongitude = $("#longitude").val();
      
      var peaks = geodata.peaks;
  
      var peaks;
      
      $('.peakrow').remove();

      if (!isNumber(homeLatitude) || !isNumber(homeLongitude)) {
        var homeLatitude = 52.787016;
        var homeLongitude = -3.687855;
        $("#latitude").val(homeLatitude);
        $("#longitude").val(homeLongitude);
      }
      
      console.log([homeLatitude, homeLongitude]);

      var counter = 1;

      $.each(peaks, function() {
        var latitude = this.Latitude;
        var longitude = this.Longitude;

        var a = { latitude: homeLatitude, longitude: homeLongitude }
        var b = { latitude: latitude, longitude: longitude }

        var distance = haversineDistance(a, b);

        if (distance < 100000 && distance > 0) {
          var compassBearing = bearing(homeLatitude, homeLongitude, latitude, longitude);
          $('#peakslist tr:last').after('<tr class="peakrow"><td>'+counter+'</td><td>'+this["Hill Name"]+'</td><td>'+distance+'</td><td>'+compassBearing+'</td></tr>');

          counter++;
        }

      });
    });
    
    $("#getlocation").click(function() {
      // Geolocation function from https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_geolocation
      if (navigator.geolocation) {
          console.log('Geolocation is supported by this browser');
          navigator.geolocation.getCurrentPosition(function(position) {
            console.log('Getting latitude and longitude');
            $("#latitude").val(position.coords.latitude);
            $("#longitude").val(position.coords.longitude);
            console.log(location.coords.accuracy);
          },
          function(error) {
            console.log('An error occured. Error code: '+ error.code);
          });
      } else { 
          console.log("Geolocation is not supported by this browser.");
      }
    });
    
    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    
    // Haversine distance calculation from https://github.com/dcousens/haversine-distance
    var atan2 = Math.atan2
    var cos = Math.cos
    var sin = Math.sin
    var sqrt = Math.sqrt
    var PI = Math.PI

     // (mean) radius of Earth (meters)
    var R = 6378137

    function squared (x) { return x * x }
    function toRad (x) { return x * PI / 180.0 }
    function toDegree (x) { return x * 180 / PI }

    // https://stackoverflow.com/questions/1502590/calculate-distance-between-two-points-in-google-maps-v3
    function haversineDistance (a, b) {
      var aLat = a.latitude || a.lat
      var bLat = b.latitude || b.lat
      var aLng = a.longitude || a.lng
      var bLng = b.longitude || b.lng

      var dLat = toRad(bLat - aLat)
      var dLon = toRad(bLng - aLng)

      var f = squared(sin(dLat / 2.0)) + cos(toRad(aLat)) * cos(toRad(bLat)) * squared(sin(dLon / 2.0))
      var c = 2 * atan2(sqrt(f), sqrt(1 - f))

      return R * c
    }
    
    // Bearing calculation from https://stackoverflow.com/questions/11415106/issue-with-calcuating-compass-bearing-between-two-gps-coordinates#11415329
    function bearing (lat1,lng1,lat2,lng2) {
        var dLon = (lng2-lng1);
        var y = Math.sin(dLon) * Math.cos(lat2);
        var x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
        var brng = toDegree(Math.atan2(y, x));
        return 360 - ((brng + 360) % 360);
    }
    
});
