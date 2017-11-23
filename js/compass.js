var data = [{
    type: 'scattergeo',
    mode: 'markers+text',
    marker: {
        color: '#fff',
    },
    textposition: 'top right',
}];

var layout = {
    font: {
        family: 'Droid Serif, serif',
        size: 16,
        color: '#ccc',
    },
    geo: {
        projection: {
          scale: 1000,
        },
        bgcolor: '#333',
        showcoastlines: true,
        scope: 'europe',
        resolution: 50,
    },
    margin: {                           // update the left, bottom, right, top margin
        l: 0, b: 0, r: 0, t: 0
    }
};