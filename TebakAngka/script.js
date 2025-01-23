// deklarasi variabel
const inputAngka = document.getElementById('inputAngka');
const submit = document.getElementById('submit');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton')
// angka acak
let randomNumber = Math.floor(Math.random()*10);
// jumlah percobaan user
let countSubmit = 0;

// buat inputan menjadi autofocus
inputAngka.focus();

// fungsi untuk mengecek angka yang di input user
function checkNumber(){
    // ambil value angka yang di input
    const inputAngkaValue = Number(inputAngka.value);

    // update percobaan
    countSubmit += 1;

    // jika sukses
    if(randomNumber === inputAngkaValue) {
        message.textContent = `Selamat, kamu benar setelah ${countSubmit} kali percobaan`;
        message.style.color = "green";

        endGame();
    }
    // jika gagal
    else {
        if(randomNumber > inputAngkaValue) {
            message.textContent = "Angka terlalu rendah...";
            message.style.color = "#f44336";
        }
        else if(randomNumber < inputAngkaValue) {
            message.textContent = "Angka terlalu tinggi...";
            message.style.color = "#f44336";
        }
    }
}

// fungsi untuk restart
function restart() {
    // acak kembali nomor nya
    randomNumber = Math.floor(Math.random()*10);

    // reset jumlah percobaan
    countSubmit = 0;

    // reset input
    inputAngka.value = '';

    // nyalakan kembali input dan submit nya
    inputAngka.disabled = false;
    submit.disabled = false;

    // hidden button restart
    restartButton.style.display = "none";

    // munculkan button submit
    submit.style.display = "block";

    // kembalikan message ke semula
    message.textContent = "Goodluck...!!!";
}

// function ketika endgame
function endGame() {
    // disable button dan input
    submit.disabled = true;
    inputAngka.disabled = true;

     // hidden button submit
     submit.style.display = "none";

     // munculkan button restart 
     restartButton.style.display = "inline";
}

// event listener untuk submit
submit.addEventListener('click', () => {
    checkNumber();
});

// event listener untuk Enter key
inputAngka.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkNumber();
    }
});

restartButton.addEventListener('click', () => {
    restart();
});
