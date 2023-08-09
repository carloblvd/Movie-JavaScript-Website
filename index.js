const url = "https://www.omdbapi.com/?apikey=2e1f6500&";
const moviesList = document.querySelector(".movies");
const formLabel = document.querySelectorAll("label");
const modal = document.querySelector(".modal");

// Hand picked movies Ilooked up
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

// Modal starts as closed
let isModalOpen = false;

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

// Acesses the api to obtain the data, then convert to html
async function renderMovies(movieId) {
  const renderedMovie = await fetch(url + `i=${movieId}`);
  const movieData = await renderedMovie.json();
  moviesList.innerHTML += movieHtml(movieData);
}

// Renders the specific movies I've chosen to be placed as the trending movies
async function renderAllTrendingMovies() {
  for (const movieId of trendingMoviesIds) {
    await renderMovies(movieId);
  }
}

renderAllTrendingMovies();

// opens the contact page
function toggleContactPage() {
  if (isModalOpen) {
    isModalOpen = false;
    return document.body.classList.remove("modal__open");
  }
  isModalOpen = true;
  document.body.classList += " modal__open";
}

// Only used for the contact modal, cool little effect for the inputs
function moveLabel(num) {
  formLabel[num].classList += " moveLabelUp";
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

// Success message shown upon submitting the message in the modal
function showSuccessMessage() {
  const successMessage = document.querySelector(".success__message");
  successMessage.classList.add("visible");

  setTimeout(() => {
    successMessage.classList.remove("visible");
  }, 3000);
  console.log("success");
}
