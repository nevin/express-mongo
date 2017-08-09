'use strict';


var mongoose = require('mongoose'),
    url = require('url'),
    Employee = mongoose.model('Employee');
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var xlsx = require('node-xlsx').default;

exports.list_all_employees = function(req, res) {
    var get_params = url.parse(req.url, true).query;

    res.setHeader('content-type', 'application/json');
    var parameter ="";
    if (Object.keys(get_params).length === 0)
    {
        Employee.find({}).then(result => res.json(result)
        ).catch(error => {
        res.status(412).json({msg: error.message});
         })
    }else{
        parameter = get_params;
        Employee.find(parameter).then(result => res.json(result)
        ).catch(error => {
            res.status(412).json({msg: error.message});
        });
    }
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

exports.file_uploads = function(req, res) {
    var form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = path.join(__dirname, '../../uploads');

    // rename it to it's orignal name
    form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));

    });


    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });


    form.on('end', function(field, file) {
        var file_name = this.openedFiles[0].name;
        processExcelfile(path.join(form.uploadDir, file_name));
        res.end('success');
    });


    form.parse(req);
};

var processExcelfile = function (file) {
    const workSheetsFromFile = xlsx.parse(fs.readFileSync(file));
    for(var i = 0; i < workSheetsFromFile.length; i++){
        //console.log(workSheetsFromFile[i])
       var sheetData = workSheetsFromFile[i].data;

        var sheetIndex = sheetData[0];
        for(var j = 1; j<sheetData.length;j++){
            if(sheetData[j].length>0)
            {
                prepareData(sheetIndex,sheetData[j]);
            }
        }
    }
};

var prepareData  = function (keyArray, dataArray) {
   // console.log(keyArray,dataArray);
    var dataToInsert = {};
    for(var k = 0; k<keyArray.length;k++){
       dataToInsert[keyArray[k]]  = dataArray[k]
    }

    var newEmploye = new Employee(dataToInsert);
    newEmploye.save(function(err, employee) {
        if (err)
            return err;
        return employee;
    });


}