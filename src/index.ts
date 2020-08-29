import * as d3 from "d3";
import { R2, getPath } from "./prime000";

let data: R2[] = getPath();
let width = 500;
let height = 500;

// let mydata = dataPre.map( p => 
//     ({x: p[0]
//     , y: p[1]
// }));


const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

function xValue(d) { return d[0]; }      // accessors
function yValue(d) { return d[1]; }

console.log("extentX", d3.extent(data, xValue));
console.log("extentY", d3.extent(data, yValue));

var x = d3.scaleLinear()                // interpolator for X axis -- inner plot region
    .domain(d3.extent(data, xValue))
    .range([0, width]);

var y = d3.scaleLinear()                // interpolator for Y axis -- inner plot region
    .domain(d3.extent(data, yValue))
    .range([height, 0]);

    console.log("x: ",x(0), x(8))
    console.log("y:" , y(-7), y(5));

// svg
//   .append("circle")
//   .attr("r", 50)
//   .attr("cx", 120)
//   .attr("cy", 20);

// data.map(p => {
//     svg
//         .append("circle")
//         .attr("r", 1)
//         .attr("cx", x(p[0]))
//         .attr("cy", y(p[1])) 
//     console.log("x", p[0], x(p[0]))
//     console.log("y", p[1], y(p[1]))
// });

let line = d3.line()
    .x(function (d) { return x(d[0]); })
    .y(function (d) { return y(d[1]); });

svg.append("path")                         // plot the data as a line
    .datum(data)
    .attr("class", "line")
    .attr("d", line)
    .style('fill', 'none')
    .style('stroke', '#fff')
    .transition()
    .delay(500)
  .duration(1000)
  .style('stroke', '#000')
