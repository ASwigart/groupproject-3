// Create variables for the different routes
const url_arriv = "http://127.0.0.1:5000/arrivals"
const url_indiv = "http://127.0.0.1:5000/individuals"
const url_world = "http://127.0.0.1:5000/world"

// Initialize function that pulls the years and adds them to the drop-down to feed into building the charts.
// Function codes built up from tutoring session with Kelli Kennedy
function init() {
    // Create a variable for the drop-down and use D3 to select it from the html
    var dropDown = d3.select("#selDataset");
    // Fetch the JSON data
    d3.json(url_arriv).then(function (number) {
        // Create a new list for the years of arrival
        var allYears = []
        var years = []
        var arriv = []
        // Loop through the data and push the years into the empty list
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
        console.log(arriv);
        // Add each year to the drop-down option
        rev_years = years.reverse()
        rev_years.forEach((year) => {
            dropDown.append("option").text(year).property("value", year)
        // console.log(year)
            });
        // Review info in drop-down
        // console.log(dropDown)
        var trace1 = {
            x: allYears,
            y: arriv
        }

        let data = [trace1];
        let layout = {
            title: "Total Arrivals by Year since 1980"
        };
        Plotly.newPlot("Arrivals", data, layout);
        var initYear = rev_years[0];
        // buildWorld(initYear);
        // buildIndiv(initYear);
    });

};

// Build a grouped bar chart for the types of asylees using a new JavaScript library - charts.js
// Code adapted from Benjamin Carmichael at https://codepen.io/bencarmichael/pen/XeYJXJ
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

    var chartOptions = {
        responsive: true,
        legend: {
            position: "top"
        },
        title: {
            display: true,
            text: "Number of Asylees by Year Based on Type"
        }
    };
    window.onload = function() {
        var ctx = document.getElementById("myChart").getContext("2d");
        window.myBar = new Chart(ctx, {
                type: "bar",
                data: barChartData,
                options: chartOptions
        });
    };
console.log(defCount)
});



// Option changed function pulled from HTML file and used to update build charts and build demo functions when the value in the drop-down
// changes
function optionChanged(year) {
    // buildWorld(year);
    // buildIndiv(year);
};

// Calling the initialize function to run.
init();