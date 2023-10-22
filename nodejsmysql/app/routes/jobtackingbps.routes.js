const express = require("express");
const router = express.Router();
const JobTackingBPSController = require("../controllers/jobtackingbps.controller");
const uploadbps = require("../middlewares/uploadexcelbps.js");

let routes = (app) => {
    router.post("/uploadfilebps", uploadbps.single("uploadfile"), JobTackingBPSController.uploadexcelbps );
    router.post("/tempjob2realjob", JobTackingBPSController.tranTempJobNo2RealJobNo );
    router.post("/getJobImportBPS", JobTackingBPSController.getJobImportBPS);
    router.get("/copyfile/:tjobno/:rjobno", JobTackingBPSController.copyImageTempJobNo2RealJobNo);
    router.get("/message", JobTackingBPSController.welcome);
    router.get("/runbackend", JobTackingBPSController.ProcessRunBackend);
    router.get("/crePathImage/:jobno", JobTackingBPSController.createPathStockImage);
    router.put("/updFromPage/:id", JobTackingBPSController.updateFromPage);
    router.post("/insFromInputFormBPS", JobTackingBPSController.insertFromInputFormBPS);
    router.delete("/delJobImportBPS/:id", JobTackingBPSController.deleteFromInputFormBPS)
    app.use('/api/bps', router);
};

module.exports = routes;