export default function(root) {
    var options = typeof arguments[1] === 'object' ? arguments[1] : {};
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

    var check       = function(elements) {
        var values   = [];
        var optional = null;

        for(var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var value   = null;

            if (optional === null) {
                optional = root.querySelector('[' + options.nameAttribute + '="' + element.getAttribute('name') + '"]');
            }

            if (element.tagName == 'select') {
                value = element.querySelector('option:selected').value;

            } else if (element.type == 'radio' || element.type == 'checkbox') {
                if (element.checked) {
                    value = element.value;
                }

            } else {
                value = element.value;
            }

            if (value) {
                values.push(value);
            }
        }

        if (optional !== null && values.indexOf(optional.getAttribute(options.valueAttribute)) !== -1) {
            optional.setAttribute(options.visibleAttribute, 'true');

        } else if (optional !== null) {
            optional.removeAttribute(options.visibleAttribute);
        }
    }

    for (var i = 0; i < optionals.length; i++) {
        var optional = optionals[i];
        var name     = optional.getAttribute(options.nameAttribute);
        var inputs   = root.querySelectorAll('[name="' + name + '"]:not([type="hidden"])');

        check(inputs);

        for (var j = 0; j < inputs.length; j++) {
            var input = inputs[j];
            input.addEventListener('change', function() {
                check([this]);
            });
        }
    }
};
