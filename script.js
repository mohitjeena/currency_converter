let baseUrl =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
let btn = document.querySelector(".btn");
let msg = document.querySelector(".msg p");
let rotation = 0;

let dropdownSelect = document.querySelectorAll(".dropdown select");
window.addEventListener("load", () => {
  getCurr();
});
for (let dropdown of dropdownSelect) {
  for (let code in countryList) {
    option = document.createElement("option");
    option.innerText = code;
    option.value = code;
    if (dropdown.name === "from" && code === "USD") {
      option.selected = true;
    } else if (dropdown.name === "to" && code === "INR") {
      option.selected = true;
    }
    dropdown.append(option);
  }
  dropdown.addEventListener("change", (eve) => {
    exchange = false;
    getImage(eve.target);
  });
}

let getImage = (event) => {
  conCode = countryList[event.value];
  url = `https://flagsapi.com/${conCode}/flat/64.png`;
  img = event.parentElement.querySelector("img");
  img.src = url;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  exchange = true;
  getCurr();
});

let getCurr = async () => {
  amt = document.querySelector("#amount");
  if (amt.value < 0 || amt.value == "") {
    amt.value = 0;
  }
  for (let drop of dropdownSelect) {
    // console.log(drop.firstChild.value);
    if (drop.name == "from") {
      from = drop.value.toLowerCase();
    } else if (drop.name === "to") {
      to = drop.value.toLowerCase();
    }
  }
  let endPoint = `${from}/${to}.json`;
  url = baseUrl + endPoint;
  api = await fetch(url);
  newApi = await api.json();
  currency = newApi[to];
  total = amt.value * currency;
  msg.innerText = `${
    amt.value
  } ${from.toUpperCase()} = ${total} ${to.toUpperCase()}`;
};

let revBtn = document.querySelector(".reverse-btn");
revBtn.addEventListener("click", (event) => {
  amt = document.querySelector("#amount");
  spanEle = event.target;
  rotation += 180;
  event.target.style.transform = `rotate(${rotation}deg)`;
  from = document.querySelector(".from select");
  to = document.querySelector(".to select");
  img1 = document.querySelector(".from img");
  img2 = document.querySelector(".to img");
  swapVal = from.value;
  from.value = to.value;
  to.value = swapVal;
  swapVal = img1.src;
  img1.src = img2.src;
  img2.src = swapVal;
});
