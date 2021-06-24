 
export function setupdropzone(
    zoneid,
    clickableid,
    previewsContainerId,
    parallelUploads = 4,
    maxFiles = 4,
    url,
    maxFilesize = 1,
    Submitid,
    typeForm,
    lang) {

    Dropzone.autoDiscover = false;
    $(zoneid).dropzone({
        //parameter name value
        paramName: "photos",
        //clickable div id
        clickable: clickableid,
        //preview files container Id
        previewsContainer: previewsContainerId,
        autoProcessQueue: false,
        uploadMultiple: true,
        parallelUploads: parallelUploads,
        thumbnailWidth: 100,
        thumbnailHeight: 100,
        maxFiles: maxFiles,
        url: url,
        maxFilesize: maxFilesize,//max file size in MB,
        addRemoveLinks: true,
        dictResponseError: 'Server not Configured',
        dictMaxFilesExceeded: 'not send',
        dictUploadCanceled: '',
        dictCancelUpload: '',
        dictResponseError: '',
        acceptedFiles: ".png,.jpg,jpeg,JPG",// use this to restrict file type
        init: function () {
            var self = this;
            // config
            self.options.addRemoveLinks = true;
            self.options.dictRemoveFile = "Delete";
            //New file added
            self.on("addedfile", function (file) { });
            // Send file starts
            self.on("sending", function (file) { });
            self.on('sendingmultiple', function (data, xhr, formData) {
                xhr.setRequestHeader("XSRF-TOKEN",
                    $('input:hidden[name="__RequestVerificationToken"]').val());

            });
            // File upload Progress
            self.on("totaluploadprogress", function (progress) {
                //$('.roller').width(progress + '%');
            });

            self.on("queuecomplete", function (progress) {
                // $('.meter').delay(999).slideUp(999);
            });

            // On removing file
            self.on("removedfile", function (file) { });

            $(Submitid).on("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                // Validate form here if needed
                if (self.getQueuedFiles().length > 0) {
                    self.processQueue();
                } else {
                    self.uploadFiles([]);
                    $(zoneid).submit();
                }

            });



        }
    });

}