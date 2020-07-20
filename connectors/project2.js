const { remote } = require("electron");
const { PythonShell } = require("python-shell");
const path = require("path");
const fs = require("fs");
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

var result = null;

function inputError() {
	remote.dialog.showMessageBox({
		title: "Error",
		message: "input values are not correct",
		detail: "the program will not work as expected with the given values.",
	});
}
function toggleOutput() {
	var outputs = document.querySelectorAll(".output-2");
	var notOutpt = document.querySelector("#no-output");
	outputs.forEach(function (o) {
		o.classList.remove("hide");
	});
	notOutpt.classList.add("hide");
}
function execute(n, m) {
	var options = {
		scriptPath: path.join(__dirname, "/../engine/"),
		args: [n, m],
	};
	let pyshell = new PythonShell("householder.py", options);

	pyshell.on("message", function (message) {
        let res = JSON.parse(message);
        result = res;
		toggleOutput();
		document.getElementById("output-a").innerHTML = beautify(
			JSON.stringify(res.A),
			options
		);
		document.getElementById("output-q").innerHTML = beautify(
			JSON.stringify(res.Q),
			options
		);
		document.getElementById("output-r").innerHTML = beautify(
			JSON.stringify(res.R),
			options
		);
	});
}

var inputM = document.getElementById("m-value");
var inputN = document.getElementById("n-value");
var exeBtn = document.getElementById("exec-2");
exeBtn.addEventListener("click", function () {
	var n = inputN.value,
		m = inputM.value;
	if (!n || !m) return inputError();
	if (n < 1 || m < 1) return inputError();

	//running the python engine
	execute(n, m);
});

var exportBtn = document.getElementById("export5");
exportBtn.addEventListener("click", function () {
	if (!result)
		return remote.dialog.showMessageBox({
			title: "Error",
			message: "There is no output yet.",
		});
	remote.dialog.showSaveDialog(
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
                var body = `
Random Generated Matrix
${beautify(
    JSON.stringify(result.A),
    options
)}

*********************************

Q
${beautify(
    JSON.stringify(result.Q),
    options
)}

*********************************

R
${beautify(
    JSON.stringify(result.R),
    options
)}
                `
				fs.writeFile(file, body, function (err) {
					if (err) throw err;
					new remote.Notification({
						title: "Outputs",
						body: "Saved Successfully!",
					}).show();
				});
			}
		}
	);
});
