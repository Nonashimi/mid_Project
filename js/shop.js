let data = document.querySelectorAll(".caregory__row-datas");

let btn  = document.querySelectorAll(".category_title-flex");

let rot = document.querySelectorAll(".category__title-expain");

let header=document.querySelector(".header");

let category =[
  [],
  [],
 
];
let favArray = [];
let categoryPrice = "";
let type=localStorage.getItem("MainType");
if(type == null){
  type = "Обувь";
}
let gen = localStorage.getItem("MainGen");
   
let br = localStorage.getItem("brand");
if(br!=null || br!="" || br!="GLOBAL BRANDS"){
  category[1].push(br);
type = "Обувь";
}
localStorage.setItem("brand",null);
console.log(gen);
let cat = ["gender","brand","price"];

let arr ;
    
let product = document.querySelector(".product");

window.addEventListener("scroll",()=>{
    if(window.scrollY>=176){
     header.classList.add("fixed");
    }else{
    header.classList.remove("fixed");
    }
})
for(let i = 0;i<data.length;i++){
  let inf = data[i];
  let clk = btn[i];
  let r = rot[i];
 clk.addEventListener("click",()=>{
    inf.classList.toggle("isnone");
    r.classList.toggle("rotate");
    console.log(clk);
 })
}

function render(array){
  return new Promise((resolve,reject)=>{
    product.innerHTML = "";
    if(array.length!=0){
      for(let i = 0;i<array.length;i++){
       let product_element = document.createElement("div");
       product_element.classList.add("product__element");
       product_element.id = array[i].id;
     //  product_element.style.width ="225px";
     let pr_img_contain =document.createElement("div");
     pr_img_contain.classList.add("pr_img-contains");
        let prElem_img = document.createElement("div");
prElem_img.classList.add("product__element-img");
        let img = document.createElement("img");
       // prElem_img.style.width = "225px";
        img.src = array[i].img;
      //   img.style.width = "225px";
        img.className=`ls-is-cached lazyloaded`;
        prElem_img.append(img);
         favArray =JSON.parse(localStorage.getItem("favArray"));
         if(favArray == null){
          favArray = [];
         }
        if(favArray.includes(array[i].id)){
          pr_img_contain.innerHTML+=`<div class="element__like-shape">
          <i class="fa-solid fa-heart"></i>
       </div>`;
        }else{
          pr_img_contain.innerHTML+=`<div class="element__like-shape">
          <i class="fa-regular fa-heart"></i>
       </div>`;
        }
       let brand = document.createElement("div");
       brand.classList.add("element__brand-type");
       brand.append(array[i].brand);
       let brandName = document.createElement("div");
       brandName.classList.add("element_brand-name");
       brandName.append(array[i].text);
       let price = document.createElement("div");
       price.classList.add("product__element-price");
       pr_img_contain.append(prElem_img);

       price.append(array[i].price);
       product_element.append(pr_img_contain);
       product_element.append(brand);
       product_element.append(brandName);
       product_element.append(price);
       product.append(product_element);
      }
 
    
      
     }
     resolve(1); 
  })
  
}

function transfer(){
  let pr_el = document.querySelectorAll(".product__element-img");
 
  for(let i = 0;i<pr_el.length;i++){
    pr_el[i].addEventListener("click",()=>{
       localStorage.setItem("singleId",pr_el[i].parentNode.parentNode.id);
      window.location.href="/single.html";
    })
  }
}

