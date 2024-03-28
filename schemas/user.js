var mongoose = require("mongoose");
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const config = require('../configs/config');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: [String],
        default: ["USER"]
    },
    status: {
        type: Boolean,
        default: true
    },
    email: String
}, { timestamps: true })

userSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, 10);
})

userSchema.methods.getJWT = function () {
    var token = jwt.sign({ id: this._id }, config.JWT_SECRET_KEY, {
        expiresIn: config.JWT_EXP_IN
    });
    return token;
}

module.exports = new mongoose.model('user', userSchema);