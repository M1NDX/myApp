'use strict'
const express = require('express');
const fs = require('fs');
const User = require('./User.js');
const app = express();
const port = 3000;
const { Usuario} = require('./db/Usuario');



app.use(express.static(__dirname +'/public'));
app.use(express.json());


let users = JSON.parse(fs.readFileSync('usuarios.json'));
console.log(users);
let maxId = 0;
users.forEach(usr => maxId = usr.id > maxId? usr.id: maxId);
User.count = maxId;

app.route('/usuarios')
    .get( (req, res) =>{
    if(req.query.username){
        let name = req.query.username;
        let filtro  = users.filter
          (usr => usr.username
                .toUpperCase()
                .includes(name.toUpperCase()))
                res.send(filtro)
    } else {
        //res.send(users)
        Usuario.find({},(err, docs)=>{
                if(err){
                   res.status(404).send();
                   return; 
                }

                res.json(docs);
        })
    }
})
.post((req,res)=>{
    console.log(req.body);
    let {username, email, password, sexo, hobbies} = req.body;
    let nUsr = new User(username, email, password, sexo, hobbies);
    users.push(nUsr);
    fs.writeFileSync('usuarios.json',JSON.stringify(users));
    res.status(201).json(users);
});


app.route('/usuarios/:id')
    .get((req,res)=>{
        let id = req.params.id;
        console.log(id);

        let user = users.find(usr => usr.id == id);
        if(user){
            res.send(user)
        }else{
            res.status(400).send({error: "no se encontró"})
        }

        
    })


app.route('/home').get((req, res) => res.send('DASWorld HOME1'));
app.listen(port, () => console.log(`myApp ejecutandose en: http://localhost:${port}!`));