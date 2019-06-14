const { Router } = require('express');
const router = Router();
const _ = require('underscore');

const inmuebles = require('../data.json');

router.get('/', (req, res) => {
  res.json(inmuebles);
});


router.get('/ciudades', (req, res) => {
  let listado = [];

  for(var k in inmuebles) {
    if (!listado.some(item => item.Ciudad === inmuebles[k].Ciudad)) {
      let newCiudad = {"Ciudad": inmuebles[k].Ciudad};
      listado.push(newCiudad);
    }
  }
  res.json(listado);
});


router.get('/tipos', (req, res) => {
  let listado = [];

  for(var k in inmuebles) {
    if (!listado.some(item => item.Tipo === inmuebles[k].Tipo)) {
      let newTipo = {"Tipo": inmuebles[k].Tipo};
      listado.push(newTipo);
    }
  }
  res.json(listado);
});

module.exports = router;
