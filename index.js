const axios = require("axios");
const express = require("express");
const _ = require('lodash');
const app = express();
const path = require("path");
let figlet = require('figlet');

const PORT = process.env.PORT || 3030;
const connection = require("./modules/database-connection.js");

require("events").EventEmitter.defaultMaxListeners = 15;

axios.defaults.baseURL = "http://192.168.0.104:8000/";

app.get("/", (_, res) =>
  res.sendFile(path.join(__dirname + "/public/index.html"))
);
figlet('DTS CLI', function(err, data) {
  if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
  }
  console.log(data)
});
let pushData = () => {
  // Messages
  connection.query('SELECT * FROM messages', function (error, results, fields) {
        let id = _.map(results, 'id').join('|')
        let phone = _.map(results, 'phone').join('|')
        let body = _.map(results, 'body').join('|')
        let status = _.map(results, 'status').join('|')

        

      connection.query('SELECT * FROM dts_particulars_tb', function (error, results, fields) {

        let dts_particulars_id = _.map(results, 'dts_particulars_id').join('|')
        let dts_particulars_data_id = _.map(results, 'dts_particulars_data_id').join('|')
        let dts_particulars_item_no = _.map(results, 'dts_particulars_item_no').join('|')
        let dts_particulars_quantity = _.map(results, 'dts_particulars_quantity').join('|')
        let dts_particulars_unit_of_issue = _.map(results, 'dts_particulars_unit_of_issue').join('|')
        let dts_particulars_item_description = _.map(results, 'dts_particulars_item_description').join('|')
        let dts_particulars_estimated_unit_coast = _.map(results, 'dts_particulars_estimated_unit_coast').join('|')
        let dts_particulars_estimated_total_coast = _.map(results, 'dts_particulars_estimated_total_coast').join('|')

        connection.query('SELECT * FROM af7c10a5fd28e996f18a1f55fe4aa41f_dts_db.dtse0dceaf439f38b60135bf84898cf7951_data_tb', function (error, results, fields) {
          let dtse0dce_data_id = _.map(results, 'dtse0dce_data_id').join('|')
          let dtse0dce_data_reference_no = _.map(results, 'dtse0dce_data_reference_no').join('|')
          let dtse0dce_data_pr_no = _.map(results, 'dtse0dce_data_pr_no').join('|')
          let dtse0dce_data_pr_date = _.map(results, 'dtse0dce_data_pr_date').join('|')
          let dtse0dce_data_office = _.map(results, 'dtse0dce_data_office').join('|')
          let dtse0dce_data_claimant = _.map(results, 'dtse0dce_data_claimant').join('|')
          let dtse0dce_data_particulars = _.map(results, 'dtse0dce_data_particulars').join('|')
          let dtse0dce_data_amount = _.map(results, 'dtse0dce_data_amount').join('|')
          let dtse0dce_data_purpose = _.map(results, 'dtse0dce_data_purpose').join('|')
          let dtse0dce_data_charge_to = _.map(results, 'dtse0dce_data_charge_to').join('|')
          let dtse0dce_data_current_department = _.map(results, 'dtse0dce_data_current_department').join('|')
          let dtse0dce_data_current_station = _.map(results, 'dtse0dce_data_current_station').join('|')
          let dtse0dce_data_current_in_out_return = _.map(results, 'dtse0dce_data_current_in_out_return').join('|')
          

          connection.query('SELECT * FROM `dtsa6e7ffacbf8feb04facb340d62ceddd7_history_logs_tb`', function (error, results, fields) {
                let dtsa6e7f_history_logs_id = _.map(results, 'dtsa6e7f_history_logs_id').join('|')
                let dtsa6e7f_history_logs_user_id = _.map(results, 'dtsa6e7f_history_logs_user_id').join('|')
                let dtsa6e7f_history_logs_datetime = _.map(results, 'dtsa6e7f_history_logs_datetime').join('|')
                let dtsa6e7f_history_logs_timelaps = _.map(results, 'dtsa6e7f_history_logs_timelaps').join('|')
                let dtsa6e7f_history_logs_office = _.map(results, 'dtsa6e7f_history_logs_office').join('|')
                let dtsa6e7f_history_logs_claimant = _.map(results, 'dtsa6e7f_history_logs_claimant').join('|')
                let dtsa6e7f_history_logs_status = _.map(results, 'dtsa6e7f_history_logs_status').join('|')
                let dtsa6e7f_history_logs_transaction = _.map(results, 'dtsa6e7f_history_logs_transaction').join('|')
                let dtsa6e7f_history_logs_data_id = _.map(results, 'dtsa6e7f_history_logs_data_id').join('|')
                let dtsa6e7f_history_logs_current_department = _.map(results, 'dtsa6e7f_history_logs_current_department').join('|')
                let dtsa6e7f_history_logs_current_station = _.map(results, 'dtsa6e7f_history_logs_current_station').join('|')
                let dtsa6e7f_history_logs_reasons = _.map(results, 'dtsa6e7f_history_logs_reasons').join('|')
                let dtsa6e7f_history_logs_remarks = _.map(results, 'dtsa6e7f_history_logs_remarks').join('|')
                let dtsa6e7f_history_logs_release = _.map(results, 'dtsa6e7f_history_logs_release').join('|')
                let dtsa6e7f_history_logs_recylce = _.map(results, 'dtsa6e7f_history_logs_recylce').join('|')
                let dtsa6e7f_history_logs_status_last = _.map(results, 'dtsa6e7f_history_logs_status_last').join('|')

                  axios.post('http://192.168.1.10:8000/sample.php', {
                    messages_ids : id,
                    messages_phones : phone,
                    messages_bodys : body,
                    messages_statuss : status,

                    dts_particulars_ids : dts_particulars_id,
                    dts_particulars_data_ids : dts_particulars_data_id ,
                    dts_particulars_item_nos : dts_particulars_item_no,
                    dts_particulars_quantitys : dts_particulars_quantity,
                    dts_particulars_unit_of_issue  : dts_particulars_unit_of_issue,
                    dts_particulars_item_description : dts_particulars_item_description,
                    dts_particulars_estimated_unit_coast : dts_particulars_estimated_unit_coast,
                    dts_particulars_estimated_total_coast : dts_particulars_estimated_total_coast,


                    dtse0dce_data_ids : dtse0dce_data_id,
                    dtse0dce_data_reference_nos : dtse0dce_data_reference_no,
                    dtse0dce_data_pr_nos : dtse0dce_data_pr_no,
                    dtse0dce_data_pr_dates : dtse0dce_data_pr_date,
                    dtse0dce_data_offices : dtse0dce_data_office,
                    dtse0dce_data_claimants : dtse0dce_data_claimant,
                    dtse0dce_data_particularss : dtse0dce_data_particulars,
                    dtse0dce_data_amounts : dtse0dce_data_amount,
                    dtse0dce_data_purposes : dtse0dce_data_purpose,
                    dtse0dce_data_charge_tos : dtse0dce_data_charge_to,
                    dtse0dce_data_current_departments : dtse0dce_data_current_department,
                    dtse0dce_data_current_stations : dtse0dce_data_current_station,
                    dtse0dce_data_current_in_out_returns : dtse0dce_data_current_in_out_return,

                    dtsa6e7f_history_logs_ids : dtsa6e7f_history_logs_id,
                    dtsa6e7f_history_logs_user_ids : dtsa6e7f_history_logs_user_id,
                    dtsa6e7f_history_logs_datetimes : dtsa6e7f_history_logs_datetime,
                    dtsa6e7f_history_logs_timelapss : dtsa6e7f_history_logs_timelaps,
                    dtsa6e7f_history_logs_offices : dtsa6e7f_history_logs_office,
                    dtsa6e7f_history_logs_claimants : dtsa6e7f_history_logs_claimant,
                    dtsa6e7f_history_logs_statuss : dtsa6e7f_history_logs_status,
                    dtsa6e7f_history_logs_transactions : dtsa6e7f_history_logs_transaction,
                    dtsa6e7f_history_logs_data_ids : dtsa6e7f_history_logs_data_id,
                    dtsa6e7f_history_logs_current_departments : dtsa6e7f_history_logs_current_department,
                    dtsa6e7f_history_logs_current_stations : dtsa6e7f_history_logs_current_station,
                    dtsa6e7f_history_logs_reasonss : dtsa6e7f_history_logs_reasons,
                    dtsa6e7f_history_logs_remarkss : dtsa6e7f_history_logs_remarks,
                    dtsa6e7f_history_logs_releases : dtsa6e7f_history_logs_release,
                    dtsa6e7f_history_logs_recylces : dtsa6e7f_history_logs_recylce,
                    dtsa6e7f_history_logs_status_lasts : dtsa6e7f_history_logs_status_last,



                  }).then((response) => {
                    console.log(`Request sent wit return status code ${response.status}`);
                  });
            });

        });

    });

  });
};

setInterval(pushData, 1000);

app.listen(PORT, () =>
  console.log(`Server start listening to port ${PORT}`)
);

// Code generator.
//   _.map(fields, 'name').forEach((field) => {
//     console.log(`let dts${field} = _.map(results, '${field}').join('|')`)
// })