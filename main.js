const overlay_notification_container = document.querySelector(".overlay_notification_container");
const input_username = document.getElementById("input_username");
const game_username_form = document.getElementById("game_username_form");
const current_playingusername = document.getElementById("current_playingusername");

// =============================== show the popup modal box & enter the username for the game ===============================
window.addEventListener("load",()=>{
  overlay_notification_container.style.display = "block";
})

game_username_form.addEventListener("submit",(e)=>{
  e.preventDefault();
  const username = input_username.value.trim();
  if(username !== "") {
    let store_username = localStorage.setItem("currentplaying_username", username);
    let retrieve_username = localStorage.getItem("currentplaying_username");
    current_playingusername.textContent = retrieve_username;
    overlay_notification_container.style.display = "none";
    input_username.classList.remove("error");
  }
  else {
    input_username.classList.add("error");
  }
})

const winner_title = document.getElementById("winner_title");
const computer_score = document.getElementById("computerscore");
const user_score = document.getElementById("userscore");
let userscore = 0;
let computerscore = 0;

function generate_computermove() {
  const computermove_optionsarr = ["rock", "paper", "scissors"];
  // ========================================== generate rock paper scissors randomly ==========================================
  let computermove_randomindex =
    computermove_optionsarr[
      Math.floor(Math.random() * computermove_optionsarr.length)
    ];
  return computermove_randomindex;
}

function gamedraw() {
  winner_title.classList.remove("user_winning", "computer_winning");
  winner_title.innerText = "match was drawn";
  console.log("game draw");
}

function show_winner(userwin) {
  if (userwin === true) {
    // ========================================== increment & update the user score ==========================================
    userscore++;
    user_score.innerText = userscore;
    winner_title.innerText = "you won";
    winner_title.classList.remove("computer_winning");
    winner_title.classList.add("user_winning");
    console.log("user won");
  } else {
    // ========================================== increment & update the computer score ==========================================
    computerscore++;
    computer_score.innerText = computerscore;
    winner_title.innerText = "you lost";
    winner_title.classList.remove("user_winning");
    winner_title.classList.add("computer_winning");
    console.log("computer won");
  }
}

function playgame(usermove) {
  let computermove = generate_computermove();
  console.log("user selected = " + usermove);
  console.log("computer selected = " + computermove);
  if (usermove === computermove) {
    gamedraw();
  } else {
    let userwin = true;
    if (usermove === "rock") {
      // ==================================== computermove left options paper scissors ====================================
      userwin = computermove === "scissors" ? true : false;
    } else if (usermove === "paper") {
      // ==================================== computermove left options rock scissors ====================================
      userwin = computermove === "rock" ? true : false;
    } else {
      // ==================================== computermove left options rock paper ====================================
      userwin = computermove === "paper" ? true : false;
    }
    show_winner(userwin);
  }
}

const all_photobox = document.querySelectorAll(".photobox");
all_photobox.forEach((each_photobox) => {
  const usermove = each_photobox.getAttribute("id");
  each_photobox.addEventListener("click", () => {
      playgame(usermove);
  });
});