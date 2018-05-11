tinymce.PluginManager.add('ux_button', function(ed, url) {
    ed.addCommand("fusionPopup", function ( a, params )
    {
        var popup = 'shortcode-generator';

        if(typeof params != 'undefined' && params.identifier) {
            popup = params.identifier;
        }
        
        jQuery('#TB_window').hide();

        // load thickbox
        tb_show("Shortcodes", ajaxurl + "?action=fusion_shortcodes_popup&popup=" + popup + "&width=" + 800);
    });

    // Add a button that opens a window
    ed.addButton('ux_button', {
        text: '',
        icon: true,
        image: UxShortcodes.plugin_folder + '/tinymce/images/icon.png',
        cmd: 'fusionPopup'
    });
});