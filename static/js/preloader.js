var length = 33;    //280118
var path = "./static/images/";

var actual = 1;
var preloadNext;

/**
 * preload images
 */
var imageArray = [];
var imageArrayCss = [];

for (var i = 1; i <= length; i++) {
    preloadNext = i;

    var name = path + i + ".jpg";

    var image_preload = new Image();
    imageArray.push(image_preload);

    image_preload.src = name;

    setImageOrientation(image_preload).then(css => {

        imageArrayCss.push(css);
    });
}


function setImageOrientation(image) {
    var css = "";
    var promise = new Promise(function (resolve, reject) {
        if (preloadNext === 99) {

            //image.css("transform", "rotate(90deg)");

            css = "rotate(90deg)";

            //280118    } else if (preloadNext == 2 || preloadNext == 6 || preloadNext == 9 || preloadNext == 12 || preloadNext == 22 || preloadNext == 23 || preloadNext == 24 || preloadNext == 25){
        } else if (preloadNext === 2 || preloadNext === 7 || preloadNext === 10 || preloadNext === 15 || preloadNext === 28 || preloadNext === 29 || preloadNext === 30) {  //280118

            //image.css("transform", "rotate(-90deg)");

            css = "rotate(-90deg)";

        } else {

            //image.css("transform", "rotate(0)");

            css = "rotate(0deg)";

        }

        resolve(css);
    });

    return promise;
};

