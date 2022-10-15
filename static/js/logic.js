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
    d3.json(url_arriv).then(function (data) {
        // Create a new list for the years of arrival
        var years = []
        // Loop through the data and push the years into the empty list
        for (var i=0; i < data.length; i++) {
            var arr_year = data[i].year;
            years.push(arr_year);
        };
        // Confirm the loop pushed years into the list.
        console.log(years);
        // Add each year to the drop-down option
        years.forEach((y) => {
                dropDown.append("option").text(y).property("value", y)
        });

        // var initSample = sampleId[0];
        // buildDemo(initSample);
        // buildCharts(initSample);
        // console.log(data);
    });

};

// // Build charts function using the sample from the initialize function to create each of the charts.
// function buildCharts(sample) {
//     d3.json(url).then(function (data) {
//         // Define variables needed for the charts
//         var allSamples = data.samples;
//         var sampleInfo = allSamples.filter(row => row.id == sample);
//         var sampleValues = sampleInfo[0].sample_values;
//         var sampleValuesSlice = sampleValues.slice(0,10).reverse();
//         var otuIds = sampleInfo[0].otu_ids;
//         var otuIdsSlice = otuIds.slice(0,10).reverse();
//         var otuLabels = sampleInfo[0].otu_labels;
//         var otuLabelsSlice = otuLabels.slice(0,10).reverse();
//         var metaData = data.metadata;
//         var metaDataSample = metaData.filter(row => row.id == sample);
//         var wash = metaDataSample[0].wfreq;

//         // console.log(metaData);

//         // Create the first chart (bar chart)
//         var trace1 = {
//             x: sampleValuesSlice,
//             y: otuIdsSlice.map(item => `OTU ${item}`),
//             type: "bar",
//             orientation: "h",
//             text: otuLabelsSlice,
//         };
//         var data = [trace1];
//         Plotly.newPlot("bar", data)

//         // Create the second chart (bubble chart)
//         var trace2 = {
//             x: otuIds,
//             y: sampleValues,
//             mode: "markers",
//             marker: {
//                 size: sampleValues,
//                 color: otuIds,
//                 colorscale: "Earth"
//             },
//             text: otuIds
//         };
//         var data2 = [trace2];
//         var layout = {
//             showlegend: false
//         };

//         Plotly.newPlot("bubble", data2, layout);

//         // Create the 
//     });
// };

// // Build the demographic box again using the sample from the initialize function to create the demographic box that includes
// // the subject's information
// function buildDemo(sample) {
//     var demo = d3.select("#sample-metadata");
//     d3.json(url).then(function (data) {
//         var metaData = data.metadata;
//         // Code adapted during study group with Doug
//         // Filter code adapted from https://observablehq.com/@observablehq/learn-javascript-introduction?collection=@observablehq/tutorial
//         var metaDataSample = metaData.filter(row => row.id == sample);
//         demo.selectAll("p").remove();
//         metaDataSample.forEach((row) => {
//             for (const [key, value] of Object.entries(row)) {
//                 demo.append("p").text(`${key}: ${value}`);
//             };
//         });
//     });
// };

// // Option changed function pulled from HTML file and used to update build charts and build demo functions when the value in the drop-down
// // changes
// function optionChanged(sample) {
//     buildDemo(sample);
//     buildCharts(sample);
// };

// Calling the initialize function to run.
init();