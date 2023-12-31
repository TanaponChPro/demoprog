const connect = require("../models/db.js");
const fs = require('fs');

const JobStatus = async (req, res) => {
    var jobstatus;
    try {
        jobstatus = await getCloseJobAll();
        // console.log(jobstatus);
        // console.log((JSON.parse(jobstatus)))
        res.send(JSON.parse(jobstatus))
        // res.send(jobstatus)
        // console.log((JSON.parse(jobstatus))[0].JobType)
        // for (let ir in jobstatus) {
        //     console.log(jobstatus[ir].JobType);
        //     console.log(jobstatus[ir].JobStatus);
        //     console.log(jobstatus[ir].CountStatus);
        // }
        // res.status(200).send({ message: "select JobStatus complete!" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Error select JobStatus: " });
    }
};

const JobCloseData = async (req, res) => {
    var jobstatus;
    try {
        jobstatus = await getCloseJobAll(req.params.id);
        res.send(JSON.parse(jobstatus))
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Error select JobStatus: " });
    }
};

var getCloseJobAll = (id) => {
    let sql =`SELECT * FROM demodb.tmpCloseJob`;

    if (id) {
        sql += ` WHERE ID = ${id} `;
    }
    sql += ` ORDER BY id DESC `;

    return new Promise(function (resolve, reject) {
        connect.connect(() => {
            //รันคำสั่ง SQL
            connect.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                if (result == null) {
                    return reject({ message: "Mysql Error" });
                }
                //ส่งผลลัพธืของคำสั่ง sql กลับไปให้ทำงานต่อ
                resolve(JSON.stringify(result));
            })
        });
    });
}

const findAll = (req, res) => {
    res.json({ message: "Welcome to api/CloseJob." });
};



var tmpCloseJob = {
    JobNo: '',
    TID: '',
    Bank: '',
    SerialNoEDC: '',
    TechnicName: '',
    RecordDateTime: '',
    OperationDate: '',
    UpdateDateTime: '',
    JobType: '',
    JobStatus: '',
    Remark: '',
    PhoneNo: '',
    Merchant: '',
    OldSerialNoEDC: '',
    CustomerName: '',
    CustomerPhoneNo: '',
    InputFileName: '',
    OperationTime: '',
    OperationEndDateTime: '',
    UpdateByUser: ''
};

const CreateCloseJob = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    tmpCloseJob = {
        JobNo: req.body.JobNo,
        TID: req.body.TID,
        Bank: req.body.Bank,
        SerialNoEDC: req.body.SerialNoEDC,
        TechnicName: req.body.TechnicName,
        RecordDateTime: req.body.RecordDateTime,
        OperationDate: req.body.OperationDate,
        UpdateDateTime: req.body.UpdateDateTime,
        JobType: req.body.JobType,
        JobStatus: req.body.JobStatus,
        Remark: req.body.Remark,
        PhoneNo: req.body.PhoneNo,
        Merchant: req.body.Merchant,
        OldSerialNoEDC: req.body.OldSerialNoEDC,
        CustomerName: req.body.CustomerName,
        CustomerPhoneNo: req.body.CustomerPhoneNo,
        InputFileName: req.body.InputFileName,
        OperationTime:  req.body.OperationTime,
        OperationEndDateTime:  req.body.OperationEndDateTime,
        UpdateByUser:  req.body.UpdateByUser
    };

    let jobstatus;
    let dir = __basedir + "/app/images/" + req.body.JobNo;
    try {
        jobstatus = await insertCloseJob(tmpCloseJob)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        res.send(jobstatus);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Error select JobStatus: " });
    }
}

var insertCloseJob = (tmpCloseJob) => {
    // let sql = "";
    // sql += " INSERT INTO `demodb`.`tmpCloseJob` SET ?;"

    return new Promise(function (resolve, reject) {
        connect.connect(() => {
            connect.query(` INSERT INTO demodb.tmpCloseJob SET ?;`, tmpCloseJob, (err, result) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }

                if (result == null) {
                    return reject({ message: "Mysql Error" });
                }
                resolve({ message: "Insert data complete" });
            })
        })
    });
}

