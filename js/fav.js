
let navlist  = document.querySelectorAll(".nav__list");
let product = document.querySelector(".product");

for(let i = 0;i<navlist.length;i++){
    navlist[i].addEventListener("click",()=>{
    localStorage.setItem("MainType",navlist[i].children[0].children[0].innerHTML);
    })
}


let arr = [];
 let favorite = localStorage.getItem("favArray");
if (favorite) {
    try {
        favorite = JSON.parse(favorite);
    } catch (error) {
        console.error("Error parsing JSON:", error);
    }
} else {
    favorite=[];
    console.log("No data in localStorage");
}


function filter(){
   arr = [];
   
    fetch("/products.json")
    .then(response=> response.json())
    .then(array=>{
        for(let i = 0;i<array.length;i++){
            let el = array[i];
            if(favorite.includes(el.id)){
                arr.push(el);
            }
        }
    })
    .then(()=>{
        if(favorite.length == 0){
            ifisNone();
           }else{
            render(arr)
            .then(removeClk())
            
        }
       
       
       
       
       

    })

}
filter();

function removeClk(){
    let el_like = document.querySelectorAll(".element__like-shape");
    for(let i = 0;i<el_like.length;i++){
      let likeBtn = el_like[i];
      likeBtn.addEventListener("click",()=>{  
        
        
        load()
        .then((resolve)=>{
            let parentId = ((likeBtn.parentNode).parentNode).id;
            favorite = favorite.filter(array=> array!=parentId);
            localStorage.setItem("favArray",JSON.stringify(favorite));
            filter();
           
    
          })
        })
    

    }
    
}


function load(){
    let sneak = document.querySelector(".loadingSneak");
    sneak.classList.remove("isnone");
    let black = document.querySelector(".black");
    black.classList.remove("isnone");
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          sneak.classList.add("isnone");
          black.classList.add("isnone");
          resolve(1);
        },1000);
      
      })
  }

function ifisNone(){
  
    product.innerHTML = "";
    let favNull = document.createElement("div");
    favNull.classList.add("favNull");
    let favIcon = document.createElement("div");
    favIcon.classList.add("favicon");
    favIcon.innerHTML = `<div class="element__like-shape favLike">
    <i class="fa-solid fa-heart"></i>
 </div>
 <div class="favText">B избранном пока нет продуктов</div>`;
 favNull.append(favIcon);
 product.append(favNull);
}

   
        






function render(array){
    return new Promise((resolve,reject)=>{
      product.innerHTML = "";
      if(array.length!=0){
        for(let i = 0;i<array.length;i++){
         let product_element = document.createElement("div");
         product_element.classList.add("product__element");
         product_element.classList.add("favorite__product-el");
         product_element.id = array[i].id;
       //  product_element.style.width ="225px";
          let prElem_img = document.createElement("div");
  prElem_img.classList.add("product__element-img");
          let img = document.createElement("img");
         // prElem_img.style.width = "225px";
          img.src = array[i].img;
        //   img.style.width = "225px";
          img.className=`ls-is-cached lazyloaded`;
          prElem_img.append(img);
          prElem_img.innerHTML+=`<div class="element__like-shape">
          <i class="fa-solid fa-x"></i>
       </div>`;
         let brand = document.createElement("div");
         brand.classList.add("element__brand-type");
         brand.append(array[i].brand);
         let brandName = document.createElement("div");
         brandName.classList.add("element_brand-name");
         brandName.append(array[i].text);
         let price = document.createElement("div");
         price.classList.add("product__element-price");
         price.append(array[i].price);
         product_element.append(prElem_img);
         product_element.append(brand);
         product_element.append(brandName);
         product_element.append(price);
         product.append(product_element);
        }
   
      
        
       } 
    })
    
  }