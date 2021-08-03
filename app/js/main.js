$(function(){

    var mixer = mixitup('.products__inner-box');

    $(".rate-star").rateYo({
        rating: 3.6,
        starWidth: "12px",
      });

      $('.product-slider__inner').slick({
        arrows: false,
        dots: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 2,
      });

});


