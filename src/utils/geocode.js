
const request = require('request')

const geocode = (address, callback)  => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=b6f8bcddb700c32b82edec9ac875f463&query=' + address 
    request({url, json: true}, (error, {body}) => {
        if (body.error) {
            callback('Unable to connect to service', undefined)
        } else if (body.data.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
               latitude: body.data[0].latitude,
               longitude: body.data[0].longitude,
               location: body.data[0].label
            })
        }
    })
}



module.exports = geocode