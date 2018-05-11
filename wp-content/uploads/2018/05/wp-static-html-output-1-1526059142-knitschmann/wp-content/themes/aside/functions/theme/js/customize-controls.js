jQuery(document).ready(function(){
	//customize
	//color scheme select
	jQuery('#customize-control-ux_color_scheme_select select').change(function(){
		var _this = jQuery(this);
		var _this_val = _this.val();
		var _schemes = jQuery('#customize_scheme-' +_this_val);
		var _schemes_items = _schemes.find('input');
		
		if(_schemes_items.length){
			_schemes_items.each(function(){
                var _scheme = jQuery(this);
                var _scheme_name = _scheme.attr('name'); 
                var _scheme_val = _scheme.val();
				var _scheme_target = jQuery('#customize-control-' + _scheme_name);
				var _scheme_target_color_picker_hex = _scheme_target.find('.color-picker-hex');
				
				_scheme_target_color_picker_hex.wpColorPicker('color', _scheme_val);
            });
		}
	});
});