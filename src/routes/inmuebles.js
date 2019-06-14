const { Router } = require('express');
const router = Router();
const _ = require('underscore');

const inmuebles = require('../data.json');

/**
* Ruta principal para consultar los inmuebles
* Express Route Tester
* http://forbeslindesay.github.io/express-route-tester/
* Posible ruta con opcionales /inmuebles/:ciudad?/:tipo?/:pMin?/:pMax?
**/
router.get('/', (req, res) => {
  console.log(req.query);

  let advancedQuery = req.query.advanced || false;
  let ciudad = req.query.ciudad || '';
  let tipo = req.query.tipo || '';
  let pMin = req.query.pMin || '';
  let pMax = req.query.pMax || '';

  console.log(`adv: ${advancedQuery} -- cd: '${ciudad}' -- Tipo: '${tipo}' -- Min: ${pMin} -- Max: ${pMax}`);
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
