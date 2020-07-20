var data = [
	{
		A: [
			[3.0, 1.0, 0, 0, 0, 0, 0, 0, 0, 0],
			[1.0, 3.0, 1.0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1.0, 3.0, 1.0, 0, 0, 0, 0, 0, 0],
			[0, 0, 1.0, 3.0, 1.0, 0, 0, 0, 0, 0],
			[0, 0, 0, 1.0, 3.0, 1.0, 0, 0, 0, 0],
			[0, 0, 0, 0, 1.0, 3.0, 1.0, 0, 0, 0],
			[0, 0, 0, 0, 0, 1.0, 3.0, 1.0, 0, 0],
			[0, 0, 0, 0, 0, 0, 1.0, 3.0, 1.0, 0],
			[0, 0, 0, 0, 0, 0, 0, 1.0, 3.0, 1.0],
			[0, 0, 0, 0, 0, 0, 0, 0, 1.0, 3.0],
		],
		b: [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
	},
	{
		A: [
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 1, 0.01, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 1, -0.3, 0, 0, 0, 0],
			[0, 0, 0, 0, 0.5, 1, 0, 0.02, 0, 0],
			[0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
			[0, 0.1, 0, 0, 1, 0.7, 0, 1, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
			[0, 0, 0, 0, 0, 0, 0.5, 0, 0, 1],
		],
		b: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
	},
];
const electron = require("electron");
const { isArray } = require("validate.js");
const path = require("path");
const { PythonShell } = require("python-shell");
const beautify = require("js-beautify").js;
const fs = require("fs");
const dialog = electron.remote.dialog;
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
var method = 0;
var result = null;
//handle data set toggles
var exp1 = document.querySelector(".bidsl-5-1");
var exp2 = document.querySelector(".bidsl-5-2");
var expA = document.querySelector(".bidsl-5-a");
var expB = document.querySelector(".bidsl-5-b");

function injectData(index) {
	//injecting data
	expA.innerHTML = JSON.stringify(data[index].A);
	expB.innerHTML = JSON.stringify(data[index].b);
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
];
var textarea = document.querySelectorAll(".ta-input");

radios.forEach(function (radio, index) {
	radio.addEventListener("click", function () {
		method = index;
		if (index == 2) {
			textarea[0].classList.remove("hide");
			textarea[1].classList.remove("hide");
			textarea[2].classList.remove("hide");
			textarea[3].classList.remove("hide");
		} else {
			textarea[0].classList.add("hide");
			textarea[1].classList.add("hide");
			textarea[2].classList.add("hide");
			textarea[3].classList.add("hide");
		}
		radios.forEach(function (r, i) {
			if (index === i) return;
			r.checked = false;
		});
	});
});

function execute(a, b, n = 20, e = 1e-5) {
	var options = {
		scriptPath: path.join(__dirname, "/../engine/"),
		args: [a, b, n, e],
	};
	let pyshell = new PythonShell("sor.py", options);
	pyshell.on("message", function (message) {
		result = JSON.parse(message);
		document.getElementById("output-5").innerHTML = beautify(
			message,
			options
		);
	});
}

function handleInputs() {
	let A = JSON.parse(textarea[0].value);
	let b = JSON.parse(textarea[1].value);
	let n = Number(textarea[2].value);
	let e = Number(textarea[3].value);
	if (!A || !b || n || !e) return alert("All inputs are required!");
	if (!isArray(A) || !isArray(b))
		return alert("Inputs should be javascript arrays!");
	if (A.length !== b.length) return alert("Arrays are not compatible!");
	execute(JSON.stringify(A), JSON.stringify(b), n, e);
}

document.getElementById("exec5").addEventListener("click", function () {
	if (method === 0) {
		execute(JSON.stringify(data[0].A), JSON.stringify(data[0].b));
	} else if (method === 1) {
		execute(JSON.stringify(data[1].A), JSON.stringify(data[1].b));
	} else {
		handleInputs();
	}
});

document.getElementById("export5").addEventListener("click", function () {
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
