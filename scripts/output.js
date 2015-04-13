//<!DOCTYPE html> needs to be output manually 
//This way will exclude any comments that are not a child of the HTML node

function grabCode() {
	var code = "<!DOCTYPE html>" + "\n" + document.getElementById("output-window").contentWindow.document.documentElement.outerHTML;
	editor.getSession().setValue(code);
}