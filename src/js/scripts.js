
var __widthMobile = 480;
var __widthMobileDesktopSmall = 1280;
var __widthMobileTablet = 1024;
var __widthMobileTabletMiddle = 768;
var __widthMobileTabletSmall = 600;
var __widthMobileSmall = 540;
var __isMobile = ($(window).width() <= __widthMobile);
var __isMobileDesktopSmall = ($(window).width() <= __widthMobileDesktopSmall);
var __isMobileTablet = ($(window).width() <= __widthMobileTablet);
var __isMobileTabletMiddle = ($(window).width() <= __widthMobileTabletMiddle);
var __isMobileTabletSmall = ($(window).width() <= __widthMobileTabletSmall);
var __isMobileSmall = ($(window).width() <= __widthMobileSmall);
var __animationSpeed = 350;	



$(document).ready(function(){

    // BURGER
	$('#menu-holder').click(function() {
		if ((__isMobileTablet) && !$('body').hasClass('mobile-opened')) { 
			if (!$('header').children('.close').data('inited')) {
				if (!$('header>.close').length) {
					$('header').append('<div class="close"></div>');
				}
				$('header').children('.close').click(function(e) {
					e.stopPropagation();

					$('body').removeClass('mobile-opened');
					$('html').removeClass('html-mobile-long');
					$('#layout').height('auto').removeClass('js-modal-overflow');
					$('.modal-fadeout').stop().fadeOut(300);	
				}).data('inited', true);
			}
			$('body').addClass('mobile-opened');
			if ($('#menu-holder').outerHeight() > $(window).height()) {
				$('html').addClass('html-mobile-long');
			} else {
				$('html').removeClass('html-mobile-long');
			}
			$('#layout').addClass('js-modal-overflow').height($('header').outerHeight());
			$('.modal-fadeout').stop().fadeIn(300);		
		}
	});


	// SLICKS
	$('.js-slider').each(function(i, slider) {
		var mobile = $(slider).attr('data-mobile');
		var adaptive = $(slider).attr('data-adaptive');
		var dots = $(slider).attr('data-dots') === 'false' ? false : true;
		var arrows = $(slider).attr('data-arrows') === 'true' ? true : false;
		var autoplay = $(slider).attr('data-autoplay') ? $(slider).attr('data-autoplay') : false;
		var slidesToShow = adaptive ? Math.floor($(slider).outerWidth() / $(slider).children('li, .li').outerWidth()) : 1; 

		if (mobile) {
			if ((mobile === 'true' && __isMobile) ||
				(mobile === 'middle' && __isMobileTabletMiddle) ||
				(mobile === 'small' && __isMobileTabletSmall) ||
				(mobile === 'mobile' && __isMobileSmall)) {					

				$(slider).slick({
					slidesToShow: slidesToShow,
					slidesToScroll: slidesToShow,
					dots: dots,
					arrows: arrows,
					autoplay: autoplay
				});
			}
		} else {
			$(slider).slick({
				slidesToShow: slidesToShow,
				slidesToScroll: 1,
				dots: dots,
				arrows: arrows,
				autoplay: autoplay
			});
		}
	});

	//jq-ui

	$(function() {
		$("#filter-archive").selectmenu();
		$("#filter-fund-number").selectmenu();
		$("#filter-num-file").selectmenu();
		$("#filter-org").selectmenu();
		$("#filter-doc").selectmenu();
		$("#filter-doc-year").selectmenu();
		$("#filter-place").selectmenu();
		$("#catalogue").selectmenu();
		$( "#agree-feedback" ).checkboxradio();
		$("#date-day").selectmenu();
		$("#date-month").selectmenu();
		$("#date-year").selectmenu();
		$("#copy-yes").checkboxradio();
		$("#copy-no").checkboxradio();
		$("#agree-feedback").checkboxradio();
		$("#modal-profile-agree").checkboxradio();
		$('.search-filter').selectmenu();
	});

	//search-value searching-results page

	$('.example-search a').click(function(e) {
		e.preventDefault();
		$('#search input:text').val($(this).text()).focus();
	});


	$('#search-top-keyword').on('keydown keyup focusout click', function() {
		if ($(this).val()) {
			$('.search-close').stop().fadeIn(50);
		} else {
			$('.search-close').stop().fadeOut(50);
		}
	});

	$('#search-top-keyword').focusout();
	$('.search-close').click(function() {
		$('#search-top-keyword').val('').focus();
		$(this).stop().fadeOut(50);
	});

	//filter-tablet searching-results page

	$('.filter-tablet').click(function() {
		$('html').addClass('html-filter');
		$('.filter').stop().fadeIn(350).css('display', 'table');
	});
	$('.filter-close, .filter-btn').click(function() {
		$('html').removeClass('html-filter');
		$('.filter').stop().fadeOut(350);
	});


//Modal  ////////////////////////////////////////////////////////////

	const overlay = $('.modal-fadeout');
	const modalWrap = $('.modal-wrapper');
	const windows = $('.tab-content');
	const modalClose = $('.modal-close');
	const trigger = $('.js-modal-link');
	const scroll =  getScrollBarWidth();

	function showModal(modal) {
		let modalPopup = $(modal);
		overlay.fadeIn(200);
		modalPopup.css('display', 'block').animate({opacity: 1}, __animationSpeed);
		$(document.body).css('overflow', 'hidden');
		// $(document.body).css('overflow-y', 'scroll');
		modalPopup.css('overflow-y', 'auto');

	}

	function hideModal(modal) {	
		let modalPopup = $(modal);
		if($('body').is('.mobile-opened')) {
			overlay.fadeIn(200);
		} else {
			overlay.fadeOut(200);
		}
		modalPopup.css('display', 'none').animate({opacty: 0}, __animationSpeed);
		$(document.body).css('overflow', "");
		$(document.body).css('paddingRight', '0px');

	}

	trigger.click(function(e) {
		e.preventDefault();		
		let link = $(this).attr('href');
		showModal(link);				
		$(document.body).css({'padding-right' : scroll + 'px'});	
	});


	modalClose.click(function() {	
		hideModal(modalWrap);		
	});

	modalWrap.on("click", function(e) {
		e.preventDefault();
		if($(e.target).attr("class") === "modal-wrapper") 
		hideModal($(this));
		// $(document.body).css('paddingRight', '0px');
		
	});

	//open modal-profile-forget

	$('#modal-profile .forget').click(function(e) {
		e.preventDefault();
		$('#modal-profile h4').html($(this).attr('data-header'));
		$('#modal-profile-authorisation, #modal-profile-registration, .tabs').hide();
		$('#modal-profile-forget').show();
	});

	//open modal-done

	$('#modal-profile-forget .btn').click(function(e) {
		e.preventDefault();
		e.stopPropagation();  //останавливает передачу события родительским элементам, предотвращая выполнение любых родительских обработчиков событий.
		showModal('#modal-done');
	});


//////////////////////////////////////////////////////////////////

//scroll width calculation

	function getScrollBarWidth() {
		var $outer = $('<div>').css({
			// visibility: 'hidden', 
			width: 100,
			overflowY: 'scroll'})
			.appendTo('body'),
			widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();	

		$outer.remove();
		return 100 - widthWithScroll;
	};

	console.log(getScrollBarWidth());

	// console.log(calcScroll());

	// function scrollbarWidth() {
	// 	var block = $('<div>').css({'height':'50px','width':'50px'});
	// 		indicator = $('<div>').css({'height':'200px'});
	
	// 	block.appendTo($(document.body));
	// 	var w1 = block.innerWidth();    
	// 	block.css('overflow-y', 'scroll');
	// 	var w2 = block.innerWidth();
	// 	$(block).remove();
	// 	return (w1 - w2);
	// }

	// console.log(scrollbarWidth());

////////////////////////////////////////////////////////////////

//tabs

$("#tabs>li>a").click(function(e) {
	e.preventDefault();
	$(".tab-act").removeClass("tab-act");
	$(this).toggleClass("tab-act");
	let link = $(this).attr('href');
	console.log(link);
	$('.tab-content-act').removeClass('tab-content-act');
	$(link).toggleClass('tab-content-act');
	$('#modal-profile h4').html($(this).attr('data-header'));
	
});
	
//slide-toggle list

$('.hideBlock').hide();

$('.header>a').click(function(e) {
	e.preventDefault();
	let target = $(e.target);
	let header = $('.header');
	let parent = $(this).parent('.header');

	if(target.is($(this))) {
		parent.children('ul').slideToggle("slow");	
	}
});


//Magnific-popup gallery

function magnificPopup(popup) {

	$(popup).magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		callbacks: {
			beforeOpen: function() {
				$(this.contentContainer).removeClass('fadeOut').addClass('animated fadeIn');
			},
			beforeClose: function() {
				$(this.contentContainer).removeClass('fadeIn').addClass('fadeOut');
			}
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title') + '<small></small>';
			}
		}
	});
}

