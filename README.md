<img src="./documentation/logo2.png">
<br><br>
<img src="https://img.shields.io/github/last-commit/patrickpulfer/code_institute_Interactive_Frontend_Development_Milestone_Project?style=for-the-badge">
<img src="https://img.shields.io/github/repo-size/patrickpulfer/code_institute_Interactive_Frontend_Development_Milestone_Project?style=for-the-badge">
<img src="https://img.shields.io/github/languages/count/patrickpulfer/code_institute_Interactive_Frontend_Development_Milestone_Project?style=for-the-badge">
<br><br>

# Patrick's Covid19 Tracker

A simplified tracker for Covid-19 related news from reputable sources, aimed to provide non-convoluted and up-to-date data for the masses
<br><br>

## Features

- World Map
  - A visual representation of Covid-19 data in an intuitive way with mouse hover functions
- Data Table
  - Interactive data table with in-depth representation of Covid-19 data
- Confirmed cases and deaths numbers
  - Provided by _Our World in Data_ and sourced from Repository by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University (JHU).
- Hospitalizations and intensive care unit (ICU) admissions (Switch table to Totals)
  - Provided by _Our World in Data_ and sourced from reputable sources like European Centre for Disease Prevention and Control (ECDC), government of the United Kingdom;
- Testing for COVID-19 (Switch table to Totals)
  - This data is collected by the _Our World in Data_ team from official reports
- Vaccinations against COVID-19 (Switch table to Totals)
  - This data is collected by the _Our World in Data_ team from official reports

### Features Left to Implement

- Visual graphs displaying trending and historical data on Covid-19 infections
- SSL
  - MediaStack free API does only support HTTP. HTTPS is a paid feature
- Contact Form
  - SSL support required to feel comfortable asking for feedback directly on the website
    <br><br>

## Technologies Used

This application has been built by using the following technologies:

- [HTML 5](https://www.w3.org/TR/2008/WD-html5-20080122/) / [CSS](https://www.w3.org/Style/CSS/Overview.en.html) / [JavaScript](https://262.ecma-international.org/10.0/index.html)
- [JQuery](https://jquery.com)
  - Simplified DOM manipulation.
- [Font Awesome](https://fontawesome.com/)
  - Iconic SVG, font, and CSS framework.
- [Bootstrap](https://getbootstrap.com/)
  - Front-end framework for web development.
- [Google Charts](https://developers.google.com/chart)
  - Google API to draw charts via JavaScript
- [jQuery DataTables](https://datatables.net/)
  - Plug-in for the jQuery Javascript library for interactive tables
    <br><br>

## API's consumed

- [Mediastack](https://mediastack.com/)
  - Free API for Live News & Blog Articles
- [Our World in Data API](https://github.com/owid/covid-19-data)
  - COVID-19 dataset collection from various reputable sources, including WHO Vaccine Tracker & Johns Hopkins University
    <br><br>

## Development

If you are curious about the process of the development of this project, please [click here](./documentation/development.md).
<br><br>

## Deployment

### Current Deployment

The website is currently available at:

- [PWeb Solutions (my own hosting)](http://www.pweb.solutions/covidtracker/)
- [GitPages](https://patrickpulfer.github.io/code_institute_Interactive_Frontend_Development_Milestone_Project/index.html)
- [GitHack](https://raw.githack.com/patrickpulfer/code_institute_Interactive_Frontend_Development_Milestone_Project/master/index.html)

I have used the following method to deploy this website at GitPages but may also use this workflow to deploy any websites at GitPages:

1. Navigate to your GitHub Project
2. On top of your project files, there is a menu bar. Click on "Settings"
3. In your settings view, scroll down until the section "GitHub Pages"
4. Here you can choose the Source (preferentially main branch) and Save to deploy
5. Note the URL at "Your site is published at XXXXXX". It will be the URL to share

### Further Deployment

You may deploy this website on your local machine for testing purposes.

On **_Linux_**, you can easily do this on your terminal if you have git installed:

```
cd <to your preferred folder>
git clone https://github.com/patrickpulfer/code_institute_Interactive_Frontend_Development_Milestone_Project.git

```

To run, simply double-click the index.html file in the target folder or run the following command:

```
xdg-open ./code_institute_Interactive_Frontend_Development_Milestone_Project/index.html
```

Downloading the source code as Zip file from GitHub is also a valid method for **_Linux_** and **_Windows_**. On the project page, look for the Code button with arrow down as shown below:

<img src="./documentation/github.png">

Note: You have to extract the contents of your .zip file with your OS's decompression tool. [7zip](https://www.7-zip.org/download.html) is a good alternative.

Once unzipped, look for the index.html file and double-click it.
<br><br>

## Credits

### Content

- Covid-19 data has been sourced from [Our World in Data](https://github.com/owid/covid-19-data/tree/master/public/data).
- Covid-19 related news has been sourced from [Mediastack](https://mediastack.com/).

### Media

- The Logo has been created in [Placeit](https://placeit.net/), a branding service I've used in the past
- The picture replacing empty news items has been taken from [Pixbay](https://pixabay.com/illustrations/stop-corona-virus-coronavirus-mask-5032778/), a free images & royalty-free stock pictures website

### Acknowledgements

- I received inspiration for this project from [Worldmeter](https://www.worldometers.info/coronavirus/), a website I personally visit almost daily. I hope to contribute to the world by spreading the news and current status of the current pandemic

- My experience in web development has been backend so far (PHP), so this is my first project with data being processed in frontend JavaScript. I reckon my code may not be the most efficient but I am learning thanks to Code Institute <3
