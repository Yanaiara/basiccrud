const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const routeAcmeCo = require('./routes/acmeco');
const routeNorteEuropa = require('./routes/norteeuropa');
const routeDentalSorriso = require('./routes/dentalsorriso');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));  // apenas dados simples
app.use(bodyParser.json()); // json de entrada no body

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});

app.use('/acmeco', routeAcmeCo);
app.use('/norteeuropa', routeNorteEuropa);
app.use('/dentalsorriso', routeDentalSorriso);

module.exports = app; 