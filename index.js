const url = "https://www.omdbapi.com/?apikey=2e1f6500&";
const moviesList = document.querySelector(".movies");
const trendingMoviesIds = [
  "tt1517268",
  "tt15398776",
  "tt0439572",
  "tt6791350",
  "tt1695843",
  "tt9603212",
  "tt10638522",
  "tt1462764",
];

function movieHtml(movie) {
  return ` <div class="movie">
  <figure class="movie__img--wrapper">
    <img
      src="${movie.Poster}"
      alt=""
      class="movie__img" />
  </figure>
  <div class="movie__info">
  <h3 class="movie__title">${movie.Title}
  <br>
  <span class="movie__year">${movie.Year}</span>
  </h3>
  
  </div>
</div>`;
}

async function renderMovies(movieId) {
  const renderedMovie = await fetch(url + `i=${movieId}`);
  const movieData = await renderedMovie.json();
  console.log(movieData);
  moviesList.innerHTML += movieHtml(movieData);
}

async function renderAllTrendingMovies() {
  for (const movieId of trendingMoviesIds) {
    await renderMovies(movieId);
  }
}

renderAllTrendingMovies();
