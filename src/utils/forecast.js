const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ab9e8f707fafcb7c2b0aa97b17f8e71b&query=' + longitude + ',' + latitude;
    request({ url, json: true }, (error, {body} = {}) => {
        if(error)
        {
            callback('Can\'t Access weather API', undefined);
        }
        else if(body.error)
        {
            callback('Bad Inputs for weather API!!', undefined);
        }
        else
        {
            callback(undefined, body.current.weather_descriptions[0] + '. Current temperature is ' + body.current.temperature + ' degree Celsius and it feels like ' + body.current.feelslike + ' degree Celsius');
        }
    })
};

module.exports = forecast;