let mysql = require('mysql')

let connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'af7c10a5fd28e996f18a1f55fe4aa41f_dts_db',
});

connection.connect();


module.exports = connection