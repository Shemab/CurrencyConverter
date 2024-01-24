const BaseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button ");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

//Logic-1 codes.js me jo likhe the usko apna selct option me kaise dale hai uska logic hai
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    //Logic-2 <option value="usd" selected> isiko JS me likhe hai
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR"){
      newOption.selected = "selected";
    }

    select.append(newOption);
  }
  select.addEventListener("change",(evt)=>
{
   updateFlag(evt.target)
});


}



//flag change

const updateFlag= ((element)=>{
   let currCode=element.value;
  let countryCode=countryList[currCode];
   let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png `;
    let img = element.parentElement.querySelector("img");
     img.src=newSrc;
});


btn.addEventListener("click", async (evt)=>{
 evt.preventDefault();
 let amount=document.querySelector(".amount input");
 let amtVal=amount.value;
 if(amtVal===" " || amtVal<0){
   amtVal=1;
   amount.value="1";
   
 }
//console.log(fromCurr.value.toLowerCase(),toCurr.value);

 const URL = `${BaseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
 let response=await fetch(URL);
 let data = await response.json();
 let rate=data[toCurr.value.toLowerCase()];
let finalAmount =amtVal* rate;

msg.innerText=`${amtVal} ${fromCurr.value}=${finalAmount} ${toCurr.value}`;
})

