// i need to figure out has to search for a player by name instead of index
// might have to use a for and for in loop to get access
async function getName(input) {
  const response = await fetch(
    "https://api.sportsdata.io/v3/nfl/scores/json/Players/buf?key=436a1b238845470ea2a5946e906348e8"
  );
  const data = await response.json();
  let name = data.find((obj) => obj.Name === input).Name;
  let index = data.findIndex((obj) => obj.Name === input);
  console.log(name + index);
}
getName("Josh Allen");

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
    // console.log(data);

    let name = data.find((obj) => obj.Name === player).Name;

    let index = data.findIndex((obj) => obj.Name === player);

    playerData = {
      fullName: data[index].Name,
      jerseyNum: data[index].Number,
      position: data[index].Position,
      height: data[index].Height,
      weight: data[index].Weight,
      status: data[index].Status,
      img: data[index].PhotoUrl,
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

    console.log(data[player]);
  } catch (error) {
    console.error(error);
  }
}

// create event listener to get user input of the search bar
const searchBtn = document.getElementById("search_button");
var searchBar = document.getElementById("search_bar");

searchBtn.addEventListener("click", function () {
  let searchValue = searchBar.value;

  let searchedPlayer = getPlayerData(searchValue);

  console.log(searchedPlayer);

  searchBar.value = "";
});
