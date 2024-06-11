function setMap() {
    // set map center & zoom
    let map = L.map('map').setView([43.06103326440557, 141.35639868076663], 14);
    map.options.maxZoom = 16;

    // add map tiles
    let streetlayer = L.tileLayer('https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
        attribution: '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 0,
        maxZoom: 20,
        accessToken: 'LAUOYzlNAGT4hCXlXtlxayXiO9vbJ0utFubiYfC0q58oOoTswdt2OZbWpeL4pQir'
    }).addTo(map);
    
    let waterlayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg?api_key=7f4c1858-2a5b-4147-9e3e-cff940a54945', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>', 
    }).addTo(map);
    
    waterlayer.setOpacity(0.4);

    return map;
}

function parseCSV(map, csv) {
    let cafedata = 'Kissa Kotori,43.05786033,141.359919\nTokumitsu Coffee,43.06125089,141.3522102\nMusica Hall Cafe,43.05635511,141.3494906';

    let gabyou = L.icon({
        iconUrl: 'i/gabyou.png',
        iconSize:     [40, 60],
        iconAnchor:   [5, 60],
        popupAnchor: [20, -60]
    });

    const result = [];
    const lines = cafedata.split("\n");
  
    for (let i = 0; i < lines.length; i++) {
        let information = lines[i].split(",");
        let marker = L.marker([information[1], information[2]], {icon: gabyou}).addTo(map);
        marker.bindPopup(information[0]);
    }
}

function howDoesThisWork() {
    let cafelist;
    $.ajax({
        type: "GET",  
        url: "https://lilywus.github.io/alting/data/cafes.csv",
        dataType: "text",       
        success: function(response)  
        {
          cafelist = $.csv.toArrays(response);
          console.log(cafelist);
        }   
      });
}

parseCSV(setMap(), 'data/cafes.csv');

howDoesThisWork();