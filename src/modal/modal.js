const modal = document.getElementById("modal");
const btn = document.getElementById("modal_btn");
const span = document.getElementsByClassName("close")[0];
const timer = document.getElementById("modal__header__clock");
const selector = document.getElementById("slct");
const charge = document.getElementById("pay_btn");
const payedDollar =  document.getElementById("payed");
const add50 =  document.getElementById("add50");
const add100 =  document.getElementById("add100");
const add500 =  document.getElementById("add500");

const cntDwnTime = 16 * 60 * 1000;  // 00:16:00:000 ms = 16 min
let cntDwnInterval;
let startTimer;

const msToHMinSec = (ms) => {
  let sec = parseInt((ms / 1000) % 60),
      min = parseInt((ms / (1000 * 60)) % 60),
      h = parseInt((ms / (1000 * 60 * 60)) % 24);

  h = (h < 10) ? '0' + h : h;
  min = (min < 10) ? '0' + min : min;
  sec = (sec < 10) ? '0' + sec : sec;

  timer.innerHTML = h + ':' + min + ':' + sec;
};

btn.onclick = () => {
  modal.style.display = "block";
  startTimer = Date.now();
  cntDwnInterval = setInterval( () => {
    (() => {
      let currentTime = Date.now() - startTimer;
      if (currentTime >= cntDwnTime) {
        clearInterval(cntDwnInterval);
        span.onclick();
      }
      else {
        msToHMinSec(cntDwnTime - currentTime);
      }
    })();
  }, 1000);
}

span.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
    if (event.target === modal) modal.style.display = "none";
};

add_reset = () => {
  document.getElementById("block_pic50").src = "./pics/block_empty.svg";
  document.getElementById("block_pic100").src = "./pics/block_empty.svg";
  document.getElementById("block_pic500").src = "./pics/block_empty.svg";
}

add50.onclick = () => {
  add100.classList.remove("block_click");
  add500.classList.remove("block_click");
  add50.classList.add("block_click");
  add_reset();
  document.getElementById("block_pic50").src = "./pics/block_done.svg";
  payedDollar.innerHTML = "$100,";
}

add100.onclick = () => {
  add50.classList.remove("block_click");
  add500.classList.remove("block_click");
  add100.classList.add("block_click");
  add_reset();
  document.getElementById("block_pic100").src = "./pics/block_done.svg";
  payedDollar.innerHTML = "$200,";
}

add500.onclick = () => {
  add50.classList.remove("block_click");
  add100.classList.remove("block_click");
  add500.classList.add("block_click");
  add_reset();
  document.getElementById("block_pic500").src = "./pics/block_done.svg";
  payedDollar.innerHTML = "$1000,";
}

charge.onclick = () => {
  const str = payedDollar.innerText;
  const string = str.substring(1, str.length - 1);
  const bankArray = ["Банковская карта", "Биткоин", "Выставить счет"];
  const choisen = selector.value - 1;
  if (+string) {
    alert(`Cпособ оплаты: ${bankArray[choisen]}, \nСумма пополнения: $${string}.`);
    span.onclick();
  }
}