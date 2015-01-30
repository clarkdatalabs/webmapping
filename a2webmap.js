// use a variable for the 1920 tile set
var a2_1920 = L.tileLayer('http://mapwarper.net/maps/tile/8120/{z}/{x}/{y}.png');
var a2_mod = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

// create the map with the default the tileset
var map = L.map('map', {
    layers: [a2_mod, a2_1920]
});

// zoom and center in Ann Arbor
map.setView([42.2718, -83.7436], 14);


var geo_json = '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{"Park Name":"Wurster Park","existing":"Proposed","Image URL":"https://playlots.files.wordpress.com/2010/05/wusterwmadisonentrance.jpg"},"geometry":{"type":"Polygon","coordinates":[[[-83.75521659851074,42.271338935181355],[-83.75410079956055,42.27140244708336],[-83.75418663024901,42.27368883293342],[-83.75521659851074,42.27368883293342],[-83.75521659851074,42.271338935181355]]]}},{"type":"Feature","properties":{"Park Name":"Burns Park","existing":"Existing","Image URL":"http://imgick.mlive.com/home/mlive-media/width620/img/annarbornews_impact/photo/15061666-mmmain.jpg"},"geometry":{"type":"Polygon","coordinates":[[[-83.72899532318115,42.26463806999537],[-83.72611999511719,42.26476510723859],[-83.72620582580565,42.26670239347996],[-83.72908115386963,42.26660711849936],[-83.72899532318115,42.26463806999537]]]}}]}';


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
