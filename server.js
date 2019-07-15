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
app.use(express.json())
//app.get('/', (req, res) => res.send('Hello DASWorld!'));
app.route('/api/usuario')
   .get((req, res) => {
        if(req.query.username){
          let filtro = users.filter(usr => usr.username.toUpperCase().includes(req.query.username.toUpperCase()));
          res.json(filtro);  
        }else{
            res.json(users)
        }
    } )
    .post((req,res) => {
        console.log(req.body);
        let {username, email, password, sexo, hobbies} = req.body;
        let nUsr = new User(username, email, password, sexo, hobbies);
        console.log(nUsr);
        users.push(nUsr);
        fs.writeFileSync('usuarios.json', JSON.stringify(users));
        res.status(201).send(users);
    });


app.route('/api/usuario/:id')
    .get((req, res)=>{
        let user = users.find(usr => usr.id == req.params.id)
        if(user){
            res.json(user);
        }else{
            res.status(400).send({error:"No existe"});
        }
    })
    .delete((req,res)=>{

    })
    .put((req,res)=>{

    });


app.listen(port, () => console.log(`myApp ejecutandose en: http://localhost:${port}!`));