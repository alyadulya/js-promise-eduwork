let search = document.getElementById("search");

if(search.value == "") {
  searchFunction();
}

search.onkeyup = function() {searchFunction()};

function searchFunction() {
  var query = search.value;
  
  let apiKey = "5786c1e8258840478840520e14bf8857";

  let newsApp = document.getElementById("newsApp");

  axios.get(`https://newsapi.org/v2/top-headlines?q=${query}&country=id&apiKey=${apiKey}`).then(res => {
    newsApp.innerHTML = render(res.data.articles);
  })

  function render(result) {
    console.log(result);
    let news = "";
    result.forEach(data => {
      const date = new Date(data.publishedAt);
      let datetime = date.toLocaleString("id-ID");

      function desc(c, d) {
        if((c && d) || c) {
          return c.slice(0, c.indexOf("["));
        } else {
          return d;
        }
      }

      function auth(a, b) {
        if((a && b) || a) {
          return a;
        } else {
          return b;
        }
      }

      let description = desc(data.content, data.description);

      let author = auth(data.author, data.source.name);

      news += `<div class="col-sm-4">
                  <div class="card mb-2">
                    <img src="${data.urlToImage}" class="card-img-top">
                    <div class="card-body">
                      <h5 class="card-title">${data.title}</h5>
                      <p class="card-text text-secondary">${author} - ${datetime}</p>
                      <p class="card-text desc"><span>${description}</span></p>
                      <a href="${data.url}" class="btn btn-primary" target="_blank">Read more...</a>
                    </div>
                  </div>
                </div>`;
    });
    return news;
  }
}