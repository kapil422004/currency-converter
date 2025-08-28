const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const amount = document.querySelector(".amount input")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")


for (let select of dropdowns) {
    for (currCode in countryList) {
        const newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = true;
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value
    let cuntryCode = countryList[currCode]
    // console.log(cuntryCode)
    const newImg = `https://flagsapi.com/${cuntryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newImg
}

window.addEventListener("load", () => {
    updateRate();
});

button.addEventListener("click", (evt) => {
    evt.preventDefault()
    updateRate();
   
})


const updateRate = async () =>{

 let amountValue = amount.value;
    // console.log(amountValue)
    if (amountValue === "" || amountValue < 1) {
        amountValue = 1;
        amount.value = "1";
    }

    // console.log(fromCurr.value, toCurr.value)

    const URL = `https://v6.exchangerate-api.com/v6/4cb85f93793de6cd89f551ce/latest/${fromCurr.value}`

    const responce = await fetch(URL);
    const data = await responce.json();

    const rate = data.conversion_rates[toCurr.value]

    const finalAmount = amountValue * rate;

    msg.innerHTML = `${amountValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`

    // console.log(finalAmount)
}