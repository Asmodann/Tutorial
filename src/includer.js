function include(file) {
	var script = document.createElement("script");
	script.src = "src/" + file + ".js";
	document.head.appendChild(script);
}