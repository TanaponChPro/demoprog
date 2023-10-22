module.exports = app => {
    const employees = require("../controllers/employee.controller.js");
    var router = require("express").Router();

    router.post("/", employees.create);         // Create a new employee
    router.get("/", employees.findAll);         // Retrieve all
    router.get("/:id", employees.findOne);      // Retrieve a single id
    router.put("/:id", employees.update);       // Update a with id
    router.delete("/:id", employees.delete);    // Delete a with id
    app.use('/api/employees', router);
};