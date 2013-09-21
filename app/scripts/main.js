$('body').on('click', '.js-data-list-button', function () {
	$(this).toggleClass('active');
	$(this).parent('dt').next('.js-data-list-content').toggleClass('active');
});

$('body').on('click', '.js-data-list-button--our-services', function () {	
	$('.js-data-list-button--our-services, .js-data-list-content--our-services').removeClass('active');
	$(this).toggleClass('active');
	$(this).parent('dt').next('.js-data-list-content--our-services').addClass('active');
});

$('body').on('click', '.js-data-list-content--our-services-close', function () {
	$('.js-data-list-button--our-services, .js-data-list-content--our-services').removeClass('active');
});