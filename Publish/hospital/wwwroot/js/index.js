"use strict";

const intervalSildes = null; // background interval
// box setting
// open-close box

const labelSetting = document.querySelector(".setting-box label");
const cog = document.querySelector(".setting-box label .icon");
labelSetting.addEventListener("click", (e) => {
    cog.classList.toggle("fa-spin");
}); // color-option

const colorOption = localStorage.getItem("color-option");
const colors = document.querySelectorAll(".setting-box .color span");
colors.forEach((span) => {
    span.style.background = span.dataset.color;

    if (colorOption !== undefined && span.dataset.color === colorOption) {
        document.documentElement.style.setProperty("--main-color", colorOption);
        changeActive(span);
    }

    span.addEventListener("click", (e) => {
        document.documentElement.style.setProperty(
            "--main-color",
            e.target.dataset.color
        );
        changeActiveClick(e);
        localStorage.setItem("color-option", e.target.dataset.color);
    });
}); // stop background

const backgroundOption = localStorage.getItem("background-run");

if (backgroundOption !== undefined && backgroundOption === "no") {
    clearInterval(intervalSildes);
}

const backgroundBtns = document.querySelectorAll(
    ".setting-box .background span"
);
backgroundBtns.forEach((btns) => {
    btns.addEventListener("click", (e) => {
        if (e.target.dataset.type === "no") {
            clearInterval(intervalSildes);
            localStorage.setItem("background-run", "no");
        } else {
            RunSildes();
            localStorage.setItem("background-run", "yes");
        }

        changeActiveClick(e);
    });

    if (
        backgroundOption !== undefined &&
        backgroundOption === btns.dataset.type
    ) {
        changeActive(btns);
    }
}); // box setting

window.onscroll = () => {
    let windowScroll = (void 0).pageYOffset;
    checkScroll(windowScroll);
    checkHeader(windowScroll);
}; // ./header
// toggle

let toggle = document.querySelector(".btn-toggle");
let links = document.querySelector(".links");

toggle.onclick = function () {
    links.classList.toggle("open");
}; // general function

let changeActive = (e) => {
    e.parentElement.querySelectorAll(".active").forEach((element) => {
        element.classList.remove("active");
    });
    e.classList.add("active");
};

let changeActiveClick = (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
        element.classList.remove("active");
    });
    e.target.classList.add("active");
};

let scrollTop = document.querySelector(".scroll-top");

function checkScroll(windowScroll) {
    // check scroll top
    if (windowScroll > 60) {
        scrollTop.style.display = "block";
    } else {
        scrollTop.style.display = "none";
    }
}

let header = document.querySelector("header");

function checkHeader(windowScroll) {
    let headeroffset = header.offsetTop;

    if (windowScroll > headeroffset) {
        header.classList.add("sticky");
    } else if (windowScroll < headeroffset) {
        header.classList.remove("sticky");
    }
}