function liked(){
  let el_like = document.querySelectorAll(".element__like-shape");
  for(let i = 0;i<el_like.length;i++){
    let likeBtn = el_like[i];
    likeBtn.addEventListener("click",()=>{
      let parentId = ((likeBtn.parentNode).parentNode).id;
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

 
}



let gender = document.querySelectorAll(".ct_r-g") ;
for(let i = 0;i<gender.length;i++){
    let c = gender[i].children[0];
    let g = gender[i].children[1];
    c.addEventListener("click",(e)=>{
      load()
      .then((resolve)=>{
        if(e.target.checked){
          category[0].push(g.innerHTML);
        }else{
            category[0] = category[0].filter(item=> item !=g.innerHTML);
        }
       filter();
    
      })
   
    })
}

let brandd = document.querySelectorAll(".ct_r-d");
for(let i = 0;i<brandd.length;i++){
   let b = brandd[i].children[0];
   let n = brandd[i].children[1];
   if(n.innerHTML == localStorage.getItem('brand')){
    b.checked = true;
   }
   
   b.addEventListener("click",(e)=>{
    load()
    .then((resolve)=>{
      if(e.target.checked){
        category[1].push(n.innerHTML);
        }else{
            category[1] = category[1].filter(item=> item !=n.innerHTML);
        }
       filter();
       })
    })
    
}

let price = document.querySelectorAll(".ct_r-p");
for(let i = 0;i<price.length;i++){
    let p = price[i].children[0];
    let w = price[i].children[1];
    p.addEventListener("click",(e)=>{
      load()
      .then((resolve)=>{
        if(e.target.checked){
          categoryPrice = w.innerHTML;
           }else{
               categoryPrice = "";
           }
         filter();
      })
       
           })
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



let types = document.querySelectorAll(".nav__list");
act();
function act(){
  for(let j = 0;j<types.length;j++){
    types[j].classList.remove("orange");
  }
  for(let i=0;i<types.length;i++){
    if(types[i].children[0].innerHTML==type){
      types[i].classList.add("orange");
    }
    
  }

}


for(let i=0;i<types.length;i++){
  types[i].addEventListener("click",(e)=>{
     type = types[i].children[0].innerHTML;
     load()
     .then(()=>{
     clear()
     .then(()=>{
      filter();
     })
     for(let j = 0;j<types.length;j++){
       types[j].classList.remove("orange");
     }
     types[i].classList.add("orange");
 
   })
     })
     
}



function clear(){
  return new Promise((resolve,reject)=>{
    for(let i = 0;i<category.length;i++){
      category[i] = [];
    }
    console.log(category);
    categoryPrice = "";
    let checks = document.querySelectorAll(".checkbox");
    let cs = document.querySelectorAll(".caregory__row-datas");
    for(let i = 0;i<cs.length;i++){
      cs[i].classList.add("isnone");
    }
    let plus = document.querySelectorAll(".category__title-expain");
    for(let i = 0;i<plus.length;i++){
      plus[i].classList.remove("rotate");
    }
    
    for(let i = 0;i<checks.length;i++){
      checks[i].checked = false;
    }
    resolve(1);
  })
}



function filter() {
  new Promise((resolve, reject) => {
   
    fetch("/products.json")
      .then(response => response.json())
      .then(array => {
        arr = array;
          for(let i = 0;i<2;i++){
            arr = arr.filter(item => {
         if(category[i].length!=0){
          if (category[i].includes(item[cat[i]])) {
            return true;
          } else {
            return false;
          }
        }else{
          return true;
        }
      })};
      arr = filterPrice(arr);
     arr = typesFilter(arr);
    //  arr = typesGender(arr);
        resolve(arr); 
      })
      .catch(error => {
        reject(error); 
      });
  })
  .then(array => {
    arr = array;
    render(arr)
  .then(resolve=>{
    liked();
    transfer();
  }); })
  .catch(error => {
    console.error(error);
  });

}



function typesFilter(arr){
    if(type!="Все категорий"){
      arr = arr.filter(item=>{
        console.log(type);
       if(item.types==type){
         return true;
       }else{
         return false;
       }
      })
    }
    return arr;
  }

  function typesGender(arr){
    if(gen =="Мужчинам"){
      gen  = "Мужчина";
    }else if(gen=="Женщинам"){
      gen = "Женщина";
    }else if(gen== "Детям"){
      gen  = "Дети";
    }
    if(gen !=null){
      console.log("asdf");
      arr = arr.filter(item=>{
        if(item.gender == gen){
          return true;
        }else{
          return false;
        }
      })
      gen = null;
    }
    return arr;
    
  }
 






function filterPrice(arr){
  if(categoryPrice!=""){
 arr  = arr.filter(item=>{
  let value = item.price.replace(",00 KZT","");
  value = parseInt(value.replace(" ",""));
  if(categoryPrice.includes(" и более")){
    let minPrice = parseInt(categoryPrice.replace("KZT и более",""));
    if(value>=minPrice){
      return true;
    }else{
      return false;
    }
  }else{
    let prices = categoryPrice.split("-");
   let minPrice =parseInt(prices[0].replace("KZT",""));
   let maxPrice = parseInt(prices[1].replace("KZT",""));
   console.log(minPrice+" "+maxPrice+" "+value);
  if(value>=minPrice && value<=maxPrice){
    console.log(value-minPrice);
    return true;
  }else{
    return false;
  }
}
 })
}
 return arr;
}


console.log(category);
filter();
 
  // render();












