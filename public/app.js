
//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})

function setSearch() {
  let busqueda = $('#checkPersonalizada');
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}


$( document ).ready(function() {
    setSearch();

    $('#buscar').on('click', () => {

      let urlAPI = 'http://localhost:8080/api/inmuebles';

      //Construye la url a partir de los parámetros que se desean enviar
      let busquedaAvanzada = $('#checkPersonalizada');
      let selectCiudad = $('#ciudad').val();
      let selectTipo = $('#tipo').val();
      let precioMin = $("#rangoPrecio").data("ionRangeSlider").result.from;
      let precioMax = $("#rangoPrecio").data("ionRangeSlider").result.to;

      //console.log(`cd: '${selectCiudad}' -- Tipo: '${selectTipo}' -- Min: ${precioMin} -- Max: ${precioMax}`);

      if($('#checkPersonalizada').prop('checked')) {
        let params = '?advanced=true';

        params = selectCiudad==='' ? params : `${params}&ciudad=${selectCiudad}`;
        params = selectTipo==='' ? params : `${params}&tipo=${selectTipo}`;
        params = `${params}&pMin=${precioMin}`;
        params = `${params}&pMax=${precioMax}`;

        urlAPI = urlAPI + params;
        //urlAPI = urlAPI.replace(/ /g, '%20');
      }

      console.log(`${urlAPI}`);

      $.ajax({
        url: urlAPI,
        method: 'GET'
        //,data: { id=1, tipo="casa" }
      }).done((data, textStatus, jqXHR) => {
        //console.log('regresé con status: ' + textStatus);
        console.log(`Total registros: ${data.length}`);
        //console.log(data);

        muestraInmuebles(data);
      })
      .fail((jqXHR, textStatus, error) => {
        alert("Hubo un error: " + error);
      });
    });

    $('select').on('contentChanged', function() {
      $(this).material_select();
    });

    obtenerListadoCiudades();
    obtenerListadoTipos();
});


/**
* Construye el html con los resultados obtenidos y los pone en el contedor de la página principal
**/
function muestraInmuebles(listado) {
  let respHtml = '';

  for(var k in listado) {
    respHtml = respHtml + `<div class="card horizontal">
                  <div class="card-image">
                    <img src="img/home.jpg">
                  </div>
                  <div class="card-stacked">
                    <div class="card-content">
                      <div>
                        <b>Direccion: </b>${listado[k].Direccion}<p></p>
                      </div>
                      <div>
                        <b>Ciudad: </b>${listado[k].Ciudad}<p></p>
                      </div>
                      <div>
                        <b>Telefono: </b>${listado[k].Telefono}<p></p>
                      </div>
                      <div>
                        <b>Código postal: </b>${listado[k].Codigo_Postal}<p></p>
                      </div>
                      <div>
                        <b>Precio: </b>${listado[k].Precio}<p></p>
                      </div>
                      <div>
                        <b>Tipo: </b>${listado[k].Tipo}<p></p>
                      </div>
                    </div>
                    <!--<div class="card-action right-align">
                      <a href="#">Ver más</a>
                    </div>-->
                  </div>
                </div>`
  }

  $('#listadoResultados').html(respHtml);
}


/**
* Obtiene el listado de las ciudades para agregarlos al comboBox
**/
function obtenerListadoCiudades(){
  $.ajax({
    url: 'http://localhost:8080/api/inmuebles/ciudades',
    method: 'GET'
  }).done((data, textStatus, jqXHR) => {
    $.each(data, function (i, item) {
      $('#ciudad').append($('<option>', {
          value: item.Ciudad,
          text : item.Ciudad
      }));
    });
    $('#ciudad').trigger('contentChanged');
  })
  .fail((jqXHR, textStatus, error) => {
    alert("Hubo un error: " + error);
  });
}


/**
* Obtiene el listado de los tipos para agregarlos al comboBox
**/
function obtenerListadoTipos(){
  $.ajax({
    url: 'http://localhost:8080/api/inmuebles/tipos',
    method: 'GET'
  }).done((data, textStatus, jqXHR) => {
    $.each(data, function (i, item) {
      $('#tipo').append($('<option>', {
          value: item.Tipo,
          text : item.Tipo
      }));
    });
    $('#tipo').trigger('contentChanged');
  })
  .fail((jqXHR, textStatus, error) => {
    alert("Hubo un error: " + error);
  });
}
