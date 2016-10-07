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

    $$(".nav a")._.addEventListener('click', function () {
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
$.ready().then(function(){
    document.addEventListener("scroll", function() {
        var navbar = $('.index .navbar');
        var doc = navbar.ownerDocument;
        var win = doc.defaultView || doc.parentWindow;
        var scrollTop = win.pageYOffset || doc.documentElement.scrollTop;
        if( scrollTop > win.innerHeight/2) {
            navbar.classList.remove('index');
        }
        else if ( scrollTop < win.innerHeight/2)  { 
            navbar.classList.add('index');
        }
    });
    document.dispatchEvent(new Event("scroll"));
});


/**
 * Smooth scrolling
 * Replaced by CSS property 'scroll-behavior'
 * TODO implement a polyfill?
 */
// $.ready().then(function(){
//   $$("a[href*='#']:not([href='#'])")._.addEventListener("click",function () {
//     if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
//       var target = $(this.hash);
//       target = target ? target : $('[name=' + this.hash.slice(1) +']');
//       if (target) {
//         $$('html,body')._.transition({
//           scrollTop: target.offsetTop;
//         }, 1000);
//         return false;
//       }
//     }
//   });
// });

// Vertical timeline
// see http://codyhouse.co/gem/vertical-timeline/
$.ready().then(function(){
    var timeline_block = $$('.cd-timeline-block');
    var win = document.defaultView || document.parentWindow;

    //hide timeline blocks which are outside the viewport
    timeline_block.forEach(function(block){
        if(block.getBoundingClientRect().top > win.innerHeight*0.75) {
            $$('.cd-timeline-img, .cd-timeline-content',block).forEach(function(el){
                el.classList.add('is-hidden');
            });
        }
    });

    //on scolling, show/animate timeline blocks when enter the viewport
    win.addEventListener('scroll', function(){
        timeline_block.forEach(function(block){
            if(block.getBoundingClientRect().top <= win.innerHeight*0.75 ) {
                $$('.cd-timeline-img, .cd-timeline-content',block).forEach(function(el){
                    el.classList.remove('is-hidden');
                    el.classList.add('bounce-in');
                });

            }
        });
    });
});
