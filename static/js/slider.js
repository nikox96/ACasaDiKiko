
//280118    var length = 26;
var length = 33;    //280118
var path = "./static/images/";

var css;

var actual = 1;
var next;


$(document).ready(function () {


    //set the first image thumb to active

    //nico$('#1').addClass('thumb-active');


    //load the next image

    $('.next').click(function () {

        if (isInSlideShowMode) {
            isInSlideShowMode = false;
            showStartIcon();
        }

        changeImage(1);

    });


    //load previous image

    $('.back').click(function () {

        if (isInSlideShowMode) {
            isInSlideShowMode = false;
            showStartIcon();

        }

        changeImage(-1);

    });


    //set the main pic base on the thumb that is clicked

    /*nico

        $('.thumb').click(function(){

            updateSliderPosition($(this));

            var id = parseInt(this.id);



            $('#main-pic').attr('src','./static/images/' + id +'.jpg');

            next=id;

            setImageOrientation($('#main-pic'));



            $('#' + actual).removeClass('thumb-active');

            $('#' + id).addClass('thumb-active');

            actual = id;

        });

    nico*/


    //show the slideshow only when its image are full loaded

    $('.slideshow').toggle();

    //nico$('.phototumbnails').toggle();

    $('.loading').show();


    var images_number = $('.slideshow-container img').length;

    // console.log("numero di immagini: " + images_number); 

    var load_counter = 0;
    var firstTime = false;

    $('.slideshow-container img').on('load', function () {

        if (!firstTime) {
            console.log("setImageOrientation: load");

            setImageOrientation($('#main-pic'));

            $("#main-pic").attr("style", "visibility: visible" + css);

            load_counter++;

            if (images_number == load_counter) {

                $('.loading').hide();

                $('.slideshow').fadeIn('slow');

                //nico$('.phototumbnails').fadeIn('slow');
                firstTime = true;
            }
        }

    }).each(function () {

        if (('.slideshow').complete /*nico&& ('phototumbnails').completenico*/) {

            $('.slideshow').trigger('load');

            //nico$('.phototumbnails').trigger('load');


        }

    });


    //move the thumbnails slider base on the photo selected

    /*nico

        function updateSliderPosition(thumb){

            var objectWidth = thumb.width();

            var objectId = thumb.attr("id");

            $('.dx').animate({

                scrollLeft: (objectId-1)*180

                }, 800);

        };nico*/





    function changeImage(i) {

        next = actual + i;
        console.log("actual: " + next + " image_src: " + imageArray[next - 1].src);
        console.log("css: " + imageArrayCss[next-1]);

        if (next != length + 1 && next > 0) {

            //$("#main-pic").attr("style", "visibility: hidden");

            $("#main-pic").fadeOut(600, function () {
                $('#main-pic').css({
                    'display': 'none',
                    'transform': imageArrayCss[next - 1]
                }).attr('src', imageArray[next - 1].src);
                $("#main-pic").fadeIn('slow', function () {
                });
            });


            // setImageOrientation($('#main-pic'));


            //nico$('#' + next).addClass('thumb-active');

            //nicoupdateSliderPosition($('#' + next));


            //nico$('#' + actual).removeClass('thumb-active');

            actual = next;

        } else {

            isInSlideShowMode = false;
            actual = 0;
            changeImage(+1);
            showStartIcon();

        }

    };

    /**
     * SLIDESHOW
     */

    var slideShowStart = $('#slideshow-start');
    var slideShowStop = $('#slideshow-stop');

    var isInSlideShowMode = false;
    // change this to set time between two photos
    var changeImageTime = 2000;

    slideShowStart.click(function () {
        isInSlideShowMode = true;

        showPauseIcon()

        startSlideShow();

    });

    slideShowStop.click(function () {

        isInSlideShowMode = false;

        showStartIcon();

    });

    function startSlideShow() {

        var refreshIntervalId = setInterval(function () {
            if (isInSlideShowMode) {
                changeImage(+1);
            } else {
                showStartIcon();
                clearInterval(refreshIntervalId);
            }
        }, 2000);
    }

    function showStartIcon() {
        slideShowStop.fadeOut('fast', function () {
            slideShowStart.fadeIn('fast', function () { });
        });
    }

    function showPauseIcon() {
        slideShowStart.fadeOut('fast', function () {
            slideShowStop.fadeIn('fast', function () { });
        });
    }

});