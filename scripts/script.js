// displayed on screen
let displayValue = '0';

// operands/operators saved for performing calculations
let firstOperand = null;
let secondOperand = null;
let firstOperator = null;
let secondOperator = null;
let result = null;

// returns all buttons in html file
const buttons = document.querySelectorAll('button');

// key listener for data-key codes to use calculator with the keyboard
window.addEventListener('keydown', function(e){
    if (e.key == 'Backspace') {
        inputBackspace();
    } else {
        const key = document.querySelector(`button[data-key='${e.code}']`);
        key.click();
    }
    
});

// updates display to be equal to displayValue, ensures maximum digit length of 10
function updateDisplay() {
    const display = document.getElementById('display');
    display.innerText = displayValue;
    if(displayValue.length > 9) {
        display.innerText = displayValue.substring(0, 9);
    }
}
  
updateDisplay();

// handler for button clicks, adds event handler for each button
// decides which function to execute based on button class

function clickButton() {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            if(buttons[i].classList.contains('operand')) {
                inputOperand(buttons[i].value);
                updateDisplay();
            } else if(buttons[i].classList.contains('operator')) {
                inputOperator(buttons[i].value);
            } else if(buttons[i].classList.contains('equals')) {
                inputEquals();
                updateDisplay();
            } else if(buttons[i].classList.contains('decimal')) {
                inputDecimal(buttons[i].value);
                updateDisplay();
            } else if(buttons[i].classList.contains('percent')) {
                inputPercent(displayValue);
                updateDisplay();
            } else if(buttons[i].classList.contains('sign')) {
                inputSign(displayValue);
                updateDisplay();
            } else if(buttons[i].classList.contains('sqrt')) {
                inputSqrt(displayValue);
                updateDisplay();
            } else if (buttons[i].classList.contains('pi')) {
                inputPi(displayValue);
                updateDisplay;
            } else if (buttons[i].classList.contains('e')) {
                inputE(displayValue);
                updateDisplay();
            } else if(buttons[i].classList.contains('clear'))
                clearDisplay();
                updateDisplay();
        
        }
    )}
}

clickButton();

// adds operand to current calculation
function inputOperand(operand) {
    if(firstOperator === null) {
        if(displayValue === '0' || displayValue === 0) {
            // 1st click - handles first operand input
            displayValue = operand;
        } else if(displayValue === firstOperand) {
            // starts new operation after inputEquals()
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    } else {
        // 3rd/5th click - inputs to secondOperand
        if(displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    }
}

// adds operator to current calculation
function inputOperator(operator) {
    if(firstOperator != null && secondOperator === null) {
        //4th click - handles input of second operator
        secondOperator = operator;
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        displayValue = roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        result = null;
    } else if (firstOperator != null && secondOperator != null) {
        //6th click - new secondOperator
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        secondOperator = operator;
        displayValue = roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        result = null;
    } else { 
        //2nd click - handles first operator input
        firstOperator = operator;
        firstOperand = displayValue;
    }
}

// handler for equals button
function inputEquals() {
    // hitting equals doesn't display undefined before operate()
    if(firstOperator === null) {
        displayValue = displayValue;
    } else if(secondOperator != null) {
        // handles final result
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        if(result === 'lmao') {
            displayValue = 'lmao';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        // handles first operation
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        if(result === 'lmao') {
            displayValue = 'lmao';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
}

// handles decimal input
function inputDecimal(dot) {
    if(displayValue === firstOperand || displayValue === secondOperand) {
        displayValue = '0';
        displayValue += dot;
    } else if(!displayValue.includes(dot)) {
        displayValue += dot;
    } 
}

// handles percent operator
function inputPercent(num) { 
    displayValue = (num/100).toString();
}

// handles sign operator
function inputSign(num) { 
    displayValue = (num * -1).toString();
}

// handles square root operator
function inputSqrt(num) { 
    displayValue = (Math.pow(num, 0.5)).toString();
}

// handles pi operand
function inputPi(num) {
    displayValue = Math.PI.toString();
}

// handles e operand
function inputE(num) { 
    displayValue = Math.E.toString();
}

// sets display back to 0, removes all operands & operators
function clearDisplay() { 
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
}

// handles backspace (removes first operand from current calculation)
function inputBackspace() {
    if(firstOperand != null) {
        firstOperand = null;
        updateDisplay();
    }
}

// handles binary operations
function operate(x, y, op) {
    if(op === '+') {
        return x + y;
    } else if(op === '-') {
        return x - y;
    } else if(op === '*') {
        return x * y;
    } else if(op === '/') {
        if(y === 0) {
            return 'lmao';
        } else {
        return x / y;
        }
    } else if (op === '^') {
        return Math.pow(x, y);
    }
}

// rounds large/small numbers using scientific notation if necessary
function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}