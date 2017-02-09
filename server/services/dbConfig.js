// var config = {
//     user: 'center',
//     password: '1',
//     server: 'SRV', // You can use 'localhost\\instance' to connect to named instance 
//     database: 'svod_db'

//     // options: {
//     //     encrypt: true // Use this if you're on Windows Azure 
//     // }
// };
const config = "mssql://center:1@SRV/svod_db";

module.exports = {
    config
};

