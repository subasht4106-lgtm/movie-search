const API_KEY = "2f2a80b";
const API_URL = "https://www.omdbapi.com/";

// Search movies
function searchMovies() {
    const query = document.getElementById("searchInput").value.trim();

    if (!query) {
        alert("Please enter a movie name!");
        return;
    }

    fetch(`${API_URL}?apikey=${API_KEY}&s=${query}`)
        .then(res => res.json())
        .then(data => {
            if (data.Response === "True") {
                displayMovies(data.Search);
            } else {
                document.getElementById("movieContainer").innerHTML =
                    "<h2>No movies found!</h2>";
            }
        });
}

// Display movies
function displayMovies(movies) {
    const container = document.getElementById("movieContainer");
    container.innerHTML = "";

    movies.forEach(movie => {
        const card = `
            <div class="movie-card" onclick="getMovieDetails('${movie.imdbID}')">
                <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200'}">
                <div class="movie-title">${movie.Title}</div>
                <div class="movie-year">${movie.Year}</div>
            </div>
        `;
        container.innerHTML += card;
    });
}

// Get movie details
function getMovieDetails(id) {
    fetch(`${API_URL}?apikey=${API_KEY}&i=${id}&plot=full`)
        .then(res => res.json())
        .then(movie => showModal(movie));
}

// Show modal
function showModal(movie) {
    document.getElementById("modalDetails").innerHTML = `
        <h2>${movie.Title} (${movie.Year})</h2>
        <div class="movie-details">
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200'}">
            <div class="movie-info">
                <p><strong>Genre:</strong> ${movie.Genre}</p>
                <p><strong>Director:</strong> ${movie.Director}</p>
                <p><strong>Actors:</strong> ${movie.Actors}</p>
                <p><strong>Plot:</strong> ${movie.Plot}</p>
                <p><strong>IMDB Rating:</strong> ⭐ ${movie.imdbRating}</p>
            </div>
        </div>
    `;

    document.getElementById("modal").style.display = "flex";
}

// Close modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
}
