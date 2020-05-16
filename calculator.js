'use strict';

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const deleteAllButton = document.querySelector('[data-delete-all]');
const equalButton = document.querySelector('[data-equal]');
const previousTextElement = document.querySelector('[data-upper-display]');
const currentTextElement = document.querySelector('[data-lower-display]');

class Calculator {
    constructor(previousTextElement, currentTextElement) {
        this.previousTextElement = previousTextElement;
        this.currentTextElement = currentTextElement;
        this.clear();
    }

    clear() {
        this.currentText = '';
        this.previousText = '';
        this.operation = undefined;
        this.updateDisplay()
    }

    delete() {
        this.currentText = this.currentText.toString().slice(0, -1);
    }

    appendNumber(number) { //beveszi az eppen lenyomott szamot
        if (number === '.' & this.currentText.includes('.')) return;
        this.currentText = this.currentText.toString() + number.toString(); //toString, hogy ne adja ossze a szamokat...pl 1+1 !=2, hanem 11
    }

    chooseOperation(operation) {
        if (this.currentText === '') return; //korforgas megakadajozasa
        if (this.previousText !== '') { //ha van 2 ertek, de meg nincs vegrehajtva es jon kovetkezo operation, vegrehajtja azokat
            this.compute();
        }
        this.operation = operation;
        this.previousText = this.currentText;
        this.currentText = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousText);
        const current = parseFloat(this.currentText);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) { //bunch of if statement on the this.operation
            case '+':
                computation = prev + current;
            break;
            case '-':
                computation = prev - current;
            break;
            case '*':
                computation = prev * current;
            break;
            case '/':
                computation = prev / current;
            break;
            default: // ha  afenti if-k nem telejsulnek, akkor return
                return
        }
        this.currentText = computation;
        this.operation = undefined;
        this.previousText = '';
    }

    updateDisplay() { //appendbol veszi at az eppen lenyomot szamot es jelentiti meg
        this.currentTextElement.innerText = this.currentText;
        if (this.operation != null) {
            this.previousTextElement.innerText = `${this.previousText} ${this.operation}`;
        } else this.previousTextElement.innerText = this.previousText
    }
}

const calculator = new Calculator(previousTextElement, currentTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

deleteAllButton.addEventListener('click', () => {
    calculator.clear();
})

