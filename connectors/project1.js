const electron = require("electron");
const path = require("path");
const { PythonShell } = require("python-shell");
const fs = require("fs");
const dialog = electron.remote.dialog;
const { isArray } = require("validate.js");
const beautify = require("js-beautify").js;
let options = {
	indent_size: 4,
	indent_char: " ",
	indent_with_tabs: false,
	editorconfig: false,
	eol: "\n",
	end_with_newline: false,
	indent_level: 0,
	preserve_newlines: true,
	max_preserve_newlines: 10,
	space_in_paren: false,
	space_in_empty_paren: false,
	jslint_happy: false,
	space_after_anon_function: false,
	space_after_named_function: false,
	brace_style: "collapse",
	unindent_chained_methods: false,
	break_chained_methods: false,
	keep_array_indentation: false,
	unescape_strings: false,
	wrap_line_length: 0,
	e4x: false,
	comma_first: false,
	operator_position: "before-newline",
	indent_empty_lines: false,
	templating: ["auto"],
};
var data = [
	{
		A: [
			[
				-0.379,
				-0.141,
				-0.702,
				-0.632,
				0.061,
				0.546,
				-0.238,
				1.6,
				1.402,
				-0.084,
				-0.879,
				-0.717,
				-0.96,
				-0.741,
				-0.278,
				-0.614,
				-1.411,
				-0.428,
				0.816,
				-0.34,
			],
			[
				-0.141,
				-3.597,
				1.025,
				0.542,
				-0.327,
				0.482,
				1.172,
				0.22,
				1.429,
				1.554,
				-0.201,
				-2.678,
				-0.641,
				0.679,
				-1.013,
				-0.745,
				0.704,
				0.826,
				0.798,
				0.392,
			],
			[
				-0.702,
				1.025,
				-4.338,
				0.714,
				-0.407,
				-0.732,
				1.598,
				-0.66,
				-0.221,
				-0.018,
				-1.252,
				0.007,
				0.904,
				1.773,
				0.321,
				0.632,
				2.349,
				1.35,
				0.662,
				0.631,
			],
			[
				-0.632,
				0.542,
				0.714,
				-1.295,
				1.056,
				0.052,
				0.22,
				0.034,
				-2.319,
				-0.988,
				1.112,
				0.319,
				0.057,
				0.858,
				-2.04,
				-1.212,
				-0.924,
				-0.287,
				0.737,
				0.132,
			],
			[
				0.061,
				-0.327,
				-0.407,
				1.056,
				-1.735,
				2.36,
				-0.188,
				-1.809,
				-0.867,
				-0.04,
				0.345,
				-0.491,
				0.435,
				-0.411,
				-0.35,
				0.455,
				-1.852,
				-1.145,
				0.446,
				0.757,
			],
			[
				0.546,
				0.482,
				-0.732,
				0.052,
				2.36,
				-0.566,
				0.697,
				-1.614,
				-0.178,
				-0.818,
				1.84,
				1.142,
				0.58,
				2.111,
				0.02,
				-1.33,
				0.391,
				0.782,
				0.649,
				0.49,
			],
			[
				-0.238,
				1.172,
				1.598,
				0.22,
				-0.188,
				0.697,
				-1.923,
				-1.509,
				-1.431,
				2.386,
				-0.607,
				-1.321,
				0.075,
				0.321,
				0.366,
				0.327,
				-0.838,
				-0.72,
				-0.913,
				0.131,
			],
			[
				1.6,
				0.22,
				-0.66,
				0.034,
				-1.809,
				-1.614,
				-1.509,
				0.533,
				-0.624,
				1.965,
				0.303,
				-1.524,
				-1.223,
				1.006,
				-0.717,
				-0.962,
				-0.368,
				-0.554,
				-0.427,
				-1.421,
			],
			[
				1.402,
				1.429,
				-0.221,
				-2.319,
				-0.867,
				-0.178,
				-1.431,
				-0.624,
				-0.945,
				0.027,
				1.181,
				0.215,
				-0.77,
				-0.72,
				-0.518,
				-1.339,
				1.077,
				-0.233,
				0.148,
				0.789,
			],
			[
				-0.084,
				1.554,
				-0.018,
				-0.988,
				-0.04,
				-0.818,
				2.386,
				1.965,
				0.027,
				-0.043,
				-1.257,
				1.075,
				-1.476,
				-0.247,
				0.58,
				-0.528,
				-1.247,
				2.815,
				-0.801,
				0.491,
			],
			[
				-0.879,
				-0.201,
				-1.252,
				1.112,
				0.345,
				1.84,
				-0.607,
				0.303,
				1.181,
				-1.257,
				-0.832,
				1.722,
				-1.755,
				-1.118,
				0.14,
				-0.118,
				-1.024,
				0.07,
				-0.95,
				1.278,
			],
			[
				-0.717,
				-2.678,
				0.007,
				0.319,
				-0.491,
				1.142,
				-1.321,
				-1.524,
				0.215,
				1.075,
				1.722,
				2.713,
				-1.892,
				-0.324,
				-0.563,
				0.718,
				-0.571,
				1.899,
				-0.255,
				-1.217,
			],
			[
				-0.96,
				-0.641,
				0.904,
				0.057,
				0.435,
				0.58,
				0.075,
				-1.223,
				-0.77,
				-1.476,
				-1.755,
				-1.892,
				-2.868,
				0.086,
				-1.334,
				-0.069,
				0.542,
				-0.06,
				-0.934,
				-1.218,
			],
			[
				-0.741,
				0.679,
				1.773,
				0.858,
				-0.411,
				2.111,
				0.321,
				1.006,
				-0.72,
				-0.247,
				-1.118,
				-0.324,
				0.086,
				1.83,
				-0.052,
				1.242,
				-1.873,
				0.789,
				1.981,
				0.828,
			],
			[
				-0.278,
				-1.013,
				0.321,
				-2.04,
				-0.35,
				0.02,
				0.366,
				-0.717,
				-0.518,
				0.58,
				0.14,
				-0.563,
				-1.334,
				-0.052,
				3.587,
				-0.338,
				0.258,
				-0.703,
				0.153,
				-0.888,
			],
			,
			[
				-0.614,
				-0.745,
				0.632,
				-1.212,
				0.455,
				-1.33,
				0.327,
				-0.962,
				-1.339,
				-0.528,
				-0.118,
				0.718,
				-0.069,
				1.242,
				-0.338,
				-3.687,
				0.112,
				-1.909,
				-0.63,
				-1.437,
			],
			[
				-1.411,
				0.704,
				2.349,
				-0.924,
				-1.852,
				0.391,
				-0.838,
				-0.368,
				1.077,
				-1.247,
				-1.024,
				-0.571,
				0.542,
				-1.873,
				0.258,
				0.112,
				-0.601,
				1.64,
				1.147,
				-1.56,
			],
			[
				-0.428,
				0.826,
				1.35,
				-0.287,
				-1.145,
				0.782,
				-0.72,
				-0.554,
				-0.233,
				2.815,
				0.07,
				1.899,
				-0.06,
				0.789,
				-0.703,
				-1.909,
				1.64,
				-2.755,
				0.416,
				0.064,
			],
			[
				0.816,
				0.798,
				0.662,
				0.737,
				0.446,
				0.649,
				-0.913,
				-0.427,
				0.148,
				-0.801,
				-0.95,
				-0.255,
				-0.934,
				1.981,
				0.153,
				-0.63,
				1.147,
				0.416,
				-1.48,
				1.463,
			],
			[
				-0.34,
				0.392,
				0.631,
				0.132,
				0.757,
				0.49,
				0.131,
				-1.421,
				0.789,
				0.491,
				1.278,
				-1.217,
				-1.218,
				0.828,
				-0.888,
				-1.437,
				-1.56,
				0.064,
				1.463,
				0.903,
			],
		],
		b: [
			-2.951,
			1.134,
			1.262,
			-1.685,
			-2.479,
			4.793,
			-2.78,
			-3.073,
			-1.41,
			1.767,
			-1.762,
			0.087,
			-6.053,
			2.885,
			-2.282,
			-3.007,
			-1.944,
			2.29,
			2.363,
			0.414,
		],
	},
	{
		A: [
			[
				0.12,
				-0.89,
				1.12,
				1.09,
				0.74,
				-1.42,
				0.23,
				1.4,
				-3.18,
				0.44,
				-0.94,
				-0.41,
				-1.46,
				-0.31,
				-1.03,
				-0.12,
				1.15,
				0.13,
				0.45,
				0.0,
			],
			[
				0.98,
				-1.39,
				-0.13,
				-1.34,
				-0.14,
				-0.67,
				0.11,
				-0.71,
				-0.79,
				-0.17,
				0.57,
				-0.84,
				-0.26,
				-0.86,
				-0.35,
				-0.4,
				-0.82,
				-0.09,
				0.11,
				-2.24,
			],
			[
				0.72,
				-0.28,
				-2.29,
				-1.59,
				0.96,
				0.93,
				-0.13,
				-0.96,
				1.58,
				-0.27,
				0.55,
				-0.95,
				-0.79,
				-0.19,
				0.16,
				0.32,
				-1.09,
				1.74,
				0.09,
				0.59,
			],
			[
				0.37,
				1.49,
				-0.06,
				0.6,
				-1.05,
				-0.34,
				0.8,
				0.52,
				0.41,
				-1.94,
				2.37,
				0.01,
				0.34,
				-0.75,
				-1.91,
				1.16,
				0.76,
				-0.45,
				0.98,
				-1.46,
			],
			[
				0.67,
				1.06,
				1.02,
				-0.52,
				-0.21,
				1.34,
				-0.97,
				-0.41,
				0.57,
				-0.05,
				1.11,
				0.45,
				-0.47,
				-0.27,
				-0.18,
				1.01,
				-2.66,
				-0.86,
				-1.18,
				0.14,
			],
			[
				-0.57,
				0.22,
				1.31,
				-1.02,
				0.73,
				0.13,
				-1.63,
				-0.74,
				-1.17,
				2.2,
				-0.05,
				-1.51,
				0.88,
				-1.53,
				0.58,
				-0.61,
				0.14,
				0.16,
				0.52,
				0.69,
			],
			[
				-0.3,
				0.94,
				0.03,
				1.09,
				0.78,
				0.3,
				1.35,
				0.36,
				-0.52,
				0.53,
				-0.3,
				-0.74,
				0.21,
				0.15,
				-0.01,
				1.05,
				-1.4,
				-0.07,
				1.9,
				1.78,
			],
			[
				0.23,
				-0.17,
				-0.07,
				-1.24,
				-0.84,
				0.91,
				3.3,
				-0.74,
				-0.47,
				0.7,
				-2.89,
				0.63,
				-0.46,
				-0.71,
				-0.24,
				-1.44,
				-1.58,
				-1.22,
				0.43,
				0.26,
			],
			[
				-0.46,
				0.26,
				-0.71,
				2.47,
				-0.33,
				-1.11,
				-0.48,
				0.01,
				-0.91,
				-1.36,
				1.0,
				-0.69,
				0.16,
				1.86,
				-0.3,
				-0.4,
				1.19,
				-0.19,
				0.92,
				-1.52,
			],
			[
				1.06,
				-0.11,
				0.7,
				-0.12,
				0.27,
				1.12,
				0.33,
				0.14,
				-0.03,
				0.31,
				-1.56,
				0.48,
				0.29,
				1.19,
				1.17,
				0.31,
				0.95,
				0.01,
				1.07,
				-0.62,
			],
			[
				-0.58,
				0.25,
				-1.12,
				-0.57,
				0.34,
				-0.01,
				0.56,
				-0.2,
				-0.32,
				-0.74,
				-0.32,
				0.83,
				0.74,
				0.56,
				0.52,
				-1.64,
				-1.04,
				1.37,
				1.38,
				1.31,
			],
			[
				-0.29,
				-0.8,
				-1.36,
				2.06,
				0.91,
				-0.43,
				0.78,
				0.07,
				-1.31,
				0.47,
				0.93,
				-1.04,
				0.01,
				-0.81,
				-0.18,
				-1.96,
				-1.55,
				-1.27,
				-1.16,
				0.1,
			],
			[
				0.86,
				0.65,
				-0.52,
				0.78,
				0.78,
				0.04,
				-0.78,
				0.23,
				-1.63,
				-1.47,
				0.36,
				0.66,
				-3.02,
				-0.32,
				-0.83,
				-1.89,
				-1.6,
				-1.24,
				-0.15,
				0.28,
			],
			[
				1.37,
				-1.63,
				0.93,
				-0.71,
				-1.42,
				0.51,
				-0.51,
				-0.36,
				-1.05,
				1.21,
				0.27,
				-0.12,
				0.78,
				-0.52,
				2.61,
				-1.39,
				0.55,
				-2.04,
				-0.83,
				0.63,
			],
			[
				-0.17,
				-1.09,
				-0.88,
				0.98,
				-0.48,
				0.08,
				0.31,
				1.4,
				-1.3,
				-1.23,
				-0.58,
				0.35,
				0.8,
				1.01,
				-0.92,
				-0.48,
				-1.85,
				0.92,
				-0.62,
				-0.99,
			],
			[
				1.16,
				0.61,
				0.26,
				-0.36,
				-0.03,
				-0.48,
				-0.74,
				-0.63,
				-0.71,
				-0.57,
				-0.74,
				-1.09,
				0.24,
				1.44,
				0.56,
				1.72,
				-1.42,
				0.66,
				-1.8,
				-0.59,
			],
			[
				-0.99,
				-0.01,
				-0.81,
				0.71,
				-0.48,
				1.18,
				0.76,
				1.27,
				-1.35,
				1.42,
				-0.21,
				0.31,
				-0.6,
				0.67,
				0.25,
				0.15,
				0.34,
				-1.44,
				0.49,
				-0.61,
			],
			[
				-0.37,
				-0.05,
				1.77,
				1.05,
				-1.02,
				-1.09,
				1.2,
				-0.32,
				-0.21,
				0.61,
				0.85,
				-0.52,
				-0.31,
				0.87,
				-0.28,
				-0.81,
				-0.11,
				-0.99,
				0.16,
				1.39,
			],
			[
				-0.1,
				-1.48,
				0.5,
				-0.01,
				-0.51,
				0.1,
				1.54,
				-0.59,
				-0.42,
				-1.16,
				-0.67,
				0.27,
				-0.4,
				1.77,
				0.49,
				0.6,
				0.67,
				-0.59,
				3.2,
				-0.06,
			],
			[
				-0.24,
				-0.87,
				-1.21,
				-0.03,
				-1.23,
				-1.39,
				-1.09,
				0.5,
				-0.44,
				1.6,
				0.15,
				-0.78,
				0.45,
				0.25,
				-1.54,
				0.3,
				-0.77,
				-0.69,
				0.61,
				-0.99,
			],
		],
		b: [
			-0.05,
			-6.38,
			-1.67,
			-1.7,
			-0.88,
			1.61,
			3.28,
			-2.99,
			-1.27,
			2.93,
			1.08,
			-2.99,
			-3.64,
			0.39,
			-3.39,
			-1.3,
			-0.05,
			1.12,
			-1.38,
			-4.19,
		],
	},
];
var payload = {};
var method = 0;
var result = null;
//handle data set toggles
var exp1 = document.querySelector(".bidsl-5-1");
var exp2 = document.querySelector(".bidsl-5-2");
var expA = document.querySelector(".bidsl-5-a");
var expB = document.querySelector(".bidsl-5-b");

