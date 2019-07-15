'use strict'
const express = require('express');
const fs = require('fs');
const app = express();
const User = require('./User.js');
const port = 3000;

//leer archivo json
let users = JSON.parse(fs.readFileSync('usuarios.json'));
console.log(users);
let maxId = 0;
users.forEach(usr => maxId = usr.id > maxId ? usr.id : maxId);
User.count = maxId;
console.log("maxId "+maxId);


//carga el archivo index.html de public
//junto con los archivos .js
app.use(express.static(__dirname+'/public'))
//app.use(express.json())
//app.get('/', (req, res) => res.send('Hello DASWorld!'));
app.route('/api/usuario')
   .get((req, res) => {

        if(req.query.username){
          let filtro = users.filter(usr => usr.username.toUpperCase().includes(req.query.username.toUpperCase()));
          res.json(filtro);  
        }else{
            res.json(users)
        }
    } );
app.listen(port, () => console.log(`myApp ejecutandose en: http://localhost:${port}!`));