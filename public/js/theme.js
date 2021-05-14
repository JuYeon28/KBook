;(function($) {
    "use strict";
    
//    var nav_offset_top = $('header').height(); 
//    /*-------------------------------------------------------------------------------
//	  Navbar 
//	-------------------------------------------------------------------------------*/
//
//	//* Navbar Fixed  
//    function navbarFixed(){
//        if ( $('.main_menu_area, .search_area').length ){ 
//            $(window).scroll(function() {
//                var scroll = $(window).scrollTop();   
//                if (scroll >= nav_offset_top ) {
//                    $(".main_menu_area, .search_area").addClass("navbar_fixed");
//                } else {
//                    $(".main_menu_area, .search_area").removeClass("navbar_fixed");
//                }
//            });
//        };
//    };
//    navbarFixed();
    
    
    
    /*----------------------------------------------------*/
    /*  Main Slider js
    /*----------------------------------------------------*/
    function main_slider(){
        if ( $('#main_slider').length ){
            $("#main_slider").revolution({
                sliderType:"standard",
                sliderLayout:"auto",
                delay:5000,
                disableProgressBar:"on",
                navigation: {
                    onHoverStop: 'off',
                    touch:{
                        touchenabled:"on"
                    },
                    arrows: {
                        style:"normal",
                        enable:false,
                        hide_onmobile:true,
                        hide_under:820,
                        hide_onleave:true,
                        hide_delay:200,
                        hide_delay_mobile:1200,
                        left: {
                            h_align: "left",
                            v_align: "center",
                            h_offset: 5,
                            v_offset: 0
                        },
                        right: {
                            h_align: "right",
                            v_align: "center",
                            h_offset: 5,
                            v_offset: 0
                        }
                    },
                },
                responsiveLevels:[4096,1199,992,767,480],
                gridwidth:[1170,1000,750,700,300],
                gridheight:[575,575,575,600,500],
                lazyType:"smart",
                fallbacks: {
                    simplifyAll:"off",
                    nextSlideOnWindowFocus:"off",
                    disableFocusListener:false,
                }
            })
        }
    }
    main_slider();
    
    /*----------------------------------------------------*/
    /*  Main Slider js
    /*----------------------------------------------------*/
    function product_slider(){
        if ( $('#product_slider').length ){
            $("#product_slider").revolution({
                sliderType:"standard",
                sliderLayout:"auto",
                delay:5000,
                disableProgressBar:"on",
                navigation: {
                    keyboardNavigation:"off",
                    keyboard_direction: "horizontal",
                    mouseScrollNavigation:"off",
                    onHoverStop:"off",
                    arrows: {
                        style:"uranus",
                        enable:true,
                        hide_onmobile:true,
                        hide_under:778,
                        hide_onleave:true,
                        hide_delay:200,
                        hide_delay_mobile:1200,
                        tmp:'',
                        left: {
                            h_align:"left",
                            v_align:"center",
                            h_offset:20,
                            v_offset:0
                        },
                        right: {
                            h_align:"right",
                            v_align:"center",
                            h_offset:20,
                            v_offset:0
                        }
                    }
                    ,
                    thumbnails: {
                        style:"erinyen",
                        enable:true,
                        width:80,
                        height:105,
                        min_width:80,
                        wrapper_padding:0,
                        wrapper_color:"#fff",
                        wrapper_opacity:"1",
                        tmp:'<span class="tp-thumb-over"></span><span class="tp-thumb-image"></span><span class="tp-thumb-title"></span>',
                        visibleAmount:10,
                        hide_onmobile:false,
                        hide_onleave:false,
                        direction:"horizontal",
                        span:true,
                        position:"outer-bottom",
                        space:17,
                        h_align:"center",
                        v_align:"top",
                        h_offset:0,
                        v_offset:0
                    }
                },
                gridwidth:370,
                gridheight:520,
                lazyType:"none",
                shadow:0,
                spinner:"spinner2",
                stopLoop:"on",
                stopAfterLoops:0,
                stopAtSlide:1,
                shuffle:"off",
                autoHeight:"off",
                disableProgressBar:"on",
                hideThumbsOnMobile:"off",
                hideSliderAtLimit:0,
                hideCaptionAtLimit:0,
                hideAllCaptionAtLilmit:0,
                debugMode:false,
                fallbacks: {
                    simplifyAll:"off",
                    nextSlideOnWindowFocus:"off",
                    disableFocusListener:false,
                }
            })
        }
    }
    product_slider();
    
    /*----------------------------------------------------*/
    /*  Main Slider js
    /*----------------------------------------------------*/
    function product_slider2(){
        if ( $('#product_slider2').length ){
            $("#product_slider2").revolution({
                sliderType:"standard",
                sliderLayout:"auto",
                delay:5000,
                disableProgressBar:"on",
                navigation: {
                    keyboardNavigation:"on",
                    keyboard_direction: "horizontal",
                    mouseScrollNavigation:"off",
                    onHoverStop:"off",
                    touch:{
                        touchenabled:"on",
                        swipe_threshold: 75,
                        swipe_min_touches: 1,
                        swipe_direction: "horizontal",
                        drag_block_vertical: false
                    }
                    ,
                    arrows: {
                        style:"hesperiden",
                        enable:true,
                        hide_onmobile:true,
                        hide_under:778,
                        hide_onleave:true,
                        hide_delay:200,
                        hide_delay_mobile:200,
                        tmp:'',
                        left: {
                            h_align:"left",
                            v_align:"center",
                            h_offset:20,
                            v_offset:0
                        },
                        right: {
                            h_align:"right",
                            v_align:"center",
                            h_offset:20,
                            v_offset:0
                        }
                    }
                    ,
                    thumbnails: {
                        style:"gyges",
                        enable:true,
                        width:78,
                        height:104,
                        min_width:100,
                        wrapper_padding:0, 
                        wrapper_color:"#fff",
                        wrapper_opacity:"1",
                        tmp:'<span class="tp-thumb-img-wrap">  <span class="tp-thumb-image"></span></span>',
                        visibleAmount:5,
                        hide_onmobile:false,
                        hide_over:777,
                        hide_onleave:false,
                        direction:"vertical",
                        span:true,
                        position:"outer-left",
                        space:15,
                        h_align:"left",
                        v_align:"top",
                        h_offset:0,
                        v_offset:0
                    }
                    ,
                    tabs: {
                        style:"gyges",
                        enable:true,
                        width:100,
                        height:105,
                        min_width:100,
                        wrapper_padding:0,
                        wrapper_color:"#fff",
                        wrapper_opacity:"0",
                        tmp:'<div class="tp-tab-content">  <span class="tp-tab-date">{{param1}}</span>  <span class="tp-tab-title">{{title}}</span></div><div class="tp-tab-image"></div>',
                        visibleAmount: 10,
                        hide_onmobile: true,
                        hide_under:778,
                        hide_onleave:false,
                        hide_delay:200,
                        direction:"vertical",
                        span:true,
                        position:"outer-left",
                        space:0,
                        h_align:"left",
                        v_align:"top",
                        h_offset:0,
                        v_offset:0
                    }
                },
                gridwidth:370,
                gridheight:520,
                lazyType:"none",
                shadow:0,
                spinner:"spinner2",
                stopLoop:"on",
                stopAfterLoops:0,
                stopAtSlide:1,
                shuffle:"off",
                autoHeight:"off",
                disableProgressBar:"on",
                hideThumbsOnMobile:"off",
                hideSliderAtLimit:0,
                hideCaptionAtLimit:0,
                hideAllCaptionAtLilmit:0,
                debugMode:false,
                fallbacks: {
                    simplifyAll:"off",
                    nextSlideOnWindowFocus:"off",
                    disableFocusListener:false,
                }
            })
        }
    }
    product_slider2();
    
    /*----------------------------------------------------*/
    /*  Main Slider js
    /*----------------------------------------------------*/
    function fullwidth_slider(){
        if ( $('#fullwidth_slider').length ){
            $("#fullwidth_slider").revolution({
                sliderType:"standard",
                sliderLayout:"auto",
                delay:5000,
                disableProgressBar:"on",
                navigation: {
                    onHoverStop: 'off',
                    touch:{
                        touchenabled:"on"
                    },
                    arrows: {
                        style:"normal",
                        enable:false,
                        hide_onmobile:true,
                        hide_under:820,
                        hide_onleave:true,
                        hide_delay:200,
                        hide_delay_mobile:1200,
                        left: {
                            h_align: "left",
                            v_align: "center",
                            h_offset: 5,
                            v_offset: 0
                        },
                        right: {
                            h_align: "right",
                            v_align: "center",
                            h_offset: 5,
                            v_offset: 0
                        }
                    },
                },
                responsiveLevels:[4096,1320,1199,992,767,480],
                gridwidth:[1380,1170,960,720,700,300],
                gridheight:[900,900,800,700,500,500],
                lazyType:"smart",
                fallbacks: {
                    simplifyAll:"off",
                    nextSlideOnWindowFocus:"off",
                    disableFocusListener:false,
                }
            })
        }
    }
    fullwidth_slider();
    /*----------------------------------------------------*/
    /*  Main Slider js
    /*----------------------------------------------------*/
    function home_box_slider(){
        if ( $('#home_box_slider').length ){
            $("#home_box_slider").revolution({
                sliderType:"standard",
                sliderLayout:"auto",
                delay:50000000,
                disableProgressBar:"on",
                navigation: {
                    onHoverStop: 'off',
                    touch:{
                        touchenabled:"on"
                    },
                    arrows: {
                        style:"normal",
                        enable:true,
                        hide_onmobile:true,
                        
                        left: {
                            h_align: "right",
                            v_align: "bottom",
                            h_offset: 60,
                            v_offset: 10
                        },
                        right: {
                            h_align: "right",
                            v_align: "bottom",
                            h_offset: 10,
                            v_offset: 10
                        }
                    },
                },
                responsiveLevels:[4096,1320,1199,992,767,480],
                gridwidth:[870,870,870,720,700,350],
                gridheight:[450,450,450,450,450,410],
                lazyType:"smart",
                fallbacks: {
                    simplifyAll:"off",
                    nextSlideOnWindowFocus:"off",
                    disableFocusListener:false,
                }
            })
        }
    }
    home_box_slider();
  
    
    /*----------------------------------------------------*/
    /*  Explor Room Slider
    /*----------------------------------------------------*/
    function l_product_slider(){
        if ( $('.l_product_slider').length ){
            $('.l_product_slider').owlCarousel({
                loop:true,
                margin: 30,
                items: 4,
                nav:true,
                autoplay: true,
                smartSpeed: 1500,
                dots:false,
                navContainerClass: 'l_product_slider',
                navText: ['<i class="arrow_carrot-left" aria-hidden="true"></i>','<i class="arrow_carrot-right" aria-hidden="true"></i>'],
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    575: {
                        items: 2,
                    },
                    992: {
                        items: 3,
                    },
                    1200: {
                        items: 4,
                    }
                }
            })
        }
    }
    l_product_slider();
    /*----------------------------------------------------*/
    /*  Explor Room Slider
    /*----------------------------------------------------*/
    function home_l_product_slider(){
        if ( $('.home_l_product_slider').length ){
            $('.home_l_product_slider').owlCarousel({
                loop:true,
                margin: 30,
                items: 3,
                nav:true,
                autoplay: false,
                smartSpeed: 1500,
                dots:false,
                navContainerClass: 'home_l_product_slider',
                navText: ['<i class="arrow_carrot-left" aria-hidden="true"></i>','<i class="arrow_carrot-right" aria-hidden="true"></i>'],
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    575: {
                        items: 2,
                    },
                    992: {
                        items: 2,
                    },
                    1200: {
                        items: 3,
                    }
                }
            })
        }
    }
    home_l_product_slider();
    /*----------------------------------------------------*/
    /*  Explor Room Slider
    /*----------------------------------------------------*/
    function sunglass_slider(){
        if ( $('.sunglass_slider').length ){
            $('.sunglass_slider').owlCarousel({
                loop:true,
                margin: 0,
                items: 1,
                nav:false,
                autoplay: true,
                smartSpeed: 1500,
                dots:true,
            })
        }
    }
    sunglass_slider();
    
    /*----------------------------------------------------*/
    /*  Explor Room Slider
    /*----------------------------------------------------*/
    function fillter_slider(){
        if ( $('.fillter_slider').length ){
            $('.fillter_slider').owlCarousel({
                loop:true,
                margin: 30,
                items: 3,
                nav:true,
                autoplay: false,
                smartSpeed: 1500,
                dots:true, 
                navContainer: '.f_product_left',
                navText: ['<i class="arrow_carrot-left" aria-hidden="true"></i>','<i class="arrow_carrot-right" aria-hidden="true"></i>'],
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    420: {
                        items: 2,
                    },
                    768: {
                        items: 3,
                    }
                }
            })
        }
    }
    fillter_slider();
    
    /*----------------------------------------------------*/
    /*  Explor Room Slider
    /*----------------------------------------------------*/
    function fillter_p_slider(){
        if ( $('.fillter_product_slider').length ){
            $('.fillter_product_slider').owlCarousel({
                loop:true,
                margin: 30,
                items: 4,
                nav:true,
                autoplay: false,
                smartSpeed: 1500,
                dots:true, 
                navContainerClass: 'fillter_product_slider',
                navText: ['<i class="arrow_carrot-left" aria-hidden="true"></i>','<i class="arrow_carrot-right" aria-hidden="true"></i>'],
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    575: {
                        items: 2,
                    },
                    992: {
                        items: 3,
                    },
                    1199: {
                        items: 4,
                    }
                }
            })
        }
    }
    fillter_p_slider();
    
    /*----------------------------------------------------*/
    /*  Explor Room Slider
    /*----------------------------------------------------*/
    function carousel_slider(){
        if ( $('.home_carousel_slider').length ){
            $('.home_carousel_slider').owlCarousel({
                loop:true,
                margin: 0,
                items: 5,
                nav:true,
                autoplay: false,
                smartSpeed: 1500,
                dots:true, 
                navContainer: '.home_carousel_slider',
                navText: ['<i class="arrow_carrot-left" aria-hidden="true"></i>','<i class="arrow_carrot-right" aria-hidden="true"></i>'],
                responsive: {
                    0: {
                        items: 1,
                    },
                    575: {
                        items: 2,
                    },
                    800: {
                        items: 3,
                    },
                    1200: {
                        items: 5,
                    }
                }
            })
        }
    }
    carousel_slider();
    
   
    
    /*----------------------------------------------------*/
    /*  portfolio_isotope
    /*----------------------------------------------------*/
    function main_gallery(){
        if ( $('.fillter_slider_inner, .isotope_l_p_inner').length ){
            // Activate isotope in container
            $(".fillter_slider_inner, .isotope_l_p_inner").imagesLoaded( function() {
                $(".fillter_slider, .isotope_l_p_inner").isotope({
                    layoutMode: 'masonry',
                    percentPosition:true,
                    columnWidth: 1
        //            masonry: {
        //                columnWidth: '.grid-sizer, .grid-sizer_two',
        //            }            
                }); 
            }); 
        }
    }
    main_gallery();
    
    
    /*----------------------------------------------------*/
    /*  Isotope Fillter js
    /*----------------------------------------------------*/
    function portfolio_isotope(){
        if ( $('.portfolio_filter li, .fillter_l_p li').length ){
            // Add isotope click function
            $(".portfolio_filter li, .fillter_l_p li").on('click',function(){
                $(".portfolio_filter li, .fillter_l_p li").removeClass("active");
                $(this).addClass("active");

                var selector = $(this).attr("data-filter");
                $(".fillter_slider .owl-item, .isotope_l_p_inner, .fillter_product_slider .owl-item, .home_l_product_slider .owl-item").isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 450,
                        easing: "linear",
                        queue: false,
                    }
                });
                return false;
            });
        }
    }
    
    portfolio_isotope();
    
    
    /*----------------------------------------------------*/
    /*  Language Flag js 
    /*----------------------------------------------------*/
    function createByJson() {
        var jsonData = [					
            {description:'Choos your payment gateway', value:'', text:'Payment Gateway'},					
            {image:'../img/icon/flag-1.png', description:'My life. My card...', value:'amex', text:'Amex'},
            {image:'../img/icon/flag-1.png', description:'It pays to Discover...', value:'Discover', text:'Discover'},
            {image:'../img/icon/flag-1.png', title:'For everything else...', description:'For everything else...', value:'Mastercard', text:'Mastercard'},
            {image:'../img/icon/flag-1.png', description:'Sorry not available...', value:'cash', text:'Cash on devlivery', disabled:true},
            {image:'../img/icon/flag-1.png', description:'All you need...', value:'Visa', text:'Visa'},
            {image:'../img/icon/flag-1.png', description:'Pay and get paid...', value:'Paypal', text:'Paypal'}
        ];
        $("#byjson").msDropDown({byJson:{data:jsonData, name:'payments2'}}).data("dd");
    }
    $(document).ready(function(e) {		
    //no use
    try {
        var pages = $("#pages").msDropdown({on:{change:function(data, ui) {
            var val = data.value;
            if(val!="")
                window.location = val;
        }}}).data("dd");

        var pagename = document.location.pathname.toString();
        pagename = pagename.split("/");
        pages.setIndexByValue(pagename[pagename.length-1]);
        $("#ver").html(msBeautify.version.msDropdown);
    } catch(e) {
    //console.log(e);	
    }
    $("#ver").html(msBeautify.version.msDropdown);

    //convert
    $(".language_drop").msDropdown({roundedBorder:false});
        createByJson();
        $("#tech").data("dd");
    });
    function showValue(h) {
        console.log(h.name, h.value);
    }
    $("#tech").change(function() {
        console.log("by jquery: ", this.value);
    })
    
    
    $(document).ready(function() {
        $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,

            fixedContentPos: false
        });
    });
    

   $(".verticalCarousel").verticalCarousel({
        currentItem: 1,
        showItems: 4,
    });
    
    
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 9000,
      values: [ 70, 9000 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
    
    
    
})(jQuery)