function injectData(index) {
	//injecting data
	expA.innerHTML = beautify(JSON.stringify(data[index].A), options);
	expB.innerHTML = beautify(JSON.stringify(data[index].b), options);
}

//initial injection
injectData(0);

exp1.addEventListener("click", function () {
	if (!exp1.classList.contains("is-active")) {
		exp1.classList.add("is-active");
		exp2.classList.remove("is-active");
		//inject data accordingly
		injectData(0);
	}
});
exp2.addEventListener("click", function () {
	if (!exp2.classList.contains("is-active")) {
		exp2.classList.add("is-active");
		exp1.classList.remove("is-active");
		//inject data accordingly
		injectData(1);
	}
});

//handling inputs
var radios = [
	document.querySelector(".radio1"),
	document.querySelector(".radio2"),
	document.querySelector(".radio3"),
	document.querySelector(".radio4"),
];

var textarea = document.querySelectorAll(".ta-input");
var fileBtn = document.querySelectorAll(".file");

radios.forEach(function (radio, index) {
	radio.addEventListener("click", function () {
		method = index;
		if (index == 2) {
			textarea[0].classList.remove("hide");
			textarea[1].classList.remove("hide");
			fileBtn[0].classList.add("hide");
			fileBtn[1].classList.add("hide");
			fileBtn[2].classList.add("hide");
			fileBtn[3].classList.add("hide");
		} else if (index == 3) {
			textarea[0].classList.add("hide");
			textarea[1].classList.add("hide");

			fileBtn[0].classList.remove("hide");
			fileBtn[1].classList.remove("hide");
			fileBtn[2].classList.remove("hide");
			fileBtn[3].classList.remove("hide");
		} else {
			textarea[0].classList.add("hide");
			textarea[1].classList.add("hide");
			fileBtn[0].classList.add("hide");
			fileBtn[1].classList.add("hide");
			fileBtn[2].classList.add("hide");
			fileBtn[3].classList.add("hide");
		}
		radios.forEach(function (r, i) {
			if (index === i) return;
			r.checked = false;
		});
	});
});

