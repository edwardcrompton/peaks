$(document).ready(() => {
  var canvas = oCanvas.create({
    canvas: "#peakscanvas",
    background: "#222",
    fps: 60
  });

  originX = canvas.width / 2;
  originY = canvas.height / 2;

  // Center planet
  var center = canvas.display.ellipse({
    x: originX, y: originY,
    radius: 2,
    fill: "#f00"
  }).add();

  // Prototype objects that will be used to instantiate the others
  var peakProto = canvas.display.ellipse({ fill: "#fff" });

  function createPeak(bearing, distance) {
    
  }
});

