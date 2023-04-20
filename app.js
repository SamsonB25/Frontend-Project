let playerData;
const playerContainer = document.getElementById("player-container");
// create async function to recieve data from api and ba able to call it later.
async function getPlayerData(player) {
  // create a try...catch statement
  try {
    const response = await fetch(
      "https://api.sportsdata.io/v3/nfl/scores/json/Players/buf?key=436a1b238845470ea2a5946e906348e8"
    );
    const data = await response.json();
    playerData = {
      fullName: data[player].Name,
      jerseyNum: data[player].Number,
      position: data[player].Position,
      height: data[player].Height,
      weight: data[player].Weight,
      status: data[player].Status,
      img: data[player].PhotoUrl,
    };
    let html = `<div id="testing" class="card" style="width: 13rem">
      <img
        src="${playerData.img}"
        class="card-img-top"
      />
      <div class="card-body">
        <h5>${playerData.fullName} #${playerData.jerseyNum}</h5>
        <h6>Position: ${playerData.position}</h6>
        <h6>Height: ${playerData.height}</h6>
        <h6>Weight: ${playerData.weight}</h6>
        <h6>Status: ${playerData.status}</h6>
      </div>
    </div>`;
    playerContainer.insertAdjacentHTML("afterbegin", html);
    console.log(data);
    // console.log(playerData.fullName);
    // console.log(playerData.jerseyNum);
    // console.log(playerData.position);
    // console.log(playerData.height);
    // console.log(playerData.weight);
    // console.log(playerData.status);
  } catch (error) {
    console.error(error);
  }
}

// create event listener to get user input of the search bar
const searchBtn = document.getElementById("search_button");
const clearBtn = document.getElementById("clear_button");
const searchBar = document.getElementById("search_bar");

searchBtn.addEventListener("click", function () {
  const searchValue = searchBar.value;
  let searchedPlayer = getPlayerData(searchValue);

  console.log(searchedPlayer);
  searchBar.value = "";

  const testing = document.getElementById("testing");
  testing.remove();
});
