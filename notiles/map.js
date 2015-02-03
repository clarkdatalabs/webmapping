var os = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

// create the map with the default the tileset
var map = L.map('map', {
    layers: [os]
});


var geo_json = 'your data here'

var geodata = JSON.parse(geo_json);
var geolayer = L.geoJson(geodata, {
    onEachFeature: showPopup
});

// add the points to the map
geolayer.addTo(map);

function showPopup(feature, layer) {
    var key, val;
    var content = [];
    for (key in feature.properties) {
        val = feature.properties[key];
        if (key == "Image URL") {
            val = '<img src="' + val + '"  width="150" />';
        }
        content.push("<strong>" + key + ":</strong> " + val);
    }
    layer.bindPopup(content.join("<br />"));
}
