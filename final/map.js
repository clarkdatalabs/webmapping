//note this is just in case one needs these for jsfiddl; this has already been added to map.html


 // use a variable for the 1920 tile set
var a2_1920 = L.tileLayer('http://mapwarper.net/maps/tile/8120/{z}/{x}/{y}.png');

var a2_mod = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'});

// create the map with the tilesets
var map = L.map('map', {
    layers: [a2_mod, a2_1920]
});

// zoom and center in Ann Arbor
map.setView([42.2718, -83.7436], 14);


var geo_json = '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"Year":1840,"Building":"Presidents Residence","Architect":""},"geometry":{"type":"Point","coordinates":[-83.738639,42.275317]}},{"type":"Feature","properties":{"Year":1908,"Building":"Nichols Arboretum","Architect":"J.C. Moninger"},"geometry":{"type":"Point","coordinates":[-83.729214,42.277623]}},{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-83.73425245285034,42.27718176227264],[-83.72996091842651,42.27537181396405],[-83.73287916183472,42.27354593624768],[-83.73481035232544,42.27497488852555],[-83.73663425445557,42.27594338220365],[-83.73425245285034,42.27718176227264]]]}},{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[-83.74109745025635,42.2783724893896],[-83.73369455337524,42.280198227269956],[-83.73169898986816,42.27789620124275],[-83.72923135757446,42.27507015085879],[-83.73601198196411,42.27145008096787]]}}]}';

var geodata = JSON.parse(geo_json);

//we'll change this once we add the popup
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