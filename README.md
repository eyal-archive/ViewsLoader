ViewsLoader
========

A proof of concept for of a jQuery plugin that loads views (via AJAX) based on the current window's width of the client.

Usage:

	<script type="text/javascript">
	/* <![CDATA[ */
		(function($)
		{
			// The table that defines the views.
			var viewTable = [
				{ minWidth: "0", url: "_small.html" },
				{ minWidth: "400", url: "_medium.html" },
				{ minWidth: "800", url: "_normal.html" }
			];

			// The function that on reize manipulates the views.
			$("#content").loadView(viewTable);
	
			// Fires resize (on document load) to load the view for the current window's width.
			$(function() {
				$(window).resize();
			});

		})(jQuery);
	/* ]]> */
	</script>

