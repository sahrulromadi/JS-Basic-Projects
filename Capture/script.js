const url = "https://www.demonslayer-api.com/api/v1/characters";
const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const imgElement = document.querySelector("img");
const iconElement = document.querySelector("#divIcon > a");
const buttonElement = document.querySelector("button[type='submit']");
const contentElement = document.getElementById("content");

async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    // ambil array nya
    const quotes = data.content;
    // acak
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    // return agar bisa digunakan di luar fungsi
    return randomQuote;
  } catch (e) {
    console.log(e);
  }
}

buttonElement.addEventListener("click", async () => {
  // panggil fetch
  const randomQuote = await fetchData();

  quoteElement.textContent = '"' + randomQuote.quote + '"';
  authorElement.textContent = "- " + randomQuote.name;
  imgElement.src = randomQuote.img;

  iconElement.id = "screenshot";
  iconElement.classList.add("cursor-pointer");
  iconElement.textContent = "📸";

  // screenshot
  let count = 0;

  const screenshotElement = document.getElementById("screenshot");
  screenshotElement.addEventListener("click", async () => {
    if (count) {
      window.location.reload();
    }

    // proses screenshot
    const canvas = await html2canvas(contentElement);
    // ubah screenshot menjadi URL
    const imageDataURL = await canvas.toDataURL("image/png");

    // set attribute href dan ubah ikon
    iconElement.setAttribute("href", imageDataURL);
    iconElement.textContent = "📩";
    count = 1;

    // html2canvas(contentElement).then((callback) => {
    //   iconElement.setAttribute("href", callback.toDataURL("image/png"));
    //   iconElement.textContent = "📩";
    //   count = 1;
    // });
  });
});
