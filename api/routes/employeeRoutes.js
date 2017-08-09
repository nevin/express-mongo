'use strict';
module.exports = function(app) {
    var employeeData = require('../controllers/employeeController');


    // employeeData Routes
    app.route('/employees')
        .get(employeeData.list_all_employees)
        .post(employeeData.create_employee);


    app.route('/employees/:employeeID')
        .get(employeeData.get_employee_details)
        .put(employeeData.update_employee_details)
        .delete(employeeData.delete_employee);
};
