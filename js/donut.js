function drawTiers() {
    const donutTable = document.querySelector("#donuttable");
    const rankings = [
        "Probably thinking about these 50% of the time",
        "Would order more than again",
        "Unproblematic (mostly)",
        "Sigh",
        "Why does this exist",
    ];
    const colors = [];
    
    for (let i = 0; i < 5; i++) {
        let row = document.createElement("div");
        row.classList.add("row");

        let rank = document.createElement("div");
        rank.classList.add("rank");
        let rankText = document.createElement("p");
        rankText.textContent = rankings[i];
        rank.appendChild(rankText);
        row.appendChild(rank);

        let donuts = document.createElement("div");
        donuts.classList.add("donuts");

        for (let i = 0; i < 5; i++) {
            let donut = document.createElement("div");
            donut.classList.add("donut");
            donut.textContent = "donut";
            donuts.appendChild(donut);
        }

        row.appendChild(donuts);

        donutTable.appendChild(row);
    }
}

drawTiers();