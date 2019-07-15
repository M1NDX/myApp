'use strict'
const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static(__dirname +'/public'));

let users = JSON.parse(fs.readFileSync('usuarios.json'));
console.log(users);


app.get('/usuarios', (req, res) =>{
    if(req.query.username){
        let name = req.query.username;
        let filtro  = users.filter
          (usr => usr.username
                .toUpperCase()
                .includes(name.toUpperCase()))
                res.send(filtro)
    } else {
        res.send(users)
    }
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