function init(){


    var location=d3.select("#selDataset")

    d3.json("samples.json").then((data)=> {
        console.log("Hello")
        var snames=data.names;
        snames.forEach((samples)=> {
            location.append("option").text(samples).property("value",samples);


        })
    var firstid=snames[0];
    demotable(firstid);
    charttable(firstid);
    console.log("Hello")
})

}

function demotable(sample) {
    d3.json("samples.json").then((data) => {
      var mdata = data.metadata;
      // Filter the data for the object with the desired sample number
      var results = mdata .filter(sampleObj => sampleObj.id == sample);
      var result = results[0];
      // Use d3 to select the panel with id of `#sample-metadata`
      var locater= d3.select("#sample-metadata");
      // Use `.html("") to clear any existing metadata
      locater.html("");
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(result).forEach(([key, value]) => {
        locater.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
    });
  }
function charttable(sample) {
d3.json("samples.json").then((data) => {
    var samplesinfo = data.samples;
    // Filter the data for the object with the desired sample number
    var results = samplesinfo.filter(sampleObj => sampleObj.id == sample);
    var result = results[0];

    var ids = result.otu_ids;
    var labels = result.otu_labels;
    var values = result.sample_values;
    var yaxis= ids.slice(0, 10).map(x => `OTU ${x}`)

    var trace1=[{
        x:values.slice(0,10),
        y:yaxis,
        type:"bar",
        orientation:"h"
    
    }]
    var barlayout={
        title:"Bar Chart"
    };
    Plotly.newPlot("bar",trace1, barlayout)

    trace2 = {
       
        x:ids,
        y:values,
        mode : 'markers',
        marker: {
          color: ids,
          size: values
          // .map(data => data-18)
        },
        text: ids,
        textfont : {
          family:'Times New Roman'
        },
        textposition: 'bottom center',
      type: 'scatter'  
      };
      var data1 = [trace2];
      var layout = {
        title: 'Bubble Chart Size Scaling',
        xaxis: {
          title: 'OTU ID',
          showgrid: true,
          zeroline: false
        },
        showlegend: false};
      Plotly.newPlot('bubble', data1, layout);

    // Plotly.newPlot("bubble",trace2,bubblelayout)
    
});
}
function optionChanged(Sample) {
    // Fetch new data each time a new sample is selected
    demotable(Sample);
    charttable(Sample);
};

init();