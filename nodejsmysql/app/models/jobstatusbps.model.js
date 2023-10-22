// const { param } = require("express/lib/request");
const connDB = require("./db.js");

const BPSJobStatus = function (param) {
    this.JobType =  param.JobType;
    this.JobStatus = param.JobStatus;
    this.CountStatus = param.CountStatus;
};

BPSJobStatus.getJobTypeJobStatus = (req, result) => {
    let sql = `SELECT JobType, JobStatus, CountJobStatus  FROM viewJobBPSstatus;`

    connDB.query(sql, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // console.log("JobStatus: ", res);
        result(null, res);
    });
};

module.exports = BPSJobStatus;