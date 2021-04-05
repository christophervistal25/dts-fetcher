let connection = require("./database-connection.js");
const document_table = "dtse0dceaf439f38b60135bf84898cf7951_data_tb";
const document_history_table =
  "dtsa6e7ffacbf8feb04facb340d62ceddd7_history_logs_tb";

module.exports = {
  insert: (data) => {
    connection.query(
      `INSERT IGNORE INTO ${document_table} SET ?`,
      data,
      (error, result, fields) => {
        if (error) throw new Error(error);
      }
    );
  },
  insertAll: (records) => {
    records.map((record) => module.exports.insert(record));
  },
  insertHistory: (history) => {
    connection.query(
      `INSERT IGNORE INTO ${document_history_table} SET ?`,
      history,
      (error, result, fields) => {
        if (error) throw new Error(error);
      }
    );
  },
  insertHistories: (histories) => {
    histories.map((history) => module.exports.insertHistory(history));
  },
};
