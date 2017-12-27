(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
    'use strict';
    
    Object.assign(MediaElementPlayer.prototype, {
        buildtitlebar: function buildtitlebar(player, controls, layers, media) {
            var t = this,
                titlebar1 = document.createElement('div'),
                titlebar2 = document.createElement('div');

            debugger;

            titlebar1.className = t.options.classPrefix + 'titlebar';
            titlebar2.className = t.options.classPrefix + 'titlebar';

            titlebar1.style = "margin-left: 50px; margin-right: 75px";
            titlebar2.style = "margin-left: 50px; margin-right: 75px";

            t.addControlElement(titlebar1, 'titlebar1');
            t.addControlElement(titlebar2, 'titlebar2');

            player.updateTitlebar();

            t.updateTitleCallback = () => {
                if (t.controlsAreVisible) {
                    player.updateTitlebar();
                }
            };

            media.addEventListener('timeupdate', t.updateTitleCallback);
        },
        cleantitlebar (player, controls, layers, media) {
            media.removeEventListener('timeupdate', player.updateTitleCallback);
        },
        updateTitlebar ()  {
            const t = this;

            //debugger;
        }
    });
    
    },{}]},{},[1]);
