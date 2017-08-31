function initMap() {

  var countries = [
    {
      "id": "us",
      "position": new google.maps.LatLng(37.2583698, -104.6527086),
      "name": "United States of America"
    }, {
      "id": "mx",
      "position": new google.maps.LatLng(23.489557, -107.1130912),
      "name": "México"
    }, {
      "id": "ca",
      "position": new google.maps.LatLng(54.6997679, -113.7051108),
      "name": "Canada"
    }
  ]

  var states = [
    {
      "id": "cdmx",
      "country": "mx",
      "position": new google.maps.LatLng(19.4165072, -99.1234034),
      "name": "Ciudad de México"
    }, {
      "id": "edomex",
      "country": "mx",
      "position": new google.maps.LatLng(19.2821786, -99.6808406),
      "name": "Estado de México"
    }, {
      "id": "california",
      "country": "us",
      "position": new google.maps.LatLng(33.9722659, -118.4651995),
      "name": "California"
    }, {
      "id": "newyork",
      "country": "us",
      "position": new google.maps.LatLng(40.6974034,-74.1197629),
      "name": "New York"
    }, {
      "id": "britishc",
      "country": "ca",
      "position": new google.maps.LatLng(49.2577143,-123.1939432),
      "name": "British Columbia"
    }, {
      "id": "ontario",
      "country": "ca",
      "position": new google.maps.LatLng(43.6567919,-79.4609316),
      "name": "Ontario"
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
    }, {
      "id": "escuela4",
      "name": "Edlio School",
      "state": "california",
      "position": new google.maps.LatLng(33.9825447, -118.4289854),
      "address": "12910 Culver Blvd, Los Angeles, CA 90066, USA",
      "marker": null
    }, {
      "id": "escuela5",
      "name": "Rockefeller School",
      "state": "newyork",
      "position": new google.maps.LatLng(40.7578981, -73.9863628),
      "address": "45 Rockefeller Plaza, New York, NY 10111, USA",
      "marker": null
    }, {
      "id": "escuela6",
      "name": "CN School",
      "state": "ontario",
      "position": new google.maps.LatLng(43.6425657, -79.3892444),
      "address": "301 Front St W",
      "marker": null
    }, {
      "id": "escuela7",
      "name": "Vancity School",
      "state": "britishc",
      "position": new google.maps.LatLng(49.2828286, -123.1392833),
      "address": "666 East Blvd",
      "marker": null
    }
  ]

  // Create the map
  var map = new google.maps.Map(document.getElementById("map_div"), {
    center: new google.maps.LatLng(41.4565561,-118.4937502),
    zoom: 4
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

  // Function that loads the states select according to a given country
  function filterStates(selectedCountry) {
    $('#stateSelect').find('option').remove().end()
      .append('<option selected disabled>Selecciona un estado</option>')

    $.each(states, function(index, state) {
      if(state.country == selectedCountry) {
        $("#stateSelect").append('<option value="' +
          state.id + '">' + state.name + '</option>')
      } else {
        $("#stateSelect option[value='" + state.id + "']").remove()
      }
    })

    $('#schoolSelect').find('option').remove().end()
      .append('<option selected disabled>Selecciona una escuela</option>')
  }

  // Function that loads the school's select according to a given state
  function filterSchools(selectedState) {
    $('#schoolSelect').find('option').remove().end()
      .append('<option selected disabled>Selecciona una escuela</option>')

    $.each(schools, function(index, school) {
      if(school.state == selectedState) {
        $("#schoolSelect").append('<option value="' +
          school.id + '">' + school.name + '</option>')
      } else {
        $("#schoolSelect option[value='" + school.id + "']").remove()
      }
    })
  }

  function moveMapToCountry(countryId) {
    $.each(countries, function(index, country) {
      if (country.id == countryId) {
        map.panTo(country.position)
        map.setZoom(5)
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

  // Handler for country select change
  $("#countrySelect").change(function(){
    var option = $(this).val()
    switch(option) {
      case 'us':
        filterStates(option)
        moveMapToCountry(option)
        break
      case 'mx':
        filterStates(option)
        moveMapToCountry(option)
        break
      case 'ca':
        filterStates(option)
        moveMapToCountry(option)
        break
    }
  })

  // Handler for state select change
  $("#stateSelect").change(function(){
  	var option = $(this).val()
    filterSchools(option)
    moveMapToState(option)
  })

  // Handler for school select change
  $("#schoolSelect").change(function(){
  	var schoolId = $(this).val()
    moveMapToSchool(schoolId)
  })

};
