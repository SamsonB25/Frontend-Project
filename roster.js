// i need to figure out has to search for a player by name instead of index
// might have to use a for and for in loop to get access
async function getName() {
  const response = await fetch(
    "https://api.sportsdata.io/v3/nfl/scores/json/Players/buf?key=436a1b238845470ea2a5946e906348e8"
  );
  const data = await response.json();
  data.forEach((obj) => {
    let html = `<div class="card" style="max-width: 100px;">
    <div class="row">
      <div class="col">
        <img src="${obj.PhotoUrl}" class="img-fit-md-contain border rounded" alt="...">
      </div>
      <div class="col">
        
          <p class="card-title" style="width: 80px">${obj.Name} #${obj.Number}</p>
        
      </div>
    </div>
  </div>`;
    rosterCards.insertAdjacentHTML("afterbegin", html);
  });
}
getName();

let playerData;

const roster = document.getElementsByClassName("roster");

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
    let name = data.find((obj) => obj.Name === player).Name;

    let index = data.findIndex((obj) => obj.Name === player);
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
          src="${playerData.img}"
          class="card-img-center"
        />
        <div id="cards-b" class="card-body ">
          <h5>${playerData.fullName} #${playerData.jerseyNum}</h5>
          <h6>Position: ${playerData.position}</h6>
          <h6>Height: ${playerData.height}</h6>
          <h6>Weight: ${playerData.weight}</h6>
          <h6>Status: ${playerData.status}</h6>
        </div>
      </div>`;
    // allow the user to search by first, last, or full name
    if (name === player) {
      roster.insertAdjacentHTML("afterbegin", html);
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
  let rosterCard = document.getElementById("rosterCards");
  let searchedPlayer = getPlayerData(searchValue);

  console.log(searchedPlayer);
  // remove last card after a new search
  rosterCard.remove();
  // clear the search bar
  searchBar.value = "";
});
