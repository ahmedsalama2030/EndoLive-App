$('#checkboxmain').change(function () {
    var status = $(this).is(':checked');
    if (status === true) {
        $(".check-sub").each(function () {
            $(this).prop("checked", status);
            $(this).closest("tr").addClass('selected');

        });
    }
    else {
        $(".check-sub").each(function () {
            $(this).prop("checked", status);
            $(this).closest("tr").removeClass('selected');
        });
    }
    SetUpButtons();

});
// check sub
function subCheck(obj) {
    $(obj).closest("tr").toggleClass('selected');
    SetUpButtons();
}

function SetUpButtons() {
    var rows = $("table tbody tr.selected");
    var selected = rows.length;
    if (selected === 0) {
        $(".btn-edit").prop("disabled", true);
        $(".btn-delete").prop("disabled", true);
    }
    else if (selected === 1) {
        $(".btn-edit").prop("disabled", false);
        $(".btn-delete").prop("disabled", false);

    }
    else if (selected > 1) {
        $(".btn-edit").prop("disabled", true);
        $(".btn-delete").prop("disabled", false);
    }
}
 $("#btn-search").click(() => $("#mainTable").DataTable().draw());
$("#lengthTable").change(() => $("#mainTable").DataTable().page.len($("#lengthTable").val()).draw());
 