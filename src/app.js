const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// set path for express config
const pathToPublic = path.join(__dirname, '../public');
const pathToViews = path.join(__dirname, '../templates/views');
const pathToPartials = path.join(__dirname, '../templates/partials')

// set view engine and views path
app.set('view engine', 'hbs');
app.set('views', pathToViews);
hbs.registerPartials(pathToPartials);

// set path for static folder
app.use(express.static(pathToPublic));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kakashi Hatake'
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Itachi Uchiha'
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helptext: 'I am here to help you with my teleportation jutsu.',
        name: 'Minato Namikaze'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            'error': 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error)
        {
            return res.send({
                'error': error
            });
        }
        forecast(latitude, longitude, (error, data) => {
            if(error)
            {
                return res.send({
                    'error': error
                })
            }

            res.send({
                'forecast': data,
                'location': location,
                'address': req.query.address
            })
        })
    });

});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            'error': 'You must provide search term!'
        });
    }
    console.log(req.query);
    res.send({
        'products': []
    });
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Help article not found',
        name: 'Dpak'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Dpak'
    });
});

app.listen(port, () => {
    console.log('Serve is running at port ' + port);
})