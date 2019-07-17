let mongoose = require('mongoose');

let mongodb = 'mongodb://localhost:27017/UsuariosDB';
mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useCreateIndex: true
});

module.exports = {mongoose}