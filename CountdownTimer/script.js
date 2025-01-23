// deklarasi variable
const daysDisplay = document.getElementById('days');
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const inputHours = document.getElementById('inputHours');
const inputMinutes = document.getElementById('inputMinutes');
const inputSeconds = document.getElementById('inputSeconds');
const startTimer = document.getElementById('startTimer');

let countdown;

// function start timer
function startCountdown(){
    // parse ke integer, karena inputan akan string
    let hours = parseInt(inputHours.value) || 0;
    let minutes = parseInt(inputMinutes.value) || 0;
    let seconds = parseInt(inputSeconds.value) || 0;

    // convert ke seconds
    let totalTimeSeconds = hours * 3600 + minutes * 60 + seconds;

    // jika waktunya tidak ada, maka harus di isi
    if(totalTimeSeconds <= 0){
        alert('Input harus diisi');
        return;
    }

    // reset input setelah timer start
    inputHours.value = '';
    inputMinutes.value = '';
    inputSeconds.value = '';

    // update time display setiap detik
    countdown = setInterval(() => {
    const days = Math.floor(totalTimeSeconds / 86400);
    const hours = Math.floor((totalTimeSeconds % 86400) / 3600);
    const minutes = Math.floor((totalTimeSeconds % 3600) / 60);
    const seconds = Math.floor(totalTimeSeconds) % 60;
    
    // update html
    daysDisplay.textContent = days.toString().padStart(2, '0') + ' Days';
    hoursDisplay.textContent = hours.toString().padStart(2, '0') + ' Hours';
    minutesDisplay.textContent = minutes.toString().padStart(2, '0') + ' Minutes';
    secondsDisplay.textContent = seconds.toString().padStart(2, '0') + ' Seconds';  
    
    totalTimeSeconds--;

    // stop timer jika waktu habis
    if(totalTimeSeconds <= 0){
        clearInterval(countdown);
        alert('Waktu habis');
    }
    }, 1000);
}

// add event listener
startTimer.addEventListener('click', () => {
    // clear intervalnya agar tidak bertabrakan dan error
    clearInterval(countdown);

    // jalankan fungsi startCountdown
    startCountdown();
});