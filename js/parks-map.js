function initialize(){

  var markers = [];
  
  var mapOptions = {
    overviewMapControl:true,
    rotateControl:true,
    scaleControl:true,
    mapTypeControl: true,
    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR, position:google.maps.ControlPosition.TOP_CENTER},
    zoomControl: true,
    zoomControlOptions: {style: google.maps.ZoomControlStyle.DEFAULT}
    };

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var style1 = {
    fillColor: '#009966',
    fillOpacity: 0.3,
    strokeColor: '#009966',
    strokeWeight: 2
    };

  map.data.setStyle(style1);
  
  var infowindow = new google.maps.InfoWindow();

  map.data.addListener('click', function(event) {
      
      if(event.feature.getProperty('acres') == "1" ) {var acres='<li>' + event.feature.getProperty('acres') + ' Acre</li>'} else {var acres='<li>' + event.feature.getProperty('acres') + ' Acres</li>'} 

      if(event.feature.getProperty('pavedtrails') === null ) {var pavedtrails=""} else {var pavedtrails='<li>' + event.feature.getProperty('pavedtrails') + ' Miles of Paved Trails</li>'} 
      if(event.feature.getProperty('center') === null ) {var center=""} else { var center='<li>Community Center</li>'}
      if(event.feature.getProperty('discgolf') === null ) {var discgolf=""} else { var discgolf='<li>Disc Golf</li>'}
      if(event.feature.getProperty('dogpark') === null ) {var dogpark=""} else { var dogpark='<li>Dog Park</li>'}
      if(event.feature.getProperty('golf') === null ) {var golf=""} else { var golf='<li>Golf Course</li>'}
      if(event.feature.getProperty('bldg') === null ) {var bldg=""} else { var bldg='<li>Neighborhood Building</li>'}
      if(event.feature.getProperty('openfields') === null ) {var openfields=""} else { var openfields='<li>Open Fields</li>'}
      if(event.feature.getProperty('playground') === null ) {var playground=""} else { var playground='<li>Playground</li>'}
      if(event.feature.getProperty('restroom') === null ) {var restroom=""} else { var restroom='<li>Restrooms</li>'}
      if(event.feature.getProperty('swimming') === null ) {var swimming=""} else { var swimming='<li>Swimming Pool</li>'}

  
      
      if(event.feature.getProperty('shelter') === null ) {var shelter=""} 
        else if (event.feature.getProperty('shelter') == "1") {var shelter='<li>' + event.feature.getProperty('shelter') + ' Shelter</li>'} 
        else {var shelter='<li>' + event.feature.getProperty('shelter') + ' Shelters</li>'}
      
      
      if(event.feature.getProperty('basketball') === null ) {var basketball=""}
        else if (event.feature.getProperty('basketball') == "1" ) {var basketball='<li>' + event.feature.getProperty('basketball') + ' Basketball Court</li>'}
        else {var basketball='<li>' + event.feature.getProperty('basketball') + ' Basketball Courts</li>'}

      if(event.feature.getProperty('baseball') === null ) {var baseball=""} 
        else if (event.feature.getProperty('baseball') == "1" ) {var baseball='<li>' + event.feature.getProperty('baseball') + ' Baseball Field</li>'}
        else {var baseball='<li>' + event.feature.getProperty('baseball') + ' Baseball Fields</li>'}
      
      if(event.feature.getProperty('tennis') === null ) {var tennis=""} 
        else if(event.feature.getProperty('tennis') == "1" ) {var tennis='<li>' + event.feature.getProperty('tennis') + ' Tennis Court</li>'}
        else {var tennis='<li>' + event.feature.getProperty('tennis') + ' Tennis Courts</li>'}
      
      if(event.feature.getProperty('volleyball') === null ) {var volleyball=""} 
        else if(event.feature.getProperty('volleyball') == "1" ) {var volleyball='<li>' + event.feature.getProperty('volleyball') + ' Volleyball Court</li>'}
        else {var volleyball='<li>' + event.feature.getProperty('volleyball') + ' Volleyball Courts</li>'}
      
      if(event.feature.getProperty('football') === null ) {var football=""} 
        else if(event.feature.getProperty('football') == "1" ) {var football='<li>' + event.feature.getProperty('football') + ' Football/Soccer Field</li>'}
        else {var football='<li>' + event.feature.getProperty('football') + ' Football/Soccer Fields</li>'}
      
      if(event.feature.getProperty('horseshoes') === null ) {var horseshoes=""} 
        else if(event.feature.getProperty('horseshoes') == "1" ) {var horseshoes='<li>' + event.feature.getProperty('horseshoes') + ' Horseshoe Court</li>'}  
        else {var horseshoes='<li>' + event.feature.getProperty('horseshoes') + ' Horseshoe Courts</li>'}  

      infowindow.setContent(
        '<div class="infowindow"><p class="park-name">' + event.feature.getProperty('name') + '</p>' +
        '<p class="park-address">' + event.feature.getProperty('address') + '</p>' +
        '<ul class="feature-list">' + acres + '</ul>' +
        '<ul class="feature-list">' + pavedtrails + swimming + golf + playground + dogpark + discgolf + center + bldg + openfields + restroom + shelter + 
        baseball + basketball + football + horseshoes + tennis + volleyball +'</ul></div>'
        );
      infowindow.setPosition(event.latLng)
      infowindow.open(map);
  });

  map.data.loadGeoJson('data/parks-data.geojson')

  var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(37.921971, -84.663139),
      new google.maps.LatLng(38.155595, -84.334923)
      );
  
  map.fitBounds(defaultBounds);

  // Create the search box and link it to the UI element.
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));

  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  // [START region_getplaces]
  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);
    }
    
    map.fitBounds(bounds);
    map.setZoom(15)
  });
  // [END region_getplaces]



  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
