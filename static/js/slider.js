//update var length with the number of your photos

//280118    var length = 26;
var length = 33;    //280118

var css;


$(document).ready(function () {

    var actual = 1;

    var next;


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


    $('.slideshow-container img').on('load', function () {

        setImageOrientation($('#main-pic'));

        $("#main-pic").attr("style", "visibility: visible" + css);

        load_counter++;

        if (images_number == load_counter) {

            $('.loading').hide();

            $('.slideshow').fadeIn('slow');

            //nico$('.phototumbnails').fadeIn('slow');


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


    var isChanged = false;

    function setImageOrientation(image) {

        var img = new Image();

        css = "";

        img.src = image.attr('src');

        var imageHeight = img.height;

        var imageWidth = img.width;

        console.log("image: " + imageHeight + " " + imageWidth);

        //280118    if(imageWidth > imageHeight && next != 2 && next != 6 && next != 9 && next != 12 && next != 22 && next != 23 && next != 24 && next != 25){
        if (imageWidth > imageHeight && next != 2 && next != 7 && next != 10 && next != 15 && next != 28 && next != 29 && next != 30) {   //280118

            if (isChanged) {

                //image.css("transform", "rotate(0)");

                css = ";transform:rotate(0deg);";

                isChanged = false;

            }

        } else {

            changeOrientation(image);

            return;

        }

    };


    function changeOrientation(image) {

        console.log("cambio orientamento");

        if (next == 99) {

            //image.css("transform", "rotate(90deg)");

            css = ";transform:rotate(90deg);";

            //280118    } else if (next == 2 || next == 6 || next == 9 || next == 12 || next == 22 || next == 23 || next == 24 || next == 25){
        } else if (next == 2 || next == 7 || next == 10 || next == 15 || next == 28 || next == 29 || next == 30) {  //280118

            //image.css("transform", "rotate(-90deg)");

            css = ";transform:rotate(-90deg);";

        } else {

            //image.css("transform", "rotate(0)");

            css = ";transform:rotate(0deg);";

        }

        isChanged = true;

    };


    function changeImage(i) {

        next = actual + i;

        if (next != length + 1 && next > 0) {

            //$("#main-pic").attr("style", "visibility: hidden");

            $("#main-pic").fadeOut(600, function(){
                var promise = new Promise( function(resolve, reject){
                    $('#main-pic').attr('src', './static/images/' + next + '.jpg');
                    resolve("fatto");
                }).then( done => {
                    $("#main-pic").fadeIn('slow', function(){
                        //mostra l'immagine
                    });
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