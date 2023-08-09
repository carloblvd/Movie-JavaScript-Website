const url = "https://www.omdbapi.com/?apikey=2e1f6500&";
const moviesList = document.querySelector(".movies");
const searchBarInput = document.querySelector(".search__results");
const searchIndex = document.getElementsByName("searchInput");

// Converts info to html
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

// Modal starts as closed
let isModalOpen = false;

let moviesData;

// The spinning loading screen is only used for the first time
// loading into the webpage
let initialLoad = true;

// Originally created only in the function renderMovies(), but if I
// make it a constant outside of the function it makes it much
// easer to make a filter
let first8Movies = [];

// opens the contact page
function toggleContactPage() {
  if (isModalOpen) {
    isModalOpen = false;
    return document.body.classList.remove("modal__open");
  }
  isModalOpen = true;
  document.body.classList += " modal__open";
}

// Acesses the api to obtain the data, then convert to html
async function renderMovies(searchTerm) {
  if (initialLoad) {
    moviesList.classList += " movies__loading";
  }

  const movies = await fetch(url + `s=${searchTerm}`);
  const moviesData = await movies.json();
  first8Movies = moviesData.Search.slice(0, 8);

  if (initialLoad) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    moviesList.classList.remove("movies__loading");
    initialLoad = false;
  }

  moviesList.innerHTML = first8Movies.map((movie) => movieHtml(movie)).join("");
}

// Searches for the movies based on the value palced in the search box
function movieSearch() {
  const searchInput = document.getElementById("searchInput").value;
  const searchText = ` <h3 class="search__results">Search results for "${searchInput}"</h3>`;
  searchBarInput.innerHTML = searchText;
  renderMovies(searchInput);
}

// Can use enter button to submit
const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  movieSearch();
});

// Made so when you search from the index.html, the
// search input will be used in movies.html
function getSearchQueryFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("searchInput");
  return searchQuery;
}

function populateSearchField(searchQuery) {
  const searchInputField = document.querySelector("input[id='searchInput']");
  searchInputField.value = searchQuery;
}

// Turns the search input from index.html into text that
// appears on the movies.html
async function renderSearchResults() {
  const searchQuery = getSearchQueryFromURL();
  if (searchQuery) {
    searchBarInput.innerHTML = ` <h3 class="search__results">Search results for "${searchQuery}"</h3>`;
    populateSearchField(searchQuery);
    renderMovies(searchQuery);
  }
}
// Sorts movies
function filterMovies(event) {
  const selectedOption = event.target.value;

  if (selectedOption === "NEW_TO_OLD") {
    sortedMovies = first8Movies.sort(
      (a, b) => b.Year.slice(0, 4) - a.Year.slice(0, 4)
    );
  } else if (selectedOption === "OLD_TO_NEW") {
    sortedMovies = first8Movies.sort(
      (a, b) => a.Year.slice(0, 4) - b.Year.slice(0, 4)
    );
  }

  moviesList.innerHTML = sortedMovies.map((movie) => movieHtml(movie)).join("");
}

// Sends the message with the name and email to my email
function contact(event) {
  event.preventDefault();

  emailjs
    .sendForm(
      "service_gnajquf",
      "template_r2rjfjm",
      event.target,
      "fUrOyNKYMUln64o4F"
    )
    .then(() => {
      console.log("it worked g");
      showSuccessMessage();
    })
    .catch(() => {
      alert(
        "The email service is temporarily unavailable. Please contact me directly at carloblvd@gmail.com"
      );
    });
}

// Only used for the contact modal, cool little effect for the inputs
function moveLabel(num) {
  formLabel[num].classList += " moveLabelUp";
}

// Success message shown upon submitting the message in the modal,
//  appears, and then automatically disappears after 3 seconds
function showSuccessMessage() {
  const successMessage = document.querySelector(".success__message");
  successMessage.classList.add("visible");

  setTimeout(() => {
    successMessage.classList.remove("visible");
  }, 3000);
  console.log("success");
}

renderSearchResults();
