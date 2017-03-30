var a_slider       = document.getElementById('aInputId');
var a_slider_label = document.getElementById('aOutputId');

var b_slider       = document.getElementById('bInputId');
var b_slider_label = document.getElementById('bOutputId');

var c_slider       = document.getElementById('cInputId');
var c_slider_label = document.getElementById('cOutputId');

var d_slider       = document.getElementById('dInputId');
var d_slider_label = document.getElementById('dOutputId');

var iext_slider    = document.getElementById('iextInputId');
var iext_slider_label = document.getElementById('iextOutputId');

a_slider.onchange = update;
b_slider.onchange = update;
c_slider.onchange = update;
d_slider.onchange = update;
iext_slider.onchange = update;

// hook up buttons to their functions
document.getElementById('FS').onclick = runFS;
document.getElementById('RS').onclick = runRS;
document.getElementById('A').onclick  = runA;
document.getElementById('B').onclick  = runB;

// unused d3 selections for transitions
var a_selection = d3.selectAll("#aInputId");
var b_selection = d3.selectAll("#bInputId");
var c_selection = d3.selectAll("#cInputId");
var d_selection = d3.selectAll("#dInputId");

function update_a (new_value) {
        a_slider.value       = new_value;
        a_slider_label.value = new_value;
}
function update_b (new_value) {
        b_slider.value       = new_value;
        b_slider_label.value = new_value;
}
function update_c (new_value) {
        c_slider.value       = new_value;
        c_slider_label.value = new_value;
}
function update_d (new_value) {
        d_slider.value       = new_value;
        d_slider_label.value = new_value;
}
function update_iext (new_value) {
        iext_slider.value       = new_value;
        iext_slider_label.value = new_value;
}
function runFS(){
    console.log('You hit FS button');
    update_a(0.1); ////a_selection.transition().duration(1000).attr("value", "0.1");
    update_b(0.2);
    update_c(-65.0);
    update_d(2);
    update();
    }

function runRS(){
    console.log('You hit RS button');
    update_a(0.02);
    update_b(0.2);
    update_c(-65.0);
    update_d(6);
    update();
}

function runA(){
    console.log('You hit A button')
}

function runB(){
    console.log('You hit Bursting button')
    update_a(0.1);
    update_b(0.225);
    update_c(-40.0);
    update_d(5);
    update();
}

// sim parameters
var v0      = -65;  // mV
var tstop   = 1000; // ms
var dt      = 0.5;  // ms

// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50}
var width  = 600; // this is pixels
var height = 300;

function getMaxOfArray(numArray) { // just use d3.max()
  return Math.max.apply(null, numArray);
}

var svg = d3.select("#plot").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var values = calculate();

var x_scale = d3.scaleLinear()
            .range( [0, width])    // output values (pixels
            .domain([0,tstop]);    // input values

var y_scale = d3.scaleLinear()
                .range( [height, 0]) // smaller values produce larger output.. push elements down the page
                .domain([d3.min(values)-15, d3.max(values)+10]);

// define the line
var v_line = d3.line()
    .x(function (d,i) {
        return x_scale(i*dt);
    })
    .y(function (d) {
        return y_scale(d);
    });

var pad_y = 25;
var pad_x = 20;

svg.append("path") //  in svg can append elemetns such as circle and rectagle, path is any wiht shape defined with d
    //.data(values)
    .attr("stroke", "black")
    .attr("d", v_line(values))
    .attr("stroke-width", 0.5)
    .attr("fill","none")
    .attr("class", "v_line");

// sort out axis
var yAxis = d3.axisLeft()
    .scale(y_scale)
    .ticks(5); // rough number

var xAxis = d3.axisBottom()
    .scale(x_scale)
    .ticks(5);

svg.append("g")
        .attr("class", "xaxis")
        .attr("transform", "translate(0," + height + ")")
        //Note the use of translate (h), so the group’s top edge is set to h, the
        .call(xAxis)
    .append("text")
        .text("Time (msec)");

svg.append("g")
    .attr("class", "yaxis")
    .attr("transform", "translate(" + 0+ ",0)")
    .call(yAxis)

function update() {
    var new_vals = calculate();
    y_scale.domain([d3.min(new_vals)-10, d3.max(new_vals)+10]);
    yAxis.scale(y_scale)

    var svg = d3.select("#plot");
    var t0 = svg.transition().duration(1000);
    t0.selectAll(".yaxis")
        .call(yAxis);

    svg.select(".v_line")
        .transition()
        //.delay(function(d,i){ // cool if had for inidivudial stiff
        //return i*10
        //})
        .duration(1000)
        .attr("d", v_line(new_vals));
        //attr("fill", "hsl("+(Math.random()*360)+",100%,50%)")
        // for random color...
}

function calculate() {
    var a     = parseFloat(a_slider.value);
    var b     = parseFloat(b_slider.value);
    var c     = parseFloat(c_slider.value);
    var d     = parseFloat(d_slider.value);
	var i_ext = parseFloat(iext_slider.value);

	// stationary? sim parameters
	console.log(a,b,c,d)
    var v0      = -65;  // mV
    var tstop   = 1000; // ms
    var dt      = 0.5;  // ms

	// make time array
	var t = [];
	for (var i = 0; i < tstop+dt; i = i+dt){
		t.push(i);
	}

	// make the current injection stim
	var i_stim = [];
	for (var i = 0; i < t.length; i++ ){
		if (t[i] > 200 && t[i]<800) {
			i_stim.push(i_ext)
		} else {
			i_stim.push(0);
		}
	}
	var v_values = [];
	var u_values = [];
	var u = v0*b; // v0 and tstop are still in global scope - bit shit
	var v = v0;
	for (var i = 1; i < t.length; i++) {

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

