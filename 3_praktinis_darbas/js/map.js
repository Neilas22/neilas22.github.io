// Kodas parodantis žemėlapio objektą div elemente map
var map = new maplibregl.Map({
    container: 'map',
    style: 'stiliai/apzvalginis_stilius.json',
    hash: true,
    center: [23.27, 55.168],
    zoom: 6.5,
});

// Prideda priartinimą ir keičia kryptį žemėlapyje
map.addControl(new maplibregl.NavigationControl());

// Funkcija skirta žemėlapių stilių keitimui
function switchBgLayers(layerName) {
    var layer;

    // Pagal funkcijos parametrą parenkamas žemėlapio stilius
    if (layerName === 'Apžvalginis') {
        layer = 'stiliai/apzvalginis_stilius.json';
    } else if (layerName === 'Gamtinis') {
        layer = 'stiliai/gamtinis_stilius.json';
    } else {
        layer = 'stiliai/topografinis_stilius.json';
    }

    // MapLibre setStyle funkcija pakeičia žemėlapio stilių
    map.setStyle(layer);
}