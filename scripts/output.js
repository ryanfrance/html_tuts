//Author - Ryan France 2015
//Companion Syntax Application for the KSC Suite

(function kscEditor() {
	"use strict";

	var use = {
		liveEdit: true
	};

	var maxSpace = 30;	
	//check cache for app data on page load.
	//We can download the new version if available to the users appcache manifest for ksc

	/*window.appEventListener("load", function(e) {
		window.applicationCache.addEventListener("reinitialise", function(e) {
			if (window.applicationCache.status == window.applicationCache.updateready) {
				//download new appcache
				if(confirm("There is a new version of KSC Editor. Update?")) {
					window.location.reload();
				}
			} //no else needed if manifest same
		}, false);
	}, false);*/

	//------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------
	//---------------------------Implement Ace Editors -----------------------------------------------

	(function pushAce() {

		var editorTheme;
		//check if localstorage has an updated theme, if something is to go wrong we can use a specific theme in the else statement
		if (localStorage.getItem("theme")) {
			editorTheme = localStorage.getItem("theme");
		}
		else {
			editorTheme = "ace/theme/monokai";
		}

		//SETTINGS
		//For HTML Ace
		//create a window object called htmlBlock and assign relevant options
		window.htmlBlock = ace.edit("html");
		htmlBlock.setOptions({

			theme: editorTheme,
			mode: "ace/mode/html",
			cursorStyle: "smooth",
			vScrollBarAlwaysVisible: false,
			animatedScroll: true,
			fontSize: "1.3rem",
			minLines: 20,
			maxLines: maxSpace,
			//tooltipFollowsMouse: true,
			enableBasicAutoCompletion: true,
			spellcheck: true

		});

		//For CSS Ace
		window.cssBlock = ace.edit("css");
		cssBlock.setOptions({

			theme: editorTheme,
			mode:("ace/mode/css"),
			cursorStyle: "smooth",
			vScrollBarAlwaysVisible: false,
			animatedScroll: true,
			fontSize: "1.3rem",
			minLines: 20,
			maxLines: maxSpace,
			//tooltipFollowsMouse: true,
			enableBasicAutoCompletion: true,
			spellcheck: true

		});//End of Ace Settings

		//Get data if available from sessionStorage
		(function pushSessionStorage(){

			//Push stored html code or set some defaults

			if (sessionStorage.getItem("html")) {
				htmlBlock.setValue(sessionStorage.getItem("html"));
				htmlBlock.clearSelection();
			}
			else {
				htmlBlock.setValue("<!-- Welcome to KSC Editor -->\n\n<!DOCTYPE html>\n<html>\n\t<head>\n\n\t</head>\n\t<body>\n\n\t</body>\n</html>");
				htmlBlock.clearSelection();

			} //end html

			//push css code or leave blank

			if(sessionStorage.getItem("css")) {
				cssBlock.setValue(sessionStorage.getItem("css"));
				cssBlock.clearSelection(); //Needs this for some reason
			}

		})();

	})(); //End pushAce Function


	//Toggle Blocks - Start
	$(".toggleBtn").on("click", function() {
		blocks.close(this);
	});


	var blocks = {
		//Return the no. of blocks 
		count: function() {
			var count = 2;
			var items = $(".editors .row");
			items.each(function(el) {
				if ($(items[el]).css("display") === "none") count -=1;
			});

			return count;
		},

		//resize code editor if space is available
		resize: function() {
			var count = this.count();
			var maxSpace;
			//var block = $(".live iframe");

			if (count === 2 || count === 0) {
				maxSpace = 45;
			}
			else if (count === 1) {
				maxSpace = 90;
			}

			return maxSpace;
		},

		close: function(el) {
			var name = el.dataset.editor;
			var count = this.count();
			if (count > 1 || $(el).hasClass("active")) {
				$(el).toggleClass("active");
				$(".live." + name).parent().toggle();
				this.resize();
			}
			else {
				alert("You cant get rid of both editors!");
			}
		}
	};

	//parse preview
	function parsePreview() {

		var syntax = {
			html: htmlBlock.getValue(),
			style: cssBlock.getValue(),
		};

		var html = '';
		html += '<!DOCTYPE html>\n';
	    html += '<html lang="en">\n';
	    html += 	'<head>\n';
	    html += 		'<meta charset="UTF-8">\n';
	    html += 		'<style type="text/css">\n';
	    html +=			syntax.style;
	    html += 		'\n</style>\n';
	    html += 	'</head>\n';
	    html += 	'<body>\n';
	    html += 		syntax.html;
	    html += 	'</body>\n';
	    html += '</html>';

	    return html;
  	}

  	htmlBlock.getSession().on("change", function(e) {
  		if(use.liveEdit) execute(1000);
  	});

  	cssBlock.getSession().on("change", function(e) {
    if (use.liveEdit) preview(2000);
  	});


  	$('#submit').on('click', function() {
  		execute();
  	});

  	function execute(delay) {
  		delay = delay || 0;
  		var time = null;
  		if (time) {
  			window.clearTimeout(time);
  		}
  		time = window.setTimeout(function() {
  			time = null;
  			var writtenSyntax = parsePreview();

  			(document.getElementById("iframe").contentWindow.document).write(writtenSyntax);
  			(document.getElementById("iframe").contentWindow.document).close();

  		}, delay);
  	}

  	//Time to download source code!
  	$("#download").on("click", function() {

  		function destroy(event) {
  			document.body.removeChild(event.target);
  		}

  		var $extract = document.createElement("a");

  		var writtenSyntax = parsePreview();
  		var txt = new Blob([writtenSyntax], {type: "text/plain"});
  		var name = "index.html";

  		$extract.download = name;

  		if (typeof window.webkitURL === "function") {
	      // Compatibility for Google Chrome
	      $extract.href = window.webkitURL.createObjectURL(txt);
	    } 
		else {
	      // Firefox Too
	      $extract.href = window.URL.createObjectURL(txt);
	    }

	    $extract.onclick = destroy;
		$extract.style.display = "none";
		document.body.appendChild($extract);
	    $extract.click();
  	});

  	//Save code to localStorage
  	$("#save").on("click", function() {
  		var stash = {
  			html: htmlBlock.getValue(),
  			css: cssBlock.getValue()
  		};

  		//save item to cache using json stringify function
  		localStorage.setItem("kscEditor", JSON.stringify(stash));
  	});

  	//Load from local storage
  	$("#load").on("click", function() {
  		var stash;

  		if (localStorage.kscEditor) {

  			//parse json's saved string for kscEditor
  			stash = JSON.parse(localStorage.kscEditor);

  			cssBlock.setValue(stash.css);
  			cssBlock.clearSelection(); //Keep Clearing!
  			htmlBlock.setValue(stash.html);
  			htmlBlock.clearSelection();

  		}
  		else {
  			alert("You have nothing saved! Get Coding!");
  		}
  	});

  	window.exit = function(e){

  		//autosave
  		sessionStorage.setItem("html", htmlBlock.getValue());
  		sessionStorage.setItem("css", cssBlock.getValue());

  		//get the events last known state, if not already
  		e = e || window.event;
  		var msg = "You may lose your work if you continue without saving";

  		return msg;

  	};

})();