'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var EmployeeDataSchema;
EmployeeDataSchema = new Schema({
    firstName: {
        type: String,
        required:  [true,'First Name Required']
     },
    lastName: {
        type: String,
        required:  [true,'Last Name Required' ]
    },
    designation: {
        type: String,
        required:  [true,'Designation Required']
    },
    gender: {
        type: [{
            type: String,
            enum: ['Male', 'Female', 'Other']
        }],
        default: ['Male']
    },
    doj: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String,
        required:  [true,'Address Required']
    },
    phone: {
        type: String,
        required:  [true,'Phone No Required']
    },
    email: {
        type: String,
        required:  [true,'Email Required']
    },

    company: {
        type: String,
        default: 'MyCom'
    },
    dob: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    age: {
        type: Number,
        min: 18,
        max: 65
    },
    employeeID:{
        unique:true,
        type: Number,
        min: 1,
        required:[true,'EmployeeID Required']
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['employee', 'ex-employee', 'hired']
        }],
        default: ['employee']
    }
});

module.exports = mongoose.model('Employee', EmployeeDataSchema);