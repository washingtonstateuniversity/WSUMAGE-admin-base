// JavaScript Document

(function($){
	$(function(){
		
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
		$("#system_config_tabs dd").filter(function() {
			 return !$('*', this).hasClass('active');
		}).hide();
		$("#system_config_tabs dt").on("click",function(){
			$(this).siblings().toggle();
		});
	});
}(jQuery));