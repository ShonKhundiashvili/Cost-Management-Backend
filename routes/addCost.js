// Shon Khundiashvili 332326305
// Netanel Yomtovian 207498700
// Chen Bello 315129015

const express = require('express');
const router = express.Router();
const { Cost, User, Report } = require('../models/database');

router.post('/', async function (req, res) {
  const user_id = req.body.user_id;
  const description = req.body.description;
  const sum = req.body.sum;
  const category = req.body.category;
  const month = req.body.month;
  const day = req.body.day;
  const year = req.body.year;
  const currentData = new Date();
  const updated_year = year || currentData.getFullYear();
  const updated_month = month || currentData.getMonth() + 1;
  const updated_day = day || currentData.getDate();

  await User.findOne({ id: user_id })
    .then((user) => {
      if (!user) return res.status(500).send('User not found!');
      else {
        const cost = new Cost({
          user_id: user_id,
          year: updated_year,
          month: updated_month,
          day: updated_day,
          description: description,
          category: category,
          sum: sum,
        });

        cost.save().catch((error) => {
          return res.status(500).send(error);
        });
      }
    })
    .catch((err) => {
      return res.status(500).send(err);
    });

  const reportExists = await Report.findOne({
    user_id: user_id,
    year: updated_year,
    month: updated_month,
  });

  if (reportExists) {
    reportExists.report[category].push({
      day: parseInt(updated_day),
      description: description,
      sum: sum,
    });
    await Report.updateOne(
      {
        user_id: user_id,
        year: parseInt(updated_year),
        month: parseInt(updated_month),
      },
      { report: reportExists.report }
    );
  }

  return res.status(200).send('The cost is saved!');
});

module.exports = router;
