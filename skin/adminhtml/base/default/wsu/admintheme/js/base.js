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
                /*if( 0 === $("#sort_cat_prod").length ){
                    var btn_html = '<button id="sort_cat_prod" title="Sort" type="button" class="scalable" style="position: absolute;right: 167px;top: 103px;"><span><span><span>Sort Cats</span></span></span></button>';
                     $(".content-header .content-buttons.form-buttons").append(btn_html);
                     jQuery("#sort_cat_prod").on("click", function(){
                        jQuery("#category_edit_form").removeClass("changing");
                        console.log("sort_cat_prod changing");
                        apply_sort();
                    });
                }*/
                if(jQuery( "#catalog_category_products_table tbody.ui-sortable" ).length !== 0){
                    jQuery( "#catalog_category_products_table tbody" ).sortable( "destroy" );
                }
                if(jQuery("#category-edit-container .changing").length){
                    setTimeout(function(){ apply_sort(); },500);
                }else{
                    if(jQuery( "#catalog_category_products_table tbody" ).length){
                        //jQuery("#category_edit_form").addClass("changing");
                        jQuery( "#catalog_category_products_table tbody" ).sortable({ 
                            opacity: 0.6, 
                            cursor: 'move',
                            placeholder: "ui-state-highlight",  
                            update: function(){
                                var str = [];
                                jQuery('.ui-sortable [name="position"]').each(function(){
                                    var idx = jQuery(this).closest('tr').prevAll().length + 1;
                                    var id = jQuery(this).closest('tr').find('[checked="checked"]').val();
                                    jQuery(this).val( idx );
                                    str.push( id + "=" + idx );
                                });
                                
                                jQuery('[name="category_products"]').val(str.join("&"));

                            }
                        });
                        jQuery( "#catalog_category_products_table tbody" ).disableSelection();
                    }
                    

                    
                    console.log("observeDOM on #category_edit_form");
                    jQuery(".x-tree-node-el,[title='Save Category'],#sort_cat_prod,#category_edit_form .headings a").on("click", function(){
                        if( ! jQuery(this).is("#category_edit_form .headings a") ){
                            jQuery("#category_edit_form").addClass("changing");
                            console.log("loading");
                        }else{
                            jQuery("#catalog_category_products table").addClass("changing");
                            console.log("sorting");
                        }
                        apply_sort();
                    });
                    
                    
                }
            }
            jQuery("#category_edit_form").addClass("changing");
            setTimeout(function(){ 
                apply_sort();
                $.observeDOM($("#category_edit_form"), function(){
                    jQuery("#category_edit_form").addClass("changing");
                    console.log("changing");
                    apply_sort();
                }); 
             },500);
            
            

        

        
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
/*
setTimeout(function(){
    
             
console.log("window.updateContent");
console.log(window.updateContent);
window.updateContent = function (url, params, refreshTree) {
    console.log("WSU version of the updateContent");
    if (!params) {
        params = {};
    }
    if (!params.form_key) {
        params.form_key = FORM_KEY;
    }
    toolbarToggle.stop();
    jQuery("#category_edit_form").addClass("changing");
    var categoryContainer = $('category-edit-container');
    var messagesContainer = $('messages');
    var thisObj = this;
    new Ajax.Request(url + (url.match(new RegExp('\\?')) ? '&isAjax=true' : '?isAjax=true'), {
        parameters: params,
        evalScripts: true,
        onComplete: function() {
            setTimeout(function() {
                try {
                    if (refreshTree) {
                        thisObj.refreshTreeArea();
                    }
                    toolbarToggle.start();
                } catch (e) {
                    alert(e.message);
                };
            }, 25);
        },
        onSuccess: function(transport) {
            try {
                if (transport.responseText.isJSON()) {
                    var response = transport.responseText.evalJSON();
                    var needUpdate = true;
                    if (response.error) {
                        alert(response.message);
                        needUpdate = false;
                    }
                    if (response.ajaxExpired && response.ajaxRedirect) {
                        setLocation(response.ajaxRedirect);
                        needUpdate = false;
                    }
                    if (needUpdate) {
                        if (response.content) {
                            $(categoryContainer).update(response.content);
                        }
                        if (response.messages) {
                            $(messagesContainer).update(response.messages);
                        }
                    }
                } else {
                    $(categoryContainer).update(transport.responseText);
                }
                
jQuery(".x-tree-node-el,[title='Save Category']").on("click:wsu_theme", function(){
                        jQuery("#category_edit_form").addClass("changing");
                        console.log("changing");

                        apply_sort();
                    });
                    jQuery("#category_edit_form").removeClass("changing");
                      apply_sort();
                
                
            } catch (e) {
                $(categoryContainer).update(transport.responseText);
            }
        }
    });
}


console.log("window.updateContent UPDATED");
console.log(window.updateContent);
},1000);
*/