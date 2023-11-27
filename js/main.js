let header=document.querySelector(".header");

let next = document.querySelector(".bright_circular");
let lists = document.querySelector("#brands__lists");
let list = document.querySelector(".brands__list");
let prev = document.querySelector(".bleft_circular");

let typeLists = document.querySelector(".types__lists");
let typeList = document.querySelector(".types__list");


let prevType = document.querySelector("#prev");
let nextType = document.querySelector("#next");
window.addEventListener("scroll",()=>{
    if(window.scrollY>=176){
     header.classList.add("fixed");
    }else{
    header.classList.remove("fixed");
    }
})
let scroll = 0;
let typeScroll = 0;
next.addEventListener("click",()=>{
    if(scroll<948){
        scroll+=list.scrollWidth+15;
        lists.style.transform = `translateX(-${scroll}px)`;
        next.classList.remove("limit");
    }
    if(scroll==948){
        next.classList.add("limit");
    }
    if(scroll!=0){
        prev.classList.remove("limit");
    }
})

prev.addEventListener("click",()=>{
    if(scroll!=0){
        scroll-=list.scrollWidth+15;
        lists.style.transform = `translateX(-${scroll}px)`;
        prev.classList.remove("limit");
    }
    
    if(scroll==0){
      prev.classList.add("limit");
    }

    if(scroll!=948){
        next.classList.remove("limit");
    }
    
  
})
nextType.addEventListener("click",()=>{
    if(typeScroll!=708){
    typeScroll += typeList.scrollWidth+14;
    typeLists.style.transform = `translateX(-${typeScroll}px)`;
    console.log(typeScroll);
    }
    
    if(typeScroll==708){
       nextType.classList.add("limit") ;
    }
    if(typeScroll!=0){
        prevType.classList.remove("limit");
    }
})
prevType.addEventListener("click",()=>{
    if(typeScroll!=0){
    typeScroll -= typeList.scrollWidth+14;
    typeLists.style.transform = `translateX(-${typeScroll}px)`;
    console.log(typeScroll);
    }
    
    if(typeScroll==0){
       prevType.classList.add("limit") ;
    }
    if(typeScroll!=708){
        nextType.classList.remove("limit");
    }
})

let navlist  = document.querySelectorAll(".nav__list");
for(let i = 0;i<navlist.length;i++){
    navlist[i].addEventListener("click",()=>{
    localStorage.setItem("MainType",navlist[i].children[0].children[0].innerHTML);
    })
}


let choiseGen = document.querySelectorAll(".column__for");
for(let i = 0;i<choiseGen.length;i++){
    choiseGen[i].addEventListener("click",()=>{
     localStorage.setItem("MainGen",choiseGen[i].innerHTML);
    })
}


let br_list = document.querySelectorAll(".brands__list");
let brandsName ;
for(let i = 0;i<br_list.length;i++){
    let brClk = br_list[i];
    brClk.addEventListener("click",()=>{
        brandsName = brClk.children[0].children[0].alt;

       localStorage.setItem("brand",brandsName);
  brandsName = "";
    })
}

// let searching = document.querySelector(".searching");
// let search = searching.children[0];
// search.addEventListener("keypress",(e)=>{
//     if(e.key == "Enter"){
//         window.location.href = "/shop.html";
//     }
//     brandsName = e.target.value;
//     localStorage.setItem("brand",brandsName);

//     console.log(brandsName);
// })









