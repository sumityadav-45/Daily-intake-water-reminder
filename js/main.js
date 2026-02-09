// GET water goal from Roles page
let totalGoal = localStorage.getItem("waterGoal") || 3;
totalGoal = parseFloat(totalGoal);

let consumed = localStorage.getItem("waterConsumed")
  ? parseFloat(localStorage.getItem("waterConsumed"))
  : 0;

function drinkWater() {
  consumed += 0.25;

  if (consumed > totalGoal) consumed = totalGoal;

  let percent = (consumed / totalGoal) * 100;

  document.querySelector(".circle").style.background =
    `conic-gradient(#00c6ff ${percent}%, #ffffff ${percent}%)`;

  document.getElementById("percent").innerText =
    Math.round(percent) + "%";

  document.getElementById("status").innerText =
    `${consumed.toFixed(2)} / ${totalGoal} Liters`;

  localStorage.setItem("waterConsumed", consumed);

  let msg = new SpeechSynthesisUtterance("Good job! Keep drinking water");
  window.speechSynthesis.speak(msg);
}

// Load data on page load
window.onload = () => {
  const circle = document.querySelector(".circle");
  const percentText = document.getElementById("percent");
  const status = document.getElementById("status");

  if (!circle || !percentText || !status) return;

  let percent = (consumed / totalGoal) * 100;

  circle.style.background =
    `conic-gradient(#00c6ff ${percent}%, #ffffff ${percent}%)`;

  percentText.innerText = Math.round(percent) + "%";
  status.innerText = `${consumed.toFixed(2)} / ${totalGoal} Liters`;
};

function setRole(role, waterGoal) {
  localStorage.setItem("role", role);
  localStorage.setItem("waterGoal", waterGoal);

  console.log("Role Selected:", role, waterGoal);

  window.location.href = "dashboard.html";
}



function resetWater() {
  consumed = 0;
  localStorage.setItem("waterConsumed", 0);

  const circle = document.querySelector(".circle");
  const percentText = document.getElementById("percent");
  const status = document.getElementById("status");

  if (!circle || !percentText || !status) {
    console.error("Dashboard elements not found");
    return;
  }

  circle.style.background =
    "conic-gradient(#00c6ff 0%, #ffffff 0%)";

  percentText.innerText = "0%";
  status.innerText = `0 / ${totalGoal} Liters`;

  console.log("Water reset successful");
  let msg = new SpeechSynthesisUtterance("Water intake has been reset");
window.speechSynthesis.speak(msg);

}


