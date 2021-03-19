const axios   = require('axios')
let   mysql   = require('mysql')
const express = require('express')
const app     = express()
const PORT    = process.env.PORT || 3030;

require('events').EventEmitter.defaultMaxListeners = 15;

axios.defaults.baseURL = 'http://192.168.1.2:8000';

// Mysql Database credentials
const HOST     = 'localhost';
const USERNAME = 'root';
const PASSWORD = '';
const DB_NAME  = 'dts_app';

let connection = mysql.createConnection({
    host    : HOST,
    user    : USERNAME,
    password: PASSWORD,
    database: DB_NAME
});

connection.connect();

app.get('/', (req,res) => {
    res.send('Hello , World');
});

app.get('/posts', (req, res) => {
    connection.query('SELECT * FROM dtse0dceaf439f38b60135bf84898cf7951_data_tb', (error, result, fields) => {
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
    });
});

async function fetchRecord() {
    const recordResponse = await axios('/services/api/documents/records.php');
    let records = await recordResponse;

    records.data.map((record) => {
        connection.query("INSERT IGNORE INTO dtse0dceaf439f38b60135bf84898cf7951_data_tb SET ?", record, (error,  result, fields) => {
            if(error) {
                throw new Error("Duplicate entry for document");
            }
        });
    });
    
    const historyResponse = await axios('/services/api/documents/history.php');
    let result = await historyResponse;
    result.data.map((history) => {
        connection.query("INSERT IGNORE INTO dtsa6e7ffacbf8feb04facb340d62ceddd7_history_logs_tb SET ?", history, (error,  result, fields) => {
            if(error) {
                throw new Error(`Duplicate entry for document history`);
            }
        });
    });
    
    
}


setInterval(fetchRecord, 1000);


app.listen(PORT, () => console.log(`Server start listening to port ${PORT}`))
