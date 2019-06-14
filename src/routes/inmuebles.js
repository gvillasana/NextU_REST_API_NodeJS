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

  let prm_advancedQuery = req.query.advanced || false;
  let prm_ciudad = req.query.ciudad || '';
  let prm_tipo = req.query.tipo || '';
  let prm_pMin = req.query.pMin || '';
  let prm_pMax = req.query.pMax || '';

  console.log(`adv: ${prm_advancedQuery} -- cd: '${prm_ciudad}' -- Tipo: '${prm_tipo}' -- Min: ${prm_pMin} -- Max: ${prm_pMax}`);

  //Si no se desea una búsqueda avanzada se devuelve todo el listado de inmuebles
  //, de lo contrario se desea una búsqueda avanzada (filtrada)
  if(!prm_advancedQuery) {
    res.json(inmuebles);
  } else {
    //búsqueda avanzada
    let filtrado = [];
    let agregar = true;

    _.each(inmuebles, (item, i) => {
        agregar = true;

        //En caso de NO cumplir con alguno de los filtros entonces no se considera dicho registro
        if ((prm_ciudad && item.Ciudad != prm_ciudad)
            || (prm_tipo && item.Tipo != prm_tipo)
            || (Number(item.Precio.replace(/[^0-9.-]+/g,"")) < prm_pMin)
            || (Number(item.Precio.replace(/[^0-9.-]+/g,"")) > prm_pMax)) {
          agregar = false;
        }

        if(agregar){
          filtrado.push(item);
        }
      });

    res.json(filtrado);
  }
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
