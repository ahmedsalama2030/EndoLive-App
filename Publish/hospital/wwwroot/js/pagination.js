"use strict";

$(function () {
    let currentPage = 1;
    let itemPerPage = $(".pagination-container").data("lengthpage");
    let url = $(".pagination-container").data("url"); //Pagination

    localStorage.removeItem("pagination");
    $(".navigation-btn").click(function () {
        let pagination = JSON.parse(localStorage.getItem("pagination"));
        if (this.dataset.type === "increment") increment(pagination);
        else decrement(pagination);
        sendNavigate(url);
    });

    let increment = (pagination) => {
        //increment navigate plus 1 to max
        if (pagination !== null && pagination !== "")
            currentPage =
                pagination.currentPage + 1 >= pagination.totalPages
                    ? pagination.totalPages
                    : ++currentPage;
        else ++currentPage;
    };

    let decrement = (pagination) => {
        //decrement navigate sub 1 to 1
        if (pagination !== null && pagination !== "")
            currentPage = pagination.currentPage - 1 <= 0 ? 1 : --currentPage;
    };

    function sendNavigate(url) {
        $.ajax({
            url: url,
            type: "POST",
            data: {
                pageNumber: currentPage,
                PageSize: itemPerPage,
                __RequestVerificationToken: $(
                    'input:hidden[name="__RequestVerificationToken"]'
                ).val()
            },
            success: function (result, textStatus, jqXHR) {
                let header = jqXHR.getResponseHeader("pagination");
                localStorage.setItem("pagination", header);
                setupNavigate(header);
                $("#update").html(result);
            }
        });
    }

    let setupNavigate = (pagination) => {
        // set up navigate add or remove active class
        var Newpagination = JSON.parse(pagination);

        if (Newpagination.currentPage === Newpagination.totalPages) {
            $("#increment").addClass("active");
            $("#decrement").removeClass("active");
        } else if (Newpagination.currentPage === 1) {
            $("#decrement").addClass("active");
            $("#increment").removeClass("active");
        } else {
            $("#increment").removeClass("active");
            $("#decrement").removeClass("active");
        }

        $("#currentPage").text(Newpagination.currentPage);
    };
});
