function drawTiers(donuts) {
    const donutTable = document.querySelector("#donuttable");
    const rankings = [
        "Always thinking about them",
        "Would order more than again",
        "Unproblematic (mostly)",
        "Sigh",
        "Why does this exist",
    ];
    const rankOrder = {
        S: 1,
        A: 2,
        B: 3,
        C: 4,
        D: 5,
    };
    const colors = [
        "rgb(229, 204, 255)",
        "rgb(204, 229, 255)",
        "rgb(204, 255, 204)",
        "rgb(255, 255, 204)",
        "rgb(255, 204, 204)",
    ];
    
    for (let i = 1; i < 6; i++) {
        let row = document.createElement("div");
        row.classList.add("row");

        let rank = document.createElement("div");
        rank.classList.add("rank");
        rank.style.backgroundColor = colors[i - 1];
        let rankText = document.createElement("p");
        rankText.textContent = rankings[i - 1];
        rank.appendChild(rankText);
        row.appendChild(rank);

        let donutDiv = document.createElement("div");
        donutDiv.classList.add("donuts");

        for (let j = 1; j < donuts.length; j++) {
            let donutInfo = donuts[j];
            let donutRank = rankOrder[donutInfo[4]];

            if (donutRank == i) {
                let donut = document.createElement("div");
                donut.classList.add("donut");
                donut.setAttribute("id", j);
                donut.style.backgroundImage = "url('i/donuts/" + donutInfo[5] + "')";

                donutDiv.appendChild(donut);
            }
        }

        row.appendChild(donutDiv);

        donutTable.appendChild(row);
    }
}

function donutDialog(donuts) {
    const rankings = [
        "Always thinking about them",
        "Would order more than again",
        "Unproblematic (mostly)",
        "Sigh",
        "Why does this exist",
    ];
    const rankOrder = {
        S: 1,
        A: 2,
        B: 3,
        C: 4,
        D: 5,
    };

    let donutPopup = document.querySelector("#donutdialog");

    let donutDivs = document.querySelectorAll(".donut");
    for (i = 0; i < donutDivs.length; i++) {
        donutDivs[i].addEventListener("click", function (e) {
            let donutId = this.getAttribute("id");
            let donut = donuts[donutId];
            donutPopup.innerHTML = "";

            let donutImage = document.createElement("img");
            let donutURL = "i/donuts/" + donut[5];
            donutImage.setAttribute("src", donutURL);
            donutPopup.appendChild(donutImage);

            let donutInfo = document.createElement("ul");

            let donutName = document.createElement("li");
            donutName.classList.add("donutname");
            donutName.innerHTML = ("<h2>" + donut[0] + "</h2>");
            donutInfo.appendChild(donutName);

            let donutBase = document.createElement("li");
            donutBase.innerHTML = ("<b>Base:</b> "+ donut[1]);
            donutInfo.appendChild(donutBase);

            let donutFlavor = document.createElement("li");
            donutFlavor.innerHTML = ("<b>Flavor:</b> "+ donut[2]);
            donutInfo.appendChild(donutFlavor);

            let donutExtras = document.createElement("li");
            donutExtras.innerHTML = ("<b>Extras:</b> "+ donut[3]);
            donutInfo.appendChild(donutExtras);

            let donutRating = document.createElement("li");
            donutRating.innerHTML = ("<b>Rating:</b> "+ rankings[rankOrder[donut[4]]]);
            donutInfo.appendChild(donutRating);

            let donutNotes = document.createElement("li");
            donutNotes.innerHTML = ("<b>Notes:</b> "+ donut[6]);
            donutInfo.appendChild(donutNotes);

            donutPopup.appendChild(donutInfo);
            
            let closeButton = document.createElement("button");
            closeButton.setAttribute("id", "closedonut");
            closeButton.innerText = "Onwards!"
            closeButton.addEventListener("click", function(e) {
                donutPopup.close();
            });
            donutPopup.appendChild(closeButton);

            donutPopup.showModal();
        });
    }
}

function readDonuts() {
    // could not have done this without
    // https://www.js-tutorials.com/jquery-tutorials/reading-csv-file-using-jquery/
    // still trying to wrap my head around this...
    let donuts;
    $.ajax({
        type: "GET",  
        url: "https://lilywus.github.io/alting/data/donuts.csv",
        dataType: "text",       
        success: function(response)  {
            donuts = $.csv.toArrays(response);
            drawTiers(donuts);
            donutDialog(donuts);
        }   
      });
}

function butWhy() {
    let whyDialog = document.querySelector("#butwhy");
    let why = document.querySelector("#explanation");
    why.addEventListener("click", (e) => {
        whyDialog.showModal();
    });

    let closeWhy = document.querySelector("#closewhy");
    closeWhy.addEventListener("click", (e) => {
        whyDialog.close();
    });
}

readDonuts();
butWhy();