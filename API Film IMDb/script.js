let page = 1;

const getMovies = async (query) => {
  const API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YmVhZjkwMWZhMTMxNzY5OGY5YmE0M2E3YTg3ZDAyOSIsIm5iZiI6MTcyODkwNjAzMS4wMTYsInN1YiI6IjY3MGQwMzJmZDVmOTNhM2RhMGJiYjFmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QRiAx3SBw7GSu1QVxhKLgNelhxOOc-ct4CvgTnNLB_0";

  const API_URL = query
    ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    : `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const res = await fetch(API_URL, options);
  const data = await res.json();

  // bersihkan moviesElement
  moviesElement.innerHTML = "";

  listMovies(data.results);

  // pagination
  if (page === 1) {
    prevButton.classList.add("hidden");
  } else {
    prevButton.classList.remove("hidden");
  }

  window.scrollTo(0, 0);
};

const listMovies = (movies) => {
  movies.forEach((movie) => {
    // cara lama
    // const title = movie.title;
    // const poster_path = movie.poster_path;
    // const overview = movie.overview;

    // cara singkat
    const { title, poster_path, overview } = movie;

    // panggil createMovieList sehingga akan terbuat banyak div
    createMoviesList(title, poster_path, overview);
  });
};

const createMoviesList = (title, poster_path, overview) => {
  // buat div
  const movieDiv = document.createElement("div");

  // modifikasi movieDiv agar bisa di style
  movieDiv.innerHTML = `
    <div class="flex flex-col space-y-5 justify-center items-center p-5 border-2 border-yellow-300">
        <p class="font-semibold text-xl text-center">${title}</p>

        <img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="img-${title}" class="w-28">

        <p class="text-justify">${overview.substring(0, 150)}</p>
    </div>
  `;

  // taruh movieDiv di dalam moviesElement
  moviesElement.appendChild(movieDiv);
};

const onPrev = () => {
  if (page > 1) {
    page--;

    // panggil buat tampilin halaman baru
    getMovies();
  }
};

const onNext = () => {
  page++;

  // panggil buat tampilin halaman baru
  getMovies();
};

prevButton.addEventListener("click", onPrev);
nextButton.addEventListener("click", onNext);

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = searchInput.value;

  if (query) {
    getMovies(query);
  } else {
    alert("Ketikkan judul yang ingin dicari!");
  }

  // clear search
  searchInput.value = "";
});

title.addEventListener("click", () => {
  location.reload();
});

getMovies();
