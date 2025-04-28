const request = require('request')

const forcast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=4a86612eca6f9e238eb2ffca412a5c38&query=' + latitude + ',' + longitude 

request({ url, json: true }, (error, { body }) => {
    if (error) {
        callback('unable to connect weather stack', undefined)
    } else if (body.error) {
        callback('Unable to find location', undefined)
    } else {
        callback(undefined,'Its currently '+ body.current.temperature + ' degree out there. It feels like ' + body.current.feelslike + ' out there.')
    }
})
}

module.exports = forcast