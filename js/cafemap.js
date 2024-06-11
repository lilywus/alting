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

function plotCafe(map, cafe) {
    let gabyou = L.icon({
        iconUrl: 'i/gabyou.png',
        iconSize:     [40, 60],
        iconAnchor:   [5, 60],
        popupAnchor: [20, -60]
    });
  
    let marker = L.marker([cafe[6], cafe[7]], {icon: gabyou}).addTo(map);
    let description = `
        <h4>${cafe[0]}</h4>
        <b>Chain?:</b> ${cafe[1]}<br>
        <b>Pricing:</b> ${cafe[2]}<br>
        <b>Rating:</b> ${cafe[3]}<br>
        <b>Google Maps:</b> <a href="${cafe[4]}">${cafe[4]}</a><br>
        <b>Lily's note:</b> ${cafe[5]}
    `;
    marker.bindPopup(description);
}

function mapCafes(map) {
    // could not have done this without
    // https://www.js-tutorials.com/jquery-tutorials/reading-csv-file-using-jquery/
    // still trying to wrap my head around this...
    let cafelist;
    $.ajax({
        type: "GET",  
        url: "https://lilywus.github.io/alting/data/cafes.csv",
        dataType: "text",       
        success: function(response)  {
            cafelist = $.csv.toArrays(response);
          
            for (let i = 1; i < cafelist.length; i++) {
                let cafe = cafelist[i];
                plotCafe(map, cafe);
        }
        }   
      });

    
}

mapCafes(setMap());