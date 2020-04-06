const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String
    },
    googleId :{
        type : String
    },
    readLater:[{
        type : String
    }]
});
UserSchema.plugin(mongoosePaginate);
const User = mongoose.model('User' , UserSchema);

module.exports = User;