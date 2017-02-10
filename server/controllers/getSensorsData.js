const sql = require('mssql');
// const config = require('../services/dbConfig');

exports.getData = function (res, procedure) {
    // export this connection string to config file
    var config = "mssql://center:1@SRV/svod_db";
    var dbConn = new sql.Connection(config);

    // sql.connect(config).then(function () {
    dbConn.connect().then(function () {
        // Stored Procedure 
        new sql.Request(dbConn)
            .execute(procedure).then(function (recordsets) {
                return res.json(recordsets);
            }).catch(function (err) {
                // ... error checks 
                console.log("err execute",err);
                dbConn.close();
                
            });
    }).catch(function (err) {
        // ... error checks 
        // debugger;
        console.log("err conn",err);

        // res.send(err);

    });

};