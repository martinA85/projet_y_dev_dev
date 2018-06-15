'use strict';

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Creating user Schema
var UsersSchema = new Schema({
    name: {
        type: String,
        set: v => v.toUpperCase() // Make nAmE => NAME
    },
    firstName: {
        type: String,
        set: v => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase() // Make fIrsTNaMe => Firstname
    },
    username: String,
    isCompany: Boolean,
    companyName: String,
    description: String,
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function (v) {
                return /@/.test(v);
            }
        }
    },
    idUserNetwork: String,
    password: {
        type: String,
        minlength: 7,
        validate: {
            validator: function (v) {
                return /[a-z]/.test(v) && /[A-Z]/.test(v) && /\d/.test(v) && /[^A-Za-z0-9]/.test(v);
            }, message: '{VALUE} is not a valid password !'
        },
        required: function () { return this.idUserNetwork == null; }
    },
    token: {
        type: String,
        default: ""
    },
    socketId: String,
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: Date,
    connection_type: String,
    status: String,
    image : String

})

//Pre save function : data validation, updating updateDate field
UsersSchema.pre('save', function (next) {

    let now = new Date();

    this.updateDate = now;

    next();
})

// =====================================================
// =================  Custom function  =================
// =====================================================

//TODO : ce rappeler à quoi sert cette fonction et la coder
UsersSchema.methods.isValid = function () {

}


module.exports = mongoose.model('Users', UsersSchema);