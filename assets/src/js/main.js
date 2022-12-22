(function($) {
    "use strict";

    // Document ready
    $(function() {});

    // On window load
    $(window).on("load", function() {});
})(jQuery);

const text = document.querySelector(".trip-information__content__readmore");

const texthidden = document.querySelector(".trip-information__content__description__more");

text.onclick = (e) => {
    e.preventDefault();
    texthidden.classList.toggle("text-show");
    const textFull = document.querySelector(".text-show");
    if (textFull) {
        texthidden.style.display = "block";
        text.innerHTML = "Read less";
    } else {
        texthidden.style.display = "-webkit-box";
        text.innerHTML = "Read more";
    }
};

//content
const text1 = document.querySelector(".trip-detail__content__showmore");
const texthidden1 = document.querySelector(".post-content");

text1.onclick = (e) => {
    e.preventDefault();
    texthidden1.classList.toggle("post-content--full");
    text1.classList.toggle("active");
};
