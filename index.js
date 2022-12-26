const express = require('express')
const app = express()
const https = require('https')

app.get('/dom', (req, res) => {

    let output = '';

    https.get('https://kogda.by/routes/minsk/autobus/37/ДС%20Карбышева%20-%20ДС%20Восточная/Дом%20Печати', (httpResponse) => {

        httpResponse.on('data', (d) => {
            output += d
        });

        httpResponse.on('end', () => {
            res.send(output)
        })

    })

    // console.log("Just got a request!")
    // res.send('Yo test!')
})
app.listen(process.env.PORT || 3000)