const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const { error } = require('console')
const forcast = require('./utils/forcast')

const app = express()

// Define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Akash'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:'provide address term'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({
                error
            })
        }
        forcast(latitude, longitude, (error, forcastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forcast: forcastData,
                location,
                address: req.query.address
            })
        })

    })

    // res.send({
    //     forcast: 'Its to hot',
    //     location : 'Nashik',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
       return res.send({
            erro:'provide search term'
        })
    } 

    console.log(req.query.search)
    res.send({
        prodducts:[]
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About minion..',
        name: 'Akash'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "How can I help you????",
        title: 'Get help..',
        name: 'Akash'
    })
})

app.get('/help/*', (req, res) => {
res.render('404', {
    title:'404',
    name: 'Akash',
    errorMessage: ' Help page not found'
})
})

app.get('*', (req, res) => {
 res.render('404', {
    title:'404',
    name: 'Akash',
    errorMessage: 'Page not found'
 })
})

app.listen(3000, () => {
    console.log('Server is up')
})