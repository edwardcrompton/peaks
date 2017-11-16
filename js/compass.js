var data = [{
    type: 'scattergeo',
    mode: 'markers+text',
    marker: {
        color: '#000000',
    }
}];

var layout = {
    title: '',
    font: {
        family: 'Droid Serif, serif',
        size: 6
    },
    titlefont: {
        size: 16
    },
    geo: {
        scope: 'europe',
        resolution: 50,
        lonaxis: {
            'range': [-130, -60]
        },
        lataxis: {
            'range': [40, 70]
        },
        showland: true,
    }
};