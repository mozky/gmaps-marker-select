function initMap() {

  var states = [
    {
      "id": "cdmx",
      "position": new google.maps.LatLng(19.4165072, -99.1234034),
      "name": "Ciudad de México"
    }, {
      "id": "edomex",
      "position": new google.maps.LatLng(19.2821786, -99.6808406),
      "name": "Estado de México"
    }
  ]

  var schools = [
    {
      "id": "escuela1",
      "name": "Escuela fulanito 1",
      "state": "cdmx",
      "position": new google.maps.LatLng(19.3882, -99.1095527),
      "address": "Direccion de escuela 1",
      "marker": null
    }, {
      "id": "escuela2",
      "name": "Escuela fulanito 2",
      "state": "cdmx",
      "position": new google.maps.LatLng(19.403911, -99.1881737),
      "address": "Direccion de escuela 2",
      "marker": null
    }, {
      "id": "escuela3",
      "name": "Escuela fulanito 3",
      "state": "edomex",
      "position": new google.maps.LatLng(19.2776417, -99.6591684),
      "address": "Direccion de escuela 3",
      "marker": null
    }
  ]

  // Create the map
  var map = new google.maps.Map(document.getElementById("map_div"), {
    center: new google.maps.LatLng(19.4165072, -99.1234034),
    zoom: 12
  })

  // Create info windows which will be used by markers
  var infoWindow = new google.maps.InfoWindow()

  // Function that creates a marker on the map
  function createMarker(options, html) {
    var marker = new google.maps.Marker(options)
    if (html) {
      google.maps.event.addListener(marker, "click", function () {
        infoWindow.setContent(html)
        infoWindow.open(options.map, this)
      })
    }
    return marker
  }

  // We load the school's markers
  $.each(schools, function(index, school) {
    school.marker = createMarker({
      position: school.position,
      map: map,
      // icon: "url to icon"
    }, "<h1>" + school.name + "</h1><p>" + school.address + "</p>")
  })

  // Function that load the school's select according to a given state
  function filterSchools(selectedState) {
    $('#schoolSelect').find('option').remove().end()
      .append('<option value="">Selecciona una escuela</option>')

    $.each(schools, function(index, school) {
      if(school.state == selectedState) {
        $("#schoolSelect").append('<option value="' +
          school.id + '">' + school.name + '</option>')
      } else {
        $("#schoolSelect option[value='" + school.id + "']").remove()
      }
    })
  }

  function moveMapToState(stateId) {
    $.each(states, function(index,  state) {
      if(state.id == stateId) {
        map.panTo(state.position)
        map.setZoom(12)
      }
    })
  }

  function moveMapToSchool(schoolId) {
    $.each(schools, function(index,  school) {
      if(school.id == schoolId) {
        google.maps.event.trigger(school.marker, 'click');
        map.panTo(school.position)
        map.setZoom(14)
      }
    })
  }

  // Handler for state select change
  $("#stateSelect").change(function(){
  	var option = $(this).val()
    switch(option) {
    	case 'cdmx':
        filterSchools(option)
        moveMapToState(option)
        break
      case 'edomex':
        filterSchools(option)
        moveMapToState(option)
        break
    }
  })

  // Handler for school select change
  $("#schoolSelect").change(function(){
  	var schoolId = $(this).val()
    moveMapToSchool(schoolId)
  })

};