document.getElementById("ds-1").addEventListener("click", function () {
	dialog.showOpenDialog((fileNames) => {
		// fileNames is an array that contains all the selected
		if (fileNames === undefined) return;

		fs.readFile(fileNames[0], "utf-8", (err, data) => {
			if (err) {
				alert("An error ocurred reading the file :" + err.message);
				return;
			}

			// handling the file content
			let raw = data.split("\n");
			let seperated = raw.map((i) => {
				return i
					.split(/\s/g)
					.filter((f) => {
						if (f) return true;
					})
					.map((n) => {
						return Number(n.trim());
					});
			});
			let A = [];
			let givenLength = seperated[0][0];
			seperated.map((arr) => {
				if (arr.length === givenLength) A.push(arr);
			});
			if (A.length !== givenLength) return alert("Invalid Data Set");
			payload["A"] = A;
			document.getElementById("showA").innerHTML = beautify(
				JSON.stringify(A),
				options
			);
		});
	});
});
document.getElementById("ds-2").addEventListener("click", function () {
	dialog.showOpenDialog((fileNames) => {
		// fileNames is an array that contains all the selected
		if (fileNames === undefined) return;

		fs.readFile(fileNames[0], "utf-8", (err, data) => {
			if (err) {
				alert("An error ocurred reading the file :" + err.message);
				return;
			}

			// Change how to handle the file content
			let raw = data.split("\n");
			let seperated = raw
				.filter((f) => {
					if (f) return true;
				})
				.map((n) => {
					return Number(n.trim());
				});
			payload["b"] = seperated;
			document.getElementById("showB").innerHTML = beautify(
				JSON.stringify(seperated),
				options
			);
		});
	});
});

