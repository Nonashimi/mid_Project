
let backet= [];
let productsCount = [];
backet = JSON.parse(localStorage.getItem("backet"));
productsCount = JSON.parse(localStorage.getItem("countProducts"));
let item_element = document.querySelector(".item__elements");
let backet_count = document.querySelector(".my__backet-count");
rendering();
if(productsCount ==null){
  productsCount = [];
}

let countBacket = 0;
let priceBackets = 0;

let backetClk = document.querySelector(".backet__trash");



function rendering(){
    fetchArray()
    .then(arr=>{
    arr = arr.filter(el=>{
  if(backet.includes(el.id)){
    return true;
  }  else{
    return false;
  }
    })
   item_element.innerHTML = "";
    for(let i  =0;i<arr.length;i++){
        let obj = object();
         obj.children[0].children[0].src = arr[i].img;
         obj.children[1].children[0].innerHTML = arr[i].brand;
         obj.children[1].children[1].innerHTML =arr[i].text;
        obj.children[3].innerHTML = arr[i].price;
        obj.children[4].children[0].id = arr[i].id;
        obj.children[2].children[1].children[0].id = arr[i].id;
        let g =  obj.children[2].children[1].children[0];
        productsCount = JSON.parse(localStorage.getItem("countProducts"));
        if(productsCount ==null){
          productsCount = [];
        }
         
        if(productsCount.length == 0){
          productsCount.push([arr[i].id,1]);
          localStorage.setItem("countProducts",JSON.stringify(productsCount));
        }
        for(let j  =0;j<productsCount.length;j++){
          let obje = productsCount[j];
          if(arr[i].id == obje[0]){
            g.value = obje[1];
          }else{
            
          }
        }

       


         item_element.append(obj);
    }
    checkNone();
      countBackets();
   let backetClk = document.querySelectorAll(".backet__trash");
    for(let i = 0;i<backetClk.length;i++){
      let clk = backetClk[i];
      clk.addEventListener("click",(e)=>{
        remove(e.target.id);
       
    })
    
  }
  let item_obj = document.querySelectorAll(".item__obj-count");
  for(let i = 0;i<item_obj.length;i++){
    let opt = item_obj[i].children[0];
    opt.addEventListener("change",(e)=>{
       count(e.target);
       countBackets();
    })
    }
    return arr;
  })
  .then(arr=>{
     checkCount();
  })
}


function checkNone(){
  let ggg = [];
    for(let i =0;i<productsCount.length;i++){
      let zero = productsCount[i];
     ggg.push(zero[0]);
    }
   let h =  ggg.concat(backet).filter(item => !ggg.includes(item) || !backet.includes(item));
    console.log(h);
   for(let i = 0;i<h.length;i++){
    productsCount.push([h[i],1]);
  }
  localStorage.setItem("countProducts",JSON.stringify(productsCount));
}


function checkCount(){
  fetchArray()
  .then(arr=>{
    arr = arr.filter(el=>{
      if(backet.includes(el.id)){
        return true;
      }  else{
        return false;
      }


    })
priceBackets = 0;
    for(let i = 0;i<productsCount.length;i++){
      let optC = productsCount[i];
       for(let i = 0;i<arr.length;i++){
        if(optC[0] == arr[i].id){
          let priceArr = arr[i].price.replace(",00 KZT","");
          priceArr = parseInt(priceArr.replace(" ",""));
            priceBackets+=priceArr*parseInt(optC[1]);
           console.log(priceBackets);
        }
       }

    
       
     }
     let total_out = document.querySelector(".total__pr");
     let total_all = document.querySelector(".total__all");
     total_out.innerHTML =priceBackets;
       total_all.innerHTML =priceBackets;
       countBackets();
  })

}
  

 
    


function countBackets(){
  countBacket = 0;
  for(let i = 0;i<productsCount.length;i++){
    let pr = productsCount[i];
    countBacket+=parseInt(pr[1]);
  }
  backet_count.innerHTML = `(${countBacket})`;
}




    function count(opt){
       let cou =  opt.options[opt.selectedIndex].value;
      countBacket = "";
      let b = true;
    for(let i = 0;i<productsCount.length;i++){
      let pr = productsCount[i];
      if(pr[0] == opt.id){
        pr[1] = cou;
        b = false;
      }
    }
   
  if(b){
    productsCount.push([opt.id,cou]);
  }
  
  checkCount();
       localStorage.setItem("countProducts",JSON.stringify(productsCount));
    }
    
    



function fetchArray(){
  let array = fetch("/products.json")
  .then(response=>response.json())
  .then(arr=>{
    return arr;
  })

  return array;
}



function object(){
    let item_obj = document.createElement("div");
    item_obj.classList.add("item__obj");
    let item_obj_img = document.createElement("div");
    item_obj_img.classList.add("item__obj-img");
    let img = document.createElement("img");
    let item_obj_char = document.createElement("div");
    item_obj_char.classList.add("item__obj-char");
    let item_char_title = document.createElement("div");
    item_char_title.classList.add("obj__char-title");
    let item_char_text = document.createElement("div");
    item_char_text.classList.add("obj__char-text");
    let obj_count = document.createElement("div");
    obj_count.classList.add("obj__count");
    let obj_count_s = document.createElement("div");
    obj_count_s.classList.add("obj__count-s");
    obj_count_s.innerHTML = "КОЛИЧЕСТВО";
    let item_obj_count = document.createElement("div");
    item_obj_count.classList.add("item__obj-count");
    let select = document.createElement("select");
    let option1 = document.createElement("option");
    option1.innerHTML = "1";
    let option2 = document.createElement("option");
    option2.innerHTML ="2";
    let option3 = document.createElement("option");
    option3.innerHTML = "3";
    let item_obj_price = document.createElement("div");
    item_obj_price.classList.add("item__obj-price");
    let backetTrash = document.createElement("div");
    backetTrash.classList.add("backet__trash");

    backetTrash.innerHTML =`<i class="fa-regular fa-trash-can"></i>` ;
    item_obj.append(item_obj_img);
    item_obj_img.append(img);
    item_obj_char.append(item_char_title);
    item_obj_char.append(item_char_text);
    item_obj.append(item_obj_char);
    select.append(option1);
    select.append(option2);
    select.append(option3);
    item_obj_count.append(select);
    obj_count.append(obj_count_s);
    obj_count.append(item_obj_count);
    item_obj.append(obj_count);
    item_obj.append(item_obj_price);
    item_obj.append(backetTrash);
    return item_obj;
}








function remove(id){
  backet = backet.filter(arr=>arr!=id);

  productsCount  =productsCount.filter(arr=>{
    if(arr[0]==id){
      return false;
    }else{
      return true;
    }
  })

  localStorage.setItem("backet",JSON.stringify(backet));
  localStorage.setItem("countProducts",JSON.stringify(productsCount));
  rendering();
  checkCount();
 
}