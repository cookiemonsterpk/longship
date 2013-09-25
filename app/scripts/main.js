;(function() {

	'use strict';

	// Global object
	var App = {};

	App.Init = function () {

		App.Cache();
		App.BindListeners();
		App.Util();
		App.Methods();

		// Year
		var myDate = new Date();
		App.dom.year.html( myDate.getFullYear() );

	};

	App.Cache = function () {

		// Cache selectors
		App.dom = {};

		App.dom.year = $('.js-year');
		App.dom.dataListButton = $('.js-data-list-button');
		App.dom.dataListButtonOurServices = $('.js-data-list-button--our-services');
		App.dom.dataListButtonDataListContentOurServices = $('.js-data-list-button--our-services, .js-data-list-content--our-services');
		App.dom.dataListContentOurServices = $('.js-data-list-content--our-services');
		App.dom.dataListContentOurServicesClose = $('.js-data-list-content--our-services-close');
		App.dom.ourClientsFullListButton = $('.js-our-clients-full-list-button');
		App.dom.ourClientsFullList = $('.js-our-clients-full-list');
		App.dom.headerMainNavButton = $('.js-header-main-nav-button');
		App.dom.headerMainNavList = $('.js-header-main-nav-list');
		App.dom.headerMainNavListItemLink = $('.js-header-main-nav-list-item-link');
		App.dom.textRotate = $('.js-text-rotate');

		// Form
		App.dom.contactForm = $('#contactForm');
		App.dom.sendingMessage = $('#sendingMessage');
		App.dom.successMessage = $('#successMessage');
		App.dom.statusMessage = $('#statusMessage');
		App.dom.senderName = $('#senderName');
		App.dom.senderEmail = $('#senderEmail');
		App.dom.senderSubject = $('#senderSubject');
		App.dom.message = $('#message');
		App.dom.failureMessage = $('#failureMessage');
		App.dom.incompleteMessage = $('#incompleteMessage');
		App.dom.sendMessage = $('#sendMessage');

	};

	App.BindListeners = function () {

		// Event listeners
		document.addEventListener('touchstart', function(){}, true);

		// Test for csstransforms3d
		if ((Modernizr.csstransforms3d) && (window.matchMedia('(min-width: 35em)').matches)) {
			App.dom.textRotate.textrotator({
				animation: "flipUp",
				speed: 5000
			});
		}

		App.dom.dataListButton.on('click', function () {

			var $this = $(this);
			$this.toggleClass('active');

			if (window.matchMedia('(min-width: 35em)').matches) {
				$this.parent('dt').next('.js-data-list-content').slideToggle();
			} else {
				$this.parent('dt').next('.js-data-list-content').toggleClass('active');
			}

		});

		App.dom.dataListButtonOurServices.on('click', function () {

			var $this = $(this);
			App.dom.dataListButtonDataListContentOurServices.removeClass('active');
			$this.toggleClass('active');

			if (window.matchMedia('(min-width: 35em)').matches) {
				$this.parent('dt').next('.js-data-list-content--our-services').fadeIn();
			} else {
				$this.parent('dt').next('.js-data-list-content--our-services').addClass('active');
			}

		});

		App.dom.dataListContentOurServicesClose.on('click', function () {

			if (window.matchMedia('(min-width: 35em)').matches) {
				App.dom.dataListButtonOurServices.removeClass('active');
				App.dom.dataListContentOurServices.fadeOut();
			} else {
				App.dom.dataListButtonDataListContentOurServices.removeClass('active');
			}

		});

		App.dom.ourClientsFullListButton.on('click', function () {

			var $this = $(this);

			$this.toggleClass('active-button');

			if (window.matchMedia('(min-width: 35em)').matches) {
				App.dom.ourClientsFullList.slideToggle();
			} else {
				App.dom.ourClientsFullList.toggleClass('active');
			}

			if ($this.hasClass('active-button')) {
				$this.html($this.data('button-text-active'));
			} else {
				$this.html($this.data('button-text'));
			}

		});

		App.dom.headerMainNavButton.on('click', function () {

			var $this = $(this);

			$this.toggleClass('active-button');
			App.dom.headerMainNavList.toggleClass('active');

			if ($this.hasClass('active-button')) {
				$this.html($this.data('button-text-active'));
			} else {
				$this.html($this.data('button-text'));
			}

		});

		App.dom.headerMainNavListItemLink.on('click', function () {

			App.dom.headerMainNavList.removeClass('active');

		});

		App.dom.sendMessage.on('click', function () {

			App.submitForm();
			return false;

		});

	};

	App.Methods = function () {

		// Custom functions

		// Submit the form via Ajax

		App.submitForm = function () {

			// Are all the fields filled in?

			if ( !App.dom.senderName.val() || !App.dom.senderEmail.val() || !App.dom.senderSubject.val() || !App.dom.message.val() ) {

				// No; display a warning message and return to the form
				App.dom.incompleteMessage.show();

			} else {

				// Yes; submit the form to the PHP script via Ajax
				$.ajax({
					url: App.dom.contactForm.attr( 'action' ) + '?ajax=true',
					type: App.dom.contactForm.attr( 'method' ),
					data: App.dom.contactForm.serialize(),
					dataType: 'json'
				}).done(function( data ) {
					if ( data.message === "success" ) {
						App.dom.statusMessage.hide();
						App.dom.contactForm.hide();
						App.dom.successMessage.show();
					} else {
						App.dom.statusMessage.show();
					}
				});
			}

			// Prevent the default form submission occurring
			return false;

		};

	};

	App.Util = function () {

		// Util functions

	};

	App.Init();

})();