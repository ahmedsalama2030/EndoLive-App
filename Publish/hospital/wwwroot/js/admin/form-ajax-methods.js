"use strict";

let Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    }
}); // begin methods

function begin() {
    $("#overlay").toggleClass("d-none");
}

function beginDelete(data, xhr) {
    var table = $("#mainTable").DataTable();
    var data = table.rows(".selected").data();
    let rowSelected = [];
    for (var i = 0; i < data.length; i++) {
        rowSelected.push(data[i]);
    }
    xhr.data.append("entities", JSON.stringify(rowSelected));
    $("#overlay").toggleClass("d-none");
} // success methods

function success(res) {
    setTimeout(() => {
        if (res.code === 400) failureToastFire(res.data);
        else {
            $("#create").get(0).reset();
            SucessToastFire(res.data);
        }
    }, 1000);
}
function successLogin(res) {
    setTimeout(() => {
        if (res.code === 400)
            failureToastFire(res.data);
        else {
            SucessToastFire(res.data);
            window.location.replace(res.url);
        }
    }, 1000);
}
function successDelete(res) {
    setTimeout(() => {
        if (res.code === 400)
            failureToastFire(res.data);
        else {
            $("#modal-overlay").modal("hide");
            $("#mainTable").DataTable().draw();
            SucessToastFire(res.data);
        }

    }, 1000);
}

function successEdit(res) {
    setTimeout(() => {
        if (res.code === 400) failureToastFire(res.data);
        else SucessToastFire(res.data);
    }, 1000);
}

function successDeleteImage(res) {
    setTimeout(() => {
        if (res.code === 400) failureToastFire(res.data);
        else {
            SucessToastFire(res.data);
            var id = "#" + res.id + "";
            $(id).removeClass("d-flex");
            $(id).hide(1000);
        }
    }, 1000);
} // failure methods

function failure(res) {
    console.log(res.status);
    if (res.status === 500) failureToastFire(res.statusText);
    else failureToastFire(data);
} // complete methods

function complete() {
    $("#overlay").toggleClass("d-none", 1000);
} // Toast Fire

let SucessToastFire = (data) => {
    Toast.fire({
        icon: "success",
        title: data
    });
};

let failureToastFire = (data) => {
    Toast.fire({
        icon: "error",
        title: data
    });
};
