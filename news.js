let news = document.getElementById("news");

async function getNews() {
  const response = await fetch(
    "https://api.sportsdata.io/v3/nfl/scores/json/NewsByTeam/buf?key=436a1b238845470ea2a5946e906348e8"
  );
  const data = await response.json();
  let html = `<h4 id="news-title">${data[0].Title}</h4>
  <h6 id="news-content"> ${data[0].Content} --<em>${data[0].OriginalSource}</em>--<p id="posted-date">${data[0].TimeAgo}:</p></h6>`;
  news.insertAdjacentHTML("afterbegin", html);
  console.log(data[0]);
}

getNews();
