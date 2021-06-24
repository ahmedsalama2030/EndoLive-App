"use strict";

$(window).on("beforeunload", function () {
    $(".content-loader").fadeIn(1000);
    $(".wapper").hide();
});
$(function () {
    $(".content-loader").fadeOut(1000); // loader hide

    $(".wapper").fadeIn(1000); // show

    $(".question-content .card .header").click(function () {
        $(this).next().slideToggle(1000);
        $(".question-content .card .body").not($(this).next()).slideUp(1000);
        $(".question-content .card .header i ").each(function () {
            $(this).removeClass("fa-minus");
            $(this).addClass("fa-plus");
        });
        $(this).children("i").toggleClass("fa-plus");
        $(this).children("i").toggleClass("fa-minus");
    });
});
