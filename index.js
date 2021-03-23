const axios = require("axios");
let mysql = require("mysql");
const express = require("express");
let FormData = require("form-data");
const { report } = require("process");
const app = express();
const PORT = process.env.PORT || 3030;

require("events").EventEmitter.defaultMaxListeners = 15;

// axios.defaults.baseURL = "http://192.168.0.108:8000";

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

  connection.query(
    "SELECT * FROM dtse0dceaf439f38b60135bf84898cf7951_data_tb",
    function (error, results, fields) {
      if (error) {
        throw new Error(
          "Something went wrong in fetching data in local database1"
        );
      }

      let documents = JSON.parse(JSON.stringify(results));
      // Send documents object to API
      axios
        .post(`/services/api/documents/store.php`, { documents })
        .then((response) => console.log(response.data))
        .catch((err) => console.log(err));
    }
  );
}

// setInterval(fetchRecord, 2000);

const server = app.listen(PORT, () => console.log(`Server start listening to port ${PORT}`));


const io = require("socket.io")(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {

  socket.on("SEND_PR_DATA", (document) => {
    console.log(document);
      connection.query(
        "INSERT IGNORE INTO dtse0dceaf439f38b60135bf84898cf7951_data_tb SET ?",
        document,
        (error, result, fields) => {
          console.log(error, result);
          if (error) {
            throw new Error("Duplicate entry for document");
          }
        }
      );
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});