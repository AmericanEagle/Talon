

$(document).ready(function() {

    /** Click Navigation **/
    $(".main-nav").clickMenu({landings:false});
    $(".nav-rail").clickMenu({menutype:"accordion", expanders:true});
    $("*[data-slick]").slick();

    /** Slideshow **/
    $('.rotator').each(function(){
        var $this = $(this);

        $this.slick({
            slidesToShow: 1,
            arrows:false,
            lazy:'progressive',
            touchThreshold:5000
        });
    }); 


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
    
    $('a.drop-trigger').on('click',function (e) {
        e.preventDefault();
        var $this = $(this);
        $this.toggleClass('clicked');
        
    });
});  