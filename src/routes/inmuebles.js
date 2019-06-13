const { Router } = require('express');
const router = Router();
const _ = require('underscore');

const inmuebles = require('../data.json');

router.get('/', (req, res) => {
  res.json(inmuebles);
});

module.exports = router;
