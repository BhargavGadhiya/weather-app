const request = require('request')
///http request using 'request' library

const geocode = (address, callback) => {
    let newgeoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYmhhcmdhdjEyMyIsImEiOiJjbDBhb3Z1aW8wMjJmM2tvNzNqOGU3dTN2In0.spVk4UxXps2UHBSrN-SxYw`

    request({ url: newgeoUrl, json: true }, (error, { body }) => {
        if (error) {
            callback(error, undefined)
        }
        else {

            callback(undefined, body);
        }


    })
}

const weatherCast = (long, lati) => {
    let url = `http://api.weatherstack.com/current?access_key=427a31cf1291f33f8e66bda942adbbcf&query=${lati},${long}`
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            console.log('Error', error)
        }
        else {

            let data = body.current
            const { temperature, precip } = data
            console.log(`it is currently ${temperature} degree out. there is a ${precip}% chance of rain`)
        }
    })
}


module.exports = { geocode: geocode, weatherCast: weatherCast }