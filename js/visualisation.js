let slider1 = document.getElementById('slider1');
let slider2 = document.getElementById('slider2');
let slider3 = document.getElementById('slider3');
let slider4 = document.getElementById('slider4');

const v0      = -75;  // mV
const tstop   = 1000; // ms 
const dt      = 0.25  // ms

slider1.onchange = update;
slider2.onchange = update;
slider3.onchange = update;
slider4.onchange = update;

// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50}
var width  = 600; // this is pixels
var height = 400;

// set the ranges and scale to the range of the data!
// the scale is normmally split off..
//x.domain(d3.extent(data, function(d) { return d.date; }));
// y.domain([0, d3.max(data, function(d) { return d.close; })]);

var x_scale = d3.scaleLinear().range([0,width]);//.domain([0, tstop]); // range is the pixels, domain is the values the pixels correspond
var y_scale = d3.scaleLinear().range([height, 0]);//.domain([v0, 40]);

// define the line
var v_line = d3.line()
	.x(function (d,i) { 
	//console.log('xy is '+ i*dt+','+d);
	//console.log('Plotting X value for data point: ' + data[0][i] + ' using index: ' + i + ' to be at: ' + x_scale(data[0][i]) + ' using our xScale.');
	return x_scale(i*dt); }) // d is data point (values), i is iterator position
	.y(function (d,i) { 
	//console.log('Plotting Y value for data point: ' + data[1][i] + ' using index: ' + i + ' to be at: ' + y_scale(data[1][i]) + ' using our yScale.');
		return y_scale(d); });
//console.log(v_line);	
function init() {
	let a = slider1.value;
	let b = slider2.value;
	let c = slider3.value;
	let d = slider4.value;
	console.log("init");

	var svg = d3.select("#plot")
		.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform",
            	  "translate(" + margin.left + "," + margin.top + ")");
	
	const values = calculate(a, b, c, d);

	console.log(values);
	// Scale the range of the data - we want a pad here 
	const pad_y = 25;
  	//x_scale.domain(d3.extent(values, function(d) {return d; }));
  	x_scale.domain([0, values.length*dt]);
  	y_scale.domain([0-pad_y, d3.max(values, function(d) { return d; })+pad_y]);


	// console.log(values);
	svg.append("path") //  in svg can append elemetns such as circle and rectagle, path is any wiht shape defined with d
		.datum(values)
		.attr("class", "v_line")
		.attr("d", v_line);

	svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x_scale));

	svg.append("g")
		.call(d3.axisLeft(y_scale));
}

function update() {
	let a = slider1.value;
	let b = slider2.value;
	let c = slider3.value;
	let d = slider4.value;
	var svg = d3.select("#plot").transition();
	svg.select(".v_line")
		.duration(700)
		.attr("d", v_line(calculate(a,b,c,d)));
}

function calculate(a, b, c, d) {

	const klow    = 1.7   // nS/mV
	const khigh   = 14    // nS/mV
	const vthresh = -45   // mV
	const vpeak   = 20    // mV
	const dt      = 0.25  // ms
	const Cm      = 90    // membrane capacitance
	const ishift  = 0
	
	var u = v0*b; // v0 and tstop are still in global scope - bit shit
	var v = v0;

	// make time array
	const t = [];
	for (let i = 0; i < tstop+dt; i = i+dt){
		t.push(i);
	}
	//console.log(t.length);
	//console.log(t[t.length-1]);

	// make the current injection stim
	const i_stim = [];
	for (let i = 0; i < t.length; i++ ){
		if (t[i] > 200 && t[i]<800) {
			i_stim.push(300) // this should be slider as well
		} else {
			i_stim.push(0)
		}
	}
	//console.log(i_stim.length);

	// calculate voltage values
	const v_values = [];
	for (let i = 1; i < tstop + 1; i++) {
		//v_values.push(Math.random() * -10);
		v = 20
		if (v < vthresh ){
			var k = klow 
		} else {
			k = khigh
		}
		
	}
	// in the end did not return all three as array as can't work it!
	return i_stim;
}

init();