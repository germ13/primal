import * as d3 from "d3";
// import { R2, getPath } from "./prime000";

import {isPrime, PRIMES} from "./primes"

const primes = PRIMES;

export type R2 = [number, number];

let divisions = 5;

let direction_vector: R2[] = [[1, 0]];
let roundoff = 1000000;
for (let i = 1; i < divisions; i++) {

    let x = Math.cos(Math.PI * 2 * i / divisions);
    let y = Math.sin(Math.PI * 2 * i / divisions);
    x = Math.round((x + Number.EPSILON) * roundoff) / roundoff;
    y = Math.round((y + Number.EPSILON) * roundoff) / roundoff;
    direction_vector.push([x, y]);
}

const move = (position: R2, direction: R2): R2 =>
    [position[0] + direction[0]
        , position[1] + direction[1]];

const rotate = (current_direction: R2, directions: R2[]): R2 => {
    let cd_index = directions.indexOf(current_direction);
    let new_index = (cd_index + 1) % directions.length;
    //console.log('--->', directions[new_index]);
    return directions[new_index];
}

export function getPath() : R2[] {
    let cd: R2 = direction_vector[0];
    let position: R2 = [0, 0];

    let result : R2[] = [];
    result.push(position);
    
    for (var i = 0; i <= Math.max.apply(Math, primes); i++) {
        if (isPrime(i)) {
            cd = rotate(cd, direction_vector);
            position = move(position, cd);
        } else {
            position = move(position, cd);
        }
        result.push(position);
    }
    return result;
}













let data: R2[] = getPath();
let width =  800;
let height = 800;

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

// svg
//   .append("circle")
//   .attr("r", 50)
//   .attr("cx", 120)
//   .attr("cy", 20);

data.map(p => {
    svg
        .append("circle")
        .attr("r", 1)
        .attr("cx", x(p[0]))
        .attr("cy", y(p[1])) 
        .attr("color","red")
    console.log("x", p[0], x(p[0]))
    console.log("y", p[1], y(p[1]))
});

let line = d3.line()
    .x(function (d) { return x(d[0]); })
    .y(function (d) { return y(d[1]); });

// svg.append("path")                         // plot the data as a line
//     .datum(data)
//     .attr("class", "line")
//     .attr("d", line)
//     .style('fill', 'none')
//     .style('stroke', 'red')
//     .transition()
//     .delay(500)
//   .duration(1000)
//   //.style('stroke', '#fff')
