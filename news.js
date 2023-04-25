let news = document.getElementById("news");

async function getNews() {
  const response = await fetch(
    "https://api.sportsdata.io/v3/nfl/scores/json/News?key=436a1b238845470ea2a5946e906348e8"
  );
  const data = await response.json();
  data.reverse().forEach((obj) => {
    let html = `<div class="news-container">
    <h4 id="news-title">${obj.Title}</h4>
  <h6 id="news-content"> ${obj.Content} 
  --<em>${obj.OriginalSource}</em>-- 
  <a href="${obj.Url}" target="_blank" rel="noopener noreferrer">Article</a> 
  <p id="posted-date">${obj.TimeAgo}</p></h6>
  <div>`;
    news.insertAdjacentHTML("afterbegin", html);
    console.log(data[0]);
  });
}

getNews();
