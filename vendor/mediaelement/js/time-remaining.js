(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
	'use strict';
	
	Object.assign(MediaElementPlayer.prototype, {
		buildremaining: function buildremaining(player, controls, layers, media) {
			var t = this,
				time = document.createElement('div');
	
			time.className = t.options.classPrefix + 'time';
			time.setAttribute('role', 'timer');
			time.setAttribute('aria-live', 'off');

			time.innerHTML = '<span class="' + t.options.classPrefix + 'remainingtime">' + mejs.Utils.secondsToTimeCode(0, player.options.alwaysShowHours, player.options.showTimecodeFrameCount, player.options.framesPerSecond, player.options.secondsDecimalLength, player.options.timeFormat) + '</span>';

			t.addControlElement(time, 'remaining');

			player.updateRemaining();

			t.updateRemainingCallback = () => {
				if (t.controlsAreVisible) {
					player.updateRemaining();
				}
			};

			media.addEventListener('timeupdate', t.updateRemainingCallback);
		},
		cleanremaining (player, controls, layers, media) {
			media.removeEventListener('timeupdate', player.updateRemainingCallback);
		},
		updateRemaining ()  {
			const t = this;

			var currentTime = t.getCurrentTime();

			if (!currentTime || isNaN(currentTime)) {
				currentTime = 0;
			}

			var duration = t.getDuration();

			if (isNaN(duration) || duration === Infinity || duration < 0) {
				t.media.duration = t.options.duration = duration = 0;
			}

			if (t.options.duration > 0) {
				duration = t.options.duration;
			}

			var timecode = mejs.Utils.secondsToTimeCode(duration - currentTime, t.options.alwaysShowHours, t.options.showTimecodeFrameCount, t.options.framesPerSecond, t.options.secondsDecimalLength, t.options.timeFormat);

			if (timecode.length > 5) {
				mejs.Utils.addClass(t.getElement(t.container), t.options.classPrefix + 'long-video');
			} else {
				mejs.Utils.removeClass(t.getElement(t.container), t.options.classPrefix + 'long-video');
			}

			if (t.getElement(t.controls).querySelector('.' + t.options.classPrefix + 'remainingtime')) {
				t.getElement(t.controls).querySelector('.' + t.options.classPrefix + 'remainingtime').innerText = timecode;
			}
		}
	});
	
	},{}]},{},[1]);
