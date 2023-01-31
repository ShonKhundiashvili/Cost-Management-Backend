// Shon, Khundiashvili, 332326305,
//Netanel, Yomtovian, 207498700,
//Chen, Bello, 315129015

const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  console.log('In /about');

  const developers = [
    {
      firstname: 'Shon',
      lastname: 'Khundiashvili',
      id: 332326305,
      email: 'Shonkhundiashvili@gmail.com',
    },
    {
      firstname: 'Netanel',
      lastname: 'Yomtovian',
      id: 207498700,
      email: 'natan094@gmail.com',
    },
    {
      firstname: 'Chen',
      lastname: 'Bello',
      id: 315129015,
      email: 'jicku@gmail.com',
    },
  ];

  console.log(developers);
  return res.status(200).send(developers);
});

module.exports = router;
