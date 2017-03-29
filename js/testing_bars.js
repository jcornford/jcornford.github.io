var margin = {top: 20, right: 20, bottom: 30, left: 50}
var width  = 600; // this is pixels
var height = 100;
var barPadding = 1;

var slider1 = document.getElementById('aInputId');
var slider2 = document.getElementById('bInputId');
var slider3 = document.getElementById('cInputId');
var slider4 = document.getElementById('dInputId');

function init() {
	let a = parseFloat(slider1.value);
	let b = parseFloat(slider2.value);
	let c = parseFloat(slider3.value);
	let d = parseFloat(slider4.value);
	console.log("init");

	var svg = d3.select("#plot")
            .append("svg")
            .attr("width", width)
            .attr("height", height);
            
    // reference the new SVG without having to reselect it later using something like d3.select("svg").

    var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

    svg.selectAll("rect")
       .data(dataset)
       .enter()
       .append("rect")
       // You’ll recall from the SVG primer that, when drawing rects, the x and y values specify the coordinates of the upper-left corner.
       .attr("x", function(d,i){
             return i* (width/ dataset.length);
       })
       .attr("y", function(d){
            return height-d*4 ;
       })
       .attr("width", (width/ dataset.length )- barPadding)
       .attr("height", function(d){
             return d*4;
       })
       .attr("fill", function(d) {
            return "rgb(0, 0, " + (d * 1) + ")";
       });

    // now add text

    svg.selectAll("text")
       .data(dataset)
       .enter()
       .append("text")
       .text(function(d) {
        return d;
        })
       .attr("x", function(d, i) { // left edge of each bar plus half the bar width:
            return i * (width / dataset.length)+((width/ dataset.length )- barPadding)/2;
       })
       .attr("text-anchor", "middle") // Let’s use the SVG text-anchor attribute to center the text horizontally at the assigned x value:
       .attr("y", function(d) {
            return height - (d * 4)+14;
       })
       .attr("font-family", "sans-serif")
       .attr("font-size", "11px")
       .attr("fill", "white");


    // first select all rects inside of svg (empty slection)
    // tgen data(dataset) sees we hae dataset.length values
    // so calls enter 20 times
    //Given that our bars do have to “grow down from the top,” then where is “the top Well, the top of each bar could be expressed as a relationship between the height of the SVG and the corresponding data value, as in:


    //*************
    //At some point in your D3 career, you will encounter JavaScript Object Notation.
     var jsonFruit = {
        "kind": "grape",
        "color": "red",
        "quantity": 12,
        "tasty": true
       }; // same as object buy with string keys...
    console.log(jsonFruit.kind);
}

init();