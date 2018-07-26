

function conditioner(root, options = {}) {
    var defaults = {
        "optionalClass": "optional",
        "nameAttribute": "data-condition",
        "valueAttribute": "data-value"
    };

    var root        = document.querySelector(root);
    var defaultKeys = Object.keys(defaults);

    for (var o = 0; o < defaultKeys.length; o++) {
        if (!options[defaultKeys[o]]) {
            options[defaultKeys[o]] = defaults[defaultKeys[o]];
        }
    }

    var optionals = root.querySelectorAll('.' + options.optionalClass);

    var check     = function() {
        if (this.tagName == 'select') {
            value = this.querySelector('option:selected').value;

        } else if (this.type == 'radio' || this.type == 'checkbox') {
            value = root.querySelector('[name="' + this.getAttribute('name') + '"]:checked').value;

        } else {
            value = this.value;
        }

        var hide = root.querySelectorAll('.' + options.optionalClass + '[' + options.nameAttribute + '="' + this.getAttribute('name') + '"]');
        for (var k = 0; k < hide.length; k++) {
            if (hide[k].getAttribute(options.valueAttribute) == value) {
                hide[k].style.display = "block";

            } else {
                hide[k].style.display = "none";
            }
        }
    }

    for (var i = 0; i < optionals.length; i++) {
        var optional = optionals[i];
        var name     = optional.getAttribute(options.nameAttribute);
        var input    = root.querySelectorAll('[name="' + name + '"]');

        optional.style.display = "none";

        for (var j = 0; j < input.length; j++) {
            input[j].addEventListener('change', check);
        }
    }
};
