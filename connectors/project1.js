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
			[1.0, 0.0, 0.0, 0.0, 0.0, 0.0],
			[1.0, 0.63, 0.39, 0.25, 0.16, 0.1],
			[1.0, 1.26, 1.58, 1.98, 2.49, 3.13],
			[1.0, 1.88, 3.55, 6.7, 12.62, 23.8],
			[1.0, 2.51, 6.32, 15.88, 39.9, 100.28],
			[1.0, 3.14, 9.87, 31.01, 97.41, 306.02],
		],
		b: [-0.01, 0.61, 0.91, 0.99, 0.6, 0.02],
	},
	{
		A: [
			[0.02, 0.01, 0, 0],
			[1, 2, 1, 0],
			[0, 1, 2, 1],
			[0, 0, 100, 200],
		],
		b: [0.02, 1, 4, 800],
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
