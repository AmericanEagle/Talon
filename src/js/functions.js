$(document).ready(function() {

    /** Click Navigation **/
    $(".main-nav").clickMenu();
    //$(".nav-rail").clickMenu({menutype:"accordion", expanders:true});


    /** Slideshow 
    $('.rotator').each(function(){
        var $this = $(this);

        $this.slick({
            slidesToShow: 1,
            arrows:false,
            lazy:'progressive',
            touchThreshold:5000
        });
    }); 
    **/   

    /** Stop referrer Phishing hack */
    $("a[target=_blank], a[target=new]").attr("rel", "noopener noreferrer");
    

    /** Click vs. Keyboard user **/
    $('body').on("click", function () {
        var $html = $("html");
        if (!$html.hasClass("click-user")) {
            $html.removeClass("keyboard-user").addClass("click-user");
        }   
    }); 

    $('body').on("keyup", function () {
        var $html = $("html");
        if (!$html.hasClass("keyboard-user")) {
            $html.removeClass("click-user").addClass("keyboard-user");
        }
    });
    

    /** Remove pointer events to assist with FPS **/
    var body = document.body,
        cover = document.createElement('div'),
        timer;

    cover.setAttribute('class', 'scroll-cover');

    window.addEventListener('scroll', function () {
        clearTimeout(timer);
        body.appendChild(cover);
 
        timer = setTimeout(function () {
            body.removeChild(cover);
        }, 300);
    }, false);


    /** Button/Anchor Keyboard User Fix **/
    (function($, talonUtil, undefined){
    "use strict"; 

    talonUtil.a11yClick = function(event){
        if(event.type === 'click' || event.type === 'touchstart'){
            return true;
        }

        else if(event.type === 'keypress'){
            var code = event.charCode || event.keyCode;

            if(code === 32) {
                event.preventDefault();
            }

            if((code === 32)|| (code === 13)){
                return true;
            }

        } else {
            return false;
        }
    };

    })(jQuery, window.talonUtil = window.talonUtil || {});


    /** iOS FIX to incorrect focus bug with keyboard not showing up and then the last touchup element gets clicked. **/
    if (/iPad|iPhone|iPod/g.test(navigator.userAgent)) {
        (function ($) {
            return $.fn.focus = function () {
                return arguments[0];
            };
        })(jQuery);
    }
});  