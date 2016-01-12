// Global JS goes here

$('.nav-trigger').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $('.nav-block').toggleClass('nav-block-open');
});

$('.nav-block').on('click', function (e) {
    e.stopPropagation();
});

$(window).on('click', function () {
    $('.nav-block').removeClass('nav-block-open');
});