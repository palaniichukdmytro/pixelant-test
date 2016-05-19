$(document).ready(function() {
    $('.owl-carousel').owlCarousel({
        responsiveClass: true,
        responsive: {
            0: {
                items: 2,
                nav: true,
                autoplay: true
            },
            600: {
                items: 3,
                nav: true
            },
            1000: {
                items: 5,
                nav: true,
                loop: false
            }
        }
    });
    $('.main-carousel').flickity({
        // options
        cellAlign: 'left',
        contain: true,
        freeScroll: true,
        wrapAround: true,
        lazyLoad: true
    });
});
