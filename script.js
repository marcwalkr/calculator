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

function removeLastCharacter(string) {
  return string.slice(0, -1);
}

function handleNumber(value) {
  if (mode === "justEvaluated") {
    clear();
    mode = "inputtingNum1";
  }

  if (mode === "inputtingNum1") {
    num1 += value;
  } else {
    // num1 is still on the display, clear once before starting num2
    if (num2 === "") clearDisplay();

    num2 += value;
  }

  appendToDisplay(value);
}

function handleOperator(value) {
  if (num1 === "") return;

  if (mode === "justEvaluated") {
    num2 = "";
    operation = value;
    mode = "inputtingNum2";
    return;
  }

  if (num2 === "") {
    operation = value;
    mode = "inputtingNum2";
  } else {
    const result = operate(Number(num1), Number(num2), operation);
    num1 = result.toString();
    clearDisplay();
    appendToDisplay(num1);

    num2 = "";
    operation = value;
  }
}


function handleEquals() {
  if (num1 === "" || num2 === "" || operation === null) return;
  
  const result = operate(Number(num1), Number(num2), operation);
  num1 = result.toString();
  clearDisplay();
  appendToDisplay(num1);

  mode = "justEvaluated";
}

function clear() {
  num1 = "";
  num2 = "";
  operation = null;
  mode = "inputtingNum1";
  clearDisplay();
}

function handleDelete() {
  if (num1 === "" && num2 === "") return;
  
  if (mode === "justEvaluated" || mode === "inputtingNum2" && num2 === "") {
    num2 = "";
    operation = null;
    mode = "inputtingNum1";
  }

  clearDisplay();

  if (mode === "inputtingNum1") {
    num1 = removeLastCharacter(num1);
    appendToDisplay(num1);
  } else {
    num2 = removeLastCharacter(num2);
    appendToDisplay(num2);
  }
}

const display = document.querySelector("#display-text");

let num1 = "";
let num2 = "";
let operation = null;
let mode = "inputtingNum1";

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
      clear();
      break;
    case "delete":
      handleDelete();
      break;
  }
});
