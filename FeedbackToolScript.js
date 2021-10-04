(function($, windows, wb) {
    "use strict";
    var componentName = "gc-pg-hlpfl",
        selector = "." + componentName,
        initEvent = "wb-init" + selector,
        $document = wb.doc,
        regex = {
            phoneNumber: /(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/im,
            sin: /(\d{3}\s*\d{3}\s*\d{3}|\d{3}\D*\d{3}\D*\d{3})/im,
            postalCode: /[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d/im,
            email: /([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})/im
        },
        init = function(event) {
            var elm = wb.init(event, componentName, selector),
                $elm;
            if (elm) {
                $elm = $(elm);
                $elm.trigger("keyup");
                wb.ready($elm, componentName);
            }
        };

    jQuery.validator.addMethod("sinCA", function(sin_number, element) {
        return this.optional(element) || sin_number.length >= 9 &&
            sin_number.match(/(\d{3}\s*\d{3}\s*\d{3}|\d{3}\D*\d{3}\D*\d{3})/);
    }, "Please remove your SIN number.");


    $document.on("keyup", selector + " textarea", function(event) {
        var textValue = event.target.value;
        if (textValue.match(regex.phoneNumber) || textValue.match(regex.sin) || textValue.match(regex.postalCode) || textValue.match(regex.email)) {
            $("#warning").removeClass("hidden").animate();
        } else {
            $("#warning").addClass("hidden");
        }
    });
 
    $document.on("timerpoke.wb " + initEvent, selector, init);
    wb.add(selector);
})(jQuery, window, wb);
