const { PythonShell } = require("python-shell");
const path = require("path");
var data = [
	[10, 62.1],
	[12.5, 77.3],
	[15, 92.5],
	[17.5, 104],
	[20, 112.9],
	[22.5, 121.9],
	[25, 125],
	[27.5, 129.4],
	[30, 134],
	[32.5, 138.2],
	[35, 142.3],
	[37.5, 143.2],
	[40, 144.6],
	[42.5, 147.2],
	[45, 147.8],
	[47.5, 149.1],
	[50, 150.9],
];

var tableBody = document.getElementById("table-body");
var tableRows = "";
data.forEach(function (item) {
	tableRows += `
        <tr>
            <td>${item[0]}</td>
            <td>${item[1]}</td>
        </tr>
    `;
});
tableBody.innerHTML = tableRows;

function execute() {
	var options = {
		scriptPath: path.join(__dirname, "/../engine/"),
	};
	let pyshell = new PythonShell("curve_fitting.py", options);
	var t = 1;
	var power = "";
	var poly = "";
	pyshell.on("message", function (message) {
		if (t === 1) power = message;
		if (t == 2) poly = message;
		t++;
		if (t == 3) {
			t = 1;
			document.getElementById("nooutput-4").classList.add('hide');
			document.getElementById("output-4").classList.remove('hide');
			document.getElementById("output-4").innerHTML = power + "\n" + poly;
		}
	});
}

var exeBtn = document.getElementById("exec-4");
exeBtn.addEventListener("click", function () {
	//running the python engine
	execute();
});
