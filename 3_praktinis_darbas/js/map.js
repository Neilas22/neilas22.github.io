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

map.on("load", () => {
    console.log("Žemėlapis užsikrovė");

    map.addSource("hidroelektrines-source",{
        type: "raster",
        tiles:[
            "http://localhost/qgisserver/hidroelektrines_zemelapis?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=Hidroelektrines"
        ],
        tilesize: 128,
    });
    map.addLayer(
        {
            id: "hidroelektrines-wms",
            type: "raster",
            source: "hidroelektrines-source",
            layout: {
                visibility: "visible",
            }
        }
    );
});