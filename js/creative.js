
function toTimeString(totalSeconds) {
	var hours   = Math.floor(totalSeconds / 3600);
	var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
	var seconds = totalSeconds - (hours * 3600) - (minutes * 60);

	// round seconds
	seconds = Math.round(seconds * 100) / 100

	var result = (hours < 10 ? "0" + hours : hours);
			result += ":" + (minutes < 10 ? "0" + minutes : minutes);
			result += ":" + (seconds  < 10 ? "0" + seconds : seconds);
	return result;
}

function step() {
	// Determine our current seek position.
	var seek = howl.seek() || 0;
	$("#timer").html(toTimeString(Math.round(seek)));

	$("#progress").css("width", (((seek / howl.duration()) * 100) || 0) + "%");

	// If the sound is still playing, continue stepping.
	if (howl.playing()) {
		requestAnimationFrame(step);
	}
}

(function($) {
	"use strict"; // Start of use strict

	// Smooth scrolling using jQuery easing
	$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - 57)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll-trigger').click(function() {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: 57
	});

	// Collapse Navbar
	var navbarCollapse = function() {
		if ($("#mainNav").offset().top > 100) {
			$("#mainNav").addClass("navbar-shrink");
		} else {
			$("#mainNav").removeClass("navbar-shrink");
		}
	};
	// Collapse now if page is not at top
	navbarCollapse();
	// Collapse the navbar when page is scrolled
	$(window).scroll(navbarCollapse);

	// Scroll reveal calls
	window.sr = ScrollReveal();
	sr.reveal('.sr-icons', {
		duration: 600,
		scale: 0.3,
		distance: '0px'
	}, 200);
	sr.reveal('.sr-button', {
		duration: 1000,
		delay: 200
	});
	sr.reveal('.sr-contact', {
		duration: 600,
		scale: 0.3,
		distance: '0px'
	}, 300);

	// Magnific popup calls
	$('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0, 1]
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
		}
	});

	var player = new MediaElementPlayer("player", 
	{
		// Do not forget to put a final slash (/)
		pluginPath: "https://cdnjs.com/libraries/mediaelement/",
		// this will allow the CDN to use Flash without restrictions
		// (by default, this is set as `sameDomain`)
		shimScriptAccess: "always",
		stretching: "responsive",
		alwaysShowHours: true,
		features: ["playpause", "progress", "remaining"],

		type: ["application/x-mpegURL"],
		success: function (mediaElement, domObject, player) {
			var sources = [
				{ src: "media/nm_sessions-mix-10/index.m3u8", type: "application/x-mpegURL" }
			];

			mediaElement.setSrc(sources);
			mediaElement.load();

			var timerail = player.getElement(player.controls).querySelector('.' + player.options.classPrefix + 'time-rail');

			if (timerail) {
				var timecurrent = player.getElement(timerail).querySelector('.' + player.options.classPrefix + 'time-current');

				var titlebar1 = document.createElement('div'),
					progress = document.createElement('div'),
					titlebar2 = document.createElement('div');

				titlebar1.className = player.options.classPrefix + 'titlebar ' + player.options.classPrefix + 'titlebar1';
				progress.className = player.options.classPrefix + 'titlebar ' + player.options.classPrefix + 'titlebar-progress';
				titlebar2.className = player.options.classPrefix + 'titlebar ' + player.options.classPrefix + 'titlebar2';

				titlebar1.innerText = "NM Sessions - Mix#5";
				titlebar2.innerText = "NM Sessions - Mix#5";

				timerail.prepend(titlebar1);
				progress.appendChild(titlebar2);
				timerail.appendChild(progress);

				mediaElement.addEventListener('timeupdate', function (e, a, b, c) {
					var currentTime = player.getCurrentTime();

					if (!currentTime || isNaN(currentTime)) {
						currentTime = 0;
					}
		
					var duration = player.getDuration();
		
					if (isNaN(duration) || duration === Infinity || duration < 0) {
						duration = 0;
					}

					if (currentTime > 0 && duration > 0) {
						var percent = (currentTime / duration) * 100;

						console.log(percent);

						progress.style = 'width: ' + percent + '%;';
						titlebar2.style = 'width: ' + (10000 / percent) + '%;';
					}
		
				}, false);
			}
		}
	});

})(jQuery); // End of use strict
