$('body').on('click', '.js-data-list-button', function () {
	$(this).toggleClass('active');
	$(this).parent('dt').next('.js-data-list-content').toggleClass('active');
});