const questions = [
  {
    question: "Seniman yang seneng karyanya di injak-injak adalah...",
    answer: "Pembuat sendal",
  },
  {
    question: "Telor apa yang sangar?",
    answer: "Telor asin",
  },
  {
    question: "Telor asin takut ama siapa?",
    answer: "Telor puyuh",
  },
  {
    question: "Gimana cara menghasilkan emas dengan mudah?",
    answer:
      "asdnajsdnlasdn askdaksdna sdnlajs dnajisnd aijsdnasdnasdniqowejhi123",
  },
];

const question = document.getElementById("question");
const bar = document.getElementById("bar");
const content = document.getElementById("content");
const startElement = document.getElementById("start");

let start = false;
let number = 0;
let time = 10;
let countdownInterval;

const onStart = () => {
  const startButton = document.getElementById("startButton");

  startButton.addEventListener("click", () => {
    start = true;

    startElement.classList.add("hidden");
    content.classList.remove("hidden");
    bar.classList.remove("hidden");

    nextQuestion();
  });
};

const nextQuestion = () => {
  if (number >= questions.length) {
    bar.classList.add("hidden");
    content.innerHTML = `
        <div>
          <p> Game Selesai </p>
        </div>
        `;
  } else {
    question.innerText = questions[number].question;
    time = 10;
    countdown();
    submitLogic();
  }
};

const countdown = () => {
  const countdownElement = document.getElementById("countdown");

  // menangani countdownInterval masih ada
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  if (start) {
    countdownInterval = setInterval(() => {
      countdownElement.innerText = `${time}`;
      time--;

      if (time < 0) {
        // soal terakhir
        if (number === questions.length - 1) {
          showModal("Jawaban benar");
          number++;
          nextQuestion();
        } else {
          clearInterval(countdownInterval);
          showModal("Waktu habis");
        }
      }
    }, 1000); // 1 detik
  }
};

const showModal = (text) => {
  const modal = document.getElementById("modal");
  const ok = document.getElementById("ok");
  const statusJawaban = modal.querySelector("p");

  modal.classList.remove("hidden");
  statusJawaban.innerText = text;

  ok.addEventListener("click", () => {
    modal.classList.add("hidden");
    clearInput();

    // menangani countdown tidak ke reset
    time = 10;

    // setelah modal ditutup, tampilkan next question
    nextQuestion();
  });
};

const submitLogic = () => {
  const submitButton = document.querySelector("button[type='submit']");

  // hapus event listener terlebih dahulu biar ga duplikat
  submitButton.removeEventListener("click", handleSubmit);
  submitButton.addEventListener("click", handleSubmit);
};

const handleSubmit = (e) => {
  const answerUser = document.getElementById("answer");

  e.preventDefault();

  if (questions[number].answer === answerUser.value) {
    showModal("Jawaban benar");
    // hentikan timer
    clearInterval(countdownInterval);
    // tambah number
    number++;
  } else {
    showModal("Jawaban salah");
  }
};

const clearInput = () => {
  const formElement = document.querySelector("form");
  formElement.reset();
};

onStart();
