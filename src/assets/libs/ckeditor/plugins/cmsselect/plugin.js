CKEDITOR.plugins.add('cmsselect', {
    icons: 'cmsselect',
    init: function (editor) {
        editor.addCommand('cmsselect', new CKEDITOR.dialogCommand('cmsselectDialog'));
        editor.ui.addButton('cmsselect', {
            label: 'Chọn ảnh',
            command: 'cmsselect',
            toolbar: 'insert',
            icon: this.path + 'images/cmsselect.png'
        });
        CKEDITOR.dialog.add('cmsselectDialog', this.path + 'dialogs/cmsselect.js');
    }
});
