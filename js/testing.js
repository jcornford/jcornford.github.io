var margin = {top: 20, right: 20, bottom: 30, left: 50}
var width  = 600; // this is pixels
var height = 300;

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

    // This statement also puts the result into our new variable called svg, so we can easily reference the new SVG without having to reselect it later using something like d3.select("svg").

    var dataset = [ 5, 10, 15, 30, 25 ];
    var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
    //Rewritten as an array, those values are much simpler. Hard brackets [] indicate an array, while each value is separated by a comma:
    //numbers[0]  //Returns 5
    //Arrays can contain any type of data, not just integers.

    //Arrays are great for simple lists of values, but with more complex data sets, you’ll want to put your data into an object. For our purposes, think of a JavaScript object as a custom data structure. We use curly brackets {} to indicate an object. In between the brackets, we include indices and values. A colon : separates each index and its value, and a comma separates each index/value pair.
    var fruit = {
        kind: "grape",
        color: "red",
        quantity: 12,
        tasty: true
     };
    //At some point in your D3 career, you will encounter JavaScript Object Notation.
     var jsonFruit = {
    "kind": "grape",
    "color": "red",
    "quantity": 12,
    "tasty": true
       };
    console.log(fruit.kind);
    //and then use data() to iterate through each data point,
    //creating a circle for each one:

    var circles = svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle");

    //Remember, selectAll() will return empty references to all circles
     //(which don’t exist yet), data() binds our data to the elements we’re about
      //to create, enter() returns a placeholder reference to the new element,
       //and append() finally adds a circle to the DOM.

    //To make it easy to reference all of the circles later, we can create a new variable to store references to them all:

    //Great, but all these circles still need positions and sizes. Be warned: The following code may blow your mind.

    circles.attr("cx", function(d, i) {
            return (i * 50) + 25;
        })
       .attr("cy", height/2)
       .attr("r", function(d) {
            return d;
       });
        // http://alignedleft.com/tutorials/d3/drawing-svgs
       //circles.attr("cx", function(d, i) {
       //     return (i * 50) + 25;
       // })
       // Takes the reference to all circles and sets the cx attribute for each one. Our data has already been bound to the circle elements, so for each circle, the value d matches the corresponding value in our original data set (5, 10, 15, 20, or 25). Another value, i, is also automatically populated for us. i is a numeric index value of the current element. Counting starts at zero, so for our “first” circle i == 0, the second circle’s i == 1 and so on. We’re using i to push each subsequent circle over to the right, because each subsequent loop through, the value of i increases.
}

init();