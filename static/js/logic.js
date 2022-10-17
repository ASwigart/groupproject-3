// Create variables for the different routes
const url_arriv = "http://127.0.0.1:5000/arrivals"
const url_indiv = "http://127.0.0.1:5000/individuals"
const url_world = "http://127.0.0.1:5000/world"

// Initialize function that pulls the years and adds them to the drop-down to feed into building the charts.
// Function codes built up from tutoring session with Kelli Kennedy
function init() {
    // Create a variable for the drop-down and use D3 to select it from the html
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
                var years = ["2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"]
                // Loop through the data and push the years and arrival numbers into empty lists
                for (var i=0; i < data.length; i++) {
                    var traceData = Object.values(data[i]);
                    var origin = traceData.shift();
                    var trace = {
                        x: years,
                        y: traceData,
                        name: origin
                    };
                    allCountries.push(trace);
                };
                let layout = {
                    title: "Total Refugee Arrivals by Year since 1980",
                    xaxis: {
                        title: "Year of Arrival"
                    },
                    yaxis: {
                        title: "Number of Refugees"
                    }
                };
                Plotly.newPlot("World", allCountries, layout);
    });
}

// Option changed function pulled from HTML file and used to update build charts and build demo functions when the value in the drop-down
// changes
// function optionChanged(year) {
//     buildWorld();
//     buildIndiv();
// };

// Calling the initialize function to run.
init();