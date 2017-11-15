/**
 * Peaks display.
 */
function compass() {
  canvas = $('canvas');

  originX = canvas.width() / 2;
  originY = canvas.height() / 2;

  canvas.drawPolygon({
    draggable: true,
    fillStyle: "#6c3",
    x: originX, y: originY,
    radius: 5, sides: 5
  });
};

function createPeak(index, bearing, distance) {
  var pixelsPerKm = 10; // We need to calculate this from the canvas size.

  bearing = bearing * Math.PI / 180;
  $('canvas').drawArc({
    strokeStyle: '#f00',
    fillStyle: '#f00',
    strokeWidth: 1,
    x: originX + (distance * Math.sin(bearing) * pixelsPerKm),
    y: originY - (distance * Math.cos(bearing) * pixelsPerKm),
    radius: 2,
  });

  $('canvas').drawText({
    fillStyle: '#fff',
    strokeWidth: 1,
    x: originX + (distance * Math.sin(bearing) * pixelsPerKm),
    y: originY - (distance * Math.cos(bearing) * pixelsPerKm),
    fontSize: '8pt',
    fontFamily: 'Verdana, sans-serif',
    text: index,
  });
}

