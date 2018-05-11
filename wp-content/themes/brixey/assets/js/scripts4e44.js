/*
 * jQuery custom scripts.
 * Author & Copyright: VictorThemes
 * URL: http://themeforest.net/user/VictorThemes
 */
jQuery(document).ready(function($) {
  "use strict";
  var vidId = $('#video_player').data('id');
  if ($('body div').hasClass('has-video')) {
    $('#video_player').YTPlayer({
      videoId: vidId,
      quality: 'hd720',
    callback: function() {
      $('.brxy-play-btn a').click(function () {
      if ($('#video_player').get(0).paused) {
        $('#video_player').get(0).play();
      }
      else {
        $('#video_player').get(0).pause();
      }
      $('.brxy-play-btn').toggleClass('pause-btn');
    });
    }
    });
  }
  $('.brxy-form input[type="checkbox"]').after('<span class="checkbox-icon"></span>');
  $('.brxy-form input[type="radio"]').after('<span class="radio-icon"></span>');

  if ($('body div').hasClass('youtube-project')) {
    var youtube = document.querySelectorAll( ".youtube-project" );
    for (var i = 0; i < youtube.length; i++) {
      var source = youtube[i].dataset.src;
      var image = new Image();
      image.src = source;
      image.addEventListener( "load", function() {
          youtube[ i ].appendChild( image );
      }( i ) );

      youtube[i].addEventListener( "click", function() {

          var iframe = document.createElement( "iframe" );

          iframe.setAttribute( "frameborder", "0" );
          iframe.setAttribute( "allowfullscreen", "" );
          iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?modestbranding=1&rel=0&showinfo=0&controls=0&loop=1​&autoplay=1" );

          this.innerHTML = "";
          this.appendChild( iframe );
      } );
    };
  }
var $windowheight = $(window).height();
$(".youtube-project iframe").height($windowheight);
  var menuUl = $('.header-right div, .header-right ul');
  if (!menuUl.hasClass('brxy-menu')) {
    $('.header-wrap').addClass('no-menu');
  }

  // Smooth Scroll
  $('.smooth-scroll').bind('click', function(event) {
    var $anchor = $(this);
    var navHeight = $('.sticky-wrapper').height();
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top - navHeight
    }, 800);
    event.preventDefault();
  });
  //brxy full page script
  $('html:has(.brxy-full-page), body:has(.brxy-full-page)').addClass('fullheight-body');
  if (screen.width >= 768) {
    $('.brxy-full-page').css('padding-top',$('.brxy-header').height());
    $('.brxy-full-page').css('padding-bottom',$('.brxy-secondary-footer').height());
    $('.brxy-sinlge-detail .brxy-project-detail').css('bottom',$('.brxy-secondary-footer').height());
    $('.brxy-sinlge-detail .brxy-project-detail').css('top',$('.brxy-header').height());
    if ($('.brxy-full-page').hasClass('header-style-two')) {
      $('.brxy-full-page').css('padding-top','0');
    }
  }

  $('body:has(.dark-template)').addClass('dark-version');
  $('body:has(.filter-btn a)').addClass('animatescroll');

  //brxy sticky header script
  $('.brxy-header').sticky({topSpacing:0});

  //brxy toggle script
  $('.brxy-toggle').on('click', function () {
    $(this).toggleClass('active');
    $('.brxy-header .brxy-menu').toggleClass('open');
  });
  $('.brxy-info-btn a').on('click', function () {
    $('.brxy-sinlge-detail').toggleClass('open');
  });
  $('.menu-style-three .brxy-toggle').on('click', function () {
    $('.brxy-header').toggleClass('overlay-menu');
  });

  //brxy sliding menu script
  $('.menu-style-three .menu-item a').on('click', function() {
    var element = $(this).parent('.menu-style-three .menu-item');
    if (element.hasClass('open')) {
      element.removeClass('open');
      element.find('.menu-style-three .menu-item').removeClass('open');
      element.find('.sub-menu').slideUp();
    }
    else {
      element.addClass('open');
      element.children('.sub-menu').slideDown();
      element.siblings('.menu-style-three .menu-item').children('.sub-menu').slideUp();
      element.siblings('.menu-style-three .menu-item').removeClass('open');
      element.siblings('.menu-style-three .menu-item').find('.menu-style-three .menu-item').removeClass('open');
      element.siblings('.menu-style-three .menu-item').find('.sub-menu').slideUp();
    }
  });

  //brxy set height script
  jQuery(window).resize(function() {
    jQuery('.brxy-full-wrap.has-swiper').height(jQuery(window).height() - $('.brxy-header').height());
  });
  jQuery(window).trigger('resize');

  //brxy counter script
  $('.counter').counterUp ({
    delay: 1,
    time: 1000
  });

  //brxy hover script
  $('.project-list, .mate-list, .gallery-item, .award-info, .blog-item, .brxy-sinlge-detail .swiper-slide, .brxy-services.style2 .service-item, .brxy-project-detail .project-title, .about-me-info, .brxy-title-wrap').hover (
    function() {
      $(this).addClass('brxy-hover');
    },
    function() {
      $(this).removeClass('brxy-hover');
    }
  );

  //brxy carousel slider script
  $('.brxy-carousel').each( function() {
    var $carousel = $(this);
    var $items = ($carousel.data("items") !== undefined) ? $carousel.data("items") : 1;
    var $items_tablet = ($carousel.data("items-tablet") !== undefined) ? $carousel.data("items-tablet") : 1;
    var $items_mobile_landscape = ($carousel.data("items-mobile-landscape") !== undefined) ? $carousel.data("items-mobile-landscape") : 1;
    var $items_mobile_portrait = ($carousel.data("items-mobile-portrait") !== undefined) ? $carousel.data("items-mobile-portrait") : 1;
    $carousel.owlCarousel ({
      loop : ($carousel.data("loop") !== undefined) ? $carousel.data("loop") : true,
      items : $carousel.data("items"),
      margin : ($carousel.data("margin") !== undefined) ? $carousel.data("margin") : 0,
      dots : ($carousel.data("dots") !== undefined) ? $carousel.data("dots") : true,
      nav : ($carousel.data("nav") !== undefined) ? $carousel.data("nav") : false,
      navText : ["<div class='slider-no-current'><span class='current-no'></span><span class='total-no'></span></div><span class='current-monials'></span>", "<div class='slider-no-next'></div><span class='next-monials'></span>"],
      autoplay : ($carousel.data("autoplay") !== undefined) ? $carousel.data("autoplay") : false,
      autoplayTimeout : ($carousel.data("autoplay-timeout") !== undefined) ? $carousel.data("autoplay-timeout") : 5000,
      animateOut : ($carousel.data("animateout") !== undefined) ? $carousel.data("animateout") : false,
      animateIn : ($carousel.data("animatein") !== undefined) ? $carousel.data("animatein") : false,
      mouseDrag : ($carousel.data("mouse-drag") !== undefined) ? $carousel.data("mouse-drag") : true,
      autoWidth : ($carousel.data("auto-width") !== undefined) ? $carousel.data("auto-width") : false,
      autoHeight : ($carousel.data("auto-height") !== undefined) ? $carousel.data("auto-height") : false,
      responsiveClass: true,
      responsive : {
        0 : {
          items : $items_mobile_portrait,
        },
        480 : {
          items : $items_mobile_landscape,
        },
        768 : {
          items : $items_tablet,
        },
        960 : {
          items : $items,
        }
      }
    });
    var totLength = $(".owl-dot", $carousel).length;
    $(".total-no", $carousel).html(totLength);
    $(".current-no", $carousel).html(totLength);
    $carousel.owlCarousel();
    $(".current-no", $carousel).html(1);
    $carousel.on('changed.owl.carousel', function(event) {
      var total_items = event.page.count;
      var currentNum = event.page.index + 1;
      $(".total-no", $carousel ).html(total_items);
      $(".current-no", $carousel).html(currentNum);
    });
  });

  //brxy parallax script
  $('.brxy-parallax').parallax({
  });

  //brxy progressbar script
  $('.brxy-progressbar').waypoint(function() {
    $('.progress').each(function() {
      var $this = $(this);
      $('.progress-bar', $this).animate ({
        width:$('.progress-bar', $this).attr('data-percent')
      },2000);
    });
  },
  {
    offset: '100%'
  });

  //brxy load more script
  var $award = $('.award-item');
  $('#load-more').click(function() {
    if ($(this).hasClass('disable')) return false;
    var $hidden = $award.filter(':hidden:first').slideToggle();
    if (!$hidden.next('.award-item').length) {
      $(this).addClass('disable');
    }
  });
  var $social = $('.brxy-share li');
  $('.load-social').click(function() {
    if ($(this).hasClass('disable')) return false;
    var $hidden = $social.filter(':hidden:first').animate ({
      width: 'toggle'
    });
    if (!$hidden.next('.brxy-share li').length) {
      $(this).addClass('disable');
    }
  });

  //brxy nav tabs script
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  var target = this.href.split('#');
  $('.nav a').filter('a[href="#'+target[1]+'"]').tab('show');
  })

  //brxy vertical scroll script
  $(window).load(function() {
    $('.vertical-scroll').mCustomScrollbar ({
      axis: 'y',
      autoHideScrollbar: true,
      autoDraggerLength: true,
      advanced: {
        updateOnContentResize: true
      }
    });
    $('.brixey-blog-pagination').css('display', 'block');
  });

  //brxy horizontal scroll script
  $(window).load(function() {
    $('.horizontal-scroll').mCustomScrollbar ({
      axis: 'x',
      autoHideScrollbar: true,
      autoDraggerLength: true,
      advanced: {
        updateOnContentResize: true
      }
    });
  });

  //brxy parallax text script
  function parallax(){
    var scrolled = $(window).scrollTop();
    $('.brxy-parallax-text').css('top', (scrolled * 0.5) + 'px');
    $('.brxy-parallax-text').css('opacity', 1-(scrolled / 950));
  }
  $(window).scroll(function(){
    parallax();
  });

  //sewl filter script
  $(window).load( function() {
    var $grid = $('.brxy-masonry').isotope ({
      itemSelector: '.masonry-item',
      layoutMode: 'masonry',
    });
    var filterFns = {
      ium: function() {
        var name = $(this).find('.name').text();
        return name.match( /ium$/ );
      }
    };
    $('.filter-buttons .brxy-menu').on( 'click', 'a', function() {
      var filterValue = $( this ).attr('data-filter');
      filterValue = filterFns[ filterValue ] || filterValue;
      $grid.isotope({
        filter: filterValue
      });
    });
    $('.filter-buttons .brxy-menu').each( function( i, buttonGroup ) {
      var $buttonGroup = $( buttonGroup );
      $buttonGroup.on( 'click', 'a', function() {
        $buttonGroup.find('.active').removeClass('active');
        $(this).addClass('active');
      });
    });
  });

  //brxy get total div number script
  var number = $('.brxy-masonry .masonry-item').size();
  $('.filter-btn .total-filters').text(number);

  //brxy filter buttons script
  $('.filter-btn a, .filter-btn.fixed a').click(function() {
    $('.filter-buttons').slideToggle();
  });
  if ($('body div').hasClass('scroll-show-filter')) {
      $(window).scroll(function () {
      if ($(this).scrollTop() > 200) {
        $('.filter-buttons').slideDown('fast');
        $('.filter-btn').addClass('fixed');
      }
      else {
        $('.filter-btn').removeClass('fixed');
      }
    });
  }
  function sticky_relocate() {
    var window_top = $(window).scrollTop();
    var footer_top = $('.brxy-footer').offset().top;
    var div_top    = $('.project-listings').offset().top;
    var div_height = $('.filter-btn').height();
    var padding    = 20;
    if (window_top + div_height > footer_top - padding)
    $('.filter-btn').css({top: (window_top + div_height - footer_top + padding) * -1})
      else if (window_top > div_top) {
        $('.filter-btn').addClass('fixed');
        $('.filter-btn').css({top: 80})
        $('.admin-bar .filter-btn').css({top: 112})
      }
      else {
        $('.filter-btn').removeClass('fixed');
        $('.filter-btn').css({top: 20})
      }
  }
  if ( $('body div').hasClass('filter-style2') ) {
    $(function () {
      $(window).scroll(sticky_relocate);
      sticky_relocate();
    });
  }
  //brxy zoom image script
  initOutdoor();
  function initOutdoor(){
    function d(){
      var a = document.querySelectorAll('.intense');
      Intense(a);
    }
    d();
  }

  //brxy popup script
  $('.brxy-popup').magnificPopup ({
    delegate: 'a',
    type: 'image',
    closeOnContentClick: false,
    closeBtnInside: false,
    removalDelay: 300,
    mainClass: 'mfp-with-zoom mfp-img-mobile',
    closeMarkup:'<div class="mfp-close" title="%title%"></div>',
    image: {
      verticalFit: true,
      titleSrc: function(item) {
        return item.el.attr('title') + ' · <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
      }
    },
    gallery: {
      enabled: true,
      arrowMarkup:'<div title="%title%" class="mfp-arrow mfp-arrow-%dir%"></div>',
    },
  });

  //brxy custom video controls script
  $('.brxy-play-btn a').click(function () {
    if ($('video').get(0).paused) {
      $('video').get(0).play();
    }
    else {
      $('video').get(0).pause();
    }
    $('.brxy-play-btn').toggleClass('pause-btn');
  });

  //brxy video popup script
  $('.brxy-popup-video').magnificPopup ({
    removalDelay: 300,
    mainClass: 'mfp-with-zoom mfp-img-mobile',
    type: 'iframe',
    fixedContentPos: false
  });

  //brxy back top script
  jQuery('.brxy-back-top').hide();
  jQuery(function () {
    jQuery(window).scroll(function () {
      if (jQuery(this).scrollTop() > 150) {
        jQuery('.brxy-back-top').fadeIn();
      }
      else {
        jQuery('.brxy-back-top').fadeOut();
      }
    });
    jQuery('.brxy-back-top a').click(function () {
      jQuery('body,html').animate ({
        scrollTop: 0
      }, 1500);
    return false;
    });
  });
  jQuery('.next-service a').click(function () {
    var target = $('.services-wrap .nav-tabs .active').offset().top;
    jQuery('body,html').animate ({
      scrollTop: target
    }, 1500);
  });
  //brxy swiper slider script
  var swipermw = $('.swiper-container.mousewheel').length ? true : false;
  var swiperkb = $('.swiper-container.keyboard').length ? true : false;
  var swipercentered = $('.swiper-container.center').length ? true : false;
  var swiperautoplay = $('.swiper-container').data('autoplay');
  var swiperinterval = $('.swiper-container').data('interval'),
  swiperinterval = swiperinterval ? swiperinterval : 7000;
  swiperautoplay = swiperautoplay ? swiperinterval : false;

  //brxy swiper fadeslides script
  var autoplay = 5000;
  var swiper = new Swiper('.fadeslides', {
    autoplayDisableOnInteraction: false,
    effect: 'fade',
    speed: 1500,
    loop: true,
    paginationClickable: true,
    watchSlidesProgress: true,
    autoplay: autoplay,
    simulateTouch: false,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    pagination: '.swiper-pagination',
    mousewheelControl: swipermw,
    keyboardControl: swiperkb,
  });

  //brxy swiper slideshow script
  var autoplay = 5000;
  var swiper = new Swiper('.slideshow', {
    autoplayDisableOnInteraction: false,
    effect: 'slide',
    speed: 1500,
    loop: true,
    paginationClickable: true,
    watchSlidesProgress: true,
    autoplay: autoplay,
    simulateTouch: false,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    pagination: '.swiper-pagination',
    mousewheelControl: swipermw,
    keyboardControl: swiperkb,
  });

  //brxy swiper horizontalslides script
  var autoplay = 5000;
  var swiper = new Swiper('.horizontalslides', {
    autoplayDisableOnInteraction: false,
    effect: 'slide',
    speed: 800,
    loop: true,
    watchSlidesProgress: true,
    autoplay: false,
    simulateTouch: false,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    mousewheelControl: swipermw,
    keyboardControl: swiperkb,
    slidesPerView: 'auto',
    loopedSlides: 5,
    noSwipingClass: 'noswipe',
  });

  //brxy swiper horizontalscrollbar script
  var autoplay = 5000;
  var swiper = new Swiper('.horizontalscrollbar', {
    autoplayDisableOnInteraction: false,
    effect: 'slide',
    speed: 500,
    watchSlidesProgress: true,
    autoplay: false,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    mousewheelControl: swipermw,
    keyboardControl: swiperkb,
    slidesPerView: 'auto',
    loopedSlides: 5,
    noSwipingClass: 'noswipe',
    scrollbar: '.swiper-scrollbar',
    scrollbarHide: true,
    grabCursor: true,
  });
});