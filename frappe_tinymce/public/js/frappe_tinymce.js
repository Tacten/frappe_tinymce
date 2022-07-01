
frappe.ui.form.ControlTextEditor = class ControlTextEditor extends frappe.ui.form.ControlCode {
    make_wrapper() {
        super.make_wrapper();
    }

    make_input() {
        this.has_input = true;
        this.make_quill_editor_new();
    }

    make_quill_editor_new() {
        // if (this.quill) return;
        // this.quill = new Quill(this.quill_container[0], this.get_quill_options());
        // this.bind_events();
        const that = this
        if(this['doctype'] !== undefined) {
            this.quill_container = $('<div>').appendTo(this.input_area);
            tinymce.init({
                target: this.input_area,
                toolbar: 'undo redo | formatselect styleselect fontsizeselect | bold italic underline strikethrough forecolor backcolor subscript superscript | alignleft aligncenter alignright alignjustify | bullist numlist table image | outdent indent | link hr removeformat | html fullscreen help ',
                /*toolbar: 'language',
                content_langs: [
                  { title: 'French', code: 'fr_FR' },
                  { title: 'English', code: 'en' }
                ],*/
                language: 'fr_FR',
                fontsize_formats: '10px 11px 12px 14px 15px 16px 18px 24px 36px',
                plugins: [
                  'autoresize', 'autolink', 'charmap', 'emoticons', 'fullscreen', 'help',
                  'hr', 'image', 'imagetools', 'link', 'lists', 'paste', 'searchreplace',
                  'table', 'visualblocks', 'visualchars', 'wordcount',
                ],
                entity_encoding: 'raw',
                convert_urls: true,
                content_css: false,
                toolbar_sticky: true,
    
                setup: function(editor) {
                    that.editor_id = editor.id
                    editor.on('Change', function(e) {
                        that.parse_validate_and_set_in_model(e.level.content);
                    });
                    editor.on('init', function (e) {
                        editor.setContent(that.value);
                    });
                }
            });
            this.activeEditor = tinymce.activeEditor
            console.log('in---')
        }
        console.log(this)
    }

    set_formatted_input(value){
        if(this['doctype'] !== undefined) {
        if (!this.frm.doc.__setContent){
            if(value){
                this.activeEditor.setContent(value)
            }else{
                this.activeEditor.setContent("")
            }
        }
        this.frm.doc.__setContent = 1

    }
}
}
