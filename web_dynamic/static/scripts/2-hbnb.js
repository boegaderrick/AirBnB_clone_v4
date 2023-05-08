$().ready(function () {
  const selector = 'input[type="checkbox"]';
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

  const request = new Request('http://localhost:5001/api/v1/status/');
  fetch(request)
    .then(response => {
      if (response.statusText === 'OK')
        $('div#api_status').addClass('available');
      else
        $('div#api_status').removeClass('available');
    })
});
