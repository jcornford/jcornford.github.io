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

    var dataset = [
                      [ 5,     20 ],
                      [ 480,   90 ],
                      [ 250,   50 ],
                      [ 100,   33 ],
                      [ 330,   95 ],
                      [ 410,   12 ],
                      [ 475,   44 ],
                      [ 25,    67 ],
                      [ 85,    21 ],
                      [ 220,   88 ]
                  ];
};
init();