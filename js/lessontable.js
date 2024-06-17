function getLessons() {
    // could not have done this without
    // https://www.js-tutorials.com/jquery-tutorials/reading-csv-file-using-jquery/
    // still trying to wrap my head around this...
    let lessonsList;
    let lessonsDict;

    $.ajax({
        type: "GET",  
        url: "https://lilywus.github.io/alting/data/lessons.csv",
        dataType: "text",       
        success: function(response)  {
            lessonsList = $.csv.toArrays(response);
          
            for (let i = 1; i < lessonsList.length; i++) {
                // add lesson to dictionary
            }   
        }   
      });

      console.log(lessonsList);
}

getLessons();