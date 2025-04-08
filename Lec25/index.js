const div = document.getElementById("injector");
const h2 = document.createElement("h2");
h2.innerText = "Welcome User";
div.addEventListener("onclick", () => {
  div.appendChild(h2);
});
const incButton = document.getElementById("inc");
const decButton = document.getElementById("dec");
incButton.addEventListener("onclick", () => {
  const countTag = document.getElementById("counter");
  countTag.innerText += 1;
});
decButton.addEventListener("onclick", () => {
  const countTag = document.getElementById("counter");
  countTag.innerText -= 1;
});
