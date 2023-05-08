$().ready(function () {
  const selector = '.amenities input[type="checkbox"]';
  const amenities = {};
  $(selector).change(function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');
    if ($(this).prop('checked')) {
      amenities[name] = id;
    }
    else {
      delete amenities[name];
    }
    $('.amenities h4').text(Object.keys(amenities).sort().join(', '));
  });


  const cities_states = {};
  const state_selector = '.state_checkbox';
  const states = {};
  $(state_selector).change(function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');
    if ($(this).prop('checked')) {
      states[name] = id;
      cities_states[name] = id;
    }
    else {
      delete states[name];
      delete cities_states[name];
    }
    $('.locations h4').text(Object.keys(cities_states).sort().join(', '));
  });


  const city_selector = '.city_checkbox';
  const cities = {};
  $(city_selector).change(function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');
    if ($(this).prop('checked')) {
      cities[name] = id;
      cities_states[name] = id;
    }
    else {
      delete cities[name];
      delete cities_states[name];
    }
    $('.locations h4').text(Object.keys(cities_states).sort().join(', '));
  });


  const request = new Request('http://localhost:5001/api/v1/status/');
  fetch(request)
    .then(response => {
      if (response.statusText === 'OK')
        $('div#api_status').addClass('available');
      else
        $('div#api_status').removeClass('available');
    })


  const url = 'http://localhost:5001/api/v1/places_search'
  fetch(url, {
    method: 'POST',
    headers: {'content-Type': 'application/json'},
    body: JSON.stringify({})
  })
    .then(response => response.json())
    .then(places => {
      for (place of places) {
        $('.places').append(
        `<article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest}</div>
            <div class="number_rooms">${place.number_rooms}</div>
            <div class="number_bathrooms">${place.number_bathrooms}</div>
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article>`
        );
      }
    })
    .catch((error) => {
      console.log(error);
    });


  $('.filters button').on('click', function () {
    const data = {
      'amenities': Object.values(amenities),
      'cities': Object.values(cities),
      'states': Object.values(states)
    };
    $('.places').empty();
    fetch(url, {
      method: 'POST',
      headers: {'content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(places => {
        for (place of places) {
          $('.places').append(
            `<article>
              <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest}</div>
                <div class="number_rooms">${place.number_rooms}</div>
                <div class="number_bathrooms">${place.number_bathrooms}</div>
              </div>
              <div class="description">
                ${place.description}
              </div>
            </article>`
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
