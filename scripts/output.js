//<!DOCTYPE html> needs to be output manually
//This way will exclude any comments that are not a child of the HTML node

function grabCode() {
	var code = "<!DOCTYPE html>" + "\n" + document.getElementById("output-window").contentWindow.document.documentElement.outerHTML;
	editor.getSession().setValue(code);
}

//jQuery below line

$(function() {

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

	$('.grid').height( $(window).height() );

	var liveWindow 	= $('iframe'),
		contents 	= liveWindow.contents(),
		body 		= contents.find('body'),
		style 		= contents.find('head').append('<style></style>').children('style');

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