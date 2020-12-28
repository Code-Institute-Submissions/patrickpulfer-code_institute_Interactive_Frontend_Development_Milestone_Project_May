var today = new Date();

var processedHPSCIreland = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
var processedHPSCIrelandTH = [];

var lastReportedHPSCIreland = [];
var lastReportedDate;

$(document).ready(function(){
    getHPSCIreland();
});


function getHPSCIreland(){
    let endpoint = 'https://opendata.arcgis.com/datasets/d9be85b30d7748b5b7c09450b8aede63_0.geojson';

    $.ajax({
        url: endpoint,
        contentType: "application/json",
        dataType: 'json',

        success: function(result){

            // Debug
            console.log(result['features']); 

            lastReportedDate = (result['features'][(result['features'].length-1)]['properties']['TimeStamp'].slice(0, 10));
            
                for (let i = 0; i <  result['features'].length; i++) {
                    
                    // Process Array into county ID
                        processedHPSCIreland[(result['features'][i]['properties']['ORIGID'])].push(result['features'][i]['properties']);

                    // If date matches last reported date
                        if(result['features'][i]['properties']['TimeStamp'].slice(0, 10) == lastReportedDate){
                            lastReportedHPSCIreland.push(result['features'][i]['properties']);
                        }
                }



            // Debug
            console.log('Example processedHPSCIreland');
            console.log(processedHPSCIreland[1]);
            console.log('lastReportedHPSCIreland');
            console.log(lastReportedHPSCIreland);
            console.log('Last Reported Date:');
            console.log(lastReportedDate);

            lastReportedChart();

            // Get Keys for Table Headers
            //    processedHPSCIrelandTH = Object.keys(result['features'][0]); 


            /*
            for (let i=0; i < processedHPSCIreland[0].length; i++) {
                processedHPSCIrelandTH.push(processedHPSCIreland.id);
            }
            */

         //  createTableHPSCIreland();

        }
        
    });
};

function getYesterday(){
    let yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    let date = yesterday.getFullYear()+'-'+(yesterday.getMonth()+1)+'-'+yesterday.getDate();
    return date;
}

function lastReportedChart(){
    let labels = [];
    let data = [];
    let average = 0;

    $.each(lastReportedHPSCIreland, function(i, val){
        labels.push(lastReportedHPSCIreland[i]['CountyName']);
        data.push(lastReportedHPSCIreland[i]['ConfirmedCovidCases']);
        average =  average + lastReportedHPSCIreland[i]['ConfirmedCovidCases'];
    })
    average = average / lastReportedHPSCIreland.length;


    var ctx = document.getElementById('myChart').getContext('2d');
    var lastReportedChart = new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [{
                label: '#Total Cases',
                data: data,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
            }, {
                label: 'Line Dataset',
                data: [average,average,average,average,average,average,average,average,average,average,average,average,average,average,average,average,average,average,average,average,average,average,average,average,average,average],
                type: 'line'
            }],
            labels: labels,

        }
    });
}







/*


function createTableHPSCIreland(){
    
    var TableHPSCIreland = '<table border="1"><tr>';
    $.each(processedHPSCIrelandTH, function(i, val){
        
        TableHPSCIreland += '<th>' + val + '</th>';
    })
    TableHPSCIreland += '</tr>';
    
    $.each(processedHPSCIreland, function(i,val){
        TableHPSCIreland += '<tr>';
        $.each(processedHPSCIreland[i], function (i2, val2) {
                TableHPSCIreland += '<td>' + val2 + '</td>';
            })        
        TableHPSCIreland += '</tr>';
    })
    TableHPSCIreland += '</table>';
    $('#table').html(TableHPSCIreland);
};
*/
    /*
    $('table').append('<table border="1"><tr>');
    $.each(processedHPSCIrelandTH, function(i, v){
        $('table').append('<th>' + v + '</th>');
    })
};

/*
$(document).ready(function() {
     var testArray = ["test1","test2","test3","test4"];
        var vPool="";
        jQuery.each(testArray, function(i, val) {
          vPool += val + "<br /> is the best <br />";
        });

       //We add vPool HTML content to #myDIV
       $('#myDIV').html(vPool);
});


  */