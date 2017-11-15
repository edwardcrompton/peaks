$(document).ready(() => {
  var canvas = oCanvas.create({
    canvas: "#peakscanvas",
    background: "#222",
  });

  originX = canvas.width / 2;
  originY = canvas.height / 2;

  // Center planet
  var center = canvas.display.ellipse({
    x: originX, y: originY,
    radius: 1,
    fill: "#f00"
  }).add();

  // Prototype objects that will be used to instantiate the others
  var peakProto = canvas.display.ellipse({
    radius: 1,
    fill: "#fff"
  });


  function createPeak(bearing, distance) {
    bearing = bearing * Math.PI / 180;
    var peak = peakProto.clone({
      x: originX + distance * Math.sin(bearing),
      y: originY - distance * Math.cos(bearing),
    });
    peak.add();
  }
});

