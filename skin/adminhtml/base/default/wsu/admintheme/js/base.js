(function($){
	"use strict";
	$.fn.stripClass = function (partialMatch, endOrBegin) {
		console.log("stripClass----------->>>>>>>>>>>");
		var regx;
		regx = new RegExp((!endOrBegin ? "\\b" : "\\S+") + partialMatch + "\\S*", "g");
		console.log(regx);
		this.attr("class", function (i, classlist) {
			console.log("classlist-----------");
			console.log(classlist);
			if (!classlist) {
				return;
			}
			var output = classlist.replace(regx, "");
			console.log(output);console.log("^^^^^^^^^-----output------");
			return output;
		});
		return this;
	};
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
        
            function apply_sort(){
                if(jQuery("#category_edit_form.changing").length){
                    setTimeout(function(){ apply_sort(); },500);
                }else{
                    if(jQuery( "#catalog_category_products_table tbody" ).length){
                        jQuery( "#catalog_category_products_table tbody" ).sortable({ 
                            opacity: 0.6, 
                            cursor: 'move',  
                            update: function(){
                                jQuery('.ui-sortable [name="position"]').each(function(){
                                    jQuery(this).val( jQuery(this).closest('tr').prevAll().length + 1 );
                                });
                            }
                        });
                        jQuery( "#catalog_category_products_table tbody" ).disableSelection();
                    }
                }
            }
            
            console.log("here");
            if( jQuery(".adminhtml-catalog-category-edit").length ){
                jQuery(".x-tree-node-el,[title='Save Category']").on("click", function(){
                    jQuery("#category_edit_form").addClass("changing");
                    if(jQuery( "#catalog_category_products_table tbody.ui-sortable" ).length === 0){
                        jQuery( "#catalog_category_products_table tbody" ).sortable( "destroy" );
                    }
                    apply_sort();
                });
                apply_sort();
            }
        
        
		$('.form-list').find('table tr').addClass('skip_flag');
		$.observeDOM( $('body') , function(){
			$('.form-list').find('table tr').addClass('skip_flag');
		});
		
		$('input[name*="price"]:not([name*="color"])').spinner({
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
                "website_ids":["1","2"],
                "stock_data][is_in_stock":"1"
            };
            $.each(defaults,function(idx,val){
                var target = $("[name='product["+idx+"]']");
                if($.isArray(val)){
                    target = $("[name='product["+idx+"][]']");
                    $.each(target ,function(tar_idx,item){
                        $.each(val,function(sub_idx,value){
                            if($(item).is("select")){
                                $(item).find("[value='"+value+"']").attr("selected",true);
                            }else if($(item).is(":radio") || $(item).is(":checkbox")){
                                $("[name='product["+idx+"][]'][value='"+value+"']").attr("checked",true);
                            }
                        });
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