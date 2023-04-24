let playerData;

const playerContainer = document.getElementById("player-container");

// create async function to recieve data from api and ba able to call it later.
async function getPlayerData(player) {
  // create a try...catch statement
  try {
    // fetch data from API
    const response = await fetch(
      "https://api.sportsdata.io/v3/nfl/scores/json/Players/buf?key=436a1b238845470ea2a5946e906348e8"
    );
    //convert the API response
    const data = await response.json();
    // console.log(data);

    //find player and index of player to allow user to search for name instead of index

    // let name = data.find((obj) => obj.Name === player).Name;
    let index = data.findIndex(
      (obj) =>
        obj.Name === player ||
        obj.LastName === player ||
        obj.FirstName === player ||
        obj.Number === player
    );

    let { Name, FirstName, LastName } = data[index];

    // get data for card
    playerData = {
      fullName: data[index].Name,
      jerseyNum: data[index].Number,
      position: data[index].Position,
      height: data[index].Height,
      weight: data[index].Weight,
      status: data[index].Status,
      img: data[index].PhotoUrl,
    };
    // generate card using html
    let html = `<div id="player-card" class="card" style="width: 16rem">
      <img
      id="photo"
        src="${playerData.img}"
        class="card-img-center"
      />
      <div id="player-info" "class="card-body">
        <h5 id="name">${playerData.fullName} #${playerData.jerseyNum}</h5>
        <h6>Position: ${playerData.position}</h6>
        <h6>Height: ${playerData.height}</h6>
        <h6>Weight: ${playerData.weight}</h6>
        <h6>Status: ${playerData.status}</h6>
      </div>
    </div>`;
    // allow the user to search by first, last, or full name
    if (
      Name.toLowerCase() === player.toLowerCase() ||
      FirstName.toLowerCase() === player.toLowerCase() ||
      LastName.toLowerCase() === player.toLowerCase()
    ) {
      playerContainer.insertAdjacentHTML("afterbegin", html);
    }

    console.log(data[player]);
  } catch (error) {
    console.error(error);
  }
}

// get search button and search bar from html
const searchBtn = document.getElementById("search_button");
var searchBar = document.getElementById("search_bar");
//add event listener to recieve users input.
searchBtn.addEventListener("click", function () {
  let searchValue = searchBar.value;
  let card = document.getElementById("player-card");
  let searchedPlayer = getPlayerData(searchValue);

  console.log(searchedPlayer);
  // remove last card after a new search
  card.remove();
  // clear the search bar
  searchBar.value = "";
});
