'use strict'
const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => res.send('Hello DASWorld!'));
app.route('/home').get((req, res) => res.send('DASWorld HOME1'));
app.listen(port, () => console.log(`myApp ejecutandose en: http://localhost:${port}!`));