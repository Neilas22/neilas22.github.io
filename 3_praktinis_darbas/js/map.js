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

    document.getElementById("flexSwitchCheckDefault1").checked = false;
    document.getElementById("flexSwitchCheckDefault2").checked = false;
    document.getElementById("flexSwitchCheckDefault3").checked = false;

    setTimeout(() => {
        loadThematicLayers();
      }, "1000");
}

map.on("load", () => {
    console.log("Žemėlapis užsikrovė");

    loadThematicLayers();
});

function loadThematicLayers() {
    // Pridedami žemėlapio šaltiniai kaip WMS el. paslaugos
    map.addSource("hidroelektrines-source",{
        type: "raster",
        tiles:[
            "http://localhost/qgisserver/hidroelektrines_zemelapis?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=Hidroelektrines"
        ],
        tilesize: 64,
    });

    map.addSource("medziokles_plotu_vienetai-source",{
        type: "raster",
        tiles:[
            "http://localhost/qgisserver/medziokles_plotu_vienetu_zemelapis?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=Medziokles_plotu_vienetai"
        ],
        tilesize: 64,
    });

    map.addSource("upes-source",{
        type: "raster",
        tiles:[
            "http://localhost/qgisserver/upes_zemelapis?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=Upes"
        ],
        tilesize: 64,
    });

    // Pridedami žemėlapio sluoksniai iš žemėlapio šaltinių
    map.addLayer(
        {
            id: "hidroelektrines-wms",
            type: "raster",
            source: "hidroelektrines-source",
            layout: {
                visibility: "none",
            }
        }
    );

    map.addLayer(
        {
            id: "medziokles_plotu_vienetai-wms",
            type: "raster",
            source: "medziokles_plotu_vienetai-source",
            layout: {
                visibility: "none",
            }
        }
    );

    map.addLayer(
        {
            id: "upes-wms",
            type: "raster",
            source: "upes-source",
            layout: {
                visibility: "none",
            }
        }
    );
}

function toggleLayers(layerId) {
    if (map.getLayoutProperty(layerId, "visibility") == "none") {
        // Įjungti sluoksnį
        map.setLayoutProperty(layerId, "visibility", "visible")
    } else {
        // Išjungti sluoksnį
        map.setLayoutProperty(layerId, "visibility", "none")
    }
}

map.addControl(new maplibreGLMeasures.default({
    lang: {
        areaMeasurementButtonTitle: 'Matuoti plotą',
        lengthMeasurementButtonTitle: 'Matuoti ilgį',
        clearMeasurementsButtonTitle:  'Ištrinti matavimus',
    },
    units: 'metric',
    unitsGroupingSeparator: ' ',
    style: {
        text: {
            radialOffset:  0.9,
            letterSpacing: 0.05,
            color: '#D20C0C',
            haloColor: '#fff',
            haloWidth: 0,
            font: 'Noto Sans Regular',
        },
        common: {
            midPointRadius: 3,
            midPointColor: '#D20C0C',
            midPointHaloRadius: 5,
            midPointHaloColor: '#FFF',
        },
        areaMeasurement: {
            fillColor: '#D20C0C',
            fillOutlineColor: '#D20C0C',
            fillOpacity: 0.01,
            lineWidth: 2,
        },
        lengthMeasurement: {
            lineWidth: 2,
            lineColor: "#D20C0C",
        },
    }
}), 
    "top-left",
);
