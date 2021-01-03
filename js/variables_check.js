// Copy & Paste into Chrome Console to check variables:

var errors = 0;
if(latestbyCountry.length === 0){
console.log('Error: latestbyCountry array is empty'); errors++;
}
else {console.log('OK: latestbyCountry')}

if(totalbyCountry.length === 0){
    console.log('Error: totalbyCountry array is empty'); errors++;
}
else {console.log('OK: totalbyCountry')}

if(newsAPI.length === 0){
    console.log('Error: newsAPI array is empty'); errors++;
}
else {console.log('OK: newsAPI')}
    
if(latestbyCountry.length === 0){
    console.log('Error: covidDataTimestamp array is empty'); errors++;
}
else {console.log('OK: covidDataTimestamp')}

if(covidLatestTableData.length === 0){
    console.log('Error: covidLatestTableData array is empty'); errors++;
}
else {console.log('OK: covidLatestTableData')}
    
if(covidTotalTableData.length === 0){
    console.log('Error: covidTotalTableData array is empty'); errors++;
}
else {console.log('OK: covidTotalTableData')}



if(jQuery.type(totalDeaths) === 'number' && totalDeaths > 0){
    console.log('OK: totalDeaths')
}
else {console.log('Error: totalDeaths is not a number or is empty'); errors++;}

if(jQuery.type(totalCases) === 'number' && totalCases > 0){
    console.log('OK: totalCases')
}
else {console.log('Error: totalCases is not a number or is empty'); errors++;}

console.log('Errors Found: ' + errors);