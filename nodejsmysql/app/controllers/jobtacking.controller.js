// var path = require('path');
const connect = require("../models/db.js");
const readXlsxFile = require("read-excel-file/node");

const upload = async (req, res) => {
};

const getData = (req, res) => {
};

function sheetTechnician(filePath, tmpFileName, tmpLoginName) {
};

function sheetVendor(filePath, tmpFileName, tmpLoginName) {
};

function sheetCloseJob(filePath, tmpFileName, tmpLoginName) {
};

const showSubString = (req, res) => {
};

function saveImportFileName(tmpFileName, tmpLoginName){
};

module.exports = {
    upload,
    getData,
    showSubString,
};

// rows.forEach((row) => {
//     if ((row[0] === '') && (row[1] === '')) {

//     } else {
//         jobtackings.push([ row[0],row[1],row[2],row[3],row[4],row[5],row[6],row[7],'Programmer-test','JobTacking_0.xlsx','1-ช่างทำงาน' ]);
//     }
// });
        // let length = rows.length;
        // for (let i = 0; i < length; i++) {
        //     if ( (rows[i][0] === "") || (rows[i][1] === "") ) {
        //         jobtackings.push([ i, 'row is blank']);
        //     } else {
        //         jobtackings.push([ i,rows[i][0],rows[i][1],rows[i][2],rows[i][3],rows[i][4],rows[i][5],rows[i][6],rows[i][7], 'Programmer-test', 'JobTacking_0.xlsx', '1-ช่างทำงาน']);
        //     }
        // }

// readXlsxFile(filePath, { sheet: '1-ช่างทำงาน' }).then((rows) => {
//     //console.table(rows);
//     rows.shift();
//     let jobtackings = [];
//     for (i in rows) {
//         let jobtacking = "";
//         for (j in rows[i]) {
//             // console.log(rows[i][j]);
//             jobtacking += rows[i][j] + ","
//         }
//         jobtackings.push([jobtacking]);
//     }
//     console.log(jobtackings);
// });

            // let jobtackings = [];

            // rows.forEach((row) => {
            //     let jobtacking = {
            //         ID: row[0],
            //         JobNumber: row[1],
            //         TID: row[3],
            //         Bank: row[4],
            //         Contact: row[5],
            //         PhoneNo: row[6],
            //         SerialNoEDC: row[7],
            //         SerialNoBase: row[8],
            //         SerialNoPinpad: row[9],
            //         SerialNoScanner: row[10],
            //         SerialNoHub: row[11],
            //         SerialNoSim: row[12],
            //         ReturnNoEDC: row[13],
            //         ReturnNoBase: row[14],
            //         ReturnNoPinpad: row[15],
            //         ReturnNoScanner: row[16],
            //         ReturnNoHub: row[17],
            //         ReturnNoSim: row[18],
            //         Accessory: row[19],
            //         ResultCode: row[20],
            //         Remark: row[21],
            //         RecordDateTime: [22],
            //         TackDate: row[23],
            //         TackTime: row[24],
            //         LastStatus: row[25],
            //         AdminName: row[26],
            //         TechnicName: row[27],
            //         ImpFileName: row[28],
            //         Comment: row[29],
            //         SheetName: row[30]
            //     };
            //     jobtackings.push(jobtacking);
            // });\

//------------ Example 3 – Access Result Object of MySQL SELECT FROM Query via Node.js
            // con.connect(function(err) {
            //     if (err) throw err;
            //     // if connection is successful
            //     con.query("SELECT * FROM students", function (err, result, fields) {
            //       // if any error while executing above query, throw error
            //       if (err) throw err;
            //       // if there is no error, you have the result
            //       // iterate for all the rows in result
            //       Object.keys(result).forEach(function(key) {
            //         var row = result[key];
            //         console.log(row.name)
            //       });

                // Object.keys(fields).forEach(function(key) {
                //     var field = fields[key];
                //     console.log(field)
                // });

            //     });

            /*
const getAll = (param, result) => {
    let query = "SELECT * FROM jobtacking";

    // if (param) {
    //     query += ` WHERE title LIKE '%${param}%'`;
    // }

    connect.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("tutorials: ", res);
        result(null, res);
    });
};
            */