let slider1 = document.getElementById('slider1');
let slider2 = document.getElementById('slider2');
let slider3 = document.getElementById('slider3');
let slider4 = document.getElementById('slider4');

const v0      = -70.0;
const tstop   = 1000;

slider1.onchange = update;
slider2.onchange = update;
slider3.onchange = update;
slider4.onchange = update;


	var width  = 600; // this is pixels
	var height = 400;
	var x = d3.scaleLinear().range([0,width]).domain([0, tstop]); // range is the pixels, domain is the values the pixels correspond
	var y = d3.scaleLinear().range([height, 0]).domain([100, 0]);


	var v_line = d3.line()
		.x(function (d, i, data) { return x(i); }) // d is data point (values), i is iterator position
		.y(function (d, i, data) { return y(d); });
	

function init() {
	let a = slider1.value;
	let b = slider2.value;
	let c = slider3.value;
	let d = slider4.value;
	console.log("testing");

	var svg = d3.select("#plot")
		.append("svg")
			.attr("width", width)
			.attr("height", height)
		.append("g");
	

	const values = calculate(a, b, c, d);

	// console.log(values);

	svg.append("path") //  in svg can append elemetns such as circle and rectagle, path is any wiht shape defined with d
		.data([values])
		.attr("class", "v_line")
		.attr("d", v_line);

	svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x));

	svg.append("g")
		.call(d3.axisLeft(y));
}

function update() {
	var svg = d3.select("#plot").transition();
	svg.select(".v_line")
		.duration(700)
		.attr("d", v_line(calculate(0,0,0,0)));
		

}

function calculate(a, b, c, d) {
	const values = [];
	for (let i = 1; i < tstop + 1; i++) {
		values.push(Math.random() * 100);
	}
	return values;
}

init();