let {mongoose} = require('./mongodb-connect')

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3
    },
    sexo: {
        type: String,
        enum: ['F','M'],
        required: true
    },
    hobbies: {
       type: [String] 
    },
    url:{
        type: String
    }
});

let Usuario = mongoose.model('usuarios', userSchema);

module.exports = {Usuario}