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
                console.log("err execute request",err);
                dbConn.close();
                
            });
    }).catch(function (err) {
        console.log("err conn",err);
        
        res.status(err.status || 500); //change this
        
        //res.send(err).status(err.status || 500);
        
        //exception for example when network disabled
        // if no connection show error message on screen
    });

};
