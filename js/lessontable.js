function getLessons() {
    // could not have done this without
    // https://www.js-tutorials.com/jquery-tutorials/reading-csv-file-using-jquery/
    // still trying to wrap my head around this...
    let lessonsList;
    let lessonsRead = [];

    $.ajax({
        type: "GET",  
        url: "https://lilywus.github.io/alting/data/lessons.csv",
        dataType: "text",       
        success: function(response)  {
            lessonsList = $.csv.toArrays(response);

            for (let i = 1; i < lessonsList.length; i++) {
                let lesson = {
                    year: lessonsList[i][0],
                    unit: lessonsList[i][1],
                    grammar: lessonsList[i][2],
                    type: lessonsList[i][3],
                    duration: lessonsList[i][4],
                    activity: lessonsList[i][5],
                    link: lessonsList[i][6],
                };
                lessonsRead.push(lesson);
            }   

            let table = new Tabulator("#lessontable", {
                data: lessonsRead, // assign data to table
                layout: "fitDataStretch", // fit columns to width of table (optional)
                columns: [ //Define Table Columns
                    {title: "Grammar", field: "grammar"},
                    {title: "Year", field: "year"},
                    {title: "Unit", field: "unit"},
                    {title: "Duration", field: "duration"},
                    {title: "Lesson Description", field: "activity", formatter: "textarea"}
                ],
                });
           
            //trigger an alert message when the row is clicked
            table.on("rowClick", function(e, row){ 
                window.open(row.getData().link, '_blank').focus();
            });
        }
    });
}

console.log(getLessons());