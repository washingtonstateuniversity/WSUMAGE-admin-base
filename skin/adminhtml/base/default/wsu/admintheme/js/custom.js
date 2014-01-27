// JavaScript Document
jQuery(function(){
	(function($,window){
		function setup_fixedNav(){
			if ($(window).scrollTop()>= 122) { $('body').addClass('fixed');  }
			$(window).scroll(function (event) {
				if ($(this).scrollTop()>= 122) {     
					$('body').addClass('fixed');
				} else { 
					$('body').removeClass('fixed');
				}  
			});
		}
		setup_fixedNav();
		if($("#system_config_tabs").length){
			$("#system_config_tabs dt").filter(function() {
				 return !$('*', this).hasClass('active');
			}).addClass("close");
			$("#system_config_tabs dt").filter(function() {
				 return $('*', $(this).siblings()).hasClass('active');
			}).addClass("open");
			$("#system_config_tabs dd").filter(function() {
				 return !$('*', $(this).siblings()).hasClass('active');
			}).hide();
			$("#system_config_tabs dt").off().on("click",function(){
				//alert('clicked');
				$(this).siblings().toggle();
				$(this).toggleClass("open","close");
			});
		}
	})(jQuery,window);
});
