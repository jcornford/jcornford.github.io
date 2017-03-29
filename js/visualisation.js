var slider1 = document.getElementById('aInputId');
var slider2 = document.getElementById('bInputId');
var slider3 = document.getElementById('cInputId');
var slider4 = document.getElementById('dInputId');
var sliderI = document.getElementById('iextInputId');

slider1.onchange = update;
slider2.onchange = update;
slider3.onchange = update;
slider4.onchange = update;
sliderI.onchange = update;

// sim parameters
const v0      = -75;  // mV
const tstop   = 1000; // ms 
const dt      = 0.25  // ms

// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50}
var width  = 600; // this is pixels
var height = 300;

function getMaxOfArray(numArray) { // just use d3.max()
  return Math.max.apply(null, numArray);
}

//d3.max(dataset, function(d) {    //Returns 480
//    return d[0];  //References first value in each sub-array
//});


let a = parseFloat(slider1.value);
let b = parseFloat(slider2.value);
let c = parseFloat(slider3.value);
let d = parseFloat(slider4.value);

var svg = d3.select("#plot").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

var values = calculate(a, b, c, d);

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

console.log(d3.max(values))
var pad_y = 25;
var pad_x = 20;

svg.append("path") //  in svg can append elemetns such as circle and rectagle, path is any wiht shape defined with d
    //.data(values)
    .attr("stroke", "black")
    .attr("d", v_line(values))
    .attr("stroke-width", 1)
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
    let a = parseFloat(slider1.value);
    let b = parseFloat(slider2.value);
    let c = parseFloat(slider3.value);
    let d = parseFloat(slider4.value);
    var svg = d3.select("#plot").transition();
    var new_vals = calculate(a,b,c,d);

    var t0 = svg.transition().duration(1750);

    y_scale.domain([d3.min(new_vals)-10, d3.max(new_vals)+10]);
    yAxis.scale(y_scale)

    t0.selectAll(".yaxis")
        .call(yAxis);

    console.log(d3.min(new_vals))
    console.log(d3.max(new_vals))

    svg.select(".v_line")
        .transition()
        //.delay(function(d,i){ // for inidivudial stiff
        //return i*10
        //})
        .duration(1700)
        .attr("d", v_line(new_vals));
        //attr("fill", "hsl("+(Math.random()*360)+",100%,50%)")
        // random color...


    //console.log(new_vals)
    //console.log(getMaxOfArray(new_vals));

}

function calculate(a, b, c, d) {
	//a = 0.1
	//b = 0.2
	//c = -65.0
	//d = 2.0
	var i_ext =  parseFloat(sliderI.value);

	console.log(i_ext);
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
			i_stim.push(i_ext)
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

