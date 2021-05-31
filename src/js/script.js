$(document).ready(function(){
    //SLIDER IN HEAD
    $('.slider-fullscreen__wrapper').slick({
        dots: true,
        slidesToShow: 1
    });
    if ($(window).width() <= 640){
        $('.slider-fullscreen__wrapper').slick('unslick');
    }  
    $('.slider-fullscreen').find('.slick-prev').html('<img src="icons/arrow_one.png" alt="arrow"></img>');
    $('.slider-fullscreen').find('.slick-next').html('<img src="icons/arrow_one.png" alt="arrow"></img>');

    //SUBMENU
    $('.submenu').css('display', 'none'); 
    if ($(window).width() <= 1024){
        $(document).on('click', '.header__cash', function(e){
            if ($('.submenu').css('display') == 'none'){
                $('.submenu').css('display', 'block');
                $('.submenu').prev().css({
                    'transform':'rotate(-90deg)'
                })
            }
            else {
                $('.submenu').css('display', 'none');
                $('.submenu').prev().css({
                    'transform':'rotate(0deg)'
                })
            }
        });
    }
    else{
        $(document).on('mouseover', '.header__cash', function(){
            $('.submenu').css('display', 'block');
        });
        $(document).on('mouseout', '.header__cash', function(){
            $('.submenu').css('display', 'none');
        }); 
    }
    
    $('.sub-menu__list').css('display', 'none'); //NAV
    $(document).on('mouseover', '.sub-menu__item', function(e){
        $(this).find('.sub-menu__list').css('display', 'block');
    })
    $(document).on('mouseout', '.sub-menu__item', function(e){
        $(this).find('.sub-menu__list').css('display', 'none');
    })

    if ($(window).width() <= 768){
        $(document).on('click', '.sub-menu__mobile-open', function(e){
            if ($('.sub-menu').css('display') == 'none') {
                $('.sub-menu').css('display', 'block');
            }
            else $('.sub-menu').css('display', 'none');
        })
    }

    //SLIDERS IN GOODS
    function powerSlick(elem){
        $(elem).slick({
            centerMode: true,
            centerPadding: '80px',
            slidesToShow: 8,
            adaptiveHeight: true,
            appendArrows: $('.sliders-goods__arrows-block'),
            responsive: [
                {
                  breakpoint: 2140,
                  settings: {
                    slidesToShow: 6
                  }
                },
                {
                  breakpoint: 1680,
                  settings: {
                    slidesToShow: 5
                  }
                },
                {
                    breakpoint: 1400,
                    settings: {
                      slidesToShow: 4
                    }
                  },
                {
                    breakpoint: 1148,
                    settings: {
                      slidesToShow: 3,
                      centerMode: false,
                      centerPadding: '0px'
                    }
                }
            ]
        });
        currentOnThreeSlides();

        if ($(window).width() <= 640){   
            $('.sliders_active').slick('unslick');  //disabling sliders-good on 640px
        }

        $('.sliders-goods__arrows-block').find('.slick-prev').html('<img src="icons/arrow-two.png" alt="arrow"></img>');
        $('.sliders-goods__arrows-block').find('.slick-next').html('<img src="icons/arrow-two.png" alt="arrow"></img>');

        $('.sliders-goods').on('afterChange', currentOnThreeSlides);
        $('.sliders-goods').on('click', '.slick-arrow', currentOnThreeSlides);

        function currentOnThreeSlides(){ //CURRENT SLIDE ON <=1177 
            let slidesActive = $('.sliders_active').find('.slick-active');
            if (($(window).width() <= 1148) && ($(window).width() >= 641)) {
                $(slidesActive[2]).css({
                    'transform': 'scale(' + 1.07 + ')',
                    'transition': '0.5s'
                });
                $(slidesActive[2]).find('.product-card').css('box-shadow', '0px 0px 3px 2px #be6e52');
                $(slidesActive[2]).siblings().css({
                    'transform': 'scale(' + 1 + ')',
                    'transition': '0.5s'
                });
                $(slidesActive[2]).siblings().find('.product-card').css('box-shadow', 'none');
            }
        }
    }
    powerSlick($('.sliders_active'));

    $(document).on('click', '.sliders-goods__item-name', function(e){  //SWITCHING TABS
        $(this).addClass('sliders-goods__item-name_active');
        $(this).siblings().removeClass('sliders-goods__item-name_active');
        let numberItem = $(this).attr('data-tabnumber');
        let item = $('[data-tabitem="' + numberItem + '"]');

        for (let i of $('.sliders')){
            if ($(i).hasClass('sliders_active')) {
                $(i).removeClass('sliders_active');
                $(i).slick('unslick');
            } 
        }

        item.addClass('sliders_active');
        powerSlick(item);

        if ($(window).width() <= 640){
            if ($(this).siblings().css('display') == 'flex'){
                $(this).siblings().css('display', 'none');
                $(this).children('.sliders-goods__menu-down-on640px').css({
                    'transform': 'rotate(0deg)',
                    'transition': '0.4s'
                })
            }
            else {
                $('.sliders-goods__item-name').css('display', 'flex');
                $(this).children('.sliders-goods__menu-down-on640px').css({
                    'transform': 'rotate(-90deg)',
                    'transition': '0.4s'
                })
            }

            //using loadMoreGoods when switching tabs
            loadMoreGoods('.sliders_active', '.sliders-goods__slider-whats-hot__item', 'sliders-goods__slider-whats-hot__item_disp-block640px');
        }
    })

    if ($(window).width() <= 640){  //LOAD MORE GOODS IN SLIDERS-GOODS
        $('.loadMoreClass0n640').append($('.sliders-goods__load-more-for640'));
        function loadMoreGoods(parentBlock, childrenBlocks, activeClass){
            let goods = $(parentBlock).children(childrenBlocks);
            let numberDisplayBlockElement = 1;
            $(parentBlock).on('click', '.sliders-goods__load-more-for640', function(e){
                $(goods[numberDisplayBlockElement + 1]).addClass(activeClass);
                $(goods[numberDisplayBlockElement + 2]).addClass(activeClass);
                numberDisplayBlockElement += 2;
            })
        }
        loadMoreGoods('.actual-goods', '.product-card_in-actual-goods', 'product-card_disp-block640px');
        loadMoreGoods('.sliders_active', '.sliders-goods__slider-whats-hot__item', 'sliders-goods__slider-whats-hot__item_disp-block640px');
    }
   

    //SHOP-IT 
    $('.product-card').append($('.sliders-goods__shop-it'));
    $(document).on('mouseover', '.product-card', function(e){
        $(this).find('.sliders-goods__shop-it').css('display', 'flex');
    });
    $(document).on('mouseout', '.product-card', function(e){
        $(this).find('.sliders-goods__shop-it').css('display', 'none');
    });

    //FOOTER-SOCIAL
    let imgs = $('.footer__archive-item_social').find('img');
    for (let n in imgs){
        if (n < 3){
            $(imgs[n]).css('margin-bottom', '9px');
        }
    }

    //REPLACEMENT BIG-SLIDE PICTURE WITH A MOBILE VERSION
    if ($(window).width() < 992){
        $('.slider-fullscreen__item').children('img').attr('src', 'img/other/big-slide-mobile.png');
    }
    //REPLACEMENT BIG-ICONS WITH A MOBILE VERSION
    function replacementBigIcons(nameItem, way){
        $(nameItem).find('img').attr('src', way);
    }
    if ($(window).width() <= 640){
        replacementBigIcons('.header__account', 'icons/account-user-big.png');
        replacementBigIcons('.header__search', 'icons/search-big.png');
        replacementBigIcons('.header__cash', 'icons/submenu-down-grey-big.png');
        replacementBigIcons('.adres-line__add-adres', 'icons/white-plus-big.png');
        replacementBigIcons('.header__logo', 'icons/logo-big.png');
        replacementBigIcons('.header__basket', 'icons/basket-big.png');
        replacementBigIcons('.adres-line__networks_facebook', 'icons/social/facebook-big.png');
        replacementBigIcons('.adres-line__networks_twitter', 'icons/social/twitter-big.png');
        replacementBigIcons('.adres-line__networks_pinterest', 'icons/social/pinterest-big.png');
        replacementBigIcons('.sub-menu__item', 'icons/submenu-down-black-big.png');
        replacementBigIcons('.product-card__content', 'icons/white-plus-middle.png');
    }

    $('.footer__nav').on('click', '.footer__nav-block-onen', function(e){
        $('.footer__nav-wrapper').css('height', '200px');
        $('.footer__nav-block').addClass('footer__nav-block_active');
        $(window).scrollTop(parseInt($('body').css('height')));
    });
    $('.footer__nav').on('click', '.footer__nav-block-close', function(e){
        $('.footer__nav-wrapper').css('height', 'auto');
        $('.footer__nav-block').removeClass('footer__nav-block_active');
    })

    if ($(window).width() <= 540){
        $('.header__logo').find('img').attr('src', 'icons/logo.png');
    }

    //VALIDARION    
    function validationForm(form){
        $(form).validate({
            rules:{
                email: { 
                    required: true, 
                    email: true 
                }
            },
            messages: { 
                email: {
                    required: "Please enter your email",
                    email: "Incorrect email" 
                }
            }
        })
    }
    validationForm('.adres-line__form');
})
