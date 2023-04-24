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

    // generate card using html
    data.forEach((obj, index) => {
      if (
        player === obj.Name ||
        player === obj.FirstName ||
        player === obj.LastName
      ) {
        let html = `<div id="player-card" class="card" style="width: 16rem">
        <img
        id="photo"
          src="${obj.PhotoUrl}"
          class="card-img-center"
        />
        <div id="player-info" class="card-body">
          <h5 id="name">${obj.Name} #${obj.Number}</h5>
          <h6>Position: ${obj.Position}</h6>
          <h6>Height: ${obj.Height}</h6>
          <h6>Weight: ${obj.Weight}</h6>
          <h6>Status: ${obj.Status}</h6>
        </div>
      </div>`;
        console.log(obj.Name, index);

        if (
          Name.toLowerCase() === player.toLowerCase() ||
          FirstName.toLowerCase() === player.toLowerCase() ||
          LastName.toLowerCase() === player.toLowerCase()
        ) {
          playerContainer.insertAdjacentHTML("afterbegin", html);
          console.log(Name);
        } else if (
          Name.toLowerCase() == player.toLowerCase() ||
          FirstName.toLowerCase() == player.toLowerCase() ||
          LastName.toLowerCase() == player.toLowerCase()
        ) {
          alert(`${player} Doe No`);
        }
      }
    });

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
  let card = document.getElementById("player-container");
  let searchedPlayer = getPlayerData(searchValue);

  console.log(searchedPlayer);
  // remove last card after a new search
  card.innerHTML = "";
  // clear the search bar
  searchBar.value = "";
});
