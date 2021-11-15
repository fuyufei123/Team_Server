/*--------------------------------------------------------------------
 *JAVASCRIPT "FakeLoader.js"
 *Version:    1.1.0 - 2014
 *author:     João Pereira
 *website:    http://www.joaopereira.pt
 *Licensed MIT 
-----------------------------------------------------------------------*/
(function ($) {
    var GlassDiv;
    $.fn.fakeLoader = function (options) {

        //Defaults
        var settings = $.extend({
            glassDiv: "#freedom_content",
            loadText: "loading...",
            close: "",
            timeToHide: 1200, // Default Time to hide fakeLoader
            pos: 'fixed',// Default Position
            top: '0px',  // Default Top value
            left: '0px', // Default Left value
            width: '100%', // Default width 
            height: '100%', // Default Height
            zIndex: '9999',  // Default zIndex 
            bgColor: 'rgba(0,0,0,0.2)', // Default background color
            spinner: 'spinner2', // Default Spinner
            imagePath: '' // Default Path custom image
        }, options);

        //Customized Spinners
        var spinner02 = '<div class="fl spinner2">'
            + '<div class="spinner-container container1">'
            + '<div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div>'
            + '</div><div class="spinner-container container2">'
            + '<div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div>'
            + '</div><div class="spinner-container container3">'
            + '<div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div>'
            + '</div>'
            + '<span>这里是文字描述！</span></div>';

        //The target
        var el = $(this);
        if (el.find(".f1").length == 0) {
            $(settings.glassDiv).addClass("glass_cover");
            //Init styles
            var initStyles = {
                'position': settings.pos,
                'width': settings.width,
                'height': settings.height,
                'top': settings.top,
                'left': settings.left
            };

            //Apply styles
            el.css(initStyles);

            //Each 
            el.each(function () {
                var a = settings.spinner;
                //console.log(a)
                el.html(spinner02);

                //Add customized loader image

                if (settings.imagePath != '') {
                    el.html('<div class="fl"><img src="' + settings.imagePath + '"></div>');
                }
                centerLoader();
            });
        }
        el.find("span").html(settings.loadText);
        el.show();
        if (settings.close == "close") {
            $(el).empty();
            $(el).hide();
            $(settings.glassDiv).removeClass("glass_cover");
        }
        //Time to hide fakeLoader
        //setTimeout(function () {
        //    $(el).fadeOut();
        //}, settings.timeToHide);

        //Return Styles 
        return this.css({
            'backgroundColor': settings.bgColor,
            'zIndex': settings.zIndex
        });


    }; // End Fake Loader


    //Center Spinner
    function centerLoader() {

        var winW = $('.fl').parent().width();
        var winH = $('.fl').parent().height();

        var spinnerW = $('.fl').outerWidth();
        var spinnerH = $('.fl').outerHeight() + 100;

        $('.fl').css({
            'position': 'absolute',
            'left': (winW / 2) - (spinnerW / 2),
            'top': (winH / 2) - (spinnerH / 2)
        });

    }

    $(window).load(function () {
        centerLoader();
        $(window).resize(function () {
            centerLoader();
        });
    });


}(jQuery));



