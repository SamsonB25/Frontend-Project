const cards = document.getElementById("card-container");
const URL = `https://api.sportsdata.io/v3/nfl/scores/json/Players/buf?key=436a1b238845470ea2a5946e906348e8`;

// create async function to recieve data from api and ba able to call it later.
async function getPlayerData(player) {
  // create a try...catch statement
  try {
    // fetch data from API
    const response = await fetch(URL);
    //convert the API response
    const data = await response.json();
    // console.log(data);

    // generate card using html
    data.forEach((obj, i) => {
      let html = `<div class="cards">
        <div class="card-img">
          <img
            src="${obj.PhotoUrl}"
          />
        </div>
        <div class="card-body">
          <h2>${obj.Name} <em></br>#${obj.Number}</em></h2>
          <p>Position: ${obj.Position} <span>
          </br>Height: ${obj.Height}<span><span>
          </br>Weight: ${obj.Weight}<span><span>
          </br>Status: ${obj.Status}<span></p>
            <div class="card-footer">
              <a href="#">Stats</a>
            </div>
        </div>
      </div>`;

      if (
        player.toLowerCase() === obj.Name.toLowerCase() ||
        player.toLowerCase() === obj.FirstName.toLowerCase() ||
        player.toLowerCase() === obj.LastName.toLowerCase() ||
        player.toLowerCase() === obj.Position.toLowerCase()
      ) {
        // console.log(obj.Name);
        cards.insertAdjacentHTML("afterbegin", html);
      }
    });
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

  // console.log(searchValue);
  // remove last card after a new search
  cards.innerHTML = "";
  // clear the search bar
  searchBar.value = "";
  getPlayerData(searchValue);
});
