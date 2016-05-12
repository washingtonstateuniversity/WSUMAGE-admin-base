(function($){
	"use strict";
	
	$.observeDOM = function(obj,callback){
		var config,mutationObserver;
		if (window.MutationObserver) {
			config = {childList: true, attributes: true, subtree: true, attributeOldValue: true, attributeFilter: ["class", "style"]};

			mutationObserver = new MutationObserver(function(mutationRecords) {
			  $.each(mutationRecords, function(index, mutationRecord) {
				if (mutationRecord.type === "childList") {
				  if (mutationRecord.addedNodes.length > 0) {
					callback();
				  } else if (mutationRecord.removedNodes.length > 0) {
					callback();
				  }
				} else if (mutationRecord.type === "attributes") {
				  if (mutationRecord.attributeName === "class") {
					callback();
				  }
				}
			  });
			});
			mutationObserver.observe(obj[0], config);
		}else{
			window.setTimeout(function(){
				var current_obj=obj.refresh();
				if(typeof window.obj_watch === "undefined"){
					window.obj_watch=current_obj[0];
				}
				if(window.obj_watch!==current_obj[0]){
					callback();
				}
				//reapply the watch
				window.obj_watch=current_obj[0];
				$.observeDOM(current_obj,callback);
			},200);
		}
	};

	
	
	$(document).ready(function(){
		$('.form-list').find('table tr').addClass('skip_flag');
		$.observeDOM( $('body') , function(){
			$('.form-list').find('table tr').addClass('skip_flag');
		});
		
		$('input[name*="price"]').spinner({
			min: 0,
			max: 2500,
			step: 0.01,
			start: 1000,
			numberFormat: "C",
			culture:"en-US"
		});

        if($(".adminhtml-catalog-product-new").length){
            var defaults = {
                "weight":"0",
                "status":"1",
                "tax_class_id":"2",
                "website_ids":["1","2"]
            };
            $.each(defaults,function(idx,val){
                var target = $("[name^='product["+idx+"]']");
                if($.isArray(val)){
                    $.each(val,function(sub_idx,item){
                        if(target.is("select")){
                            target.find("[value='"+item+"']").attr("selected",true);
                        }else if(target.is(":radio") || target.is(":checkbox")){
                            target.find("[value='"+item+"']").attr("checked",true);
                        }
                    });
                }else{
                    if(target.is("select")){
                        target.find("[value='"+val+"']").attr("selected",true);
                    }else if(target.is(":radio") || target.is(":checkbox")){
                        target.find("[value='"+val+"']").attr("checked",true);
                    }else{
                        target.val(val);
                    }
                }
            });
        }
		
		
		
	});
})(jQuery);