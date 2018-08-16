export default function(root, options = {}) {
    var defaults = {
        "valueAttribute": "data-value",
        "nameAttribute": "data-condition",
        "visibleAttribute": "data-visible"
    };

    var defaultKeys = Object.keys(defaults);

    for (var o = 0; o < defaultKeys.length; o++) {
        if (!options[defaultKeys[o]]) {
            options[defaultKeys[o]] = defaults[defaultKeys[o]];
        }
    }

    var root        = document.querySelector(root);
    var optionals   = root.querySelectorAll('[' + options.nameAttribute + ']');
    var check       = function(element) {
        var value    = false;
        var optional = root.querySelector(
            '[' + options.nameAttribute + '="' + element.getAttribute('name') + '"]'
        );

        if (element.tagName == 'select') {
            value = element.querySelector('option:selected').value;

        } else if (element.type == 'radio' || element.type == 'checkbox') {
            if (element.checked) {
                value = element.value;
            }

        } else {
            value = element.value;
        }

        if (optional.getAttribute(options.valueAttribute) == value) {
            optional.setAttribute(options.visibleAttribute, 'true');

        } else {
            optional.removeAttribute(options.visibleAttribute);
        }
    }

    for (var i = 0; i < optionals.length; i++) {
        var optional = optionals[i];
        var name     = optional.getAttribute(options.nameAttribute);
        var input    = root.querySelector('[name="' + name + '"]:not([type="hidden"])');

        check(input);

        input.addEventListener('change', function() {
            check(this);
        });
    }
};
