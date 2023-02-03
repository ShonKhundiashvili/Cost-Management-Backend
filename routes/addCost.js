// Shon, Khundiashvili, 332326305,
//Netanel, Yomtovian, 207498700,
//Chen, Bello, 315129015

const express = require('express');
const { Cost } = require('../models/database');
const router = express.Router();

router.post('/', function (req, res) {
  Cost.create(req.body)
    .then((cost) => {
      console.log(`Created: ${cost}`);
      res.status(200).send(`Cost created succesfully: ${cost}`);
    })
    .catch((err, cost) => {
      console.error(err);
      res.status(500).send(`Error creating cost!`);
    });
});

module.exports = router;
