

$.fn.setupDataTable = function (url, columns, lang, urlAction, lenght, exportBtn) {
    let changeLange = (lang) => {
        return (lang === 'en') ? { url: '/js/admin/local.en.json' } : { url: '/js/admin/local.ar.json' }
    };
    $(this).DataTable({
        "processing": true,
        "serverSide": true,
        "deferLoading": lenght,
          "dom": '<"btns-operation"B>t<ip> ',
        "ajax": {
            url,
            data: (data) => dataForm(data),
            beforeSend: (data) => {
 },
            complete: (xhr) => { }
        },
        "columns": columns,
        "language": changeLange(lang),
        "bFilter": true,
        "responsive": true,
        "lengthChange": true,
        "autoWidth": false,
        "searching": true,
        "fixedHeader": true,
        "columnDefs": [{
            "targets": [0],
            "orderable": false,
            "searchable": false

        }],
        order: [[1, 'asc']],
        buttons: [
            {
                text: "<i class='fa fa-plus'></i>",
                className: 'btn-success',
                action: () => window.location.replace(urlAction + 'create')
            },
            {
                text: "<i class='fa fa-edit'></i>",
                className: 'btn-info btn-edit',
                attr: { disabled: true },
                action: () => {
                    var id = getIdSelected()[0].id;
                    window.location.replace(urlAction + 'Edit/' + id);
                }
            },
            {
                text: "<i class='fa fa-trash-alt'></i>",
                className: 'btn-danger btn-delete',
                attr: { disabled: true },
                action: () => {
                    var url = urlAction + 'Index?handler=Delete';
                    $("#modal-overlay").modal('show');
                }
            },

            {
                extend: 'print',
               exportOptions: {
                    columns: exportBtn
                },
            },
            {
                extend: 'copyHtml5',
                exportOptions: { columns: exportBtn }

            },
            {
                extend: 'excelHtml5',
                exportOptions: { columns: exportBtn }

            },
            {
                extend: 'csvHtml5',
                exportOptions: { columns: exportBtn }

            },
            {
                extend: 'pdfHtml5',
                exportOptions: { columns: exportBtn }
            },
            {
                extend: 'colvis',
                exportOptions: { columns: exportBtn }
            }

        ]
    }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
    // get filter data

    // change language

    let geDataTabe = () => $(this).DataTable();



    let getIdSelected = () => {
        var table = geDataTabe();
        var data = table.rows('.selected').data();
        let rowSelected = [];
        for (var i = 0; i < data.length; i++) {
            rowSelected.push(data[i]);
        }
        return rowSelected;
    }
    const swalButton = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-danger',
        },
        buttonsStyling: false
    })
    function fireDeletebtn(url) {
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                var selected = getIdSelected();
                $.ajax({
                    url: url,
                    type: "post",
                    headers: { "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val() },
                    data: { "entities": JSON.stringify(selected) },
                    success: function (result, textStatus, jqXHR) {
                        var table = geDataTabe();
                        table.draw();
                        swalWithBootstrapButtons.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    },
                    error: function () {
                        swalWithBootstrapButtons.fire(
                            'حذف !',
                            'فشل الحذف',

                        )
                    }

                });


            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    }

    function fireDeletebtnAr(url) {
        swalButton.fire(getSwalAr()).then((result) => {
            if (result.isConfirmed) {
                var selected = getIdSelected();
                  $.ajax({
                    url: url,
                    type: "post",
                    headers: { "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val() },
                    data: { "entities": JSON.stringify(selected) },
                    success: function (result, textStatus, jqXHR) {
                        var table = geDataTabe();
                        table.draw();
                        swalButton.fire(getSwalSucessAr() )
                    },
                    error: function () {
                        swalButton.fire( getSwalErrorAr() )
                    }

                });


            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(getSwalErrorAr()  )
            }
        })
    }

    let getSwalAr = () => {
        return {
            title: 'هل انت متأكد من الحذف',
            text: "لا يمكنك الأسترجاع ",
            icon: 'info',
            confirmButtonText: 'نعم , أريد الحذف',
        }
    }


    let getSwalSucessAr = () => { 'حذف!', 'فشل الحذف' };
    let getSwalErrorAr = () => ['Cancelled', 'Your imaginary file is safe :)',  'error'];
        
    
    let getSwalEn = () => {
        return {
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'Delete',
            confirmButtonText: 'Yes, delete it!',
        }
    }
    let dataForm = (data) => {
        const { columns, start, draw , order: [order] } = data;
        const { column: index, dir } = order
        return {
            "filterType": $("#select-search").val(),
            "FilterText": $("#text-search").val(),
            "sortColumnName": columns[index].data,
            "sortDirection": dir,
            "length": $("#lengthTable").val(),
            "start": start,
            "draw": draw
        }
    }

     
};