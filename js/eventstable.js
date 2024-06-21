function getEvents() {
    // could not have done this without
    // https://www.js-tutorials.com/jquery-tutorials/reading-csv-file-using-jquery/
    // still trying to wrap my head around this...
    let eventList;
    let eventsRead = [];

    $.ajax({
        type: "GET",  
        url: "https://lilywus.github.io/alting/data/events.csv",
        dataType: "text",       
        success: function(response)  {
            eventList = $.csv.toArrays(response);

            for (let i = 1; i < eventList.length; i++) {
                let event = {
                    eventname: eventList[i][0],
                    furigana: eventList[i][1],
                    note: eventList[i][2],
                };
                eventsRead.push(event);
            }   

            let table = new Tabulator("#eventtable", {
                data: eventsRead,
                layout: "fitDataStretch",
                columns: [ 
                    {title: "Event", field: "eventname"},
                    {title: "Furigana", field: "furigana", formatter: "textarea"},
                    {title: "Description", field: "note", formatter: "textarea"},
                ],
                });
        }
    });
}

getEvents();