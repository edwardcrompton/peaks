var data = [{
    type: 'scattergeo',
    mode: 'markers+text',
    marker: {
        color: '#fff',
    },
    textposition: 'top right',
}];

var layout = {
    width: 700,
    height: 700,
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
    }
};