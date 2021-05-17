/*jshint esversion: 6 */
/*globals $:false, google */

// Global Variables
var latestbyCountry = Array();
var totalbyCountry = Array();
var newsAPI = Array();
var newsAPI2 = Array();
var totalDeaths;
var totalCases;
var covidDataTimestamp = Array();
var covidLatestTableData = Array();
var covidTotalTableData = Array();
var windowSize = $(window).width();


// Importing Google Charts, then run API calls
google.charts.load('current', {
    'packages': ['geochart', 'corechart'],
    'mapsApiKey': 'AIzaSyAz5bDiEFM6Ugta6CMOcMj6f3m55A16p3w'
}).then(getCovidLatestData);


$(document).ready(function () {
    getCovidNews();
    getCovidDataTimestamp();

    $(".toggle_stats_button").click(function () {
        $("#covid_total_map").parent().parent().slideToggle("slow");
        $("#covid_latest_map").parent().parent().slideToggle("slow");
    });

    $(".switch_total_map").click(function () {
        if ($("#covid_latest_map").is(':visible')) {
            $("#covid_total_map").parent().parent().slideToggle("slow");
            $("#covid_latest_map").parent().parent().slideToggle("slow");
        }
    });

    $(".switch_latest_map").click(function () {
        if ($("#covid_total_map").is(':visible')) {
            $("#covid_total_map").parent().parent().slideToggle("slow");
            $("#covid_latest_map").parent().parent().slideToggle("slow");
        }
    });


});

function getCovidLatestData() {
    var endpoint = 'https://covid.ourworldindata.org/data/latest/owid-covid-latest.json';
    $.ajax({
        url: endpoint,
        dataType: 'json',
        success: function (result) {
            latestbyCountry.push(['Country', 'New Cases', 'New Deaths']);
            totalbyCountry.push(['Country', 'Total Cases', 'Total Deaths']);

            // Parse Statistics
            $.each(result, function (i, val) {
                if (result[i].location === 'World' ||
                    result[i].location === 'Asia' ||
                    result[i].location === 'South America' ||
                    result[i].location === 'Europe' ||
                    result[i].location === 'European Union' ||
                    result[i].location === 'North America'
                ) { return; }
                latestbyCountry.push([(result[i].location), (result[i].new_cases), (result[i].new_deaths)]);
                totalbyCountry.push([(result[i].location), (result[i].total_cases), (result[i].total_deaths)]);
                covidLatestTableData.push([(result[i].location), (result[i].new_cases), (result[i].new_deaths), (result[i].new_tests), (result[i].hosp_patients), (result[i].icu_patients), (result[i].positive_rate)]);
                covidTotalTableData.push([(result[i].location), (result[i].total_cases), (result[i].total_deaths), (result[i].total_tests), (result[i].total_vaccinations), (result[i].life_expectancy), (result[i].population)]);
            });

            // Draw Google GeoChart
            drawRegionsMap(latestbyCountry, 'covid_latest_map', '#FF7F00');
            drawRegionsMap(totalbyCountry, 'covid_total_map', '#FF0000');
            $("#covid_total_map").parent().parent().toggle();
            drawDailybyCountryTable(covidLatestTableData);
            drawTotalbyCountryTable(covidTotalTableData);

            // Display Totals
            totalCases = result.OWID_WRL.new_cases;
            totalDeaths = result.OWID_WRL.new_deaths;
            $('#total_cases').text(new Intl.NumberFormat().format(totalCases));
            $('#total_deaths').text(new Intl.NumberFormat().format(totalDeaths));

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus); alert("Error: " + errorThrown);
        }
    });
}

function getCovidDataTimestamp() {
    fetch('https://covid.ourworldindata.org/data/owid-covid-data-last-updated-timestamp.txt')
        .then(res => res.text())
        .then(data => {
            covidDataTimestamp.push(data.substr(0, 10));
            covidDataTimestamp.push(data.substr(11, 8));
            $('.last_update_badge').text(covidDataTimestamp[0] + ' ' + covidDataTimestamp[1]);
        })

        .catch((error) => {
            console.error('Error:', error);
        });
}

function drawRegionsMap(dataForDrawing, htmlElement, color) {
    var data = google.visualization.arrayToDataTable(dataForDrawing);
    var options = {
        colors: [(color)],
        sizeAxis: { minValue: 0, maxValue: 300000 }
    };
    var chart = new google.visualization.GeoChart(document.getElementById(htmlElement));
    chart.draw(data, options);
}


function getCovidNews() {
    var url = 'http://api.mediastack.com/v1/news?access_key=6999d5eee97103a6a145cc12f2af7615&keywords=covid&languages=en&limit=100';
    var req = new Request(url);
    fetch(req)
        .then(response => response.json())
        .then(data => {
            newsAPI2 = data.data;
            var i = 0;

            // Attempting to filter out duplicating news
            $.each(newsAPI2, function (i, val) {
                if (i == 49) { return false; }
                if (newsAPI2[i].title != newsAPI2[(i + 1)].title) {
                    if (newsAPI2[i].image == null) { newsAPI2[i].image = './assets/images/news.jpg'; }
                    newsAPI.push(newsAPI2[i]);
                }
            });

            // Display 6 news items from source
            for (i = 0; i < 6; i++) {
                $('#carousel_' + i).find("img").attr('src', newsAPI[i].image);
                $('#carousel_' + i).find(".news_title").text(newsAPI[i].title);
                $('#carousel_' + i).find(".news_description").text(newsAPI[i].description.substring(0, 300));
                $('#carousel_' + i).find("a").attr('href', newsAPI[i].url);
                $('#carousel_' + i).find(".news_details").append('<i class="fas fa-link"></i>&nbsp;' + newsAPI[i].source + '&nbsp;&nbsp;<i class="far fa-clock"></i>&nbsp;' + newsAPI[i].published_at.substr(11, 8) + '&nbsp;&nbsp;<i class="far fa-calendar-alt"></i>&nbsp;' + newsAPI[i].published_at.substr(0, 10));
            }

            //Error handling when API returns empty data
            if (newsAPI === '' || newsAPI === undefined || newsAPI === null || newsAPI.length === 0) {
                $('#covidNews').hide();
                $('#covidNews').parent().append('Loading News from MediaStack.com failed. Reload Page to try again.');
            }
        })

        .catch((error) => {
            $('#covidNews').hide();
            $('#covidNews').parent().append('Loading News from MediaStack.com failed. See Console for Error');
            console.error('Error:', error);
        });
}

function drawDailybyCountryTable(covidLatestTableData) {
    hidden_table = $('#fist_table').DataTable({
        data: covidLatestTableData,
        responsive: true,
        "order": [[1, "desc"]],
    });
    if (windowSize <= 576) {
        hidden_table.columns([3, 4, 5, 6]).visible(false);
        hidden_table.columns.adjust().draw(false);
    }
}

function drawTotalbyCountryTable(covidLatestTableData) {
    hidden_table2 = $('#total_table').DataTable({
        data: covidLatestTableData,
        responsive: true,
        "order": [[1, "desc"]],
    });
    if (windowSize <= 576) {
        hidden_table2.columns([3, 4, 5, 6]).visible(false);
        hidden_table2.columns.adjust().draw(false);
    }
}