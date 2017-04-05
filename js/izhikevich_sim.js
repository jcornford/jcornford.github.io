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

//d3.select(window).on('resize', resize); // when this finally works call this!

// hook up buttons to their functions
document.getElementById('FS').onclick = runFS;
document.getElementById('RS').onclick = runRS;
document.getElementById('A').onclick  = runA;
document.getElementById('B').onclick  = runB;

function update_a (new_value) {
        //a_slider.value       = new_value;
        d3.selectAll("#aInputId").transition().duration(500).attr("value", new_value);
        a_slider_label.value = new_value;
}
function update_b (new_value) {
        //b_slider.value       = new_value;
        d3.selectAll("#bInputId").transition().duration(500).attr("value", new_value);

        b_slider_label.value = new_value;
}
function update_c (new_value) {
        //c_slider.value       = new_value;
        d3.selectAll("#cInputId").transition().duration(500).attr("value", new_value);
        c_slider_label.value = new_value;
}
function update_d (new_value) {
        //d_slider.value       = new_value;
        d3.selectAll("#dInputId").transition().duration(500).attr("value", new_value);
        d_slider_label.value = new_value;
}
function update_iext (new_value) {
        //iext_slider.value       = new_value;
        d3.selectAll("#iextInputId").transition().duration(500).attr("value", new_value);

        iext_slider_label.value = new_value;
}
function runFS(){
    console.log('You hit FS button');
    update_a(0.3);//0.1
    update_b(0.25);//0.2
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
    update_a(0.02);
    update_b(0.2);
    update_c(-55.0);
    update_d(4);
    update();
}

function runB(){
    console.log('You hit Bursting button')
    update_a(0.02);
    update_b(0.2);
    update_c(-50.0);
    update_d(2);
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



var svg = d3.select("#plot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
             "translate(" + margin.left + "," + margin.top + ")");
             
// attemtpts (failed) to make plot responsive to window scaling
//var svg = d3.select("#plot")
//        .classed("svg-container", true) //container class to make it responsive
//        .append("svg")
        //responsive SVG needs these 2 attributes and no width and height attr
//        .attr("preserveAspectRatio", "xMinYMin meet")
 //       .attr("viewBox", "0 0 300 600")
        //class to make it responsive
 //       .classed("svg-content-responsive", true);
        //.append("g")
        //.attr("transform",
        //      "translate(" + margin.left + "," + margin.top + ")");

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
    .attr("class", "v_line")
    .attr("class", "line");

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

function resize(){
    console.log(window.innerWidth,window.innerHeight);
    var width  = parseInt(d3.select("#plot").style("width")) - margin.left - margin.right;
    var height = parseInt(d3.select("#plot").style("height")) - margin.top - margin.bottom;
    console.log(height,width);
    x_scale.range([0, width]);//.nice();
    y_scale.range([height, 0]);//.nice();
    svg.attr('width', width + margin.right + margin.left)
      .attr('height', height + margin.top + margin.bottom);
    //chartWrapper.attr("transform",
    //         "translate(" + margin.left + "," + margin.top + ")");

    xAxis.scale(x_scale);
    yAxis.scale(y_scale);

    /* Update the axis with the new scale */
    svg.select('.xaxis')
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    svg.select('.yaxis')
    .call(yAxis);
    //var new_vals = calculate();
    /* Force D3 to recalculate and update the line */
    svg.selectAll('.v_line')
    .attr("d", v_line);
    }

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
    var a     = parseFloat(a_slider_label.value);
    var b     = parseFloat(b_slider_label.value);
    var c     = parseFloat(c_slider_label.value);
    var d     = parseFloat(d_slider_label.value);
	var i_ext = parseFloat(iext_slider_label.value);

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

