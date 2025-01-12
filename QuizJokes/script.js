// bug: ketika jawaban benar, countdown berjalan

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

const countdown = () => {
  const countdownElement = document.getElementById("countdown");

  // menangani countdownInterval masih ada
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  countdownInterval = setInterval(() => {
    countdownElement.innerText = `${time}`;
    time--;

    if (time < 0) {
      // soal terakhir
      if (number === questions.length - 1) {
        number++;
        showModal("Jawaban benar");
        nextQuestion();
      } else {
        clearInterval(countdownInterval);
        showModal("Waktu habis");
      }
    }
  }, 1000); // 1 detik
};

const clearInput = () => {
  const formElement = document.querySelector("form");
  formElement.reset();
};

const showModal = (text) => {
  const modal = document.getElementById("modal");
  const ok = document.getElementById("ok");
  const statusJawaban = modal.querySelector("p");

  modal.classList.remove("hidden");
  clearInterval(countdownInterval);

  statusJawaban.innerText = text;

  ok.addEventListener("click", () => {
    modal.classList.add("hidden");
    clearInput();

    // menangani countdown tidak ke reset
    time = 10;
    countdown();
  });
};

const submitLogic = () => {
  const submitButton = document.querySelector("button[type='submit']");
  const answerUser = document.getElementById("answer");

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (number < questions.length) {
      if (questions[number].answer === answerUser.value) {
        showModal("Jawaban benar");
        number++;
        clearInterval(countdownInterval);
        nextQuestion();
      } else {
        showModal("Jawaban salah");
      }
    }
  });
};

// MAIN
const question = document.getElementById("question");
const bar = document.getElementById("bar");
const content = document.getElementById("content");
let number = 0;
let time = 10;
let countdownInterval;

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

nextQuestion();
