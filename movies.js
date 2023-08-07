const moviesList = document.querySelector(".movies");
const searchBarInput = document.querySelector(".search__results");

async function renderMovies(searchTerm) {
  const movies = await fetch(
    `https://www.omdbapi.com/?apikey=2e1f6500&s=${searchTerm}`
  );
  const moviesData = await movies.json();
  const first8Movies = moviesData.Search.slice(0, 8);
  console.log(first8Movies);
  moviesList.innerHTML = first8Movies.map((movie) => movieHtml(movie)).join("");
}

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

function movieSearch() {
  const searchInput = document.getElementById("searchInput").value;
  const searchText = ` <h3 class="search__results">Search results for "${searchInput}"</h3>`;
  searchBarInput.innerHTML = searchText;
  renderMovies(searchInput);
}

const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  movieSearch();
});