function execute() {
	var options = {
		scriptPath: path.join(__dirname, "/../engine/"),
		args: [JSON.stringify(payload.A), JSON.stringify(payload.b)],
	};
	let pyshell = new PythonShell("gaussian_el_partial.py", options);
	pyshell.on("message", function (message) {
		result = message;
		document.getElementById("nooutput-4").innerHTML = beautify(
			message,
			options
		);
	});
}

function handleInputs() {
	try {
		var inputA = JSON.parse(document.getElementById("inputA").value);
		var inputB = JSON.parse(document.getElementById("inputB").value);
		if (!isArray(inputA) || !isArray(inputB))
			return alert("Inputs should be javascript arrays!");
		if (inputB.length !== inputA.length)
			return alert("Arrays are not compatible!");
		payload = { A: inputA, b: inputB };
		execute();
	} catch (error) {
		console.log(error);
	}
}

document.getElementById("exec-1").addEventListener("click", function () {
	if (method === 0) {
		payload = data[0];
		execute();
	} else if (method === 1) {
		payload = data[1];
		execute();
	} else if (method === 2) {
		handleInputs();
	}
	if (method === 3) {
		execute();
	}
});

document.getElementById("export1").addEventListener("click", function () {
	if (!result) return alert("No Output Available!");
	dialog.showSaveDialog(
		{
			title: "Select the File Path to save the outputs",
			defaultPath: path.join(__dirname, "../assets/outputs.txt"),
			buttonLabel: "Save",
			// Restricting the user to only Text Files.
			filters: [
				{
					name: "Text Files",
					extensions: ["txt"],
				},
			],
			properties: [],
		},
		function (file) {
			if (file) {
				var body = `${beautify(JSON.stringify(result), options)}`;
				fs.writeFile(file, body, function (err) {
					if (err) throw err;
					new electron.remote.Notification({
						title: "Outputs",
						body: "Saved Successfully!",
					}).show();
				});
			}
		}
	);
});
