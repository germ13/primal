import * as d3 from "d3";
// import { R2, getPath } from "./prime000";

import { isPrime, PRIMES } from "./primes"

const primes = PRIMES;

export type R2 = [number, number];

const formula = (a, b, c) => (a * c) / (b * b);

var data = primes.map((n, i, arr) => {
    if (i == 0 || i > (arr.length - 2)) return [i, 0];
    else {
        return [i, formula(arr[i - 1], n, arr[i + 1])];
    }
});

data = data.filter(p => p[1] > 0.85 && p[1] < 1.25);

console.log(data);

/* ---- */

let width = 1300;
let height = 800;

const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

function xValue(d) { return d[0]; }      // accessors
function yValue(d) { return d[1]; }

var x = d3.scaleLinear()                // interpolator for X axis -- inner plot region
    .domain(d3.extent(data, xValue))
    .range([0, width]);

var y = d3.scaleLinear()                // interpolator for Y axis -- inner plot region
    .domain(d3.extent(data, yValue))
    .range([height, 0]);

data.map(p => {
    svg
        .append("circle")
        .attr("r", 1)
        .attr("cx", x(p[0]))
        .attr("cy", y(p[1]))
        .attr("color", "red")
});


let line = d3.line()
    .x(function (d) { return x(d[0]); })
    .y(function (d) { return y(d[1]); });

svg.append("path")                         // plot the data as a line
    .datum(data)
    .attr("class", "line")
    .attr("d", line)
    .style('fill', 'none')
    .style('stroke', 'red')
    .transition()
    .delay(500)
  .duration(1000)
  //.style('stroke', '#fff')
