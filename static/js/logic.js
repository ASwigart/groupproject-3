// Create variables for the different routes
const url_arriv = "http://127.0.0.1:5000/arrivals"
const url_indiv = "http://127.0.0.1:5000/individuals"
const url_world = "http://127.0.0.1:5000/world"

// Initialize function that pulls the years and adds them to the drop-down to feed into building the charts.
// Function codes built up from tutoring session with Kelli Kennedy
function init() {
    // Create a variable for the drop-down and use D3 to select it from the html
    // var dropDown = d3.select("#selDataset");
    // Fetch the JSON data
    d3.json(url_arriv).then(function (number) {
        // Create a new list for the years of arrival
        var allYears = []
        var years = []
        var arriv = []
        // Loop through the data and push the years and arrival numbers into empty lists
        for (var i=0; i < number.length; i++) {
            var arr_year = number[i].year;
            var arr = number[i].number;
            if (arr_year > 2011) {
                years.push(arr_year.toString());
            };
            allYears.push(arr_year).toString();
            arriv.push(arr);
        };
        // Confirm the loop pushed years into the list.
        // console.log(arriv);
        // Add each year to the drop-down option
        // rev_years = years.reverse()
        // rev_years.forEach((year) => {
        //     dropDown.append("option").text(year).property("value", year)
        // // console.log(year)
        //     });
        // Review info in drop-down
        // console.log(dropDown)
        var trace1 = {
            x: allYears,
            y: arriv,
            mode: 'lines+markers'
        };

        let data = [trace1];
        let layout = {
            title: "Total Refugee Arrivals by Year since 1980",
            xaxis: {
                title: "Year of Arrival"
            },
            yaxis: {
                title: "Number of Refugees"
            }
        };
        Plotly.newPlot("Arrivals", data, layout);
        // var initYear = rev_years[0];
        buildWorld();
        buildIndiv();
    });

};

// Build a grouped bar chart for the types of asylees using a new JavaScript library - charts.js
// Code adapted from Benjamin Carmichael at https://codepen.io/bencarmichael/pen/XeYJXJ
function buildIndiv() {
    d3.json(url_indiv).then(function (data) {
        
        const year = []
        const affCount = []
        const defCount = []
        const total = []
        for (var i=0; i < data.length; i++) {
            var arr_year = data[i].year;
            var arr_aff = data[i].affirmative;
            var arr_def = data[i].defensive;
            var arr_total = data[i].defensive;
            year.push(arr_year.toString());
            affCount.push(arr_aff);
            defCount.push(arr_def);
            total.push(arr_total);
        };
        
        var barChartData = {
            labels: year,
            datasets: [
                {
                    label: "Affirmative",
                    backgroundColor: "lightgreen",
                    borderColor: "green",
                    borderWidth: 1,
                    data: affCount
                },
                {
                    label: "Defensive",
                    backgroundColor: "lightblue",
                    borderColor: "blue",
                    borderWidth: 1,
                    data: defCount
                }
            ]
        };

        var ctx = document.getElementById("myChart").getContext("2d");
        const myChart = new Chart(ctx, {
                type: "bar",
                data: barChartData,
                options: {
                    responsive: true,
                    legend: {
                        position: "top"
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Number of Asylees by Year Based on Type'
                        }
                    },
                    scales: {
                        x: {
                          grid: {
                            display: false
                          }
                        }
                    }
                }
        });
    // console.log(defCount)
    });
};

function buildWorld(year) {
    var dropDown = d3.select("#selDataset");
    d3.json(url_world).then(function (data) {
                // Create a new list for the years of arrival
                var allCountries = []
                // var countries = []
                var arriv2012 = []
                var arriv2013 = []
                var arriv2014 = []
                var arriv2015 = []
                var arriv2016 = []
                var arriv2017 = []
                var arriv2018 = []
                var arriv2019 = []
                var arriv2020 = []
                var arriv2021 = []
                var years = ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"]
                // Loop through the data and push the years and arrival numbers into empty lists
                for (var i=0; i < data.length; i++) {
                    var origin = data[i].country;
                    allCountries.push(origin);
                    var arrivy2012 = data[i].y2012;
                    arriv2012.push(arrivy2012);
                    
                    var arrivy2013 = data[i].y2013;
                    arriv2013.push(arrivy2013);

                    var arrivy2014 = data[i].y2014;
                    arriv2014.push(arrivy2014);

                    var arrivy2015 = data[i].y2015;
                    arriv2015.push(arrivy2015);

                    var arrivy2016 = data[i].y2016;
                    arriv2016.push(arrivy2016);

                    var arrivy2017 = data[i].y2017;
                    arriv2017.push(arrivy2017);

                    var arrivy2018 = data[i].y2018;
                    arriv2018.push(arrivy2018);

                    var arrivy2019 = data[i].y2019;
                    arriv2019.push(arrivy2019);

                    var arrivy2020 = data[i].y2020;
                    arriv2020.push(arrivy2020);

                    var arrivy2021 = data[i].y2021;
                    arriv2021.push(arrivy2021);
                };
                // Confirm the loop pushed years into the list.
                // console.log(arriv);
                // Add each year to the drop-down option
                allCountries.forEach((country) => {
                    dropDown.append("option").text(country).property("value", country)
                console.log(arriv2012)
                    });
        
        
        // console.log(data[0].country);
        // // var dict = {};
        // var twelve = {}
        // var thirteen = []
        // var fourteen = []
        // var fifteen = []
        // var sixteen = []
        // var seventeen = []
        // var eighteen = []
        // var nineteen = []
        // var twenty = []
        // var twentyOne = []
        // var country = []
        // for (var i=0; i < data.length; i++) {
        //     var wCountry = data[i].country;
        //     var y12 = data[i].y2012;
        //     var y13 = data[i].y2013;
        //     var y14 = data[i].y2014;
        //     var y15 = data[i].y2015;
        //     var y16 = data[i].y2016;
        //     var y17 = data[i].y2017;
        //     var y18 = data[i].y2018;
        //     var y19 = data[i].y2019;
        //     var y20 = data[i].y2020;
        //     var y21 = data[i].y2021;
        //     twelve.push({
        //         country: wCountry,
        //         year: 2012,
        //         arrivals: y12
        //     });
        //     country.push(wCountry);
        //     twelve.push(y12);
        //     thirteen.push(y13);
        //     fourteen.push(y14);
        //     fifteen.push(y15);
        //     sixteen.push(y16);
        //     seventeen.push(y17);
        //     eighteen.push(y18);
        //     nineteen.push(y19);
        //     twenty.push(y20);
        //     twentyOne.push(y21);
        // };
        // console.log(twelve)
    });
}

// Option changed function pulled from HTML file and used to update build charts and build demo functions when the value in the drop-down
// changes
function optionChanged(year) {
    buildWorld(year);
    buildIndiv();
};

// Calling the initialize function to run.
init();