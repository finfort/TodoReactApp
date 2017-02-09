const sql = require('mssql');
const config = require('../services/dbConfig');

exports.getSensorsData = function (req, res, next) {
    // export this connection string to config file
    // var config = "mssql://center:1@SRV/svod_db";

    sql.connect(config).then(function () {
        // Stored Procedure 
        new sql.Request()
            .execute('GetSensors').then(function (recordsets) {
                return res.json(recordsets);
            }).catch(function (err) {
                // ... error checks 
                console.log(err);
            });
    }).catch(function (err) {
        // ... error checks 
        debugger;
        console.log(err);

    });

};