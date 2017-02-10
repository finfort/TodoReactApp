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
                if(res)
                    return res.json(recordsets);
                if(!res)
                    return recordsets;
            }).catch(function (err) {
                // ... error checks 
                console.log("err execute",err);
                dbConn.close();
                
            });
    }).catch(function (err) {
        console.log("err conn",err);
        // if no connection show error message on screen
    });

};

exports.getDatawoRes = function (procedure) {
    // export this connection string to config file
    var config = "mssql://center:1@SRV/svod_db";
    var dbConn = new sql.Connection(config);

    // sql.connect(config).then(function () {
    dbConn.connect().then(function () {
        // Stored Procedure 
        new sql.Request(dbConn)
            .execute(procedure).then(function (recordsets) {
                // debugger;
                console.log("return data");
                    return recordsets;
            }).catch(function (err) {
                // ... error checks 
                console.log("err execute",err);
                dbConn.close();
                
            });
    }).catch(function (err) {
        console.log("err conn",err);
        // if no connection show error message on screen
    });

};