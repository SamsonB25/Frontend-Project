// make a table that displays the team roster
// possibly make it sortable by name, number, or position

//get table to insert data into
const table = document.getElementsByClassName("player-table");
const thead = document.getElementById("thead");

// create a asynch function to collect data from api
async function getRoster() {
  const response = await fetch(
    "https://api.sportsdata.io/v3/nfl/scores/json/Players/buf?key=436a1b238845470ea2a5946e906348e8"
  );
  const data = await response.json();
  console.log(data[0]);

  //build table rows and cols with desired data from api
  // use a for each loop to iterate over the object inside of the given array
  data.reverse().forEach((obj) => {
    if (obj.Number === null) {
      obj.Number = "N/A";
    }
    let ptble = `<tr>
  <td><img src=${obj.PhotoUrl} class="headshot"> ${obj.Name}</td>
  <td>${obj.Number}</td>
  <td>${obj.Position}</td>
  <td>${obj.Height}</td>
  <td>${obj.Weight}</td>
  <td>${obj.Age}</td>
  <td>${obj.ExperienceString}</td>
  <td>${obj.College}</td>
</tr>`;

    // insert html block into roster.html after the thead element
    thead.insertAdjacentHTML("afterend", ptble);
  });
}
getRoster();

const toTop = document.getElementById("to-top");
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.documentElement.scrollTop > 400 ||
    document.body.scrollTop > 400
  ) {
    toTop.style.display = "block";
  } else {
    toTop.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
toTop.addEventListener("click", function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
