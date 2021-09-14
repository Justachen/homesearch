const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');
const results = [];
const port = 5000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors())

app.listen(port, () => {
    console.log(`Server started on port ${port}!`)
});

// reading and parsing the data from the csv file
fs.createReadStream('Redfin-SF.csv')
    .pipe(csv({}))
    .on('data', (data) => results.push(data))
    .on('end', () => {
        console.log('Data extracted!')
    })

// searching the csv results for exact or related houses
app.post('/api/properties', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log('Got body: ', req.body.lookup);
    let obj = filterAddress(req.body.lookup);
    res.json(obj);
})

const filterAddress = (search) => {
    let find = []

    results.filter((result) => {
        if (result.ADDRESS.toLowerCase().includes(search) || result['ZIP OR POSTAL CODE'].includes(search)) {
            find.push(result);
        }
    });
    console.log(find);
    return find;
};