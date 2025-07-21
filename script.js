function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(a, b, operator) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

function appendToDisplay(value) {
  display.textContent += value;
  display.scrollLeft = display.scrollWidth;
}

function clearDisplay() {
  display.textContent = "";
}

function handleNumber(value) {
  if (operation === null) {
    num1 += value;
  } else if (num2 === "") {
    clearDisplay();
    num2 += value;
  } else {
    num2 += value;
  }

  appendToDisplay(value);
}

function handleOperator(value) {
  if (num1 === "") return;

  if (justEvaluated) {
    operation = value;
    num2 = "";
    justEvaluated = false;
    return;
  }

  if (num2 === "") {
    operation = value;
  } else {
    num1 = operate(Number(num1), Number(num2), operation);
    clearDisplay();
    appendToDisplay(num1);

    num2 = "";
    operation = value;
  }
}


function handleEquals() {
  if (num1 !== "" && num2 !== "" && operation !== null) {
    num1 = operate(Number(num1), Number(num2), operation);
    clearDisplay();
    appendToDisplay(num1);

    justEvaluated = true;
  }
}

const display = document.querySelector("#display-text");

let num1 = "";
let num2 = "";
let operation = null;
let justEvaluated = false;

const buttons = document.querySelector("#button-container");
buttons.addEventListener("click", (event) => {
  const type = event.target.dataset.type;
  const value = event.target.dataset.value;

  if (!type) return // Click wasn't on a button

  switch (type) {
    case "number":
      handleNumber(value);
      break;
    case "decimal":
      break;
    case "operator":
      handleOperator(value);
      break;
    case "equals":
      handleEquals();
      break;
    case "clear":
      break;
    case "delete":
      break;
  }
});
