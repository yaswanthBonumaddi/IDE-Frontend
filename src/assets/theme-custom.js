ace.define("ace/theme/custom", ["require", "exports", "module", "ace/lib/dom"], function(require, exports, module) {
    exports.isDark = true;
    exports.cssClass = "ace-custom";
    exports.cssText = `
        .ace-custom .ace_gutter {
            background: #2b2b2b;
            color: #8f908a;
        }
        .ace-custom .ace_print-margin {
            width: 1px;
            background: #555651;
        }
        .ace-custom {
            background-color: #272822;
            color: #f8f8f2;
        }
        .ace-custom .ace_cursor {
            color: #f8f8f0;
        }
        .ace-custom .ace_marker-layer .ace_selection {
            background: #49483e;
        }
        .ace-custom.ace_multiselect .ace_selection.ace_start {
            box-shadow: 0 0 3px 0px #272822;
        }
        .ace-custom .ace_marker-layer .ace_step {
            background: rgb(102, 82, 0);
        }
        .ace-custom .ace_marker-layer .ace_bracket {
            margin: -1px 0 0 -1px;
            border: 1px solid #49483e;
        }
        .ace-custom .ace_marker-layer .ace_active-line {
            background: #202020;
        }
        .ace-custom .ace_gutter-active-line {
            background-color: #272727;
        }
        .ace-custom .ace_marker-layer .ace_selected-word {
            border: 1px solid #49483e;
        }
        .ace-custom .ace_invisible {
            color: #52524d;
        }
        .ace-custom .ace_entity.ace_name.ace_tag,
        .ace-custom .ace_keyword,
        .ace-custom .ace_meta.ace_tag,
        .ace-custom .ace_storage {
            color: #f92672;
        }
        .ace-custom .ace_punctuation,
        .ace-custom .ace_punctuation.ace_tag {
            color: #fff;
        }
        .ace-custom .ace_constant.ace_character,
        .ace-custom .ace_constant.ace_language,
        .ace-custom .ace_constant.ace_numeric,
        .ace-custom .ace_constant.ace_other {
            color: #ae81ff;
        }
        .ace-custom .ace_invalid {
            color: #f8f8f0;
            background-color: #f92672;
        }
        .ace-custom .ace_invalid.ace_deprecated {
            color: #f8f8f0;
            background-color: #ae81ff;
        }
        .ace-custom .ace_support.ace_constant,
        .ace-custom .ace_support.ace_function {
            color: #66d9ef;
        }
        .ace-custom .ace_fold {
            background-color: #a6e22e;
            border-color: #f8f8f2;
        }
        .ace-custom .ace_storage.ace_type,
        .ace-custom .ace_support.ace_class,
        .ace-custom .ace_support.ace_type {
            font-style: italic;
            color: #66d9ef;
        }
        .ace-custom .ace_entity.ace_name.ace_function,
        .ace-custom .ace_entity.ace_other,
        .ace-custom .ace_entity.ace_other.ace_attribute-name,
        .ace-custom .ace_variable {
            color: #a6e22e;
        }
        .ace-custom .ace_variable.ace_parameter {
            font-style: italic;
            color: #fd971f;
        }
        .ace-custom .ace_string {
            color: #e6db74; /* Monokai default string color */
        }
        .ace-custom .ace_comment {
            color: #75715e;
        }
        .ace-custom .ace_indent-guide {
            background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/6nl8kwAAAAASUVORK5CYII=) right repeat-y;
        }
    `;
    var dom = require("../lib/dom");
    dom.importCssString(exports.cssText, exports.cssClass);
});
