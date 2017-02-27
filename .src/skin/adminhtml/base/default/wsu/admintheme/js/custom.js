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
        if($("#block_content").length){
            $("#block_content").closest("td").attr("style","width:100% !important");
        }




        var codeblockID = null;
        var mode = null;

        /*if($("textarea[name='content']").length){

            codeblockID = $("textarea[name='content']").attr("id");
            mode = "htmlmixed";
            var myCodeMirror = null;
            $("#page_tabs_content_section").on("click",function(){
                if(null === myCodeMirror){
                    myCodeMirror = CodeMirror.fromTextArea(document.getElementById(codeblockID), {
                        lineNumbers: true,
                        mode: mode
                    });
                }
                myCodeMirror.refresh();
            });
        }

          if($("#description").length){

            codeblockID = "description";
            mode = "htmlmixed";
            var myCodeMirror_description = null;
            $("#product_info_tabs_group_49").on("click",function(){
                if(null === myCodeMirror_description){
                    myCodeMirror_description = CodeMirror.fromTextArea(document.getElementById(codeblockID), {
                        lineNumbers: true,
                        mode: mode
                    });
                }
                myCodeMirror_description.refresh();
            });
        }
           if($("#short_description").length){
            codeblockID = "short_description";
            mode = "htmlmixed";
            var myCodeMirror_short_description = null;
            $("#product_info_tabs_group_49").on("click",function(){
                if(null === myCodeMirror_short_description){
                    myCodeMirror_short_description = CodeMirror.fromTextArea(document.getElementById(codeblockID), {
                        lineNumbers: true,
                        mode: mode
                    });
                }
                myCodeMirror_short_description.refresh();
            });
        }     */




	})(jQuery,window);
});
