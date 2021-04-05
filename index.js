let mysql = require("mysql");
let _ = require("lodash");
const axios = require("axios");
const express = require("express");
const app = express();
const path = require("path");

const doc = require("./modules/document.js");
const PORT = process.env.PORT || 3030;
const connection = require("./modules/database-connection.js");

require("events").EventEmitter.defaultMaxListeners = 15;

axios.defaults.baseURL = "http://192.168.0.104:8000/";

app.get("/", (_, res) =>
  res.sendFile(path.join(__dirname + "/public/index.html"))
);

// let requestWebData = async () => {
//   const recordResponse = await axios("/services/api/documents/records.php");
//   let documents = await recordResponse;
//   doc.insertAll(documents.data);

//   const historyResponse = await axios("/services/api/documents/history.php");
//   let histories = await historyResponse;
//   doc.insertHistories(histories.data);

//   // This will push to live server.
//   doc.pushDocuments();
// };

let requestWebData = async () => {
  const recordResponse = await axios("/services/api/documents/records.php");
  let documents = await recordResponse;
  doc.insertAll(documents.data);

  const historyResponse = await axios("/services/api/documents/history.php");
  let histories = await historyResponse;
  doc.insertHistories(histories.data);

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
    data: [
      {
        data_datetoday: "2021-03",
        data_pr_no: "",
        data_pr_date: "2021-03-23",
        data_office: "PGO",
        data_claimant: "Joey Garcia",
        data_transaction: "no_input",
        data_amount: 5.0,
        data_purpose: 3,
        data_charge_to: 3,
        data_current_department: "PGSO",
        data_current_station: 1001,
      },
    ],
    from_local: true,
  };

  // axios
  //   .post(
  //     `dts_admin_d70c9453e1f41d4624f2937b05819317/c79bdf421714f5087fc34b7c538b6807/transaction/added_btn_particulars.php`,
  //     JSON.parse(JSON.stringify(data))
  //   )
  //   .then((response) => console.log(response.data))
  //   .catch((err) => console.log(err));

  // axios
  //   .post(
  //     `dts_admin_d70c9453e1f41d4624f2937b05819317/c79bdf421714f5087fc34b7c538b6807/transaction/added_btn_history_logs.php`,
  //     JSON.parse(JSON.stringify(data))
  //   )
  //   .then((response) => console.log(response.data))
  //   .catch((err) => console.log(err));

  axios
    .post(
      `dts_admin_d70c9453e1f41d4624f2937b05819317/c79bdf421714f5087fc34b7c538b6807/transaction/added_btn_data_api.php`,
      data
    )
    .then((response) => console.log(response.data))
    .catch((err) => console.log(err));
};

setInterval(requestWebData, 2000);

const server = app.listen(PORT, () =>
  console.log(`Server start listening to port ${PORT}`)
);

const io = require("socket.io")(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  socket.on("SEND_PR_DATA", (document) => {
    let doc = {
      dtse0dce_data_reference_no: document.dtse0dce_data_reference_no,
      dtse0dce_data_pr_no: document.dtse0dce_data_pr_no,
      dtse0dce_data_pr_date: document.dtse0dce_data_pr_date,
      dtse0dce_data_office: document.dtse0dce_data_office,
      dtse0dce_data_claimant: document.dtse0dce_data_claimant,
      dtse0dce_data_particulars: document.dtse0dce_data_particulars,
      dtse0dce_data_amount: document.dtse0dce_data_amount,
      dtse0dce_data_purpose: document.dtse0dce_data_purpose,
      dtse0dce_data_charge_to: document.dtse0dce_data_charge_to,
      dtse0dce_data_current_department:
        document.dtse0dce_data_current_department,
      dtse0dce_data_current_station: document.dtse0dce_data_current_station,
    };

    let history = {
      dtsa6e7f_history_logs_user_id: document.dtsa6e7f_history_logs_user_id,
      dtsa6e7f_history_logs_datetime: document.dtsa6e7f_history_logs_datetime,
      dtsa6e7f_history_logs_office: document.dtsa6e7f_history_logs_office,
      dtsa6e7f_history_logs_claimant: document.dtsa6e7f_history_logs_claimant,
      dtsa6e7f_history_logs_transaction:
        document.dtsa6e7f_history_logs_transaction,
      dtsa6e7f_history_logs_data_id: document.dtsa6e7f_history_logs_data_id,
      dtsa6e7f_history_logs_current_department:
        document.dtsa6e7f_history_logs_current_department,
      dtsa6e7f_history_logs_current_station:
        document.dtsa6e7f_history_logs_current_station,
    };

    connection.beginTransaction(function (err) {
      if (err) {
        throw err;
      }

      // Insertion of Document
      connection.query(
        "INSERT IGNORE INTO dtse0dceaf439f38b60135bf84898cf7951_data_tb SET ?",
        doc,
        (error, result, fields) => {
          if (error) {
            throw error;
          }

          // Insertion of History
          connection.query(
            "INSERT IGNORE INTO dtsa6e7ffacbf8feb04facb340d62ceddd7_history_logs_tb SET ?",
            history,
            (error, result, fields) => {
              if (error) {
                throw error;
              }

              // Insertion of Particulars
              document.particulars.map((particular) => {
                connection.query(
                  "INSERT IGNORE INTO dts_particulars_tb SET ?",
                  particular,
                  (error, result, fields) => {
                    if (error) {
                      throw error;
                    }
                  }
                );
              });

              connection.commit(function (err) {
                if (err) {
                  return connection.rollback(function () {
                    throw err;
                  });
                }

                console.log(
                  `New data insert from liason : ${doc.dtse0dce_data_claimant}`
                );

                io.emit("data_passed", { success: true });
              });
            }
          );
        }
      );
    });
  });

  socket.on("disconnect", () => console.log("user disconnected"));
});
