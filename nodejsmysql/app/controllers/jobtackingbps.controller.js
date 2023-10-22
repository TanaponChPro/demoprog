const connect = require("../models/db.js");
const readXlsxFile = require("read-excel-file/node");
const jobimportbps = require("../models/jobimportbps.model.js");
const fs = require('fs');

const uploadexcelbps = async (req, res) => {

};

function getSheet(filePath, tmpFileName, tmpLoginName) {

}

function saveImportFileName(tmpFileName, tmpLoginName) {
};

function sheetDetail(filePath, tmpFileName, tmpLoginName) {
};

const getJobImportBPS = (req, res) => {
};

const welcome = (req, res) => {
};

function setWhereIsLast(tmpType, tmpStatus) {
}

/*----------------------------------------------------- Back-End Section ---------------------------------------------------*/
const ProcessRunBackend = async (req, res) => {

}
var getImportFileName = (sql, place_holder) => {

}
var insertJobImportBPS = (pamFileName, pamImpDate) => {
}
var insertDevice = (pamFileName, pamImpDate, pamDevType) => {
}

var insertDeviceHistory = (pamFileName, pamImpDate, pamDevType) => {
}

var updateFileImport = (pamFileName, pamImpDate) => {
}

/*----------------------------------- Create and Update Job from Webpage Section ---------------------------------------------*/
const updateFromPage = async (req, res) => {
}

const insertFromInputFormBPS = async (req, res) => { // insert data from page inputFormBPS
}

const deleteFromInputFormBPS = async (req, res) => {
};

var delJobImportBPS = (id) => {
}
const fse = require('fs-extra');
/*----------------------------------- Transfer temp JobNo to real JobNo Section ---------------------------------------------*/
const tranTempJobNo2RealJobNo = async (req, res) => {
}

var insertJobImportBPS_fromCloseJob = (tmpCloseJob) => {
}

const copyImageTempJobNo2RealJobNo = (req, res) => {
}

const createPathStockImage = (req, res) => {
}

module.exports = {
    uploadexcelbps,
    getJobImportBPS,
    welcome,
    ProcessRunBackend,
    updateFromPage,
    tranTempJobNo2RealJobNo,
    copyImageTempJobNo2RealJobNo,
    createPathStockImage,
    insertFromInputFormBPS,
    deleteFromInputFormBPS
};



/**
 * NodeJS mysql if null or empty
 mysqlConnection.query('SELECT `something` FROM `here` WHERE `dog` = ?', [info] function(err, row, fields) {
  if(err) {
    return console.log('Error1');
  } else if (!row.length) {
    return console.log('Error2');
  } else if (!row[0].something) {
    return console.log('Error3');
  }

  console.log('Works');
});
 */
                // if (xlx instanceof Date) {
                //     tmp = 'is date';// executes, because `x` is technically a date object
                //     tmpDate = xlx.getDate();
                //     tmpMonth = xlx.getMonth();
                //     tmpYear = xlx.getFullYear();
                //     tmpYYMMDD = xlx.toISOString().slice(0, 10)
                // } else {
                //     tmp = 'is not date';
                // }
                // console.log(ir + ': ' + temp[0]);
                // if (xlx instanceof Date && !isNaN(xlx)) {
                //     tmp = 'is date'; // will not execute
                // } else {
                //     tmp = 'is not date';
                // }
                // console.log(ir + ': ' + temp[0] + ' : ' + row[5].value + ' : ' + temp[2] + ' : ' + tmp + ' : ' + tmpDate + tmpMonth + tmpYear+ ':' +tmpYYMMDD);
                // if (tmpStr.length > 500) tmpStr  = tmpStr.substring(0,499);