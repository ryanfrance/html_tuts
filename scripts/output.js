//Editor options and Keyboard Shortcuts

var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/html");
editor.setAutoScrollEditorIntoView(true);
editor.setOptions({
	cursorStyle: "smooth",
	vScrollBarAlwaysVisible: false,
	animatedScroll: true,
	fontSize: "1.3rem",
	minLines: 20,
	maxLines: 45,
	//tooltipFollowsMouse: true,
	enableBasicAutoCompletion: true,
	spellcheck: true,
});

var editor1 = ace.edit("editorCSS");
editor1.setTheme("ace/theme/cobalt");
editor1.getSession().setMode("ace/mode/css");
editor1.setAutoScrollEditorIntoView(true);
editor1.setOptions({
	cursorStyle: "smooth",
	vScrollBarAlwaysVisible: false,
	animatedScroll: true,
	fontSize: "1.3rem",
	minLines: 20,
	maxLines: 45,
	//tooltipFollowsMouse: true,
	enableBasicAutoCompletion: true,
	spellcheck: true,
});


//Editor Keyboard Shortcuts
editor.commands.addCommands([{

    name: "Show Current Keyboard Shortcuts",
    bindKey: {win: "Ctrl-Alt-h", mac: "Command-Alt-h"},
    exec: function(editor) {
        ace.config.loadModule("ace/ext/keybinding_menu", function(module) {
            module.init(editor);
            editor.showKeyboardShortcuts();
        });
    }
},

{
    name: "Increase Font Size",
    bindKey: "Ctrl-=|Ctrl-+",
    exec: function(editor) {
        var size = parseInt(editor.getFontSize(), 10) || 12;
        editor.setFontSize(size + 1);
    }
},

{
    name: "Decrease Font Size",
    bindKey: "Ctrl+-|Ctrl-_",
    exec: function(editor) {
        var size = parseInt(editor.getFontSize(), 10) || 12;
        editor.setFontSize(Math.max(size - 1 || 1));
    }
},

{
    name: "Reset Font Size",
    bindKey: "Ctrl+0|Ctrl-Numpad0",
    exec: function(editor) {
        editor.setFontSize(12);
    }
},

{
	name: "Show Settings",
		bindKey: {win: "Ctrl-q", mac: "Ctrl-q"},
		exec: function(editor) {
			editor.showSettingsMenu();
		},
		readOnly: true

/*{ name: "execute",
    bindKey: "ctrl+enter",
    exec: function(editor) {
        try {
            var r = window.eval(editor.getCopyText() || editor.getValue());
        } catch(e) {
            r = e;
        }
        editor.cmdLine.setValue(r + "");
    },
    readOnly: true
},*/
}]);


//<!DOCTYPE html> needs to be output manually
//This way will exclude any comments that are not a child of the HTML node

/*function grabCode() {
	var code = "<!DOCTYPE html>" + "\n" + document.getElementById("output-window").contentWindow.document.documentElement.outerHTML;
	editor.getSession().setValue(code);
}*/

//jQuery below line

(function() {

	//Will look for editor class (ace editor)
	/*function parseHtml() {
		var html = $('.editor').val();
		return html;
	}

	function parseCSS() {
		var css = $('.editorCSS').val();
		return css;
	}

	$('.live').live("keyup",function() {
		var parse = $('#output-window')[0].contentWindow.document;
		parse.open();
		parse.close();


		var html = parseHtml();
		var css = parseCSS();

		$('body',parse).append(html);
		$('head',parse).append('<style>' + css + '</style>');
	});

	$('#saveCode').click(function() {
		$('#output-window').contents().find('html').html();
		alert
		return false;
	})*/

	var liveWindow 	= $('iframe'),
		contents 	= liveWindow.contents(),
		body 		= contents.find('body'),
		style 		= contents.find('head')
								.append('<style></style>')
								.children('style');



	$('.ace').focus(function(){

		var $this = $(this);
		$this.keyup(function(){

			if( $this.attr('id') === 'editor' ) {
				body.html( $this.val() );
			}
			else {
				style.text( $this.val() );
			}

		});
	});

})();