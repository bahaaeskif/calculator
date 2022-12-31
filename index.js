class Calculator {
    constructor(preOperationDis, currentOperationDis) {
        this.preOperationDis = preOperationDis;
        this.currentOperationDis = currentOperationDis;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
        this.isPressedEqualBtn = false;
        this.currentOperandAfterCompute = '';
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (this.isPressedEqualBtn === true && this.operation == undefined) {
            this.isPressedEqualBtn = false;
            this.clear();
        }
        if (number == '.' && this.currentOperand.includes('.')) return;

        this.currentOperand = this.currentOperand + number.toString();
    }

    chooseOperation(operation) {

        if (this.currentOperand === "") return;

        if (this.previousOperand !== "") {
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {

        let result;
        let current = parseFloat(this.currentOperand);
        let prev = parseFloat(this.previousOperand);
        if (isNaN(current) || isNaN(prev)) return;
        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '÷':
                result = prev / current;
                break;
        }
        this.currentOperand = result;
        this.previousOperand = '';
        this.operation = undefined;
    }

    updateDisplay() {

        if (this.isPressedEqualBtn) {
            this.currentOperationDis.innerText = this.currentOperand;
        } else {
            this.currentOperationDis.innerText = this.currentOperand;
        }

        if (this.operation !== undefined) {
            this.preOperationDis.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.preOperationDis.innerText = "";
        }
    }
}


// global Variables
let clearAllBtn = document.querySelector("[data-clear-all]");
let deleteBtn = document.querySelector("[data-delete]");
let operandsBtns = document.querySelectorAll("[data-operand]");
let numbersBtns = document.querySelectorAll("[data-number]");
let equalBtn = document.querySelector("[data-equal]");
let preOperationDis = document.querySelector("[data-pre-operation]");
let currentOperationDis = document.querySelector("[data-current-operation]");

// instance from calculator
const calculator = new Calculator(preOperationDis, currentOperationDis);

// loop over buttons and add event
numbersBtns.forEach((number) => {

    number.addEventListener("click", (e) => {

        calculator.appendNumber(number.innerText);
        calculator.updateDisplay();

    });
})
operandsBtns.forEach((operation) => {

    operation.addEventListener("click", (e) => {
        console.log(operation.innerText);
        calculator.chooseOperation(operation.innerText);
        calculator.updateDisplay();

    });
})
// compute the result after press the Equal Button
equalBtn.addEventListener("click", () => {
    calculator.isPressedEqualBtn = true;
    calculator.compute();
    calculator.updateDisplay();
})

// clear all values in displays
clearAllBtn.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
})

//delete the single number
deleteBtn.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})



// events and args should be of type Array
function addMultipleListeners(element, events, handler, useCapture, args) {
    if (!(events instanceof Array)) {
        throw 'addMultipleListeners: ' +
        'please supply an array of eventstrings ' +
        '(like ["click","mouseover"])';
    }
    //create a wrapper to be able to use additional arguments
    var handlerFn = function (e) {
        handler.apply(this);
        // console.log(this); the element is object and this refer to it
    }
    for (var i = 0; i < events.length; i += 1) {
        element.addEventListener(events[i], handlerFn, useCapture);
    }
}

function handler(e) {
    // do things
    calculator.clear();
    calculator.updateDisplay();
};

// usage
addMultipleListeners(
    clearAllBtn,
    ['', 'click'],
    handler,
    false);