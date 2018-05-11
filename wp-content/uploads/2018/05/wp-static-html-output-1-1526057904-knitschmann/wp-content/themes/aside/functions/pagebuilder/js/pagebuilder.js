function PageBuilder(){
	var ux_pb = this;
	var ux_pb_box = jQuery('#ux-pb-box');
	var ux_pb_box_choose = jQuery('#ux-pb-box-choose');
	var ux_pb_box_editor = jQuery('#ux-pb-box-editor');
	var ux_pb_box_container = jQuery('.ux-pb-box-container');
	var ux_pb_subbox_container = jQuery('.ux-pb-subbox-container');
	var ux_pb_switch = jQuery('[name=ux-pb-switch]');
	var ux_pb_modal = jQuery('#ux-pb-modal');
	var ux_pb_modal_body = jQuery('#ux-pb-modal-body');
	var ux_pb_modalsave = jQuery('.ux-pb-modalsave');
	var ux_pb_modaledit = jQuery('.ux-pb-modaledit');
	var ux_pb_loadtemplate = jQuery('.ux-pb-loadtemplate');
	var ux_pb_deletetemplate = jQuery('.ux-pb-deletetemplate');
	var ux_pb_modalclose = jQuery('.ux-pb-modalclose');
	var ux_pb_modalbody_before = jQuery('#ux-pb-modal-body-before');
	var ux_pb_modalbody_after = jQuery('#ux-pb-modal-body-after');
	var ux_pb_postid = jQuery('#post_ID');
	
	var wp_postdivrich = jQuery('#postdivrich');
	
	//pb init
	this.init = function(){
		jQuery('[data-toggle=insert-wrap]').each(function(index, element){
            var _this = jQuery(this);
			ux_pb.insertwrap(_this);
        });
		
		jQuery('[data-target=#ux-pb-modal]').each(function(index, element){
            var _this = jQuery(this);
			ux_pb.modal(_this);
        });
		
		if(ux_pb_switch.val() != 'pagebuilder'){
			ux_pb_box.hide();
			wp_postdivrich.show();
		}else{
			ux_pb_box.show();
			wp_postdivrich.hide();
		}
		
		ux_pb.modalclose();
		
		jQuery('.dropdown-toggle').dropdown();
		
		jQuery('form#post').submit(function(){
			ux_pb.refreshfirst();
		});
		
		ux_pb.refreshitem();
		
		ux_pb_box_container.each(function(index, element){
			var _this = jQuery(this);
			
			ux_pb.modal(_this.find('[data-target=#ux-pb-modal]'));
			ux_pb.copymodule(_this.find('.copy'));
			ux_pb.decrease(_this.find('.decrease'));
			ux_pb.increase(_this.find('.increase'));
			ux_pb.remove(_this.find('.remove'));
			
			ux_pb.isotope(_this);
			ux_pb.sortable(_this);
		});
		
		if(ux_pb_subbox_container.length > 0){
			ux_pb_subbox_container.each(function(index, element){
				var _this = jQuery(this);
				ux_pb.isotope(_this);
				ux_pb.sortable(_this);
				ux_pb.droppable(_this);
				
			});
		}
		
		jQuery(window).load(function(){
			ux_pb.refreshitem();
			if(ux_pb_subbox_container.length){
				ux_pb_subbox_container.each(function(index, element){
					var _this = jQuery(this);
					_this.isotope('reloadItems').isotope({sortBy: 'original-order'}, function(){
						ux_pb.refreshitem();
						_this.isotope('reLayout'); 
					});
				});
			}
			
			ux_pb_subbox_container.isotope('reloadItems').isotope({sortBy: 'original-order'}, function(){
				 ux_pb_box_container.isotope('reLayout'); 
			});
			
			setTimeout(function(){
				ux_pb_subbox_container.isotope('reLayout')
				ux_pb_box_container.isotope('reLayout'); 
			}, 1000);
			
		});
		
		//window resize
		jQuery(window).resize(function(){
		}); 
	}
	//pb isotope
	this.isotope = function(el){
		var _item;
		if(el.is('.ux-pb-box-container')){
			_item = '.isotopey';
		}else if(el.is('.ux-pb-subbox-container')){
			_item = '.sub-isotopey';
		}
		
		el.isotope({
			itemSelector: _item,
			layoutMode: 'fitRows',
			transformsEnabled: false,
			animationEngine: 'css',
			onLayout: function(){
				el.css('overflow', 'visible');
			}
		});
	}
	//pb switch size 
	this.switchsize = function(col, name, parent_col){
		var _col = 0;
		if(name == 'isotopey'){
			switch(col){
				case '12': _col = Number(1/1); break;
				case '9': _col = Number(3/4); break;
				case '8': _col = Number(2/3); break;
				case '6': _col = Number(1/2); break;
				case '4': _col = Number(1/3); break;
				case '3': _col = Number(1/4); break;
			}
		}else if(name == 'sub-isotopey'){
			_col = Number(1/1);
			switch(parent_col){
				case '12':
					switch(col){
						case '9': _col = Number(3/4); break;
						case '8': _col = Number(2/3); break;
						case '6': _col = Number(1/2); break;
						case '4': _col = Number(1/3); break;
						case '3': _col = Number(1/4); break;
					}
				break;
				
				case '9':
					switch(col){
						case '8': _col = Number(8/9); break;
						case '6': _col = Number(2/3); break;
						case '4': _col = Number(4/9); break;
						case '3': _col = Number(1/3); break;
					}
				break;
				
				case '8':
					switch(col){
						case '6': _col = Number(3/4); break;
						case '4': _col = Number(1/2); break;
						case '3': _col = Number(3/8); break;
					}
				break;
				
				case '6':
					switch(col){
						case '4': _col = Number(2/3); break;
						case '3': _col = Number(1/2); break;
					}
				break;
				
				case '4':
					switch(col){
						case '3': _col = Number(3/4); break;
					}
				break;
			}
		}
		return _col;
	}
	//pb decrease
	this.decrease = function(el){
		el.bind('click', function(){
			var _this = jQuery(this);
			var _this_parents = _this.parent().parent().parent().parent();
			var _this_parents_col;
			var _this_col = _this_parents.attr('pb-col')
			var _this_decrease_col = jQuery('input[pb-col='+_this_col+']').next();
			
			_this_parents.css({'transition':'none'});
			if(_this_decrease_col.length){
				_this_parents.attr('pb-col', _this_decrease_col.attr('pb-col'));
				ux_pb.refreshitem();
				
				if(_this_parents.is('.isotopey')){
					_this_parents.find('.module-title span').text(_this_decrease_col.val());
					if(!_this_parents.find('.sub-isotopey').length){
						_this_parents.find('.panel-body span').text(_this_decrease_col.val());
					}else{
						_this_parents.find('.sub-isotopey').parent().isotope('reloadItems').isotope({sortBy: 'original-order'});
					}
					ux_pb_box_container.isotope('reLayout');
				}else if(_this_parents.is('.sub-isotopey')){
					_this_parents.find('.panel-body span').text(_this_decrease_col.val());
					_this_parents.parent().isotope('reloadItems').isotope({sortBy: 'original-order'});
					ux_pb_box_container.isotope('reLayout'); 
				}
				ux_pb.refreshfirst();
			}
			return false;
		})
	}
	//pb increase
	this.increase = function(el){
		el.bind('click', function(){
			var _this = jQuery(this);
			var _this_parents = _this.parent().parent().parent().parent();
			var _this_parents_col;
			var _this_col = _this_parents.attr('pb-col')
			var _this_increase_col = jQuery('input[pb-col='+_this_col+']').prev();
			
			if(_this_parents.is('.sub-isotopey')){
				_this_parents_col = _this_parents.parents('.ux-pb-item').attr('pb-col');
				if(Number(_this_increase_col.attr('pb-col')) > Number(_this_parents_col)){
					_this_increase_col = false;
				}
			}
			
			_this_parents.css({'transition':'none'});
			if(_this_increase_col.length){
				_this_parents.attr('pb-col', _this_increase_col.attr('pb-col'));
				ux_pb.refreshitem();
				
				if(_this_parents.is('.isotopey')){
					_this_parents.find('.module-title span').text(_this_increase_col.val());
					if(!_this_parents.find('.sub-isotopey').length){
						_this_parents.find('.panel-body span').text(_this_increase_col.val());
					}else{
						_this_parents.find('.sub-isotopey').parent().isotope('reloadItems').isotope({sortBy: 'original-order'});
					}
					ux_pb_box_container.isotope('reLayout');
				}else if(_this_parents.is('.sub-isotopey')){
					_this_parents.find('.panel-body span').text(_this_increase_col.val());
					_this_parents.parent().isotope('reloadItems').isotope({sortBy: 'original-order'});
					ux_pb_box_container.isotope('reLayout'); 
				}
				ux_pb.refreshfirst();
			}
			return false;
		})
	}
	//pb setwidth
	this.setwidth = function(el){
		var _this = el;
		var _this_col = _this.attr('pb-col');
		var _this_parent = _this.parent();
		var _this_parent_width = _this_parent.width();
		var _this_set_col, _this_parents_col, _this_to_col, _this_width;
		
		if(_this.is('.isotopey')){
			_this_set_col = ux_pb.switchsize(_this_col, 'isotopey', 0);
		}else if(_this.is('.sub-isotopey')){
			_this_parents_col = _this.parents('.ux-pb-item').attr('pb-col');
			_this_set_col = ux_pb.switchsize(_this_col, 'sub-isotopey', _this_parents_col);
			if(Number(_this_col) > Number(_this_parents_col)){
				_this_to_col = jQuery('input[pb-col='+_this_parents_col+']');
				_this.attr('pb-col', _this_parents_col);
				_this.find('.panel-body span').text(_this_to_col.val());
			}
		}
		_this_width = Math.floor(_this_parent_width * _this_set_col);
		_this.width(_this_width);
		
		ux_pb.refreshfield();
	}
	//pb remove
	this.remove = function(el){
		el.bind('click', function(){
			var _this = jQuery(this);
			var _this_parents = _this.parent().parent().parent().parent('.ux-pb-item');
			
			_this_parents.parent().isotope('remove', _this_parents);
			ux_pb_box_container.isotope('reLayout');
			ux_pb.refreshfield();
			return false;
		});
	}
	//pb refresh item
	this.refreshitem = function(){
		jQuery('.isotopey').each(function(){
			var _this = jQuery(this);
			var _this_items = _this.find('.sub-isotopey');
			ux_pb.setwidth(_this);
			if(_this_items.length){
				_this_items.each(function(){
					ux_pb.setwidth(jQuery(this));
				});
			}
		});
	}
	//pb refresh first
	this.refreshfirst = function(){
		jQuery('.ux-pb-item').each(function(index){
            var _this = jQuery(this);
			var _this_field_first = _this.find('> .ux-pb-field-first');
			
			if(_this.css('left') == '0px'){
				_this_field_first.val('is');
			}else{
				_this_field_first.val('no');
			}
        });
		
	}
	//pb refresh field
	this.refreshfield = function(){
		var _box_container_item = jQuery('.ux-pb-box-container > .ux-pb-item');
		
		_box_container_item.each(function(index){
            var _this = jQuery(this);
			var _this_col = _this.attr('pb-col');
			var _this_type = _this.attr('data-type');
			var _this_itemid = _this.attr('data-itemid');
			var _this_field_col = _this.find('> .ux-pb-field-col');
			var _this_field_type = _this.find('> .ux-pb-field-type');
			var _this_field_first = _this.find('> .ux-pb-field-first');
			var _this_field_itemid = _this.find('> .ux-pb-field-itemid');
			var _this_field_moduleid = _this.find('> .ux-pb-field-moduleid');
			var _this_subbox_item = _this.find('.ux-pb-subbox-container > .ux-pb-item');
			var _this_name = 'ux_pb_meta[' + index + ']';
			
			_this_field_col.attr('name', _this_name + '[col]').val(_this_col);
			_this_field_type.attr('name', _this_name + '[type]').val(_this_type);
			_this_field_first.attr('name', _this_name + '[first]');
			_this_field_itemid.attr('name', _this_name + '[itemid]');
			_this_field_moduleid.attr('name', _this_name + '[moduleid]');
			
			_this_subbox_item.each(function(ix){
				var _subbox = jQuery(this);
				var _subbox_col = _subbox.attr('pb-col');
				var _subbox_type = _subbox.attr('data-type');
				var _subbox_itemid = _subbox.attr('data-itemid');
				var _subbox_field_col = _subbox.find('> .ux-pb-field-col');
				var _subbox_field_type = _subbox.find('> .ux-pb-field-type');
				var _subbox_field_first = _subbox.find('> .ux-pb-field-first');
				var _subbox_field_itemid = _subbox.find('> .ux-pb-field-itemid');
				var _subbox_field_moduleid = _subbox.find('> .ux-pb-field-moduleid');
				
				_subbox_field_col.attr('name', _this_name + '[items][' + ix + '][col]').val(_subbox_col);
				_subbox_field_type.attr('name', _this_name + '[items][' + ix + '][type]').val(_subbox_type);
				_subbox_field_first.attr('name', _this_name + '[items][' + ix + '][first]');
				_subbox_field_itemid.attr('name', _this_name + '[items][' + ix + '][itemid]');
				_subbox_field_moduleid.attr('name', _this_name + '[items][' + ix + '][moduleid]');
			});
        });
	}
	//pb droppable
	this.droppable = function(el){
		el.droppable({
			accept: '.ux-pb-box-container > .ux-sortable-item',
			tolerance: 'pointer',
			hoverClass: 'ux-droppable-hover',
			drop: function(event, ui){
				var ui_draggable_clone = ui.draggable.clone();
				ui.draggable.addClass('ui-draggable');
				ui_draggable_clone.removeClass('grabbing');
				ui_draggable_clone.addClass('sub-isotopey');
				
				el.append(ui_draggable_clone);
				
				var _this_col = ui_draggable_clone.attr('pb-col');
				ux_pb.setwidth(ui_draggable_clone);
				
				el.isotope('reloadItems').isotope({sortBy: 'original-order'}, function(){
					if(!ui_draggable_clone.is('.grabbing')){
						ui_draggable_clone.removeClass('moving');                        
					}
				});
				
				ux_pb_box_container.isotope('reloadItems').isotope({sortBy: 'original-order'});
				
				ux_pb.modal(ui_draggable_clone.find('[data-target=#ux-pb-modal]'));
				ux_pb.copymodule(ui_draggable_clone.find('.copy'));
				ux_pb.decrease(ui_draggable_clone.find('.decrease'));
				ux_pb.increase(ui_draggable_clone.find('.increase'));
				ux_pb.remove(ui_draggable_clone.find('.remove'));
				ux_pb.refreshfield();
				ux_pb.refreshfirst();
			}
		});
	}
	//pb sortable
	this.sortable = function(el){
		var _item, _connect;
		
		if(el.is('.ux-pb-box-container')){
			_item = 'isotopey';
			_connect = false;
		}else if(el.is('.ux-pb-subbox-container')){
			_item = 'sub-isotopey';
			_connect = '.ux-pb-subbox-container, .ux-pb-box-container';
		}
		
		el.sortable({
			cursor: 'move',
			connectWith: _connect,
			start: function(event, ui){
				var _ui_item_width = ui.item.width();
				ui.item.addClass('grabbing moving').removeClass(_item);
				ui.placeholder.addClass('starting').removeClass('moving').css({
					top: ui.originalPosition.top, 
					left: ui.originalPosition.left,
					'height': ui.item.height(),
					'width': ui.item.width()
				});
				el.isotope('reloadItems'); 
			},
			change: function(event, ui){
				var _ui_placeholder_parent = ui.placeholder.parent();
				if(_ui_placeholder_parent.is('.ux-pb-box-container')){
					ui.placeholder.removeClass('sub-isotopey').addClass('isotopey');
				}else if(_ui_placeholder_parent.is('.ux-pb-subbox-container')){
					ui.placeholder.removeClass('isotopey').addClass('sub-isotopey');
				}
				
				ui.placeholder.removeClass('starting');
				el.isotope('reloadItems').isotope({sortBy: 'original-order'}, function(){
					if(el.is('.ux-pb-subbox-container')){
						ux_pb_box_container.isotope('reloadItems').isotope({sortBy: 'original-order'});
					}
				});
			},
			over: function(event, ui){
				ux_pb_box_container.find('.isotopey').css({'z-index': 998});
				ui.item.parents('.isotopey').css({'z-index': 999});
				ui.item.css({'z-index': 99999});
			},
			beforeStop: function(event, ui){
				ui.placeholder.after(ui.item);
				jQuery('.ui-draggable').remove();
			},
			update: function(event, ui){
				if(el.is('.ux-pb-subbox-container')){
					ux_pb_box_container.isotope('reloadItems').isotope({sortBy: 'original-order'});
				}
				ux_pb.refreshfirst();
			},
			stop: function(event, ui){
				var _ui_item_parent = ui.item.parent();
				ui.item.removeClass('grabbing');
				if(_ui_item_parent.is('.ux-pb-box-container')){
					ui.item.addClass('isotopey');
				}else if(_ui_item_parent.is('.ux-pb-subbox-container')){
					ui.item.addClass('sub-isotopey');
				}
				
				if(el.is('.ux-pb-subbox-container')){
					var _this_col = ui.item.attr('pb-col');
					el = jQuery('.ux-pb-subbox-container');
					ux_pb.setwidth(ui.item);
				}
				el.isotope('reloadItems').isotope({sortBy: 'original-order'}, function(){
					if(!ui.item.is('.grabbing')){
						ui.item.removeClass('moving');                        
					}
				});
				
				if(el.is('.ux-pb-subbox-container')){
					ux_pb_box_container.isotope('reloadItems').isotope({sortBy: 'original-order'});
				}
				ux_pb.refreshfield();
				ux_pb.refreshfirst();
			}
		});
	}
	//pb insertwrap
	this.insertwrap = function(el){
		el.click(function(){
			var _this = jQuery(this);
			var _this_id = _this.attr('data-id');
			var _this_target = jQuery(_this.attr('data-target'));
			var _this_parents = _this.parents('.dropdown');
			var _this_ajaxcontent;
			
			_this_parents.removeClass('open');
			
			jQuery.post(ajaxurl, {
				'action': 'ux_pb_module_ajax',
				'id': _this_id,
			}, function(content, status, XHR){
				_this_ajaxcontent = jQuery(content);
				_this_target.append(_this_ajaxcontent).isotope('appended', _this_ajaxcontent);
				ux_pb.isotope(_this_ajaxcontent.find('.ux-pb-subbox-container'));
				ux_pb.sortable(_this_ajaxcontent.find('.ux-pb-subbox-container'));
				ux_pb.droppable(_this_ajaxcontent.find('.ux-pb-subbox-container'));
				ux_pb.modal(_this_ajaxcontent.find('[data-target=#ux-pb-modal]'));
				ux_pb.decrease(_this_ajaxcontent.find('.decrease'));
				ux_pb.increase(_this_ajaxcontent.find('.increase'));
				ux_pb.remove(_this_ajaxcontent.find('.remove'));
				ux_pb.refreshitem();
				ux_pb.refreshfield();
				ux_pb.refreshfirst();
				XHR = null;
			});
			return false;
		});
	}
	//pb copy module
	this.copymodule = function(el){
		el.click(function(){
			var _this = jQuery(this);
			var _this_parent = _this.parent();
			var _this_edit = _this_parent.find('.edit');
			var _this_id = _this_edit.attr('data-id');
			var _this_target = _this_edit.attr('data-itemid');
			var _this_to_target = _this.parents('[data-itemid=' + _this_target + ']');
			var _this_target_col = _this_to_target.find('> .ux-pb-field-col');
			var _this_target_col_title = _this_parent.next('.panel-body').find('.label-primary').html();
			var _this_item;
			
			if(_this_to_target.is('.isotopey')){
				_this_item = 'isotopey';
			}else{
				_this_item = 'sub-isotopey';
			}
			
			jQuery.post(ajaxurl, {
				'action': 'ux_pb_module_ajax',
				'id': 'copymodule',
				'module_id': _this_id,
				'module_col': _this_target_col.val(),
				'module_col_title': _this_target_col_title,
				'module_itemid': _this_target
			}, function(content, status, XHR){
				_this_ajaxcontent = jQuery(content);
				_this_ajaxcontent.addClass(_this_item);
				
				_this_to_target.after(_this_ajaxcontent);
				_this_to_target.parent().isotope('reloadItems').isotope({sortBy: 'original-order'});
				
				ux_pb.modal(_this_ajaxcontent.find('[data-target=#ux-pb-modal]'));
				ux_pb.copymodule(_this_ajaxcontent.find('.copy'));
				ux_pb.decrease(_this_ajaxcontent.find('.decrease'));
				ux_pb.increase(_this_ajaxcontent.find('.increase'));
				ux_pb.remove(_this_ajaxcontent.find('.remove'));
				ux_pb.refreshitem();
				ux_pb.refreshfield();
				
				setInterval(function(){
					_this_to_target.parent().isotope('reLayout');
					if(_this_item == 'sub-isotopey'){
						ux_pb_box_container.isotope('reLayout');
					}
					ux_pb.refreshfirst();
				}, 2);
				XHR = null;
			});
			
			return false;
		})
	}
	//pb insertmodule
	this.insertmodule = function(el){
		el.bind('click', function(){
			var _this = jQuery(this);
			var _this_id = _this.attr('data-id');
			var _this_parents = _this.parents('.ux-pb-choose-module');
			var _this_target = _this_parents.attr('data-target');
			var _this_win = _this.parents('#ux-pb-modal');
			var _this_to_target, _this_item;
			
			if(_this_target == '.ux-pb-box-container'){
				_this_to_target = jQuery(_this_target);
				_this_item = 'isotopey';
			}else{
				_this_to_target = jQuery('[data-itemid=' + _this_target + ']').find('.ux-pb-subbox-container');
				_this_item = 'sub-isotopey';
			}
			
			_this.attr('class', 'loading');
			
			jQuery.post(ajaxurl, {
				'action': 'ux_pb_module_ajax',
				'id': 'insertmodule',
				'module_id': _this_id
			}, function(content, status, XHR){
				_this_ajaxcontent = jQuery(content);
				_this_ajaxcontent.addClass(_this_item);
				_this_to_target.append(_this_ajaxcontent).isotope('appended', _this_ajaxcontent);
				_this_win.modal('hide');
				ux_pb.modal(_this_ajaxcontent.find('[data-target=#ux-pb-modal]'));
				ux_pb.copymodule(_this_ajaxcontent.find('.copy'));
				ux_pb.decrease(_this_ajaxcontent.find('.decrease'));
				ux_pb.increase(_this_ajaxcontent.find('.increase'));
				ux_pb.remove(_this_ajaxcontent.find('.remove'));
				ux_pb.refreshitem();
				ux_pb.refreshfield();
				
				setInterval(function(){
					if(_this_item == 'sub-isotopey'){
						ux_pb_box_container.isotope('reLayout');
					}
					ux_pb.refreshfirst();
				}, 2);
				
				XHR = null;
			});
			
			return false;
		});
	}
	//pb modal
	this.modal = function(el){
		el.bind('click', function(){
			var _this = jQuery(this);
			var _this_id = _this.attr('data-id');
			var _this_title = _this.attr('data-title');
			var _this_itemid = _this.attr('data-itemid');
			var _this_target = jQuery(_this.attr('data-target'));
			var _this_target_header = _this_target.find('.modal-header');
			var _this_target_title = _this_target.find('.modal-title');
			var _this_target_dialog = _this_target.find('.modal-dialog');
			var _this_target_body = _this_target.find('.modal-body');
			var _this_target_footer = _this_target.find('.modal-footer');
			var _this_target_content = _this_target.find('.modal-content');
			var _this_target_uxbody = _this_target.find('#ux-pb-modal-body');
			var _this_target_uxbody_before = _this_target_uxbody.find('#ux-pb-modal-body-before');
			var _this_target_uxbody_after = _this_target_uxbody.find('#ux-pb-modal-body-after');
			var _this_target_uxbody_editor = _this_target_uxbody.find('#ux-pb-box-editor');
			var _this_to_target;
			
			_this_target_title.html(_this_title + ' <small>ID: ' + _this_itemid + '</small>');
			_this_target_uxbody_before.html('');
			_this_target_uxbody_after.html('');
			_this_target.modal('show');
			ux_pb_box_editor.hide();
			ux_pb_box_editor.children('.ux-pb-module-field').removeAttr('data-subcontrol');
			ux_pb_modalclose.show();
			ux_pb_modalsave.button('reset').show();
			ux_pb_modaledit.button('reset').hide();
			ux_pb_loadtemplate.button('reset').hide();
			ux_pb_deletetemplate.button('reset').hide();
			
			if(_this.attr('data-totarget') == 'ux-pb-box-container'){
				_this_to_target = '.ux-pb-box-container';
			}else{
				_this_to_target = _this.parent().parent().parent().parent().attr('data-itemid');
			}
			ux_pb_box_choose.children().attr('data-target', _this_to_target);
			
			if(_this_id == 'choose-module'){
				_this_target.addClass('notbody');
				_this_target_uxbody_before.html(ux_pb_box_choose.html());
				ux_pb.insertmodule(_this_target_uxbody.find('[data-toggle=insert-module]'));
			}else if(_this_id == 'save_current_template'){
				_this_target.removeClass('notbody');
				
				jQuery.post(ajaxurl, {
					'action': 'ux_pb_module_ajax',
					'id': _this_id,
					'post_id': ux_pb_postid.val()
				}, function(content, status, XHR){
					_this_target_uxbody_after.html(content);
					XHR = null;
				});
			}else if(_this_id == 'load_template'){
				ux_pb_modalsave.hide();
				ux_pb_loadtemplate.show();
				ux_pb_deletetemplate.show();
				
				_this_target.removeClass('notbody');
				
				jQuery.post(ajaxurl, {
					'action': 'ux_pb_module_ajax',
					'id': _this_id
				}, function(content, status, XHR){
					_this_target_uxbody_after.html(content);
					XHR = null;
				});
			}else{
				_this_target.removeClass('notbody');
				
				jQuery.post(ajaxurl, {
					'action': 'ux_pb_module_ajax',
					'id': _this_id,
					'itemid': _this_itemid
				}, function(content, status, XHR){
					if(_this_id == 'text-block'){
						_this_target_uxbody_after.html(content);
					}else if(_this_id == 'icon-box'){
						_this_target_uxbody_before.html(content);
						var _after_item = _this_target_uxbody.find('#ux-pb-modal-body-before').find('[data-modalbody=after]');
						
						if(_after_item.length){
							_this_target_uxbody_after.html(null);
							_after_item.each(function(){
								jQuery(this).appendTo(_this_target_uxbody_after);
							});
						}
					}else{
						_this_target_uxbody_before.html(content);
					}
					
					_this_target_body.scrollTop(0);
					
					ux_pb.haseditor();
					ux_pb.bgcolor();
					ux_pb.switchcolor();
					ux_pb.upload();
					ux_pb.switch();
					ux_pb.fieldevent();
					ux_pb.tabs();
					ux_pb.checkboxgroup();
					ux_pb.sortableitems();
					ux_pb.priceitems();
					ux_pb.items();
					ux_pb.itemsadd();
					ux_pb.subcontrol();
					ux_pb.selecticons();
					ux_pb.selectmask();
					ux_pb.datetimepicker();
					ux_pb.socialmedias();
					ux_pb.galleryselect();
					
					XHR = null
					
					ux_pb_box_editor.find('.mce-i-fullscreen').parent().parent().remove();
					
				});
			}
			
			return false;
		});
	}
	//pb modal close
	this.modalclose = function(){
		ux_pb_modal.on('hidden.bs.modal', function () {
			var _editor_ifr = ux_pb_box_editor.find('.mceIframeContainer > iframe');
			if(!_editor_ifr.length){
				//WP 3.9
				_editor_ifr = ux_pb_box_editor.find('#ux-pb-module-content_ifr');
			}
			
			var _editor_wrap = ux_pb_box_editor.find('.wp-editor-wrap');
			var _editor_area = ux_pb_box_editor.find('.wp-editor-area');
			var _data_active = jQuery('[data-active]');
	
			if(_editor_wrap.is('.tmce-active')){
				_editor_ifr.contents().find('body').html('');
			}else{(_editor_wrap.is('.html-active'))
				_editor_area.val('');
			}
			
			jQuery('.datetimepicker').remove();
			ux_pb_modalbody_after.html('');
			ux_pb_modalbody_before.html('');
			_data_active.removeAttr('data-active');
		})
	}
	
	//pb template ******************************************
	
	//pb template load
	this.loadtemplate = function(){
		ux_pb_loadtemplate.click(function(){
			var _this = jQuery(this);
			var _this_parents = _this.parents('#ux-pb-modal');
			var _this_template_id = _this_parents.find('[name=ux_pb_templateid]');
			
			_this.button('loading');
			
			jQuery.post(ajaxurl, {
				'action': 'ux_pb_module_ajax',
				'id': 'load_template',
				'templateid': _this_template_id.val(),
				'post_id': ux_pb_postid.val()
			}, function(data, status, XHR){
				_this_ajaxcontent = jQuery(data);
				ux_pb_box_container.html(_this_ajaxcontent);
				
				ux_pb.isotope(_this_ajaxcontent.find('.ux-pb-subbox-container'));
				ux_pb.sortable(_this_ajaxcontent.find('.ux-pb-subbox-container'));
				ux_pb.droppable(_this_ajaxcontent.find('.ux-pb-subbox-container'));
				ux_pb.modal(_this_ajaxcontent.find('[data-target=#ux-pb-modal]'));
				ux_pb.copymodule(_this_ajaxcontent.find('.copy'));
				ux_pb.decrease(_this_ajaxcontent.find('.decrease'));
				ux_pb.increase(_this_ajaxcontent.find('.increase'));
				ux_pb.remove(_this_ajaxcontent.find('.remove'));
				ux_pb.refreshitem();
				ux_pb.refreshfield();
				
				setInterval(function(){
					ux_pb_box_container.isotope('reloadItems').isotope({sortBy: 'original-order'});
					ux_pb_box_container.isotope('reLayout');
					ux_pb.refreshfirst();
				}, 2);
				
				_this_parents.modal('hide');
				_this.button('reset');
				
				XHR = null;
			});
		});
	}
	//pb template delete
	this.deletetemplate = function(){
		ux_pb_deletetemplate.click(function(){
			var _this = jQuery(this);
			var _this_parents = _this.parents('#ux-pb-modal');
			var _this_template_id = _this_parents.find('[name=ux_pb_templateid]');
			
			_this.button('loading');
			jQuery.post(ajaxurl, {
				'action': 'ux_pb_module_ajax',
				'id': 'delete_template',
				'templateid': _this_template_id.val()
			}, function(data, status, XHR){
				_this_parents.modal('hide');
				_this.button('reset');
				XHR = null;
			});
		});
	}
	
	//pb mudules ******************************************
	
	//theme gallery select
	this.galleryselect = function(){
		jQuery('.ux-pb-gallery-select > .nav').sortable();
		jQuery('.ux-pb-gallery-select-images').click(function(){
			var _this = jQuery(this);
			var _gallery_select = jQuery('.ux-pb-gallery-select');
			var _thumbnail_id, _thumbnail_image, _thumbnail_thumb;
			var _new_item = '';
			
			var frame = wp.media({
				title : 'Select Images',
				multiple : true,
				library : { type : 'image'},
				button : { text : 'Insert' }
			});
			
			frame.on('select',function() {
				
				attachments = frame.state().get('selection').toJSON();
				
				for(var i=0; i<attachments.length; i++){
					_thumbnail_id = attachments[i]['id'];
					_thumbnail_image = attachments[i]['url'];
					
					if(attachments[i].sizes.thumbnail){
						_thumbnail_thumb = attachments[i].sizes.thumbnail.url;
					}else{
						_thumbnail_thumb = attachments[i].sizes.full.url;
					}
					
					_new_item += '<li><button type="button" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span></button><a href="#" class="thumbnail"><img src="' + _thumbnail_thumb + '" width="100" /></a><input type="hidden" name="module_gallery_library" value="' + _thumbnail_id + '" /></li>';
					
				}
				
				_gallery_select.find('.nav').append(_new_item);
				
				jQuery('.ux-pb-gallery-select .nav > li > button.btn').each(function(){
					jQuery(this).click(function(){
						jQuery(this).parent().remove();
					});
				});
			});
				
			frame.open();
		});
		
		jQuery('.ux-pb-gallery-select .nav > li > button.btn').each(function(){
			jQuery(this).click(function(){
				jQuery(this).parent().remove();
			});
		});
	}
	
	//pb modal before save
	this.modalbeforesave = function(){
		var _items_template = jQuery('.ux-pb-module-items-template');
		var _items_template_name = _items_template.find('[name]');
		_items_template_name.each(function(){
			var _this = jQuery(this);
			_this.removeAttr('name');
		});
	}
	//pb modal save
	this.modalsave = function(){
		ux_pb_modalsave.click(function(){
			ux_pb.modalbeforesave();
			var _this = jQuery(this);
			var _this_parents = _this.parents('#ux-pb-modal');
			var _this_parents_itemid = _this_parents.find('.ux-pb-module-itemid').val();
			var _this_parents_body = _this_parents.find('.modal-body');
			var _this_parents_fields = _this_parents_body.find('[name]').serializeArray();
			
			var _editor_ifr = ux_pb_box_editor.find('.mceIframeContainer > iframe');
			if(!_editor_ifr.length){
				//WP 3.9
				_editor_ifr = ux_pb_box_editor.find('#ux-pb-module-content_ifr');
			}
			
			var _editor_wrap = ux_pb_box_editor.find('.wp-editor-wrap');
			var _editor_area = ux_pb_box_editor.find('.wp-editor-area');
			
			_content_val = '';
			if(_editor_wrap.is('.tmce-active')){
				_content_val = _editor_ifr.contents().find('#tinymce').html();
				var _content_ob = _editor_ifr.contents().find('#tinymce');
				if(_content_ob.find('.wp-gallery').length){
					_content_ob.find('.wp-gallery').each(function(){
						var _content_gallery_title = jQuery(this).attr('title');
						jQuery(this).replaceWith('[' + _content_gallery_title + ']');
					});
					_content_val = _content_ob.html();
				}
			}else if(_editor_wrap.is('.html-active')){
				_content_val = _editor_area.val();
			}
			
			_this.button('loading');
			
			if(_this_parents_itemid){
				jQuery.post(ajaxurl, {
					'action': 'ux_pb_module_ajax',
					'id': 'modulesave',
					'fields': _this_parents_fields,
					'itemid': _this_parents_itemid,
					'content': _content_val
				}, function(data, status, XHR){
					_this_parents.modal('hide');
					_this.button('reset');
					XHR = null;
				});
			}else{
				var _this_template_name = _this_parents.find('[name=ux_pb_save_template]');
				jQuery.post(ajaxurl, {
					'action': 'ux_pb_module_ajax',
					'id': 'save_current_template',
					'template_name': _this_template_name.val(),
					'post_id': ux_pb_postid.val()
				}, function(data, status, XHR){
					_this_parents.modal('hide');
					_this.button('reset');
					XHR = null;
				});
			}
		});
	}
	//pb modal edit
	this.modaledit = function(){
		ux_pb_modaledit.click(function(){
			var _this = jQuery(this);
			var _this_active = jQuery('.active-itemedit');
			
			var _modal_fields = jQuery('.ux-pb-module-field');
			
			var _editor_ifr = ux_pb_box_editor.find('.mceIframeContainer > iframe');
			if(!_editor_ifr.length){
				//WP 3.9
				_editor_ifr = ux_pb_box_editor.find('#ux-pb-module-content_ifr');
			}
			
			var _editor_wrap = ux_pb_box_editor.find('.wp-editor-wrap');
			var _editor_area = ux_pb_box_editor.find('.wp-editor-area');
			
			_modal_fields.each(function(){
				var _field = jQuery(this);
				var _field_name = _field.attr('data-name');
				var _field_type = _field.attr('data-type');
				var _field_subcontrol_type = _field.attr('data-subcontrol-type');
				var _field_active = _field.attr('data-active');
				var _field_target = _this_active.find('[data-fieldname=' + _field_name + ']');
				var _field_target_parents = _field_target.parents('.list-group-item');
				var _field_target_title = _field_target_parents.find('> span');
				var _field_target_icon = _field_target_parents.find('> i');
				var _field_target_icon = _field_target_parents.find('> i');
				var _field_input = _field.find('[name]');
				var _field_val = null;
				
				if(_field_active == 'true'){
					switch(_field_subcontrol_type){
						case 'title':
							_field_target.val(_field_input.val());
							_field_target_title.text(_field_input.val());
						break;
						
						case 'icons':
							_field_target.val(_field_input.val());
							//_field_target_icon.attr('class', _field_input.val());
						break;
						
						case 'content':
							if(_editor_wrap.is('.tmce-active')){
								_field_val = _editor_ifr.contents().find('#tinymce').html();
								var _content_ob = _editor_ifr.contents().find('#tinymce');
								if(_content_ob.find('.wp-gallery').length){
									_content_ob.find('.wp-gallery').each(function(){
										var _content_gallery_title = jQuery(this).attr('title');
										jQuery(this).replaceWith('[' + _content_gallery_title + ']');
									});
									_field_val = _content_ob.html();
								}
							}else if(_editor_wrap.is('.html-active')){
								_field_val = _editor_area.val();
							}
							_field_target.val(_field_val);
						break;
						
						default:
							if(_field_input.attr('name') == 'module_price_card_price_details'){
								var _price_items = jQuery('.ux-pb-module-items-price .row');
								var _price_output = '';
								
								if(_price_items.length){
									_price_items.each(function(price_i){
										var _price_icon = jQuery(this).find('select').val();
										var _price_text = jQuery(this).find('input').val();
										
										if(price_i != 0){
											_price_output += '|||';
										}
										
										_price_output += _price_icon + '||' + _price_text;
									});
								}
								
								_field_target.val(_price_output);
							}else{
								_field_target.val(_field_input.val());
							}
						break;
					}
					_field.hide();
				}else{
					_field.fadeIn();
				}
				_field.removeAttr('data-active');
			});
			
			_this.button('loading');
			_this_active.removeClass('active-itemedit');
			
			ux_pb_modalclose.fadeIn();
			ux_pb_modalsave.fadeIn();
			ux_pb_modaledit.hide();
			ux_pb_loadtemplate.hide();
			ux_pb_deletetemplate.hide();
			
			var ux_pb_module_field_control = jQuery('.ux-pb-module-field[data-control]');
			ux_pb_module_field_control.each(function(){
				var _this = jQuery(this);
				var _this_control = _this.attr('data-control');
				var _this_controlvalue = _this.attr('data-controlvalue');
				var _control = jQuery('.ux-pb-module-field[data-name=' + _this_control + ']');
				var _control_type = _control.attr('data-type');
				var _control_field, _control_fieldval;
				var _control_index;
				
				switch(_control_type){
					case 'select':
						_control_field = _control.find('[name=' + _this_control + ']');
						_control_fieldval = _control_field.attr('data-value');
					break;
					
					case 'switch':
						_control_field = _control.find('[name=' + _this_control + ']');
						_control_fieldval = _control_field.attr('data-value');
					break;
				}
				
				_control_index = _this_controlvalue.indexOf(_control_fieldval);
				if(_control_index == '-1'){
					_this.hide();
				}else{
					_this.show();
					if(_control.is(':hidden')){
						_this.hide();
					}
				}
			});
			
			ux_pb.subcontrol();
		})
	}
	//pb sortable module items
	this.sortableitems = function(){
		var _module_items = jQuery('.ux-pb-module-items');
		_module_items.sortable();
	}
	//pb bgcolor select
	this.bgcolor = function(){
		jQuery('.ux-pb-bg-color').each(function(){
			var _this = jQuery(this);
			var _this_buttons = _this.find('button');
			var _this_input = _this.next('input:hidden');
			var _switchcolor = _this.parent().find('.ux-pb-switch-color');
			var _switchcolor_color = _switchcolor.find('.switch-color');
			var _switchcolor_swatchcolor = _switchcolor.find('.minicolors-swatch-color');
			var _switchcolor_picker = _switchcolor.find('.minicolors-picker');
			
			_this.delegate('button', 'click', function(){
				var _this_button = jQuery(this);
				var _this_button_val = _this_button.attr('data-value');
				_this_buttons.find('span').hide();
				_this_button.find('span').show();
				_this_input.val(_this_button_val);
				_switchcolor_color.val(null);
				_switchcolor_swatchcolor.removeAttr('style');
				_switchcolor_picker.css({left:0, top:0});
			});
			
			_this_buttons.each(function(){
				var _this_button = jQuery(this);
				var _this_button_val = _this_button.attr('data-value');
				if(_this_button_val == _this_input.val()){
					_this_button.find('span').show();
				}
			});
		});
	}
	//pb switch color
	this.switchcolor = function(){
		jQuery('.ux-pb-module-field .switch-color').each(function(){
			jQuery(this).minicolors({
				theme: 'bootstrap',
				letterCase: 'uppercase',
				changeDelay: 0,
				change: function(hex, opacity){
					jQuery('.ux-pb-bg-color button span').hide();
					jQuery('.ux-pb-bg-color').next('input').val('');
				}
			});
		});
		
		jQuery('.ux-pb-remove-color').each(function(index, element){
			var _this = jQuery(this);
			var _this_switch = _this.parents('.ux-pb-switch-color');
			var _this_color = _this_switch.find('.switch-color');
			var _this_swatch_color = _this_switch.find('.minicolors-swatch-color');
			var _this_picker = _this_switch.find('.minicolors-picker');
			_this.click(function(){
				_this_color.val(null);
				_this_swatch_color.removeAttr('style');
				_this_picker.css({left:0, top:0});
			})
		});
	}
	//pb upload
	this.upload = function(){
		jQuery('.ux-pb-upload').each(function(index, element){
			var _this = jQuery(this);
			var _this_input = _this.find('[type=text]');
			
			_this.delegate('.ux-pb-upload-image', 'click', function(){
				var frame = wp.media({
					title : 'Insert Media',
					multiple : false,
					library : { type : 'image'},
					button : { text : 'Insert' }
				});
				
				frame.on('select',function() {
					
					first = frame.state().get('selection').first().toJSON();
					attachments = frame.state().get('selection').toJSON();
	
					_this_input.val(first['url']);
					_this.next().find('img').attr('src', first['url']);
				});
					
				frame.open();
			});
			
			_this.delegate('.ux-pb-remove-image', 'click', function(){
				_this_input.val('');
				_this.next().find('img').attr('src', '');
			});
		});
	}
	//pb switch
	this.switch = function(){
		jQuery('.ux-pb-module-field .pb-make-switch')['bootstrapSwitch']();
		jQuery('.ux-pb-module-field .pb-make-switch').on('switch-change', function(e, data){
			var _this = jQuery(this);
			var _this_children = _this.children();
			var _this_input = _this.find('input[type=hidden]');
			var _this_val;
			
			if(_this_children.is('.switch-on')){
				_this_val = 'on';
			}else{
				_this_val = 'off';
			}
			_this_input.val(_this_val);
		});
	}
	//pb field control
	this.fieldcontrol = function(name, control){
		var _data_control = jQuery('.ux-pb-module-field[data-control=' + name + ']');
		_data_control.each(function(){
			var _this = jQuery(this);
			var _this_value = _this.attr('data-controlvalue');
			var _this_name = _this.attr('data-name');
			var _this_control = jQuery('.ux-pb-module-field[data-name=' + name + ']');
			var _this_control_type = _this_control.attr('data-type');
			var _this_control_field, _this_control_fieldval, _this_control_index;
			
			switch(_this_control_type){
				case 'select':
					_this_control_field = _this_control.find('[name=' + name + ']');
					_this_control_fieldval = _this_control_field.attr('data-value');
				break;
				
				case 'switch':
					_this_control_field = _this_control.find('[name=' + name + ']');
					_this_control_fieldval = _this_control_field.attr('data-value');
				break;
			}
			
			if(control == 'hide'){
				_this.hide();
				ux_pb.fieldcontrol(_this_name, 'hide');
			}else if(control == 'show'){
				_this_control_index = _this_value.indexOf(_this_control_fieldval);
				if(_this_control_index == '-1'){
					_this.hide();
					ux_pb.fieldcontrol(_this_name, 'hide');
				}else{
					_this.show();
					ux_pb.fieldcontrol(_this_name, 'show');
				}
			}
		});
	}
	//pb field events
	this.fieldevent = function(){
		var ux_pb_module_field_control = jQuery('.ux-pb-module-field[data-control]');
		ux_pb_module_field_control.each(function(){
			var _this = jQuery(this);
			var _this_control = _this.attr('data-control');
			var _this_controlvalue = _this.attr('data-controlvalue');
			var _control = jQuery('.ux-pb-module-field[data-name=' + _this_control + ']');
			var _control_type = _control.attr('data-type');
			var _control_field, _control_fieldval;
			var _control_index;
			
			switch(_control_type){
				case 'select':
					_control_field = _control.find('[name=' + _this_control + ']');
					_control_fieldval = _control_field.attr('data-value');
					
					_control_field.change(function(){
						var _select = jQuery(this);
						var _select_name = _select.attr('name');
						var _select_control = jQuery('.ux-pb-module-field[data-control=' + _select_name + ']');
						
						_select.attr('data-value', _select.val());
						
						_select_control.each(function(){
							var _select_controlval = jQuery(this).attr('data-controlvalue');
							_control_index = _select_controlval.indexOf(_select.val());
							if(_control_index == '-1'){
								jQuery(this).hide();
								ux_pb.fieldcontrol(jQuery(this).attr('data-name'), 'hide');
							}else{
								jQuery(this).fadeIn();
								ux_pb.fieldcontrol(jQuery(this).attr('data-name'), 'show');
							}
						});
					})
				break;
				
				case 'switch':
					_control_field = _control.find('[name=' + _this_control + ']');
					_control_fieldval = _control_field.attr('data-value');
					
					_control_field.parents('.pb-make-switch').on('switch-change', function(e, data){
						var _select = jQuery(this);
						var _select_children = _select.children();
						var _select_input = _select.find('input[type=hidden]');
						var _select_name = _select.find('[name]').attr('name');
						var _select_control = jQuery('.ux-pb-module-field[data-control=' + _select_name + ']');
						var _select_val;
						
						if(_select_children.is('.switch-on')){
							_select_val = 'on';
						}else{
							_select_val = 'off';
						}
						_select_input.val(_select_val);
						_select_input.attr('data-value', _select_val);
						
						_select_control.each(function(){
							var _select_controlval = jQuery(this).attr('data-controlvalue');
							_control_index = _select_controlval.indexOf(_select_val);
							if(_control_index == '-1'){
								jQuery(this).hide();
								ux_pb.fieldcontrol(jQuery(this).attr('data-name'), 'hide');
							}else{
								jQuery(this).fadeIn();
								ux_pb.fieldcontrol(jQuery(this).attr('data-name'), 'show');
							}
						});
					});
				break;
			}
			
			_control_index = _this_controlvalue.indexOf(_control_fieldval);
			if(_control_index == '-1'){
				_this.hide();
			}else{
				_this.show();
				if(_control.is(':hidden')){
					_this.hide();
				}
			}
		})
	}
	//pb is subcontrol
	this.subcontrol = function(){
		var ux_pb_subcontrol = ux_pb_modal_body.find('[data-subcontrol]');
		ux_pb_box_editor.find('> [data-name=ux-pb-module-content]').show();
		ux_pb_subcontrol.hide();
	}
	//pb has editor
	this.haseditor = function(){
		var _editor_title = ux_pb_box_editor.find('.col-xs-4 h5');
		var _editor_content = ux_pb_box_editor.find('.ux-pb-module-field');
		var _editor_description = ux_pb_box_editor.find('.col-xs-4 .text-muted');
		var _editor_ifr = ux_pb_box_editor.find('.mceIframeContainer > iframe');
		if(!_editor_ifr.length){
			//WP 3.9
			_editor_ifr = ux_pb_box_editor.find('#ux-pb-module-content_ifr');
		}
			
		var _editor_wrap = ux_pb_box_editor.find('.wp-editor-wrap');
		var _editor_area = ux_pb_box_editor.find('.wp-editor-area');
		
		var _module_content = jQuery('[data-name=module_content]');
		var _module_content_title = _module_content.find('h5');
		var _module_content_description = _module_content.find('.text-muted');
		var _module_content_subcontrol = _module_content.attr('data-subcontrol');
		var _module_content_subcontrol_type = _module_content.attr('data-subcontrol-type');
		var _module_ajax_content = _module_content.find('.ux-pb-editor-ajax-content');
		if(_module_content.length){
			ux_pb_box_editor.show();
			_editor_title.html(_module_content_title.html());
			_editor_description.html(_module_content_description.html());
			if(_module_content_subcontrol){
				_editor_content.attr('data-subcontrol', _module_content_subcontrol);
				_editor_content.attr('data-subcontrol-type', _module_content_subcontrol_type);
			}
			if(_editor_wrap.is('.tmce-active')){
				_editor_ifr.contents().find('body').html(_module_ajax_content.html());
			}else{(_editor_wrap.is('.html-active'))
				_editor_area.val(_module_ajax_content.html());
			}
			_module_content.remove();
			_editor_ifr.height(200);
		}else{
			ux_pb_box_editor.hide();
			_editor_title.html(null);
			_editor_description.html(null);
			_editor_content.removeAttr('data-subcontrol');
			_editor_content.removeAttr('data-subcontrol-type');
			_editor_content.show();
		}
	}
	//price items
	this.priceitems = function(){
		var _price_items = jQuery('.ux-pb-module-items-price');
		var _price_items_template = jQuery('.ux-pb-module-items-price-template');
		var _price_items_add = jQuery('.ux-pb-price-item-add');
		
		_price_items_add.click(function(){
			var _template = jQuery(_price_items_template.html());
			_price_items.append(_template);
			
			_template.find('.ux-pb-items-remove').click(function(){
				_template.remove();
			});
		});
	}
	//pb items
	this.items = function(){
		var _items = jQuery('.ux-pb-module-items');
		var _items_item = _items.find('.list-group-item');
		var _items_addbutton = _items.parent().find('.ux-pb-items-add');
		var _moduleid = jQuery('.ux-pb-module-id').val();
		
		_items_item.each(function(){
			var _this = jQuery(this);
			var _this_edit = _this.find('.ux-pb-items-edit');
			var _this_remove = _this.find('.ux-pb-items-remove');
			
			_items_item.click(false);
			
			ux_pb.itemsedit(_this_edit);
			ux_pb.itemsremove(_this_remove);
		});
		
		if(_moduleid == 'price'){
			if(_items_item.length >= 4){
				_items_addbutton.hide();
			}
		}
	}
	//pb items add
	this.itemsadd = function(){
		var _items_add = jQuery('.ux-pb-items-add');
		var _items_template = _items_add.next('.ux-pb-module-items-template');
		var _moduleid = jQuery('.ux-pb-module-id').val();
		
		_items_add.click(function(){
			var _items = _items_add.parent().find('.ux-pb-module-items');
			
			var _this = jQuery(this);
			var _this_template = _items_template.children().clone()
			var _this_template_edit = _this_template.find('.ux-pb-items-edit');
			var _this_template_remove = _this_template.find('.ux-pb-items-remove');
			var _this_template_title = _this_template.find('> span');
			
			_items.append(_this_template);
			ux_pb.itemsedit(_this_template_edit);
			ux_pb.itemsremove(_this_template_remove);
			
			if(_moduleid == 'price'){
				var _items_item = jQuery('.ux-pb-module-items .list-group-item');
				if(_items_item.length >= 4){
					_items_add.hide();
				}
			}
			
			return false;
		});
	}
	//pb items edit
	this.itemsedit = function(el){
		el.click(function(){
			var _this = jQuery(this);
			var _this_parents = _this.parents('.ux-pb-module-field');
			var _this_name = _this_parents.attr('data-name');
			var _this_parent = _this.parents('.list-group-item');
			var _this_fieldgroup = _this_parent.find('.field-group');
			var _this_fieldgroup_fields = _this_fieldgroup.find('[name]');
			
			var _modal_fields = jQuery('.ux-pb-module-field');
			
			var _editor_ifr = ux_pb_box_editor.find('.mceIframeContainer > iframe');
			if(!_editor_ifr.length){
				//WP 3.9
				_editor_ifr = ux_pb_box_editor.find('#ux-pb-module-content_ifr');
			}
			
			var _editor_wrap = ux_pb_box_editor.find('.wp-editor-wrap');
			var _editor_area = ux_pb_box_editor.find('.wp-editor-area');
			
			_this_fieldgroup.addClass('active-itemedit');
			_modal_fields.each(function(){
				var _field = jQuery(this);
				var _field_name = _field.attr('data-name');
				var _field_type = _field.attr('data-type');
				var _field_subcontrol = _field.attr('data-subcontrol');
				var _field_subcontrol_type = _field.attr('data-subcontrol-type');
				var _field_input = _field.find('[name]');
				var _field_val = _this_fieldgroup.find('[data-fieldname=' + _field_name + ']').val();
				
				if(_field_subcontrol && _field_subcontrol == _this_name){
					switch(_field_subcontrol_type){
						case 'content':
							if(_editor_wrap.is('.tmce-active')){
								_editor_ifr.contents().find('body').html(_field_val);
							}else if(_editor_wrap.is('.html-active')){
								_editor_area.val(_field_val);
							}
						break;
						
						case 'icons':
							var _icons = _field.find('.module-icon');
							var _icons_input = _icons.parents('.ux-pb-module-icons').find('[name]');
							var _icons_select  = jQuery('select.fonts-module-icons');
							var _icons_module = jQuery('.ux-pb-module-icons');
							var _icons_fa = _icons.find('i');
							var _icons_user = _icons.find('img');
							var _icons_type = 'fontawesome';
							_icons.removeClass('current');
							
							if(_field_val){
								if(_field_val.indexOf('fa fa') == '-1'){
									_icons_type = 'user-uploaded-icons';
									
									_icons_user.each(function(){
										var _icon = jQuery(this);
										var _icon_val = jQuery(this).attr('src');
										if(_field_val == _icon_val){
											_icon.parent().addClass('current');
										}
									});
								}else{
									_icons.find('i[class=\"' + _field_val + '\"]').parent().addClass('current');
								}
							}
							
							_icons_select.val(_icons_type);
							
							_icons_module.children('[data-id]').addClass('hidden');
							_icons_module.children('[data-id=' + _icons_type + ']').removeClass('hidden');
							
							_icons_input.val(_field_val);
						break;
						
						case 'bgcolor':
							var _bgcolor = _field.find('.ux-pb-bg-color');
							var _bgcolor_input = _bgcolor.next('input:hidden');
							_bgcolor.find('button').each(function(){
								var _color = jQuery(this);
								var _color_value = _color.attr('data-value');
								if(_color_value == _field_val){
									_color.find('span').show();
								}else{
									_color.find('span').hide();
								}
							});
							_bgcolor_input.val(_field_val);
						break;
						
						default:
							if(_field_input.attr('name') == 'module_price_card_price_details'){
								var _price_items = jQuery('.ux-pb-module-items-price');
								var _price_items_template = jQuery('.ux-pb-module-items-price-template');
								var _field_array= new Array;
								
								_price_items.html('');
								
								if(_field_val != ''){
									_field_array = _field_val.split('|||');
									if(_field_array.length){
										for(i=0; i<_field_array.length; i++){
											var _price_detail = _field_array[i].split('||');
											var _price_icon = _price_detail[0];
											var _price_text = _price_detail[1];
											var _template = jQuery(_price_items_template.html());
											
											_template.find('select').val(_price_icon);
											_template.find('input').val(_price_text);
											
											_template.find('.ux-pb-items-remove').click(function(){
												_template.remove();
											});
											
											_price_items.append(_template);
										}
									}
								}
							}else{
								_field_input.val(_field_val);
							}
						break;
					}
					_field.attr('data-active', 'true');
					_field.fadeIn();
				}else{
					_field.attr('data-active', 'false');
					_field.hide();
				}
			});
			
			ux_pb_modalclose.hide();
			ux_pb_modalsave.hide();
			ux_pb_loadtemplate.hide();
			ux_pb_deletetemplate.hide();
			ux_pb_modaledit.button('reset').show();
			return false;
		});
	}
	//pb items remove
	this.itemsremove = function(el){
		el.click(function(){
			var _this = jQuery(this);
			var _this_parents = _this.parents('.list-group-item');
			var _this_addbutton = _this_parents.parent().parent().find('.ux-pb-items-add');
			var _moduleid = jQuery('.ux-pb-module-id').val();
			
			_this_parents.slideUp(function(){
				_this_parents.remove();
				if(_moduleid == 'price'){
					var _item = _this_parents.parent().find('.list-group-item');
					if(_item.length < 4){
						_this_addbutton.slideDown();
					}
				}
			})
			return false;
		});
	}
	//pb tabs
	this.tabs = function(){
		var ux_pb_tabs = jQuery('.ux-pb-tabs');
		ux_pb_tabs.each(function(index, element){
            var _this = jQuery(this);
			var _this_addon = _this.find('.input-group-addon');
			var _this_add = _this.find('.ux-pb-tabs-add');
			var _this_remove = _this.find('.ux-pb-tabs-remove');
			
			_this_addon.text('Tab ' + Number(index + 1));
			_this.attr('data-num', Number(index + 1));
			
			ux_pb.tabsadd(_this_add);
			ux_pb.tabsremove(_this_remove);
			
			if(index != 0){
				_this_add.addClass('hidden');
				_this_remove.removeClass('hidden');
			}else{
				_this_add.removeClass('hidden');
				_this_remove.addClass('hidden');
			}
        });
	}
	//pb tabs add
	this.tabsadd = function(el){
		el.click(function(){
			var _this = jQuery(this);
			var _this_parents = _this.parents('.ux-pb-tabs');
			var _tabs = _this_parents.clone();
			var _tabs_addon = _tabs.find('.input-group-addon');
			var _tabs_add = _tabs.find('.ux-pb-tabs-add');
			var _tabs_remove = _tabs.find('.ux-pb-tabs-remove');
			var _last = jQuery('.ux-pb-tabs:last');
			var _last_num = Number(_last.attr('data-num'));
			
			_tabs_addon.text('Tab ' + Number(_last_num + 1));
			_tabs.attr('data-num', Number(_last_num + 1));
			_last.after(_tabs);
			
			_tabs_add.addClass('hidden');
			_tabs_remove.removeClass('hidden');
			ux_pb.tabsadd(_tabs_add);
			ux_pb.tabsremove(_tabs_remove);
		})
	}
	//pb tabs remove
	this.tabsremove = function(el){
		el.click(function(){
			var _this = jQuery(this);
			var _this_parents = _this.parents('.ux-pb-tabs');
			
			_this_parents.remove();
		})
	}
	//pb checkbox group
	this.checkboxgroup = function(){
		jQuery('.ux-pb-checkbox-group').each(function(){
			var _this = jQuery(this);
			var _this_checkbox = _this.find('[type=checkbox]');
			
			_this_checkbox.iCheck({
				checkboxClass: 'icheckbox_square-blue',
				radioClass: 'iradio_square-blue',
				increaseArea: '20%' // optional
			});
		});
	}
	//pb select icons
	this.selecticons = function(){
		jQuery('.ux-pb-module-icons').each(function(){
            var _this = jQuery(this);
			var _this_input = _this.find('input');
			var _this_icon = _this.find('.module-icon');
			var _this_select = _this.parent().find('.fonts-module-icons');
			
			_this_select.change(function(){
				var _select_val = jQuery(this).val();
				_this.children('[data-id]').addClass('hidden');
				_this.children('[data-id=' + _select_val + ']').removeClass('hidden');
			});
			
			_this_icon.click(function(){
				var _icon = jQuery(this);
				var _icon_fa = _icon.find('i');
				var _icon_user = _icon.find('img');
				var _icon_val;
				
				if(_icon_fa.length){
					_icon_val = _icon_fa.attr('class');
				}
				
				if(_icon_user.length){
					_icon_val =_icon_user.attr('src');
				}
				
				_this_input.val(_icon_val);
				
				_this_icon.removeClass('current');
				_icon.addClass('current');
				return false;
			});
        });
	}
	//pb select mask
	this.selectmask = function(){
		jQuery('.ux-pb-icon-mask').each(function(){
			var _this = jQuery(this);
			var _this_input = _this.find('input');
			var _this_mask = _this.find('a');
			
			_this_mask.click(function(){
				var _mask = jQuery(this);
				var _mask_val;
				
				if(_mask.is('.current')){
					_mask_val = null;
					_mask.removeClass('current');
				}else{
					_mask_val = _mask.attr('data-value');
					_this_mask.removeClass('current');
					_mask.addClass('current');
				}
				_this_input.val(_mask_val);
				
				return false;
			});
		});
	}
	//pb datetime
	this.datetimepicker = function(){
		var _today = new Date();
		var _today_year = _today.getUTCFullYear();
		var _today_month = _today.getMonth();
		var _today_hours = _today.getHours();
		var _today_minutes = _today.getMinutes();
		var _today_seconds = _today.getSeconds();
		
		jQuery('.ux-pb-datetime').attr('today', _today);
		jQuery('.ux-pb-datetime').attr('year', _today_year);
		jQuery('.ux-pb-datetime').attr('month', _today_month);
		jQuery('.ux-pb-datetime').attr('hours', _today_hours);
		jQuery('.ux-pb-datetime').attr('minutes', _today_minutes);
		jQuery('.ux-pb-datetime').attr('seconds', _today_seconds);
		
		jQuery('.ux-pb-datetime').datetimepicker({
			format: "yyyy-mm-dd hh:ii:ss",
			autoclose: 1,
			startDate: _today,
			todayBtn: 1
		});
	}
	//pb social medias
	this.socialmedias = function(){
		jQuery('.ux-pb-social-medias').each(function(){
            var _this = jQuery(this);
			var _this_parents = _this.parent();
			var _this_add = _this.find('.ux-pb-social-medias-add');
			var _this_remove = _this.find('.ux-pb-social-medias-remove');
			var _this_last, _this_clone;
			
			_this_add.click(function(){
				_this_last = _this_parents.find('.ux-pb-social-medias:last');
				_this_clone = _this_last.clone();
				_this_last.after(_this_clone);
				_this_clone.find('.ux-pb-social-medias-add').addClass('hidden');
				_this_clone.find('.ux-pb-social-medias-remove').removeClass('hidden').click(function(){
					jQuery(this).parents('.ux-pb-social-medias').remove();
				});
			});
			
			_this_remove.click(function(){
				jQuery(this).removeClass('hidden').parents('.ux-pb-social-medias').remove();
			});
			
        });
	}
	
}; 