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


    setTimeout(function() {
        $.validator.addMethod("sinCA", function(sin_number, element) {
            return this.optional(element) || sin_number.length >= 9 &&
                sin_number.match(/(\d{3}\s*\d{3}\s*\d{3}|\d{3}\D*\d{3}\D*\d{3})/);
        }, "Please remove your SIN number.");
    }, 2000);

    $(document).on("wb-ready.wb", function() {
        $("#btnno").click(function(e) {
            $(".gc-pg-hlpfl-no").removeClass("nojs-show");
            $(".gc-pg-hlpfl-btn").addClass("hide");
            $("#helpful").val("No");
        });
        $("#gc-pg-hlpfl-frm").submit(function(e) {
            e.preventDefault();
            $(".gc-pg-hlpfl-thnk").removeClass("hide");
            $("#gc-pg-hlpfl-frm").addClass("hide nojs-show");
            $.ajax({
                url: "https://pagesuccessemailqueue.azurewebsites.net/api/QueueProblemForm",
                type: "POST",
                dataType: "text",
                data: $("form#gc-pg-hlpfl-frm").serialize(),
                success: function(data) {},
                error: function(xhr, status, err) {
                    console.log(xhr.responseText);
                },
            });
        });
    });
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