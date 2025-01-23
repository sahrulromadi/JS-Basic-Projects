// deklarasi variabel
const displayHasil = document.getElementById('hasil');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let previousInput = '';
let operator = '';
let result = null;
let hasDecimal = false;

// add event listener untuk setiap tombol
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        // simpan value tombol yang di klik
        const value = event.target.value;

        // logika untuk operator button
        if(value === 'AC') {
            clearAll();
        } 
        else if(value === '=' && operator !== '') {
            calculate();
        }
        else if(['+', '-', '*', '/', '%', '√'].includes(value)) {
            setOperator(value);
        }
        else if(value === '.') {
            addDecimal();
        }
        else {
            appendNumber(value);
        }
    })
})

// function clearAll()
function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = '';
    result = null;
    updateDisplay(0);
    hasDecimal = false;
}

// function calculate()
function calculate() {
    // dijadikan float agar bisa menangani desimal
    const floatPreviousInput = parseFloat(previousInput);
    const floatCurrentInput = parseFloat(currentInput);

    // jika tidak ada inputan, maka tidak akan ada apa apa
    if(isNaN(floatPreviousInput) || isNaN(floatCurrentInput)) {
        return;
    }

    switch(operator) {
        case '+':
            result = floatPreviousInput + floatCurrentInput;
            break;
        case '-':
            result = floatPreviousInput - floatCurrentInput;
            break;
        case '*':
            result = floatPreviousInput * floatCurrentInput;
            break;
        case '/':
            result = floatPreviousInput / floatCurrentInput;
            break;
        case '%':
            result = floatPreviousInput % floatCurrentInput;
            break;
        case '√':
            result = Math.sqrt(floatCurrentInput);
            break;
        default:
            return;
    }

    // update result dan clear inputan
    updateDisplay(result);
    previousInput = result;
    currentInput = '';
    operator = '';
}

// update display hasil
function updateDisplay(currentValue) {
    if(currentValue) {
        displayHasil.value = currentValue;
    }
    else {
        displayHasil.value = 0;
    }
}

// function setOperator()
function setOperator(valueOperator) {
    if(currentInput === '' && valueOperator === '√') {
        // untuk menangani akar kuadrat, karena untuk operasi akar kuadrat, operator nya dulu yang di pencet
        currentInput = Math.sqrt(parseFloat(previousInput)).toString();
        result = currentInput;
        operator = '√';
    }
    else {
        if(currentInput !== '') {
            previousInput = currentInput;
        }
        operator = valueOperator;
        currentInput = '';
        hasDecimal = false;
    }
}

// decimal
function addDecimal() {
    // jika hasDecimal nya == true
    if(!hasDecimal) {
        currentInput += '.';
        hasDecimal = true;
        updateDisplay(currentInput);
    }
}

// untuk handle inputan number magar muncul di display
function appendNumber(number) {
    if (result !== null) {
        currentInput = number;
        result = null;
    } else {
        currentInput = currentInput === '0' ? number : currentInput + number;
    }
    updateDisplay(currentInput);
}


