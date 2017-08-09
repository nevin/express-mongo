'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var EmployeeDataSchema;
EmployeeDataSchema = new Schema({
    firstName: {
        type: String,
        Required: 'Kindly enter the firstname'
     },
    // lastName: {
    //     type: String,
    //     Required: 'Kindly enter the lastname'
    // },
    // designation: {
    //     type: String,
    //     Required: 'Kindly enter the Designation'
    // },
    // gender: {
    //     type: [{
    //         type: String,
    //         enum: ['Male', 'Female', 'Other']
    //     }],
    //     default: ['Male']
    // },
    // doj: {
    //     type: Date,
    //     default: Date.now
    // },
    // address: {
    //     type: String,
    //     Required: 'Kindly enter the address'
    // },
    // phone: {
    //     type: String,
    //     Required: 'Kindly enter the phone'
    // },
    // email: {
    //     type: String,
    //     Required: 'Kindly enter the email'
    // },
    //
    // company: {
    //     type: String,
    //     default: 'MyCom'
    // },
    // dob: {
    //     type: Date
    // },
    // isActive: {
    //     type: Boolean,
    //     default: true
    // },
    // age: {
    //     type: Number,
    //     min: 18,
    //     max: 65
    // },
    employeeID:{
        unique:true,
        type: Number,
        min: 1
    }
    // created_date: {
    //     type: Date,
    //     default: Date.now
    // },
    // status: {
    //     type: [{
    //         type: String,
    //         enum: ['employee', 'ex-employee', 'hired']
    //     }],
    //     default: ['employee']
    // },
     //_id: Schema.Types.ObjectId
});

module.exports = mongoose.model('Employee', EmployeeDataSchema);