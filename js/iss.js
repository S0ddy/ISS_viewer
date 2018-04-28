function initMap() { 
      $.getJSON("http://api.open-notify.org/iss-now.json", function(data) {

        var latitude = data.iss_position.latitude;
        var longitude = data.iss_position.longitude;

        var date = new Date(Number(data.timestamp)*1000);
        var options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long'
        };
        $("#hours").text(date.getHours());
        $("#minutes").text(date.getMinutes());
        $("#day").text(date.toLocaleString("en-US", options));
        $("#latitude").text(latitude);
        $("#longitude").text(longitude);

        var myLatLng = {lat: Number(latitude), lng: Number(longitude)};

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: myLatLng,
          mapTypeId: 'hybrid'
        });

        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'ISS'
        });

        map.addListener('zoom_changed', function()  {
          zoom = map.getZoom();
        });
      })

       timerId = setTimeout(initMap, 5000);
}

$(document).ready(function()  {
  $.getJSON("http://api.open-notify.org/astros.json", function(data)  {
    var space = document.getElementById('people');
    let count = 0;
    for (var i = 0; i < data.people.length; i++) {
      if (data.people[i].craft == "ISS")  { 
      space.innerHTML += "<div class='col-9 name'>" + "<img src='pictures/spaceHuman.png' width='40px'>" + data.people[i].name + "</div>";
      count++;
      }
    }
    document.getElementById('total').innerHTML = count;
  });
})