magnificPopup('.doc-items');
magnificPopup('.img-line');



	
//soc-links

$('.soc>ul>li>a').click(function(e) {
	e.preventDefault();
	var $shares = $('.social-link');                    
	var url = $shares.attr('data-share-url');
	var title = $shares.attr('data-share-title');
	var image = $shares.attr('data-share-image');
	var description = $shares.attr('data-share-description');
	var api_url = $(this).attr('data-api-url');
		
	api_url = api_url.split('%url%').join(url).split('%title%').join(title).split('%image%').join(image).split('%description%').join(description);
	window.open(api_url, title, 'width=640,height=480,status=no,toolbar=no,menubar=no');
});


//counter animation

function animateNum(num, numberValue) {
	var number = $(num);
	var blockStatus = true;

	$(window).scroll(function() {	
		var scrollEvent = ($(window).scrollTop() > (number.position().top - $(window).height())); //когда доходим до элемента		
		if(scrollEvent && blockStatus) {	
			blockStatus = false; // Запрещаем повторное выполнение функции до следующей перезагрузки страницы.			
			$({numberValue: 0}).animate({numberValue: numberValue}, {    //деструктурирующее присваивание var numberValue = 0;	
				duration: 1000, // Продолжительность анимации, где 500 - 0.5 одной секунды, то есть 500 миллисекунд 
				easing: "linear",  //равномерная анимация.		
				step: function(val) {		
					number.html(Math.ceil(val)); // Изменяем html-содержимое и округляем аргумент до ближайшего целого числа.				
				}	
			});	
		}	
	});
}



