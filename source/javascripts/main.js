// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/**
 * Toggle the navigation menu (small screens)
 * Adapted from http://a11yproject.com/patterns/
 */
(function(document, window, undefined) {

  'use strict';
  
  // Vars
  var menu = document.getElementById('menu'),
      menuButton = document.getElementById('menu-button')

  // Menu properties
  menu.setAttribute('aria-hidden', 'true');
  menu.setAttribute('aria-labelledby', 'menu-button');

  // Handle button click event
  menuButton.addEventListener('click', function () {
    
    // If active...
    if (menu.classList.contains('active')) {
      // Hide
      menu.classList.remove('active');
      menu.setAttribute('aria-hidden', 'true');
      menuButton.setAttribute('aria-expanded', 'false');
    } else {
      // Show
      menu.classList.add('active');
      menu.setAttribute('aria-hidden', 'false');
      menuButton.setAttribute('aria-expanded', 'true');

      // Set focus on first link
      // menu.children[0].children[0].children[0].focus();
    }
  }, false);

  $(".nav a").click(function(){
    if (menu.classList.contains('active')) {
      // Hide
      menu.classList.remove('active');
      menu.setAttribute('aria-hidden', 'true');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });

  // underline under the active nav item
  // $(".nav .nav-link").click(function() {
  //   $(".nav .nav-link").each(function() {
  //     $(this).removeClass("active-nav-item");
  //   });
  //   $(this).addClass("active-nav-item");
  // });
  
})(document, window);

/**
 * Update the navigation bar style after some scrolling
 */
$(function(){
  $(document).scroll(function() {
    var navbar = $('.index .navbar');
    if( $(this).scrollTop() > $(window).height()/2) {
      $(navbar).removeClass('index');
    }
    else if ( $(this).scrollTop() < $(window).height()/2)  { 
      $(navbar).addClass('index');
    }
  });
  $(document).scroll();
});

$(function() {
  $('a[href*=#]:not([href=#])').click(function () {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

// Vertical timeline
// see http://codyhouse.co/gem/vertical-timeline/
jQuery(document).ready(function($){
  var $timeline_block = $('.cd-timeline-block');

  //hide timeline blocks which are outside the viewport
  $timeline_block.each(function(){
    if($(this).offset().top > $(window).scrollTop()+$(window).height()*0.75) {
      $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
    }
  });

  //on scolling, show/animate timeline blocks when enter the viewport
  $(window).on('scroll', function(){
    $timeline_block.each(function(){
      if( $(this).offset().top <= $(window).scrollTop()+$(window).height()*0.75 && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) {
        $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
      }
    });
  });
});
