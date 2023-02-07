// Shon Khundiashvili 332326305
// Netanel Yomtovian 207498700
// Chen Bello 315129015

const express = require('express');
let router = express.Router();
const url = require('url');
const { Cost, User } = require('../models/database');

router.post('/', function (req, res) {
  const query = url.parse(req.url, true).query;
  const user_id = query.user_id;
  User.findOne({ id: user_id }, function (err, doc) {
    console.log(user_id);
    // doc is a Document
    if (!err) {
      console.log(`result = ${doc}`);
      if (!doc) {
        res.status(200).send('the userID does not exist');
      } else {
        Cost.create(req.body)
          .then((cost) => {
            console.log(`create new cost: ${cost}`);
            res.status(200).send(`Cost created succesfully: ${cost}`);
          })
          .catch((err, cost) => {
            console.error(err);
            res
              .status(500)
              .send('Error creating cost! the category does not match !');
          });
      }
    }
  });
});
module.exports = router;
