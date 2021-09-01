$(function(){

    

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


      $('.menu__btn').on('click', function(){
        $('.menu__list').slideToggle();
      });

      $('.header__btn-menu').on('click', function(){
        $('.header_box').toggleClass('active');
      });

    
});

var mixer = mixitup('.products__inner-box');
