let id = localStorage.getItem("singleId");
console.log(id);

let goods_inner_img = document.querySelector(".goods__inner-images");
let good__title = document.querySelector(".goods__title");
let good__stat = document.querySelector(".goods__title-stat");
let good__price = document.querySelector(".goods__title-price");
let col__texts = document.querySelectorAll(".col-text");
let to = document.querySelector(".to");
let detail_name = document.querySelector(".detail__data-name");
let good__fav = document.querySelector(".goods__inner-fav");
let good__btn = document.querySelector(".goods__btn");
to.addEventListener("click",()=>{
   localStorage.setItem("MainType",to.innerHTML);
})

let backet =JSON.parse(localStorage.getItem("backet"));
if(backet != null){
   for(let i =0;i<backet.length;i++){
      if(backet[i] == id){
   good__btn.classList.add("isbacket");
      good__btn.innerHTML= "в Корзине";
      }
   }
}


function update(){
    let arr = fetch("/products.json")
    .then(response=>response.json())
    .then(array=>{
       array = array.filter(arr=>arr.id==id);
       return array;
    })
    console.log(arr);
    return arr;
}

update()
.then(arr=>{
   for(let i = 0;i<goods_inner_img.children.length;i++){
   let gd_img = goods_inner_img.children[i];
   gd_img.src=  arr[0].img;
   }
   return arr;
})
.then(arr=>{
   good__title.innerHTML = arr[0].brand;
   good__stat.innerHTML = arr[0].text;
   good__price.innerHTML =  arr[0].price;
   to.innerHTML = arr[0].types;
   detail_name.innerHTML = arr[0].text;
   return arr;
})
.then(arr=>{
   col__texts[0].innerHTML = arr[0].gender;
   col__texts[1].innerHTML = arr[0].id;
   col__texts[2].innerHTML = arr[0].brand;
   col__texts[3].innerHTML = arr[0].model;
   return arr;
   
})
.then(arr=>{
   let favArray =JSON.parse(localStorage.getItem("favArray"));
   if(favArray == null){
    favArray = [];
   }
  if(favArray.includes(arr[0].id)){
   good__fav.innerHTML=`<i class="fa-solid fa-heart" id = "fav_like"></i>`;
  }else{
   good__fav.innerHTML =`<i class="fa-regular fa-heart"></i>`;
   
  }
})
.then(arr=>{
   liked();
   backets();

});

function liked(){
     let likeBtn = good__fav;
     likeBtn.addEventListener("click",()=>{
       let parentId =id;
       let favArray =JSON.parse(localStorage.getItem("favArray"));
       if(favArray==null){
         favArray = [];
       }
       if(likeBtn.innerHTML==`<i class="fa-solid fa-heart"></i>`){
         favArray = favArray.filter(arr=> arr!=parentId);
         likeBtn.innerHTML = `<i class="fa-regular fa-heart"></i>`;
       }else{
         favArray.push(parentId);
         likeBtn.innerHTML =`<i class="fa-solid fa-heart"></i>`;
       }
       localStorage.setItem("favArray",JSON.stringify(favArray));
     })
   }
 

   function backets(){
    good__btn.addEventListener("click",()=>{
   
      let localBacket = JSON.parse(localStorage.getItem("backet"));
      if(localBacket==null){
         localBacket =  [];
      }
if(!localBacket.includes(id)){
   localBacket.push(id);
}
if(!good__btn.classList.contains("isbacket")){
   good__btn.classList.add("isbacket");
   good__btn.innerHTML= "в Корзине";

}
      localStorage.setItem("backet",JSON.stringify(localBacket));
    })
   }
  
 


