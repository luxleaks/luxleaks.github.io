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

// Newsletter subscribe/unsubscribe forms
$(document).ready(function(){

  var parseAPPID = "xrhItm2KbDWjd9CZTQTiWDsL1DZZw2CGv9ZcOzEZ";
  var parseJSID = "kcFJQ5VJEYbZ6Cw6zwJmJnJE1Zv9Fk9VOSL8f9JZ";
  Parse.initialize(parseAPPID, parseJSID);

  var showformalert = function(id,type) {
    var alert = document.getElementById(id);
    alert.innerHTML = alert.getAttribute("data-"+type);
    alert.classList.remove("newsletterform_alert-error");
    alert.classList.remove("newsletterform_alert-success");
    alert.classList.add("newsletterform_alert-"+type)
    alert.setAttribute('aria-hidden', 'false');
  }
  var hideformalert = function(id) {
    var alert = document.getElementById(id);
    alert.innerHTML = '&nbsp;';
    alert.classList.remove("newsletterform_alert-error");
    alert.classList.remove("newsletterform_alert-success");
    alert.setAttribute('aria-hidden', 'true');
  }

  //
  // Subscribe Form
  //
  $('#news-sub-email').focus(function(e){
    hideformalert("news-sub-response");
  }); 
  $('#news-sub').submit(function(e){
    e.preventDefault();
 
    // Grab the elements from the form to make up
    // an object containing name, email and message
    var data = { 
      email: document.getElementById('news-sub-email').value,
      list: document.getElementById('news-sub').getAttribute("data-list")
    }
     showformalert("news-sub-response","success");
    // Run our Parse Cloud Code and 
    // pass our 'data' object to it
    Parse.Cloud.run("subscribe", data, {
      success: function(object) {
        showformalert("news-sub-response","success");
      },
 
      error: function(object, error) {
        console.log(error);
        showformalert("news-sub-response","error");
      }
    });
  });

  //
  // Unsubscribe Form
  //

  $('#news-unsub-email').focus(function(e){
    hideformalert("news-unsub-response");
  });
  $('#news-unsub').submit(function(e){
    e.preventDefault();

    // Grab the elements from the form to make up
    // an object containing name, email and message
    var data = { 
      email: document.getElementById('news-unsub-email').value,
      list: document.getElementById('news-unsub').getAttribute("data-list")
    }
    // Run our Parse Cloud Code and 
    // pass our 'data' object to it
    Parse.Cloud.run("unsubscribe", data, {
      success: function(object) {
        showformalert("news-unsub-response","success");
      },
 
      error: function(object, error) {
        console.log(error);
        showformalert("news-unsub-response","error");
      }
    });

  });
 
});
