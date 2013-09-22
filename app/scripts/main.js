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

$('body').on('click', '.js-our-clients-full-list-button', function () {
	$(this).toggleClass('active-button');
	$('.js-our-clients-full-list').toggleClass('active');

	if ($(this).hasClass('active-button')) {
		$(this).html($(this).data('button-text-active'));
	} else {
		$(this).html($(this).data('button-text'));
	}
});

/*
var Module = (function () {

    var datajs = function (selector) {
        return document.querySelectorAll('[data-js=' + selector + ']');
    };

    var displayDataList = function (attr) {
        var elem = datajs(attr);        
        
        for (var i = 0; i < elem.length; i++) {
            
            var self = elem[i];
            
            self.onclick = function () {

            	switch (attr) {
            		case 'data-list-button':
            			this.classList.toggle('active');
						this.parentNode.nextElementSibling.classList.toggle('active');				
						break;
					case 'data-list-button--our-services':
						$('.js-data-list-button--our-services, .js-data-list-content--our-services').removeClass('active');
						this.classList.toggle('active');
						this.parentNode.nextElementSibling.classList.add('active');
						break;
            	}           	

            };
        }
    };

    return {
        displayDataList: displayDataList
    };

})();

Module.displayDataList('data-list-button');
Module.displayDataList('data-list-button--our-services');
*/