const UpdateCloseJob = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    tmpCloseJob = {
        JobNo: req.body.JobNo,
        TID: req.body.TID,
        Bank: req.body.Bank,
        SerialNoEDC: req.body.SerialNoEDC,
        TechnicName: req.body.TechnicName,
        RecordDateTime: req.body.RecordDateTime,
        OperationDate: req.body.OperationDate,
        UpdateDateTime: req.body.UpdateDateTime,
        JobType: req.body.JobType,
        JobStatus: req.body.JobStatus,
        Remark: req.body.Remark,
        PhoneNo: req.body.PhoneNo,
        Merchant: req.body.Merchant,
        OldSerialNoEDC: req.body.OldSerialNoEDC,
        CustomerName: req.body.CustomerName,
        CustomerPhoneNo: req.body.CustomerPhoneNo,
        InputFileName: req.body.InputFileName,
        OperationTime:  req.body.OperationTime,
        OperationEndDateTime:  req.body.OperationEndDateTime,
        UpdateByUser:  req.body.UpdateByUser
    };

    var jobstatus;
    try {
        jobstatus = await updCloseJob(req.params.id, tmpCloseJob)
        res.send(jobstatus);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Error select JobStatus: " });
    }
}
var updCloseJob = (id, tmpCloseJob) => {
    let sql = `
    UPDATE demodb.tmpCloseJob SET 
        TID = ?, 
        Bank = ?, 
        SerialNoEDC = ?, 
        TechnicName = ?,
        OperationDate = ?, 
        UpdateDateTime = ?, 
        JobType = ?, 
        JobStatus = ?, 
        Remark = ?, 
        PhoneNo = ?, 
        Merchant = ?, 
        OldSerialNoEDC = ?, 
        CustomerName = ?, 
        CustomerPhoneNo = ?,
        InputFileName = ?,
        OperationTime = ?,
        OperationEndDateTime = ?,
        UpdateByUser = ?
        WHERE ID = ?;`

    return new Promise(function (resolve, reject) {
        connect.connect(() => {
            connect.query(sql, 
            [
                tmpCloseJob.TID,
                tmpCloseJob.Bank, 
                tmpCloseJob.SerialNoEDC, 
                tmpCloseJob.TechnicName,
                tmpCloseJob.OperationDate, 
                tmpCloseJob.UpdateDateTime, 
                tmpCloseJob.JobType, 
                tmpCloseJob.JobStatus,
                tmpCloseJob.Remark, 
                tmpCloseJob.PhoneNo, 
                tmpCloseJob.Merchant, 
                tmpCloseJob.OldSerialNoEDC,
                tmpCloseJob.CustomerName, 
                tmpCloseJob.CustomerPhoneNo,
                tmpCloseJob.InputFileName,
                tmpCloseJob.OperationTime,
                tmpCloseJob.OperationEndDateTime,
                tmpCloseJob.UpdateByUser,
                id
            ],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                if (result == null) {
                    return reject({ message: "Mysql Error" });
                }
                resolve({ message: "Update finish job complete" });
            })
        })
    });
}

const DeleteCloseJob = async (req, res) => {
    var jobstatus;
    try {
        jobstatus = await delCloseJob(req.params.id);
        res.send(jobstatus);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Error select JobStatus: " });
    }
};

var delCloseJob = (id) => {
    return new Promise(function (resolve, reject) {
        connect.connect(() => {
            connect.query(`DELETE FROM demodb.tmpCloseJob WHERE id = ?`, id, (err, result) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }

                if (result == null) {
                    return reject({ message: "Mysql Error" });
                }
                resolve({ message: "Delete finish job complete" });
            })
        })
    });
}

const UploadImage = async (req, res) => {
    try {
        // if (req.file == undefined) {
        //     return res.status(400).send("Please upload an excel file!");
        // }
        let pathfile = __basedir + "/app/images/" + req.file.filename;
        console.log(pathfile);
        // console.log(req.file.originalname);

        let orgFileName = req.file.originalname;
        res.status(200).send({ message: "upload file to database complete!" + orgFileName });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
};

// const fs = require('fs');
// const Axios = require('axios')

// async function DownloadImage(url, filepath) {
//     const response = await Axios({
//         url,
//         method: 'GET',
//         responseType: 'stream'
//     });
//     return new Promise((resolve, reject) => {
//         response.data.pipe(fs.createWriteStream(filepath))
//             .on('error', reject)
//             .once('close', () => resolve(filepath)); 
//     });
// }

module.exports = {
    JobStatus,
    JobCloseData,
    CreateCloseJob,
    UpdateCloseJob,
    DeleteCloseJob,
    UploadImage
};