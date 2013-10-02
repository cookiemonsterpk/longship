;(function() {

	'use strict';

	// Global object
	var App = {};

	App.Init = function () {

		App.Cache();
		App.BindListeners();
		App.Util();
		App.Methods();
		App.Onload();

	};

	App.Cache = function () {

		// Cache selectors
		App.dom = {};

		App.dom.htmlBody = $('html, body');

		App.dom.homePage = $('.js-home-page');
		App.dom.year = $('.js-year');

		App.dom.dataList = $('.js-data-list');
		App.dom.dataListLink = $('.js-data-list-link');
		App.dom.dataListLinkOurServices = $('.js-data-list-link--our-services');
		App.dom.dataListLinkDataListContentOurServices = $('.js-data-list-link--our-services, .js-data-list-content--our-services');
		App.dom.dataListContentOurServices = $('.js-data-list-content--our-services');
		App.dom.dataListContentOurServicesClose = $('.js-data-list-content--our-services-close');
		App.dom.ourClientsFullListButton = $('.js-our-clients-full-list-button');
		App.dom.ourClientsFullList = $('.js-our-clients-full-list');
		App.dom.headerMainNavButton = $('.js-header-main-nav-button');
		App.dom.headerMainNavList = $('.js-header-main-nav-list');
		App.dom.headerMainNavListItemLink = $('.js-header-main-nav-list-item-link');
		App.dom.textRotate = $('.js-text-rotate');

		// Main Nav Links
		App.dom.ourApproachLink = $('.js-our-approach-link');
		App.dom.ourServicesLink = $('.js-our-services-link');
		App.dom.ourProcessLink = $('.js-our-process-link');
		App.dom.ourClientsLink = $('.js-our-clients-link');
		App.dom.ourTeamLink = $('.js-our-team-link');
		App.dom.contactUsLink = $('.js-contact-us-link');

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

		App.dom.dataListLink.on('mouseup', function (e) {

			var $this = $(this);
			$this.toggleClass('active');
			$this.parent().toggleClass('active');

			if (window.matchMedia('(min-width: 35em)').matches) {
				$this.parent().next().slideToggle();
			} else {
				$this.parent().next().toggleClass('active');
			}

			return false;

		});

		App.dom.dataListLinkOurServices.on('mouseup', function () {

			var $this = $(this);
			App.dom.dataListLinkDataListContentOurServices.removeClass('active');
			$this.toggleClass('active');

			if (window.matchMedia('(min-width: 35em)').matches) {
				App.dom.dataListContentOurServices.fadeOut();
				$this.parent().next().fadeIn();
			} else {
				$this.parent().next().addClass('active');
			}

			return false;

		});

		$('body').on('click', '.js-data-list-content--our-services-close', function () {

			if (window.matchMedia('(min-width: 35em)').matches) {
				App.dom.dataListLinkOurServices.removeClass('active');
				App.dom.dataListContentOurServices.fadeOut();
			} else {
				App.dom.dataListLinkDataListContentOurServices.removeClass('active');
			}

			$(this).parent().attr('aria-hidden', 'true');

			return false;

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

			return false;

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

			return false;

		});

		App.dom.headerMainNavListItemLink.on('click', function () {

			if (App.dom.homePage.length) {

				// Hide main nav
				App.dom.headerMainNavList.removeClass('active');

				// Scroll to position
				App.dom.htmlBody.animate({ scrollTop: Math.round($($(this).attr('href')).offset().top) }, 600);

				return false;
			}

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

	App.Onload = function () {

		// Onload functions

		// Year
		var myDate = new Date();
		App.dom.year.html( myDate.getFullYear() );

		// ARIA Tabs
		App.dom.dataList.each( function () {

			var thisDataList = $(this);

			// Set role for each list
			thisDataList.attr('role', 'tablist');

			// Set Aria roles and properties for each 'tab area'
			thisDataList.find('dd').attr({'role': 'tabpanel', 'aria-hidden': 'true'});

			// Each 'tab' in the list...
			thisDataList.find('a').each( function () {

				// Create an ID for the 'tab' to match with the tab area
				var thisTab = $(this),
					anchorId = 'tab-' + thisTab.attr('href').slice(1);

				// Assign anchorId, Aria role, property, and tabIndex
				// Set role to parent
				thisTab.attr({'id': anchorId, 'role': 'tab', 'aria-selected': 'false'}).parent().attr('role', 'presentation');

				// Assign anchorId to its relative tab area
				thisTab.parent().next().attr('aria-labelledby', anchorId);

				// Click event
				thisTab.on('click', function (e) {

					// Change state of previously selected thisDataList
					thisDataList.find('dt.current').removeClass('current').find('a').attr({'aria-selected': 'false'});

					// Hide previously selected tab area
					thisDataList.find('dd:visible').attr('aria-hidden', 'true');

					// Show newly selected tab area
					thisTab.parent().next().attr('aria-hidden', 'false');

					// Set state of newly selected tab
					thisTab.attr({'aria-selected': 'true'}).parent().addClass('current');
					thisTab.focus();

					return false;

				});

			});

			// Keydown events
			thisDataList.on('keydown', 'a',	function (e) {

				var thisTab = $(this);

				switch (e.keyCode) {
					case 37: // Left
					case 38: // Up
						if (thisTab.parent().prev().prev().length !== 0) {
							// Not the last tab, move to the next
							thisTab.parent().prev().prev().find('a').click();
						} else {
							thisDataList.find('dt:last a').click();
						}
						break;
					case 39: // Right
					case 40: // Down
						if (thisTab.parent().next().next().length !== 0) {
							// Not the first tab, move to the next
							thisTab.parent().next().next().find('a').click();
						} else {
							thisDataList.find('dt:first a').click();
						}
						break;
					case 13: // Enter
						thisTab.mouseup();
						break;
				}

			});

			// Set state for the first tabs
			thisDataList.find("dt:first").addClass('current').find('a').attr({'aria-selected': 'true'});

		});

		if (window.matchMedia('(min-width: 35em)').matches) {
			// Our Process
			$('.js-our-process-data-list').addClass('our-process__data-list--left');
			$('<dl class="our-process__data-list our-process__data-list--right js-our-process-data-list--right js-data-list"/>').insertAfter($('.js-our-process-data-list'));
			$('.js-our-process-data-list dt:nth-child(4n+1)').addClass('our-process__data-list__title--left');
			$('.js-our-process-data-list dt:nth-child(4n+3)').addClass('our-process__data-list__title--right');
			$('.js-our-process-data-list dt:nth-child(4n+3), .js-our-process-data-list dd:nth-child(4n+4)').appendTo($('.js-our-process-data-list--right'));

			// Our Services - close button
			$('<button class="our-services__data-list__data__close-button js-data-list-content--our-services-close">Close</button>').prependTo('.js-data-list-content--our-services');
		}

	};

	App.Init();

})();