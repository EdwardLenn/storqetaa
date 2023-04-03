// Variable to hold request
var request;

var url = window.location.href;

$(document).ready(function() {

    $(function() {
        $('.lazy').lazy();
    });

    $('#url').val(url);
    
    // Bind to the submit event of our form
    $("#orderform").submit(function(event) {
        $("#btntest").html('<img style="" src="images/loading.gif" /> المرجو الإنتظار');
        // Abort any pending request
        if (request) {
            request.abort();
        }
        // setup some local variables
        var $form = $(this);

        // Let's select and cache all the fields
        var $inputs = $form.find("input, select, button, textarea");

        // Serialize the data in the form
        var serializedData = $form.serialize();

        // Let's disable the inputs for the duration of the Ajax request.
        // Note: we disable elements AFTER the form data has been serialized.
        // Disabled form elements will not be serialized.
        $inputs.prop("disabled", true);

        // Fire off the request to /form.php
        request = $.ajax({
            url: "https://script.google.com/macros/s/AKfycbz0oEjxxweCfjFB-EXvjUMMVSwDWUJzC1YZse0I6sheQEUSupxD/exec",
            type: "post",
            data: serializedData
        });

        // Callback handler that will be called on success
        request.done(function(response, textStatus, jqXHR) {
            // Log a message to the console
            console.log("Hooray, it worked!");
            console.log(response);
            console.log(textStatus);
            console.log(jqXHR);
        });

        // Callback handler that will be called on failure
        request.fail(function(jqXHR, textStatus, errorThrown) {
            // Log the error to the console
            console.error(
                "The following error occurred: " +
                textStatus, errorThrown
            );
        });

        // Callback handler that will be called regardless
        // if the request failed or succeeded
        request.always(function() {
            // Reenable the inputs
            $inputs.prop("disabled", false);
            console.log("It's running");
            window.location.href = 'thanks.html';
        });

        // Prevent default posting of form
        event.preventDefault();
    });

    $(".go-to-form .btn").on('click', function() {
        $("html, body").animate({ 
            scrollTop: $('.product__info').offset().top - 147
        }, 1000);
    });

    var offsetForm = $('.product__info').offset();
    $(window).on('scroll', function () {
        if ($(this).scrollTop() >= 1000) {
            $('.go-to-form').show();
        } else {
            $('.go-to-form').hide();
        }


        if ($(this).scrollTop() >= 117) {
            $('.header__sticky').addClass('sticky');
        } else {
            $('.header__sticky').removeClass('sticky');
        }
    })

});