module.exports = app => {
    const bpsStatusControl = require("../controllers/dashb-bps-status.controller.js");
    var router = require("express").Router();
 
    router.get("/", bpsStatusControl.findJobTypeJobStatus);  
    // router.get("/:id", bpsStatusControl.findOne); 
    // router.post("/strainer", bpsStatusControl.filterDevice);

    app.use('/api/dashb-bps', router);
};