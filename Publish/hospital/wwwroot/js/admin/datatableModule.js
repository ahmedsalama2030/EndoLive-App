
export function setupdatatable(url, colums, lang, urlAction,lenght,exportBtn) {
      $("#mainTable").DataTable({
         "processing": false,
          "serverSide": true,
          "deferLoading": lenght,
            "ajax": {
            url,
                data: function (d) {
                    console.log(d);
                     var orderName = d.columns[d.order[0].column].data;
                    var orderDir = d.order[0].dir;
                     return $.extend({}, d, {
                        "filterType": $("#select-search").val(),
                        "FilterText": $("#text-search").val(),
                        "orderName":  orderName ,
                         "orderDir":   orderDir  
                 })
            },
             beforeSend: function () {

            },
               complete: function (xhr) {
              
            }
        },
        columns: colums,
          language: changeLange(lang),
         
         "dom": 'l<"btns-operation"B>t<ip> ',
         "bFilter": true,
         "responsive": true,
         "lengthChange": true,
         "autoWidth": false,
         "searching": true,
         "fixedHeader": true,
         "columnDefs": [{
             "targets": [0],
             "orderable": false,
             "searchable": true

         }],
         order: [[1, 'asc']],
         buttons: [
             {
                  text: "<i class='fa fa-plus'></i>",
                 className: 'btn-success',
                 action: function (e, dt, node, config) {
                     window.location.replace(urlAction + 'create');
                 }
             },
             {
                 text: "<i class='fa fa-edit'></i>",
                 className: 'btn-info',
                 attr: { disabled: true },
                 action: function (e, dt, node, config) {
                     var id = getIdSelected()[0].id;
                     window.location.replace(urlAction + 'Edit/' + id);

                  }
             },
             {
                 text: "<i class='fa fa-trash-alt'></i>",
                 className: 'btn-danger btn-delete',
                 attr: { disabled: true },
                 action: function (e, dt, node, config) {
                     var url = urlAction + 'Index?handler=Delete';
                     if (lang=="ar")
                         fireDeletebtnAr(url)
                     else
                     fireDeletebtn(url);
                 }
             },
              
             {
                 extend: 'print',
                  exportOptions: {
                      columns: exportBtn
                 }
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
 };
// get filter data

// change language
function changeLange(lang) {

    var x = (lang === 'en') ? { url: '/js/admin/local.en.json' } : { url: '/js/admin/local.ar.json' }
    return x;
};
 export function geDataTabe() {
    var table = $('#mainTable').DataTable();
    return table;
}

 export function getIdSelected() {
    var table = geDataTabe();
     var data = table.rows('.selected').data();
     console.log(data);
    let rowSelected = [];
    for (var i = 0; i < data.length; i++) {
        rowSelected.push(data[i]);

     }
     console.log(rowSelected);
     return rowSelected;
}
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
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
             var selected = getIdSelected() ;
              $.ajax({
                url: url,
                type: "post",
                headers: { "RequestVerificationToken": $('input[name="__RequestVerificationToken"]').val() },
                 data: { "entities": JSON.stringify(selected)},
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
    swalWithBootstrapButtons.fire({
        title: 'هل انت متأكد من الحذف',
        text: "لا يمكنك الأسترجاع ",
        icon: 'warning',
        confirmButtonText: 'نعم , أريد الحذف',
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
                        'حذف !',
                        'نجح الحذف',
                         
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