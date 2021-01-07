const request = require("request");

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZGVlcGFyaWsiLCJhIjoiY2tqY3RjNDVhMGxlcDJ6cDJ6bHB6Nm1xNSJ9.5urtvN3JlPTeVitaRchGJw&limit=1';
    request({ url, json: true }, (error, {body} = {}) => {
        if(error)
        {
            callback('Can\'t Access MAPBOX API', undefined);
        }
        else if( body.features.length === 0 )
        {
            callback('Unknown Location', undefined);
        }
        else
        {
            callback(undefined, { 
                'longitude': body.features[0].center[1],
                'latitude': body.features[0].center[0],
                'location': body.features[0].place_name    
            })
        }
    })
}

module.exports = geocode;