// Shon, Khundiashvili, 332326305,
//Netanel, Yomtovian, 207498700,
//Chen, Bello, 315129015

const express = require('express');
const { Cost, Report } = require('../models/database');
const url = require('url');
const router = express.Router();

router.get(`/`, function (req, res) {
  const query = url.parse(req.url, true).query;
  const year = query.year;
  const month = query.month;
  const user_id = query.user_id;

  //After this code costs will contain the documents that match the query
  async function findReport() {
    const checkReport = await Report.findOne({
      user_id: user_id,
      year: year,
      month: month,
    });

    if (checkReport) return res.status(200).json(checkReport.report);

    const costs = await Cost.find({
      user_id: user_id,
      year: year,
      month: month,
    });

    if (costs.length === 0) res.status(500).send(`There is no report!`);
    else {
      const newReport = new Report({
        user_id: user_id,
        month: month,
        year: year,
      });
      costs.forEach((cost) => {
        newReport.report[cost.category].push({
          day: cost.day,
          description: cost.description,
          sum: cost.sum,
        });
      });

      newReport.save(function (err, result) {
        if (err) {
          return res.status(500).send(err);
        } else {
          return res.status(200).json(result.report);
        }
      });
    }
  }

  findReport();
});

module.exports = router;
