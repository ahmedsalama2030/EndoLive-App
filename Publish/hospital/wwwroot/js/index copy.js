
// variable
let mainColor=localStorage.getItem("color-select");

let landingPage=document.querySelector(".landing-page");
let imgsArray=["photo1.png","photo2.png","photo3.jpg","photo4.jpg"]
let backgroundOption=localStorage.getItem("background-option");


if(mainColor !==null){
    document.documentElement.style.setProperty('--main-color',mainColor);

    document.querySelectorAll(".setting-content ul li").forEach(li=>{
li.classList.remove("active");
if(li.dataset.color===mainColor){
    li.classList.add("active");
}
    })
}

let backgroundInterval;
if(backgroundOption==="true"){
    RunBackGround();
}
function RunBackGround(){
    backgroundInterval=setInterval(()=>{
        let randomNumber=Math.floor(Math.random()*imgsArray.length);
     landingPage.style.backgroundImage='url(img/'+imgsArray[randomNumber]+')'
    },3000)
}
 
 // hedaer
let navs= document.querySelectorAll("header  .links-header");
scrollSPA(navs);


//header
// landingPage




document.querySelector('.setting-box label').addEventListener("click",()=>{
    document.querySelector('.setting-box .fa-cog').classList.toggle('fa-spin')
})

var colorList=document.querySelectorAll('.setting-content ul li');
 colorList.forEach(li=>{
    li.addEventListener("click",(e)=>{
        localStorage.setItem("color-select",e.target.dataset.color);
         document.documentElement.style.setProperty('--main-color',e.target.dataset.color);

         handelActive(e);
    })
})
 
////// back ground/'

var backgroundBtns=document.querySelectorAll(".background .btns span").forEach(span=>{

    span.addEventListener("click",(e)=>{
        handelActive(e)

  if(e.target.dataset.background==='yes'){
    localStorage.setItem("background-option",true);
 
    RunBackGround();
  }else{
    localStorage.setItem("background-option",false);
    clearInterval(backgroundInterval)
  }
 
    })

    if(localStorage.getItem("background-option")==='true'){

         document.querySelector(".yes").classList.add("active");
    }
    else{
        document.querySelector(".no").classList.add("active");
 
    }
});



// skills
let skills=document.querySelector('.skills');
window.onscroll=()=>{
    let skillsOffest=skills.offsetTop; 
    let skillsOffestHeight=skills.offsetHeight; 
    let windoHeight=this.innerHeight; 
    let windoScroll=this.pageYOffset; 

    if(windoScroll>(skillsOffest+skillsOffestHeight-windoHeight)){
         document.querySelectorAll(".skills-box .progrees span").forEach(span=>{
            span.style.width=span.dataset.progress;
        })
    }
    
}

// images-box
document.querySelectorAll(".images-box img").forEach(img=>{
    img.addEventListener("click",e=>{
        let overlay=document.createElement("div");
        overlay.className="overlay-popup";
        document.body.append(overlay);
        let popupbox=document.createElement("div");
        popupbox.className="popup-box";
     if(img.alt !==null){
         let header=document.createElement("h2");
         header.className="img-header";
      let altText=   document.createTextNode(img.alt);
       header.appendChild(altText);
      popupbox.appendChild(header)
     }

        let image=document.createElement("img");
        image.src=img.src;
        popupbox.append(image)
       document.body.append(popupbox);

      let closebtn= document.createElement("span");
      closebtn.className="popup-close";
      let textClose=document.createTextNode("X");
      closebtn.append(textClose);
      popupbox.append(closebtn);
    })
})

document.addEventListener("click",(e)=>{
    if(e.target.className=="popup-close"){
        e.target.parentElement.remove();
        document.querySelector(".overlay-popup").remove();
    }
    if(e.target.className=="overlay-popup"){
        e.target.remove();
        document.querySelector(".popup-box").remove();

    }
})
// images-box



// nav-bullets
let bullets= document.querySelectorAll(".nav-bullets  .bullet");
scrollSPA(bullets);

// nav-bullets



// general
function scrollSPA(elemets){
    elemets.forEach(bullet=>{
        bullet.addEventListener("click",(e)=>{
            e.preventDefault();
           document.querySelector(e.target.dataset.section).scrollIntoView(
             {
               behavior :'smooth'
             }  
           );
       })
   }
   ) 
}

function handelActive(e){
    console.log("33")
    e.target.parentElement.querySelectorAll(".active").forEach(element=>{
        element.classList.remove("active");
    });
    e.target.classList.add("active");
}

// general

// nav-toggle
let links=document.querySelector(".links-header");
togglebtn=document.querySelector(".nav-toggle i");
links.onclick=function(){
    this.stopPropagation();

}
togglebtn.addEventListener("click",(e)=>{
     e.stopPropagation();
    e.target.parentElement.classList.toggle("arrow-open");
    links.classList.toggle("open");
});

document.addEventListener("click",e=>{
if(e.target !==togglebtn && e.target !==links){
    if(links.classList.contains("open"))
    {
    togglebtn.parentElement.classList.toggle("arrow-open");
    links.classList.toggle("open");
    }
}
});
// nav-toggle