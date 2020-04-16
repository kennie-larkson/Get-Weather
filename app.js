const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 4040



app.use(bodyParser.urlencoded({extended: true}))
app.get('/',(req,res)=>{

    res.sendFile(__dirname+'/index.html')
})

app.post('/',(req,res)=>{
    // console.log(req.body.city);
    const apiKey = "7e16f20a2aca5ff2a3a8004bf455ec04"
    const query = req.body.city;
    const units = "metric"
    const apiurl = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+ units +"&appid="+apiKey

    https.get(apiurl,(response)=>{
        response.on("data",(data)=>{
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const desc = weatherData.weather[0].description
            const country = weatherData.sys.country
            const city = weatherData.name
            const icon = weatherData.weather[0].icon
            const iconurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            console.log(`
            Country: ${country}
            City: ${city}
            Temperature: ${temp}
            Description: ${desc}
    
            `)

            res.write(`<p>
            <h1>The temperature in ${city} is ${temp} degrees celsius</h1>
            <span>The weather description is ${desc}</span>
            <img src="${iconurl}">
            </p>`)
            res.send()

        })
        
    })
})

app.listen(port,()=>{
    console.log(`Weather server running on port: ${port}`)
})