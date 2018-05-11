(function($){
'use strict';

  $(document).on('click', '.load-more:not(.loading)', function(e){
    e.preventDefault();

    var that = $(this);
    var page = that.data('page');
    var message = that.data('message');
    var search_term = that.data('search');
    var posts        = that.data('posts');
    var author = that.data('author');
    var category = that.data('category');
    var tag = that.data('tag');
    var newPage = page+1;
    var ajaxUrl = that.data('url');
    that.addClass('loading');

    $.ajax({
      url : ajaxUrl,
      type : 'post',
      data : {
        page        : page,
        search_term : search_term,
        tag         : tag,
        author      : author,
        category    : category,
        action      : 'brixey_load_more_button_ajax'
      },
      error : function( response ) {
        
      },
      success : function( response ){
        that.data('page', newPage );
        
        var $items = $( response );
        $('#blog-posts').append( $items )
        .isotope( 'appended', $items );

        setTimeout(function(){
          setInterval(function(){
            var $grid = $('.brxy-masonry').isotope ({
              itemSelector: '.masonry-item',
              layoutMode: 'masonry',
            });
            var $blogContent = $("body").has("#blog-posts").length;
            if(true == $blogContent){
              var blogCaroselet = $(".blog-posts-curosel");
              blogCaroselet.each(function(){
                var $this = $(this);
                $this.height($this.children(".owl-stage-outer").height());
              });
            }
              //brxy hover script
              $('.blog-item').hover (
                function() {
                  $(this).addClass('brxy-hover');
                },
                function() {
                  $(this).removeClass('brxy-hover');
                }
              );

          }, 100);
        }, 2000);

        var postLength = $('.masonry-item').length;
        if (postLength >= posts) {
          $('.all-loaded').append('<p>'+message+'</p>');
          that.slideUp(300);
        }
        that.removeClass('loading');
      }
    });
  });

  $(document).on('click', '.load-more-project:not(.loading)', function(e){
    e.preventDefault();

    var that 			= $(this);
    var page 			= that.data('page');
    var message 	= that.data('message');
    var order 	= that.data('order');
    var orderby 	= that.data('orderby');
    var limit 	= that.data('limit');
    var style 	= that.data('style');
    var posts     = that.data('posts');
    var category   	= that.data('category');
    var newPage 	= page+1;
    var ajaxUrl 	= that.data('url');
    that.addClass('loading');

    $.ajax({
      url : ajaxUrl,
      type : 'post',
      data : {
        page        : page,
        order       : order,
        orderby     : orderby,
        category     : category,
        limit       : limit,
        style       : style,
        action      : 'brixey_project_load_more_button',
      },
      error : function( response ) {
        
      },
      success : function( response ){
        that.data('page', newPage );
        
        var $items = $( response );
        $('.project-row').append( $items )
        .isotope( 'appended', $items );

        setTimeout(function(){
          setInterval(function(){
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
  					var number = $('.brxy-masonry .masonry-item').size();
  					$('.filter-btn .total-filters').text(number);
              //brxy hover script
            $('.project-list, .gallery-item').hover (
              function() {
                $(this).addClass('brxy-hover');
              },
              function() {
                $(this).removeClass('brxy-hover');
              }
            );
          }, 100);
        }, 2000);

        var postLength = $('.masonry-item').length;
        if (postLength >= posts) {
          $('.all-loaded').append('<p>'+message+'</p>');
          that.slideUp(300);
        }
        that.removeClass('loading');
      }
    });
  });

})(jQuery);