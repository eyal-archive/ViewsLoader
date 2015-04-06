(function($)
{
	var data = [];
	
	$(window).on('resizeEnd', function()
	{
		$(data).each(function()
		{
			$(this.selector).load(this.ajaxUrl, this.callback);
				
			clearTimeout(this.resizeTimeout);
		});
	});
	
	$(window).resize(function()
	{
		var self = this;

		var windowWidth = $(self).width();

		$(data).each(function()
		{
			var ajaxUrl = null;

			var viewTable = this.viewTable;

			for (var i = 0; i < viewTable.length; i++)
			{
				var minWidth = Math.abs(viewTable[i].minWidth);
				var maxWidth = -1;

				for (var j = i + 1; j < viewTable.length; j++)
				{
					// note: In IE 8 the length of the array seems to be bigger by 1 than the actual length when arrays ends with a single trailing comma
					if (viewTable[j] === null)
					{
						break;
					}

					var width = Math.abs(viewTable[j].minWidth);

					if (width > minWidth)
					{
						maxWidth = width;

						break;
					}
				}

				if (maxWidth === -1)
				{
					maxWidth = windowWidth;
				}

				if (windowWidth <= maxWidth && windowWidth > minWidth)
				{
					ajaxUrl = viewTable[i].url;

					break;
				}
			}
		
			if (this.ajaxUrl === ajaxUrl)
			{
				this.callback();

				return;
			}

			this.ajaxUrl = ajaxUrl;

			this.resizeTimeout = setTimeout(function()
			{
				$(self).trigger('resizeEnd');
			}, 500);
		});
	});
	
	$.AjaxViewLoader = function(selector, viewTable, callback)
	{
		data.push({
			selector: selector,
			viewTable: viewTable,
			callback: callback,
			resizeTimeout: null,
			ajaxUrl: null,
		});
	};

	$.fn.loadView = function(viewTable, callback)
	{
		return this.each(function()
		{
			return (new $.AjaxViewLoader(this, viewTable, callback));
		});
	};

})(jQuery);