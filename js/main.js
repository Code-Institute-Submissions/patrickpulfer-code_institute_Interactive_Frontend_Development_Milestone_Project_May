// Variables
    var today = new Date();
    var latestbyCountry = Array();
    var totalbyCountry = Array();
    var newsAPI = Array();
    var totalDeaths;
    var totalCases;

// Importing Google Charts, then run API calls
    google.charts.load('current', {
        'packages':['geochart','corechart'],
        'mapsApiKey': 'AIzaSyAz5bDiEFM6Ugta6CMOcMj6f3m55A16p3w'
    }).then(getCovidLatestData);


$(document).ready(function(){
    getCovidNews();
});

function getCovidLatestData(){
    let endpoint = 'https://covid.ourworldindata.org/data/latest/owid-covid-latest.json';

    $.ajax({
        url: endpoint,
        dataType: 'json',

        success: function(result){

            latestbyCountry.push(['Country', 'New Cases', 'New Deaths']);
            totalbyCountry.push(['Country', 'Total Cases', 'Total Deaths']);

            $.each(result, function(i, val){
                // Parse Statistics
                    latestbyCountry.push([(result[i]['location']),(result[i]['new_cases']),(result[i]['new_deaths'])]);
                    totalbyCountry.push([(result[i]['location']),(result[i]['total_cases']),(result[i]['total_deaths'])]);
                    totalCases =+ result[i]['total_cases'];
                    totalDeaths =+ result[i]['total_deaths'];
            })

            // Debug Only
          //      console.log('API:');
            //    console.log(result);

            // Draw Google GeoChart
                drawRegionsMap(latestbyCountry, 'covid_latest_map', '#FF7F00');
                drawRegionsMap(totalbyCountry, 'covid_total_map', '#FF0000');

            // Display Totals
                $('#total_cases').text(totalCases);
                $('#total_deaths').text(totalDeaths);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
        }    
    });
}

function drawRegionsMap(dataForDrawing, htmlElement, color) {
  //  console.log('Data for Drawing?');
  //  console.log(dataForDrawing);
    var data = google.visualization.arrayToDataTable(dataForDrawing);
    var options = {
        colors: [(color)],
        sizeAxis: { minValue: 0, maxValue: 300000}
    };
    var chart = new google.visualization.GeoChart(document.getElementById(htmlElement));
    chart.draw(data, options);
}


function getCovidNews(){
    var url = `http://api.mediastack.com/v1/news?access_key=6999d5eee97103a6a145cc12f2af7615&keywords=covid&languages=en&limit=50`;
    var req = new Request(url);
    
    fetch(req)
    .then(response => response.json())
    
    .then(data => {
        newsAPI2 = data['data'];

        // Debug Only
           // console.log('Success:', data['data']);
         //  newsAPI2["data"][3]['image']
        let i=0;
        $.each(newsAPI2, function(i, val){

            if (newsAPI2[i]['image'] != null && newsAPI2[i]['image'].substr(newsAPI2[i]['image'].length, -3) != ".mp3" && newsAPI2[i]['image'].substr(newsAPI2[i]['image'].length, -3) != ".mp4") {
                console.log(newsAPI2[i]);
                newsAPI.push(newsAPI2[i]);
              }
        })

        for (i=0; i<6; i++){
            $('#carousel_' + i).find("img").attr('src', newsAPI[i]['image']);
            $('#carousel_' + i).find("#news_title").text(newsAPI[i]['title']);
            $('#carousel_' + i).find("#news_description").text(newsAPI[i]['description']);
            $('#carousel_' + i).find("a").attr('href', newsAPI[i]['url']);
            console.log(newsAPI[i]['image']);
        }
        

    })

    .catch((error) => {
    console.error('Error:', error);
    });




      //  $("#my_image").attr("src","second.jpg");


}




//$("#moo") > $("#foo #moo") > $("div#foo span#moo") > $("#foo span") > $("#foo > #moo")
/*
carousel_5

$('#'+openaddress).

.children('img').attr('src', '<source here>');

*/
