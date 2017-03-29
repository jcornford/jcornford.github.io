var slider1 = document.getElementById('aInputId');
var slider2 = document.getElementById('bInputId');
var slider3 = document.getElementById('cInputId');
var slider4 = document.getElementById('dInputId');

console.log('testing');
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
var height = 300;

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
function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function init() {
	let a = parseFloat(slider1.value);
	let b = parseFloat(slider2.value);
	let c = parseFloat(slider3.value);
	let d = parseFloat(slider4.value);
	console.log("init");

	var svg = d3.select("#plot").append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		    .append("g")
			.attr("transform",
            	  "translate(" + margin.left + "," + margin.top + ")");
	
	const values = calculate(a, b, c, d);

	//console.log(values);
	// Scale the range of the data - we want a pad here 
	const pad_y = 25;
  	//x_scale.domain(d3.extent(values, function(d) {return d; }));
  	x_scale.domain([0, values.length*dt]);
  	//y_scale.domain([0-pad_y, d3.max(values, function(d) { return d; })+pad_y]);

  	y_scale.domain([-80, getMaxOfArray(values)+10]);


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
	let a = parseFloat(slider1.value);
	let b = parseFloat(slider2.value);
	let c = parseFloat(slider3.value);
	let d = parseFloat(slider4.value);
	var svg = d3.select("#plot").transition();
	var new_vals = calculate(a,b,c,d);
	
	//y_scale.domain([-80, getMaxOfArray(new_vals)+10]);
	//svg.select(".yaxis")
    //                .transition().duration(1500) // this dont work
    //                .call(d3.axisLeft(y_scale))

	svg.select(".v_line")
		.duration(700)
		.attr("d", v_line(new_vals));

	//console.log(new_vals)
    //console.log(getMaxOfArray(new_vals));

}

function calculate(a, b, c, d) {
	//a = 0.1
	//b = 0.2
	//c = -65.0
	//d = 2.0
	console.log(a+' ,' +b+', ' +c +',' +d);
	const klow    = 1.7   // nS/mV
	const khigh   = 14    // nS/mV
	const vthresh = -45   // mV
	const vpeak   = 20    // mV
	const dt      = 0.25  // ms
	const Cm      = 90    // membrane capacitance
	const ishift  = 0
	
	

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
			i_stim.push(5) // this should be slider as well
		} else {
			i_stim.push(0);
		}
	}
	//console.log(i_stim.length);

	// calculate voltage values
	const v_values = [];
	const u_values = [];
	var u = v0*b; // v0 and tstop are still in global scope - bit shit
	var v = v0;
	for (let i = 1; i < t.length; i++) {
		// not actually using the k thing as diff implementation
		//if (v < vthresh ){
		//	var k = klow;
		//} else {
		//	k = khigh;
		//};
		
		v = v+( (0.04*Math.pow(v,2) + 5*v +140) - u + i_stim[i] )*dt ;
		u = u+( a*(b*v-u) )*dt;

		if (v >= 30){ // don't need v thresh in simple implementation either
			v_values.push(30);
			v = c;
			u = u+d;
		} else {
			v_values.push(v);
			u_values.push(u);
		}
	}
	// in the end did not return all three as array as can't work it!
	//console.log(u_values);
	return v_values;
}

init();