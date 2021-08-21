// Assumes jQuery, jQuery UI, plugins.js

if (!String.prototype.includes) {
    String.prototype.includes = function(str) {
        return this.indexOf(str) >= 0;
    };
}

$(function () {
    $("#spinner").spin({ top: "50px", left: "100px" });

    $(document).click(function () {
        $('div#ui-datepicker-div, div.nivo-lightbox-overlay').attr('aria-hidden', 'true');
    });
});

function showProgressHUD(msg) {
    if (window.interop) {
        interop.exec('showLoading');
        return;
    }
    
    centerHUD();
    $("#progressMessage").html(msg ? msg : "Please wait...");
    $("#progressHUD").show();
}

function hideProgressHUD() {
    if (window.interop) {
        interop.exec('hideLoading');
        return;
    }
    
    $("#progressHUD").hide();
}

function centerHUD() {
    var hud = $("#progressHUD");
    hud.css({
        left: ($(window).width() - hud.outerWidth()) / 2,
        top: ($(window).scrollTop() - hud.outerHeight() / 2) + ($(window).height() - hud.outerHeight()) / 2
    });
}

function showAlert(title, msg) {
    showConfirmationDialog(title, msg, { OK: function () { $(this).dialog('close'); } });
}

function showConfirmationDialog(title, msg, buttons) {
    $("#confirmDialog").remove();
    $("body").append("<div id='confirmDialog' style='display: none;'><span id='confirmMessage' /></div>");

    $("#confirmMessage").html(msg);
    $("#confirmDialog").dialog({
        title: title,
        modal: true,
        buttons: buttons,
        width: 450
    });
}

function closeConfirmation() {
    $("#confirmDialog").dialog("close");
}

// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function mvcRedirect(path) {
    location.href = 'Mvc.aspx?path=' + path;
}

if (typeof toastr != 'undefined') {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "progressBar": true,
        "positionClass": "toast-top-left",
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "2000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
}