//slider

function slider() {
	// let slider = $('.gallery');
	var frame = $('.frame');  //ul
	// let sliderItem = $('.gallery-item');
	var widthItem = $('.gallery-item').outerWidth();  //ширина item
	var scrollSlider = $('.frame').position().left - widthItem; //позиционирование слева относительно родителя и минус ширина элемента

	function autoplay() {
		frame.animate({left: scrollSlider}, 1500, function() {
			frame.find('.gallery-item:first').appendTo(frame).parent().css({'left': 0});

		});
	}
	setInterval(autoplay, 2000);
}



if ($('div').is('.gallery')) {
	slider();
}

if($('ul').is('.stat-counter')) {

	animateNum('.num-doc', 15000);
	animateNum('.num-fund', 780);
	animateNum('.num-archive', 15);
}


// form post

function sendFormData(form, url, thisModal, bool) {

	form.submit(function(event) {
		event.preventDefault();


		if(validateForm()) {
			$.ajax({
				url: url,
				type: 'POST',
				data: new FormData(this),
				contentType: false,
				cache: false,
				processData: false,
				success: function(data) {
					console.log('yes');
					console.log(data);
					$("form").trigger("reset");

				},

				error: function (jqXHR, exception) {
					if (jqXHR.status === 0) {
						alert('Not connect. Verify Network.');
					} else if (jqXHR.status == 404) {
						alert('Requested page not found (404).');
					} else if (jqXHR.status == 500) {
						alert('Internal Server Error (500).');
					} else if (exception === 'parsererror') {
						alert('Requested JSON parse failed.');
					} else if (exception === 'timeout') {
						alert('Time out error.');
					} else if (exception === 'abort') {
						alert('Ajax request aborted.');
					} else {
						alert('Uncaught Error. ' + jqXHR.responseText);
					}
				}

			});
		}

	});

}

sendFormData($('#question'), '/api.php');
sendFormData($('#request-form'), '/api.php');

// var inp = $('input').closest('label:has(span.star)');

// $('input').click(function() {
// 	console.log(inp);
// });

var dateMonth = $('#date-month').val();
console.log(dateMonth);





function validateForm() {

	$('.text-error').remove();

	var name = $('input[name="name"]');
	var email = $('input[name="email"]');
	var textarea = $('textarea[name="question"]');
	var checkbox = $('.agree');
	var dateMonth = $('#date-month');
	var date = $('.date');
	var selectDate = $('.selectDate');


	if(name.val().length < 1) {
		name.after('<span class="text-error">Логин должен быть больше 1 символа</span>');
		return false;
	}

	if(email.val().length < 1) {
		email.after('<span class="text-error">Введите корректный E-mail</span>');
		return false;
	}

	if(textarea.val() === '') {
		textarea.after('<span class="text-error">Задайте вопрос</span>');
		return false;
	}


	if ($('input[type="checkbox"]').is(':not(:checked)')) {
		checkbox.after('<span class="text-error">Поставьте галочку</span>');
		return false;
	}

// 	$('#select option:selected').text();
// // или
// $('#select option:selected').html();


	// if ($('#date-month').prop('selected') == false) {
	// 	dateMonth.after('<span class="text-error">Выберете дату</span>');
	// 	return false;
	// };

	// if($('#date-month option').attr('data-date')) {
	// 	dateMonth.after('<span class="text-error">Выберите месяц</span>')
	// 	return false;
	// }
		

	if($("#date-day option:eq(0)").is(":selected")) {
		date.after('<span class="text-error">Выберите день</span>');
		return false;
	}
	if($("#date-month option:eq(0)").is(":selected")) {
		date.after('<span class="text-error">Выберите месяц</span>');
		return false;
	}
	if($("#date-year option:eq(0)").is(":selected")) {
		date.after('<span class="text-error">Выберите год</span>');
		return false;
	}


	return true;


}







	
});




