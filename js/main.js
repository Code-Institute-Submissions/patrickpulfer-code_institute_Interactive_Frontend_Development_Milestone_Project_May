// Variables
    var today = new Date();
    var latestbyCountry = Array();
    var totalbyCountry = Array();
    var newsAPI = Array();
    var totalDeaths;
    var totalCases;
    var covidDataTimestamp = Array();
    var covidLatestData = Array();

// Importing Google Charts, then run API calls
    google.charts.load('current', {
        'packages':['geochart','corechart'],
        'mapsApiKey': 'AIzaSyAz5bDiEFM6Ugta6CMOcMj6f3m55A16p3w'
    }).then(getCovidLatestData);


$(document).ready(function(){
   // getCovidNews();
   getCovidDataTimestamp();

    $("#toggle_daily_stats").click(function(){
        $("#covid_latest_map").parent().slideToggle("slow");
    });
    $("#toggle_total_stats").click(function(){
        $("#covid_total_map").parent().slideToggle("slow");
    });

});

function getCovidLatestData(){
    let endpoint = 'https://covid.ourworldindata.org/data/latest/owid-covid-latest.json';

    $.ajax({
        url: endpoint,
        dataType: 'json',

        success: function(result){

            
            //covidLatestData = result.map((x) => x);
            latestbyCountry.push(['Country', 'New Cases', 'New Deaths']);
            totalbyCountry.push(['Country', 'Total Cases', 'Total Deaths']);

            $.each(result, function(i, val){
                // Parse Statistics
                    covidLatestData.push(result[i]);
                    latestbyCountry.push([(result[i]['location']),(result[i]['new_cases']),(result[i]['new_deaths'])]);
                    totalbyCountry.push([(result[i]['location']),(result[i]['total_cases']),(result[i]['total_deaths'])]);
                    totalCases =+ result[i]['total_cases'];
                    totalDeaths =+ result[i]['total_deaths'];

                    /*table_daily.push(
                        [
                            (result[i]['location']),
                            (result[i]['new_tests']),
                            (result[i]['new_cases']),
                            (result[i]['new_deaths']),
                            (result[i]['hosp_patients']),
                            (result[i]['icu_patients'])
                        ]
                    );*/
            })

            // Debug Only
           //     console.log('API:');
              //     console.log(result);

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

function getCovidDataTimestamp(){
    fetch('https://covid.ourworldindata.org/data/owid-covid-data-last-updated-timestamp.txt')
    .then(res => res.text())
    .then(data => {
        covidDataTimestamp.push(data.substr(0,10));
        covidDataTimestamp.push(data.substr(11,8));
    })

    .catch((error) => {
        console.error('Error:', error);
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
    var url = `https://api.mediastack.com/v1/news?access_key=6999d5eee97103a6a145cc12f2af7615&keywords=covid&languages=en&limit=50`;
    var req = new Request(url);
    
    fetch(req)
    .then(response => response.json())
    
    .then(data => {
        newsAPI2 = data['data'];
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
            $('#carousel_' + i).find("#news_description").text(newsAPI[i]['description'].substring(0,500));
            $('#carousel_' + i).find("a").attr('href', newsAPI[i]['url']);
            $('#carousel_' + i).find("#news_details").append('<i class="fas fa-link"></i>&nbsp;' + newsAPI[i]['source'] + '&nbsp;&nbsp;<i class="far fa-clock"></i>&nbsp;' + newsAPI[i]['published_at'].substr(11,8) + '&nbsp;&nbsp;<i class="far fa-calendar-alt"></i>&nbsp;' + newsAPI[i]['published_at'].substr(0,10));
        }
        

    })

    .catch((error) => {
    console.error('Error:', error);
    });
}

function drawDailybyCountryTable(covidLatestData){
    let tempTable = "";

    $('#dailyTable').append('<tr><th>Location</th><th>New Cases</th><th>New Deaths</th><th>New Tests</th><th>Hospitalized</th><th style="border-right-width: medium;">ICU</th><th>Weekly Cases</th><th>Weekly Deaths</th><th>Weekly Positive<br>Tests Rate</th></tr>');

    $.each(covidLatestData, function(i, val){
        if (covidLatestData[i]['new_tests'] == null || covidLatestData[i]['new_tests'] == ""){covidLatestData[i]['new_tests'] = '0*';}
        if (covidLatestData[i]['hosp_patients'] == null || covidLatestData[i]['hosp_patients'] == ""){covidLatestData[i]['hosp_patients'] = '0*';}
        if (covidLatestData[i]['icu_patients'] == null || covidLatestData[i]['icu_patients'] == ""){covidLatestData[i]['icu_patients'] = '0*';}
        if (covidLatestData[i]['positive_rate'] == null || covidLatestData[i]['positive_rate'] == ""){covidLatestData[i]['positive_rate'] = '0*';}
        tempTable = tempTable.concat('<tr><td>' + covidLatestData[i]['location'] + '</td><td>' + covidLatestData[i]['new_cases'] + '</td><td>' + covidLatestData[i]['new_deaths'] + '</td><td>' + covidLatestData[i]['new_tests'] + '</td><td>' + covidLatestData[i]['hosp_patients'] + '</td><td style="border-right-width: medium;">' + covidLatestData[i]['icu_patients'] + '</td><td>' + covidLatestData[i]['new_cases_smoothed'] + '</td><td>' + covidLatestData[i]['new_deaths_smoothed'] + '</td><td>' + covidLatestData[i]['positive_rate'] + '</td></tr>');
        
    })
    $('#dailyTable').append(tempTable);
    $('<p>*0 or not reported</p>').insertAfter('#dailyTable');

};