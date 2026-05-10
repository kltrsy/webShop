let dataStored = [];
//called once stuff...
async function fetchem(){
    try {
        let calledDat = await fetch('https://fakestoreapi.com/products');

        if(!calledDat.ok){
            throw new Error("Error");
        }
        let data = await calledDat.json();
        dataStored = data;
    
    } catch (error) {
       console.log("Error"); 
    }

    dispEm(dataStored);

};

fetchem();


//////////////////////////////////////////////////
//////////////////////////////////////////////////
//display stuff
function dispEm(dataStored){

    let biglad = document.getElementById("bigLad");

    biglad.innerHTML="";
    let dexer = 0;
    dataStored.forEach(element=>{
        let div = document.createElement("div");
        div.innerHTML = `<img src="${element.image}" alt="${element.title}" class="${"img-thumbnail"}"> <h4>${element.title}</h4> <h5 class="text-secondary">${element.price}€</h5> <button onclick="toBasket(this)" value="${dexer}" class="buyButtoms btn"><img src="resources/buy.png" alt="Buy" ></button>`;
        div.className = "cells"
        biglad.appendChild(div);
        dexer++;
    });
};
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//search
let collectionFiltered = [];
let szurt = [];

let ertek = document.getElementById("search");
ertek.addEventListener("input", ()=>{
    let beirt = ertek.value.toLowerCase();

    let buffer = dataStored;

    if(collectionFiltered.length>0){
        buffer = collectionFiltered;
    }
    szurt = buffer.filter(elem => elem.title.toLowerCase().includes(beirt));
    dispEm(szurt);
});




function duckyou(idk) {
    if(idk.value != "all"){
        collectionFiltered = dataStored.filter(elem => elem.category==idk.value.toLowerCase());
    }else{
        collectionFiltered = dataStored.filter(elem => elem);
    }

    dispEm(collectionFiltered);
};
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//checkout stuff

//mega dodo here, shite will break
let basket = [];
function toBasket(merc){
    if (szurt.length>0 && collectionFiltered.length>0 && (!basket.includes(szurt[merc.value]))) {
        basket.push(szurt[merc.value]);
    } else if (szurt.length<1 && collectionFiltered.length>0 && (!basket.includes(collectionFiltered[merc.value]))) {
        basket.push(collectionFiltered[merc.value]);
    } else if(szurt.length > 0 && collectionFiltered.length<1 && (!basket.includes(szurt[merc.value]))){
        basket.push(szurt[merc.value]);
    }else{
        if (!basket.includes(dataStored[merc.value])){
            basket.push(dataStored[merc.value]);
        }
    }

    dispShoppers();
}
function removeFromBasket(merc){

    if(dbList[merc.value] > 1){
        dbList[merc.value] -=1;
    }else{
        basket.splice(merc.value,1);
        dbList.splice(merc.value,1);
    }
    dispShoppers();

}

function checkOuter(){
    if(basket.length<1){
        alert("Empty Basket!")
    }else{
        alert("NETWORK ERROR! :(") 
    }
    
}

let dbList = [];
function checkOut(){
    //idk 
    basket.forEach(element=>{
        dbList.push(1);
    });

    dispShoppers();
}

function dbAdder(merc){
    dbList[merc.value] += 1;
    dispShoppers();
}
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//shopping card writer thingie 

function dispShoppers(){
    let sum = 0;
    basket.forEach(element=>{
        if(basket.length>0){
            sum += element.price * dbList[basket.indexOf(element)];
        }
    });


    let shopper = document.getElementById("shopperCart");
    let total = document.getElementById("total");

    total.innerHTML = (Math.round(sum * 100) / 100)+"€";
    

    shopper.innerHTML="";
    let dexer = 0;
    basket.forEach(element=>{

        let dbCounter = dbList[basket.indexOf(element)];

        let div = document.createElement("div");
        div.innerHTML = `<img src="${element.image}" alt="${element.title}" class="${"img-thumbnail"}"> <h4>${element.title}</h4> <h5>${element.price}€</h5>
        <div class="d-flex flex-row buttombuyBg">
        <div class="p-1"><button onclick="removeFromBasket(this)" class="adderbuts btn" value="${dexer}"><img src="resources/minus.png" alt=""></button></div>
        <div class="p-1"><h2>${dbCounter}</h2></div>
        <div class="p-1"><button onclick="dbAdder(this)" class="adderbuts btn" value="${dexer}"><img src="resources/plus.png" alt=""></button></div>
        </div>`;
        div.className = "cells"
        shopper.appendChild(div);
        dexer++;


    });
};

let count = 0;
let check = false;
document.getElementById("secret").addEventListener("click", ()=>{


if(count>9 && check == false){
    
    document.getElementById("cam").animate(
        [
            
            { transform: 'translate3d(2000%, 200%, 0)',opacity: '1'},
            { transform: 'translate3d(-2000%, -200%, 0)',opacity: '1'}
          ],
           {
            duration: 5000
          }
    );
    check = true;
}else{
    count++;
}
    
});
