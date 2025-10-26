const os = require('os')
const fs = require('fs');
const express = require('express')

const app = express()
const port = 8000

let ip = NaN
const networkInterfaces = os.networkInterfaces()
for (const interfaceName in networkInterfaces) {
    const addresses = networkInterfaces[interfaceName]
    for (const address of addresses) {
        if (address.family === 'IPv4' && !address.internal) {
            ip = address.address
            console.log(`Local IP Address: ${address.address}`)
        }
    }
}

app.listen(port, () => {
    console.log(`App running at http://${ip}:${port}`)
})

//middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))



app.get('/', (req, res) => {
    console.log('HOMEPAGE!!')
    res.render('index')
});

app.get('/saturn', (req, res) => {
    res.render('saturnrings')
});

app.use((req, res)=>{
    res.status(404).render('404')
})
