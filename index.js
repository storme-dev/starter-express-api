const express = require('express')
const app = express()
const https = require('https')

app.get('/dom', (req, res) => {

    let result = '';
    let output = '';

    https.get('https://kogda.by/routes/minsk/autobus/37/ДС%20Карбышева%20-%20ДС%20Восточная/Дом%20Печати', (httpResponse) => {

        httpResponse.on('data', (d) => {
            output += d
        });

        httpResponse.on('end', () => {
            const regex = /<span\sclass="future">([^<]*)<\/span>/gm;

            let m;

            while ((m = regex.exec(output)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }

                // The result can be accessed through the `m`-variable.
                m.forEach((match, groupIndex) => {
                    result += match.trim().trimEnd() + ' '
                });
            }
        })

    })

    res.send(result)

    // console.log("Just got a request!")
    // res.send('Yo test!')
})
app.listen(process.env.PORT || 3000)