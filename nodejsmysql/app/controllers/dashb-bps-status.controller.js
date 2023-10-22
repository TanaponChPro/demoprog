const BPSJobStatus = require('../models/jobstatusbps.model');
const connDB = require('../models/db');

exports.findJobTypeJobStatus = (req, res) => {
    // const serialno = req.query.SerialNo;

    BPSJobStatus.getJobTypeJobStatus(req, (err, data) => {
        if (err)
            res.status(500).send({ message: err.message || "Some error occurred while retrieving JobType ans JobStatus."  });
        else res.send(data);
    });
};

