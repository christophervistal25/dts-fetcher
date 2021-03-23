const axios = require("axios");
let mysql = require("mysql");
const express = require("express");
let FormData = require("form-data");
const { report } = require("process");
const { count } = require("console");
const { response } = require("express");
const { toNamespacedPath } = require("path");
const app = express();
const PORT = process.env.PORT || 3030;

require("events").EventEmitter.defaultMaxListeners = 15;

axios.defaults.baseURL = "http://192.168.1.14:8000";

  // Mysql Database credentials
const HOST = "localhost";
const USERNAME = "root";
const PASSWORD = "";
const DB_NAME = "dts_app";

let connection = mysql.createConnection({
  host: HOST,
  user: USERNAME,
  password: PASSWORD,
  database: DB_NAME,
});

connection.connect();

app.get("/", (req, res) => {
  res.send("Hello , World");
});

async function fetchRecord() {
  //   const recordResponse = await axios("/services/api/documents/records.php");
  //   let records = await recordResponse;

  //   records.data.map((record) => {
  //     connection.query(
  //       "INSERT IGNORE INTO dtse0dceaf439f38b60135bf84898cf7951_data_tb SET ?",
  //       record,
  //       (error, result, fields) => {
  //         if (error) {
  //           throw new Error("Duplicate entry for document");
  //         }
  //       }
  //     );
  //   });

  //   const historyResponse = await axios("/services/api/documents/history.php");
  //   let result = await historyResponse;
  //   result.data.map((history) => {
  //     connection.query(
  //       "INSERT IGNORE INTO dtsa6e7ffacbf8feb04facb340d62ceddd7_history_logs_tb SET ?",
  //       history,
  //       (error, result, fields) => {
  //         if (error) {
  //           throw new Error(`Duplicate entry for document history`);
  //         }
  //       }
  //     );
  //   });

  // connection.query(
  //   "SELECT * FROM dtse0dceaf439f38b60135bf84898cf7951_data_tb",
  //   function (error, results, fields) {
  //     if (error) {
  //       throw new Error(
  //         "Something went wrong in fetching data in local database"
  //       );
  //     }

  //     let documents = JSON.parse(JSON.stringify(results));
  //     console.log(documents);
  //     // Send documents object to API
  //     axios
  //       .post(`/services/api/documents/store.php`, { documents })
  //       .then((response) => console.log(response.data))
  //       .catch((err) => console.log(err));
  //   }
  // );
    let data = { 
        'data_datetoday'         : '2021-03-',
        'data_pr_no'             : '',
        'data_pr_date'           : '2021-03-23',
        'data_office'            : 'PGO',
        'data_claimant'          : 'Joey Garcia',
        'data_transaction'       : 'no_input',
        'data_amount'            : 5.00,
        'data_purpose'           : 3,
        'data_charge_to'         : 3,
        'data_current_department': 'PGSO',
        'data_current_station'   : 1001,
        'from_local'             : true,
    };


      // axios
      // .post(`dts_admin_d70c9453e1f41d4624f2937b05819317/c79bdf421714f5087fc34b7c538b6807/transaction/added_btn_particulars.php`,  JSON.parse(JSON.stringify(data)) )
      // .then((response) => console.log(response.data))
      // .catch((err) => console.log(err));

      
      // axios
      // .post(`dts_admin_d70c9453e1f41d4624f2937b05819317/c79bdf421714f5087fc34b7c538b6807/transaction/added_btn_history_logs.php`,  JSON.parse(JSON.stringify(data)) )
      // .then((response) => console.log(response.data))
      // .catch((err) => console.log(err));
      

      axios
        .post(`dts_admin_d70c9453e1f41d4624f2937b05819317/c79bdf421714f5087fc34b7c538b6807/transaction/added_btn_data.php`,  JSON.parse(JSON.stringify(data)) )
        .then((response) => console.log(response.data))
        .catch((err) => console.log(err));

}

setInterval(fetchRecord, 2000);

const server = app.listen(PORT, () => console.log(`Server start listening to port ${PORT}`));


const io = require("socket.io")(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {

  socket.on("SEND_PR_DATA", (document) => {

    let doc = {
      dtse0dce_data_reference_no : document.dtse0dce_data_reference_no,
      dtse0dce_data_pr_no : document.dtse0dce_data_pr_no,
      dtse0dce_data_pr_date : document.dtse0dce_data_pr_date,
      dtse0dce_data_office : document.dtse0dce_data_office,
      dtse0dce_data_claimant : document.dtse0dce_data_claimant,
      dtse0dce_data_particulars : document.dtse0dce_data_particulars,
      dtse0dce_data_amount : document.dtse0dce_data_amount,
      dtse0dce_data_purpose : document.dtse0dce_data_purpose,
      dtse0dce_data_charge_to : document.dtse0dce_data_charge_to,
      dtse0dce_data_current_department : document.dtse0dce_data_current_department,
      dtse0dce_data_current_station : document.dtse0dce_data_current_station,
    };

    let history = {
      dtsa6e7f_history_logs_user_id : document.dtsa6e7f_history_logs_user_id,
      dtsa6e7f_history_logs_datetime : document.dtsa6e7f_history_logs_datetime,
      dtsa6e7f_history_logs_office : document.dtsa6e7f_history_logs_office,
      dtsa6e7f_history_logs_claimant : document.dtsa6e7f_history_logs_claimant,
      dtsa6e7f_history_logs_transaction : document.dtsa6e7f_history_logs_transaction,
      dtsa6e7f_history_logs_data_id : document.dtsa6e7f_history_logs_data_id,
      dtsa6e7f_history_logs_current_department : document.dtsa6e7f_history_logs_current_department,
      dtsa6e7f_history_logs_current_station : document.dtsa6e7f_history_logs_current_station,
    };
    
    let particulars = {
      dts_particulars_item_no : document.dts_particulars_item_no,
      dts_particulars_quantity : document.dts_particulars_quantity,
      dts_particulars_data_id : document.dts_particulars_data_id,
      dts_particulars_unit_of_issue : document.dts_particulars_unit_of_issue,
      dts_particulars_item_description : document.dts_particulars_item_description,
      dts_particulars_estimated_unit_coast : document.dts_particulars_estimated_unit_coast,
      dts_particulars_estimated_total_coast : document.dts_particulars_estimated_total_coast,
    }
    
    connection.beginTransaction(function(err) {
          if (err) { throw err; }
      
          // Insertion of document
          connection.query("INSERT IGNORE INTO dtse0dceaf439f38b60135bf84898cf7951_data_tb SET ?", doc, (error, result, fields) => {
              if (error) {
              throw new Error("Duplicate entry for document");
              }

              // Insertion of history
              connection.query("INSERT IGNORE INTO dtsa6e7ffacbf8feb04facb340d62ceddd7_history_logs_tb SET ?", history, (error, result, fields) => {
                  if (error) {
                  throw new Error("Duplicate entry for document");
                  }

                  // Insertion of particulars
                  connection.query("INSERT IGNORE INTO dts_particulars_tb SET ?", particulars, (error, result, fields) => { 
                      if (error) {
                      throw new Error("Duplicate entry for document");
                      }
                      
                      // Commit the transaction.
                      connection.commit(function(err) {
                          if (err) {
                              return connection.rollback(function() {
                                throw err;
                              });
                          }
                          console.log(`New data insert from liason : ${doc.dtse0dce_data_claimant}`)
                          io.emit('data_passed', { success : true });
                      });
                  });
              });
        });
    });

  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});