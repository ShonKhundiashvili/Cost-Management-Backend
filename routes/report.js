// Shon, Khundiashvili, 332326305,
//Netanel, Yomtovian, 207498700,
//Chen, Bello, 315129015

const express = require('express');
const { Cost } = require('../models/database');
const url = require('url');
const router = express.Router();

router.get(`/`, function (req, res) {
  const query = url.parse(req.url, true).query;
  const year = query.year;
  const month = query.month;
  const user_id = query.user_id;

  //After this code costs will contain the documents that match the query
  async function findCosts() {
    try {
      const costs = await Cost.find({
        year: year,
        month: month,
        user_id: user_id,
      });
      const report = {
        food: [],
        housing: [],
        health: [],
        other: [],
        transportation: [],
        education: [],
        sport: [],
      };
      costs.forEach((cost) => {
        const category = cost.category;
        console.log(category);
        // if (!report[category]) {
        //   report[category] = [];
        // }
        report[category].push(cost);
      });
      console.log(report);
      res.status(200).send(report);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
  findCosts();
});

module.exports = router;
