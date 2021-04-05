let mysql = require('mysql')

let connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'dts_app',
});

connection.connect();


module.exports = connection