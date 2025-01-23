// deklarasi variabel
const carouselSlide = document.querySelector('.carouselSlide');
const carouselImages = document.querySelectorAll('.carouselSlide img');
const prevBtn = document.querySelector('.prevBtn');
const nextBtn = document.querySelector('.nextBtn');
const indicators = document.querySelectorAll('.indicator');

let currentIndeks = 0;

// fungsi untuk perbarui slide
function updateSlide() {
    // perbarui dengan mengambahkan transform agar gambar bisa bergeser
    carouselSlide.style.transform = `translateX(${-currentIndeks * 100}%)`;

    // menangani active di indicator
    indicators.forEach((element, indeks) => {
        element.classList.toggle('active', indeks === currentIndeks);
    });
}

// fungsi prev
function prevSlide() {
    currentIndeks = (currentIndeks - 1 + carouselImages.length) % carouselImages.length;

    updateSlide();
}

// fungsi next
function nextSlide() {
    currentIndeks = (currentIndeks + 1) % carouselImages.length;

    updateSlide();
}

// event listener button
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', () => nextSlide());

// event list indicator
indicators.forEach((element, indeks) => {
    element.addEventListener('click', () => {
        currentIndeks = indeks;
        updateSlide();
    });
});

// fitur auto slide
setInterval(nextSlide, 10000); // setiap 10 detik