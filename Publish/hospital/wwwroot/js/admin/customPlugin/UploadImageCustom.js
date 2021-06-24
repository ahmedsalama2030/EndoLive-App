"use strict";

// plugin upload file
// parameters [ languagePage, continer-Images,Size-Files,Count-Files ,ImagesType]
$.fn.UploadImage = function (
    lang = "en",
    imageContainer,
    maxSize = "",
    countFile = "",
    ImagesType = ""
) {
    let resultmaxSize = true;
    let resultcountFile = true;
    let ResultImagesType = true;

    function imagesPreview(fileInput) {
        let files = fileInput.files; // check count
        console.log(files);

        resultcountFile =
            countFile != "" ? checkFileLegth(lang, countFile, files) : true; // check size

        resultmaxSize = maxSize != "" ? checkMaxSize(lang, maxSize, files) : true;
        ResultImagesType =
            ImagesType != "" ? checkTypeFound(lang, files, ImagesType) : true; // preview images

        files && resultcountFile && resultmaxSize && ResultImagesType
            ? previewImages(files)
            : emptyInput(fileInput);
    } // input file change

    $(this).on("change", function () {
        $(".image-box").fadeOut(1000);
        imagesPreview(this);
    }); //  check size files

    let checkMaxSize = (lang, maxSize, input) => {
        let fileLength = input.length;
        let total = 0;

        for (let i = 0; i < fileLength; i++) {
            total += input[i].size;
        }

        total = total / (1024 * 1024);
        return total > maxSize ? fileLenghtMessage(lang, maxSize) : true;
    }; // check file leght

    let checkFileLegth = (lang, countfile, input) => {
        return input.length > countfile ? fileCountSize(lang, countfile) : true;
    }; // images previews

    let previewImages = (files) => {
        console.log(files);
        console.log(imageContainer);

        let fileslength = files.length;
        let images = [];
         

        for (let i = 0; i < fileslength; i++) {
            var reader = new FileReader(); // obj file
            reader.onload = function (event) {
                $(imageContainer).append(`<div class="image-box">  <img class='imgUploaded' src ='${event.target.result}'/></div>`);
                
                };
             reader.readAsDataURL(files[i]);
        }
         
    }; // clear input file

    let emptyInput = (input) => $(input).val(""); // checkTypeFound

    let checkTypeFound = (lang, files, ImagesType) => {
        let result = true;
        let fileLength = files.length;

        for (let i = 0; i < fileLength; i++) {
            let type = files[i].type.split("/")[1].toLowerCase();
            result = ImagesType.includes(type);
            if (!result) break;
        }

        return result ? result : errorTypeMessage(lang, ImagesType);
    }; // message lenght images

    let fileLenghtMessage = (lang, size) => {
        let message =
            lang === "en"
                ? `max length is ${size}`
                : `الحد الأقصى لحجم الملفات ${size}`;
        alert(message);
        return false;
    }; // message count image

    let fileCountSize = (lang, number) => {
        let message =
            lang === "en"
                ? `max number file upload  is ${size} Mg`
                : `أقصى عدد للملفات ${number}`;
        alert(message);
        return false;
    }; // error messahe type

    let errorTypeMessage = (lang, ImagesType) => {
        let message =
            lang === "en"
                ? `images Type not Allow must ${ImagesType}  `
                : `أنواع الصور غير مسموح يجب ان تكون ${ImagesType}`;
        alert(message);
        return false;
    };
};
