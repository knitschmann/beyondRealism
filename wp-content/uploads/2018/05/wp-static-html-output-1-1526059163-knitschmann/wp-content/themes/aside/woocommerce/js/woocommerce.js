jQuery(document).ready(function($) {
	
	//product tabs
	jQuery('.nav-tabs a').click(function (e) {
		e.preventDefault();
		jQuery(this).tab('show');
	}); 

	//
	if(jQuery('.product-wrap').find('.flexslider').length){
		
		jQuery('.product-wrap').find('.flexslider').flexslider({
				animation: 'slide', //String: Select your animation type, "fade" or "slide"
				animationLoop: true,
				slideshow: true, 
				smoothHeight: true,  
				controlNav: false, //Dot Nav
				directionNav: true,  // Next\Prev Nav
				touch: true, 
				slideshowSpeed: 3000 
				//itemWidth: 210,
				//itemMargin: 5
			});
	
	}
	
	//show shipping calculator box in Cart page
	if(jQuery('.shipping-calculator-form').length){
		
		jQuery('.shipping-calculator-form').siblings('h4.lined-heading').css('cursor','pointer');
		
		jQuery('.shipping-calculator-form').siblings('h4.lined-heading').click(function(){
		
			jQuery(".shipping-calculator-form").slideToggle(500, function() {
				if (jQuery(this).is(":visible")) {
					
				}
			});
		
		})
		
	}
	
	//Close Login form box
	jQuery('.modal-header').find('button').click(function(){
	
		if(jQuery('#login-form,#modal-mask').hasClass('in')){
		
			jQuery('#login-form,#modal-mask').removeClass('in').addClass('out');
		
		}
	
	});
	//open Login formbox
	jQuery('.show-login').click(function(){
	
		if(!jQuery('#login-form,#modal-mask').hasClass('in')){
		
			jQuery('#login-form,#modal-mask').addClass('in').removeClass('out');
			jQuery('#login-form').find('form').show(300);
		
		}
	
	});
	
	jQuery('.quantity input[type=number]').each(function() {
		var number = $(this),
			newNum = jQuery(jQuery('<div />').append(number.clone(true)).html().replace('number','text')).insertAfter(number);
			number.remove();
	});

	jQuery('.woocommerce-product-rating').each(function() { 
		jQuery(this).appendTo('.price');

	});
});

jQuery('.woocommerce-message').find('.button').removeClass('button').addClass('ux-btn');