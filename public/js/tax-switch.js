//tax switch script
let taxSwitch = document.getElementById("taxSwitchCheckReverse");
taxSwitch.addEventListener("click", () => {
  let taxTotal = document.getElementsByClassName("tax-total");
  for (let tax of taxTotal) {
    if (tax.style.display != "inline") {
      tax.style.display = "inline";
    } else {
      tax.style.display = "none";
    }
  }
});
