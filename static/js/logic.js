// this is just to see if the logic is working properly
console.log(d3)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#preflighted_requests
// For CORS requests

const xhr = new XMLHttpRequest();
const url1 = "http://127.0.0.1:5000/arrivals"
const url2 = "http://127.0.0.1:5000/individuals"
const url3 = "http://127.0.0.1:5000/world"

xhr.open("GET", url1);
// xhr.onreadystatechange = someH; 
xhr.send();

xhr.open("GET", url2);
// xhr.onreadystatechange = traveler2; 
xhr.send();

xhr.open("GET", url3);
// xhr.onreadystatechange = traveler3; 
xhr.send();

//  create data variable
var Data1;
var Data2;
var Data3;



// Initialize function that pulls the subject ID numbers and adds them to the drop-down to feed into building the charts.
// Function codes built up from tutoring session with Kelli Kennedy
// function init() {
//     var dropDown = d3.select("");
//     // Fetch the JSON data
//     d3.json(url).then(function (data) {
//         var sampleId = data.names;
//         sampleId.forEach((sample) => {
//             dropDown.append("option").text(sample).property("value", sample)
//         });
//         var initSample = sampleId[0];
//         buildDemo(initSample);
//         buildCharts(initSample);
//         // console.log(data);
//     });
// };
// ABS D3 attempt at dropdown. 
function buildArrivals(){
    let dropDown = d3.select("#selDataset");
//    (selDataset) is an element in the HTML // 
    d3.json(url1). then((Data1) => {
        console.log(Data1);
        var subId = Data1.year;
        subId.forEach((year) => {
            dropDown
                .append("option")
                .text(year)
                .property("value", year);
            });

        buildArrivals(subId[0]);
        buildChart1(subId[0]);
    });
}
buildArrivals()

// function optionChanged(year){
//     buildMetadata(year);
//     buildCharts(year);

// Build charts function using the sample from the initialize function to create each of the charts.
function buildCharts(sample) {
    d3.json(url1).then((data1) => {
        // Define variables needed for the charts
        var data1 = data1.samples
        var result = data1.year       
    var data1 = [
        {
            x: data1.number,
            y: data1.year,
            type: 'Arrivals',
            orientation : 'v'
        }
    ];
    var layout = {
        title: "Number of Refugees by Year",
        height: 600,
        width: 600,
    }
    Plotly.newPlot("line", data, layout);

        // var allSamples = data.samples;
        // var sampleInfo = allSamples.filter(row => row.id == sample);
        // var sampleValues = sampleInfo[0].sample_values;
        // var sampleValuesSlice = sampleValues.slice(0,10).reverse();
        // var otuIds = sampleInfo[0].otu_ids;
        // var otuIdsSlice = otuIds.slice(0,10).reverse();
        // var otuLabels = sampleInfo[0].otu_labels;
        // var otuLabelsSlice = otuLabels.slice(0,10).reverse();
        // var metaData = data.metadata;
        // var metaDataSample = metaData.filter(row => row.id == sample);
        // var wash = metaDataSample[0].wfreq;

        // console.log(metaData);

        // Create the first chart (bar chart)
        var trace1 = {
            x: sampleValuesSlice,
            y: otuIdsSlice.map(item => `OTU ${item}`),
            type: "bar",
            orientation: "h",
            text: otuLabelsSlice,
        };
        var data = [trace1];
        Plotly.newPlot("bar", data)
// ABS Barchart
// https://observablehq.com/@d3/stacked-bar-chart
chart = StackedBarChart(Data2, {
    x: d => d.total,
    y: d => d.number,
    xDomain: d3.groupSort(Data1, ([d])=> d.year, d => d.number),
    yFormat: "#",
    yLabel: "Number of Refugees by Year",
    width,
    height: 700,
    Color: "steelblue",
});



})

        // Create the second chart (bubble chart)
        var trace2 = {
            x: otuIds,
            y: sampleValues,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: otuIds,
                colorscale: "Earth"
            },
            text: otuIds
        };
        var data2 = [trace2];
        var layout = {
            showlegend: false
        };

        Plotly.newPlot("bubble", data2, layout);

        // Create the 


// Build the demographic box again using the sample from the initialize function to create the demographic box that includes
// the subject's information
function buildDemo(sample) {
    var demo = d3.select("#sample-metadata");
    d3.json(url).then(function (data) {
        var metaData = data.metadata;
        // Code adapted during study group with Doug
        // Filter code adapted from https://observablehq.com/@observablehq/learn-javascript-introduction?collection=@observablehq/tutorial
        var metaDataSample = metaData.filter(row => row.id == sample);
        demo.selectAll("p").remove();
        metaDataSample.forEach((row) => {
            for (const [key, value] of Object.entries(row)) {
                demo.append("p").text(`${key}: ${value}`);
            };
        });
    });
}

// Option changed function pulled from HTML file and used to update build charts and build demo functions when the value in the drop-down
// changes
function optionChanged(sample) {
    buildDemo(sample);
    buildCharts(sample);
}

// Calling the initialize function to run.
init()
}