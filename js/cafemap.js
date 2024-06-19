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
        attribution: '<br><a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>', 
    }).addTo(map);
    
    waterlayer.setOpacity(0.4);

    // scale icons on zoom
    // changes the icon anchor, so not a huge fan of this
    // map.on('zoomend', function() {
    //     let newzoomw = '' + (2*(map.getZoom())) +'px';
    //     let newzoomh = '' + (2*(map.getZoom())*52/37) +'px';
    //     let markers = document.querySelectorAll(".markerpin");
    //     markers.forEach(function (marker) {
    //         marker.style.width = newzoomw;
    //         marker.style.height = newzoomh;
    //     });
    // });

    return map;
}

function plotCafe(map, cafe) {
    let gabyou = L.icon({
        iconUrl: 'i/gabyou.png',
        iconSize:     [40, 56.2],
        iconAnchor:   [5, 56.2],
        popupAnchor: [20, -56.2],
        className: 'markerpin',
    });
  
    let marker = L.marker([cafe[6], cafe[7]], {icon: gabyou}).addTo(map);
    let description = `
        <h2>${cafe[0]}</h2>
        <a href="${cafe[4]}">Google Maps link</a>
        <hr>
        <b>Chain?:</b>\t${cafe[1]}<br>
        <b>Pricing:</b>\t${cafe[2]}<br>
        <b>Rating:</b>\t${cafe[3]}<br>
        <b>Lily's note:</b>\t${cafe[5]}
    `;
    marker.bindPopup(description, {
        maxWidth: 250,
    });
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

function toggleDisclaimer() {
    let dialog = document.querySelector("#dialog");
    dialog.showModal();

    let closeButton = document.querySelector("#close");
    closeButton.addEventListener("click", (e) => {
        e.preventDefault();
        dialog.close();
    });

    let openButton = document.querySelector("#open");
    openButton.addEventListener("click", (e) => {
        e.preventDefault();
        dialog.showModal();
    });
}

toggleDisclaimer();
mapCafes(setMap());