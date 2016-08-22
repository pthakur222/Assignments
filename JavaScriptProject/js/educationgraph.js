
// set the dimensions of the canvas
var margin = {top: 60, right: 90, bottom: 0, left: 110},
    width = 750 - margin.left - margin.right,
    height = 650- margin.top - margin.bottom;


// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

// define the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

// add the SVG element
var svg = d3.select("body")
    .classed("svg-container", true)
            .append("svg")
            .attr("viewBox", "0 0 1000 800")
            .classed("svg-content-responsive", true)
    .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// load the data
d3.json("JSON/neweducation.json", function(error, data) {

    data.forEach(function(d) {
        d["EducationCategory"] = d["EducationCategory"];
        d["TotalPopulation"] = +d["TotalPopulation"];
    });
    
  // scale the range of the data
  x.domain(data.map(function(d) { return d["EducationCategory"]; }));
  y.domain([0, d3.max(data, function(d) { return d["TotalPopulation"]; })]);
//4100
  // add axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-60)" );

  // Add bar chart
  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d["EducationCategory"]); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d["TotalPopulation"]); })
      .attr("height", function(d) { return height - y(d["TotalPopulation"]);});
     
   // Draw yAxis and postion the label
   svg.append("g")
       .attr("class", "y axis")
       .call(yAxis)
       .append("text")
       .attr("transform", "rotate(-90)")
       .attr("x", -height/2)
       .attr("dy", "-7.5em")
       .style("text-anchor", "middle")
       .text("Total Population");

});
