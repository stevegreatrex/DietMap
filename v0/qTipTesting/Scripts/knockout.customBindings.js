ko.bindingHandlers.tipOnClick = {
	init: function (element, valueAccessor, allValueAccessor, viewModel) {
		var $element = $(element),
			value = ko.utils.unwrapObservable(valueAccessor()),
			$content = $element.find(value.content);
		
		$element.qtip({
			content: {
				text: $content,
				title: {
					text: ko.utils.unwrapObservable(value.title),
					button: true
				}
			},
			position: {
				my: 'center', at: 'center', of: $element,
				viewport: $(window)
			},
			show: {
				event: 'click',
				solo: true
			},
			hide: false,
			events: {
				hide: function () {
					if (typeof value.onhide === "function") {
						value.onhide.call(this, viewModel);
					}
				}
			},
			style: {
				classes: 'ui-tooltip-actions ui-tooltip-light ui-tooltip-shadow'
			}
		});
	}
};

ko.bindingHandlers.loadWizard = {
	init: function (element, valueAccessor, a, viewModel) {
		var value = ko.utils.unwrapObservable(valueAccessor());
		$(element).click(function () {
			viewModel.loadWizard(value);
		});
	}
};
