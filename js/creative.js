
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

	$("a.portfolio-box").click(function (e) {
		var link = $(this);

		var title = link.data("title");
		var tagline = link.data("tagline");
		var media = link.data("media");

		if (window.player && window.player.media ) {
			window.player.remove();
		}

		$("#player-tagline").html(tagline);

		window.player = new MediaElementPlayer("player", 
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
					{ src: "media/" + media + "/index.m3u8", type: "application/x-mpegURL" }
				];
	
				mediaElement.setSrc(sources);
				mediaElement.load();
	
				var timerail = player.getElement(player.controls).querySelector("." + player.options.classPrefix + "time-rail");
	
				if (timerail) {
					var timecurrent = player.getElement(timerail).querySelector("." + player.options.classPrefix + "time-current");
	
					var titlebar1 = document.createElement("div"),
						progress = document.createElement("div"),
						titlebar2 = document.createElement("div");
	
					titlebar1.className = player.options.classPrefix + "titlebar " + player.options.classPrefix + "titlebar1";
					progress.className = player.options.classPrefix + "titlebar " + player.options.classPrefix + "titlebar-progress";
					titlebar2.className = player.options.classPrefix + "titlebar " + player.options.classPrefix + "titlebar2";
	
					titlebar1.innerText = titlebar2.innerText = title;
	
					timerail.prepend(titlebar1);
					progress.appendChild(titlebar2);
					timerail.appendChild(progress);
	
					mediaElement.addEventListener("timeupdate", function (e, a, b, c) {
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
	
							progress.style = "width: " + percent + "%;";
							titlebar2.style = "width: " + (10000 / percent) + "%;";
						}
			
					}, false);
				} // if (timerail)
			} // success: function()
		}); // new MediaElementPlayer

	}); // $(".portfolio-box").click

	var urlParams = new URLSearchParams(window.location.search);
	var track = urlParams.get("track");

	var tracks = $("a.portfolio-box");
	
	if (track) {
		tracks.each(function(index, element) {
			var link = $(element);
			var media = link.data("media");

			if (media && media == urlParams.get("track")) {
				link.click();
			}
		});
	} else {
		var last = tracks.filter(":last");
		last.click();
	}

})(jQuery); // End of use strict
