'use strict';


var mongoose = require('mongoose'),
    Employee = mongoose.model('Employee');

exports.list_all_employees = function(req, res) {
    Employee.find({}, function(err, employees) {
        if (err)
            res.send(err);


        if (employees.length == 0){
            res.send("no employees found");
        } else{
            res.json(employees);
        }

    });
};




exports.create_employee = function(req, res) {

    var new_employee = new Employee(req.body);
    new_employee.save(function(err, employee) {
        if (err)
            res.send(err);
        res.json(employee);
    });
};


exports.get_employee_details = function(req, res) {
    console.log(req.params.employeeID)
    Employee.find({employeeID: parseInt(req.params.employeeID)}, function(err, employee) {
        if (err)
            res.send(err);
        res.json(employee);
    });
};


exports.update_employee_details = function(req, res) {
    Employee.findOneAndUpdate({_id: req.params.employeeID}, req.body, {new: true}, function(err, employeeDetails) {
        if (err)
            res.send(err);
        res.json(employeeDetails);
    });
};


exports.delete_employee = function(req, res) {


    Employee.remove({
        employeeID: parseInt(req.params.employeeID)
    }, function(err, employee) {
        if (err)
            res.send(err);
        res.json({ message: 'Employee Details successfully deleted' });
    });
};
