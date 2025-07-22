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
  if (justEvaluated) {
    clear();
    justEvaluated = false;
  }

  if (operation === null) {
    num1 += value;
    editing = "num1";
  } else {
    if (num2 === "") clearDisplay();
    num2 += value;
    editing = "num2";
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

  justEvaluated = true;
}

function clear() {
  num1 = "";
  num2 = "";
  operation = null;
  clearDisplay();
}

function handleDelete() {
  if (num1 === "" && num2 === "") return;
  
  if (justEvaluated) {
    editing = "num1";
    num2 = "";
    operation = null;
    justEvaluated = false;
  }

  clearDisplay();

  if (editing === "num1") {
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
let editing = "";
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
      clear();
      break;
    case "delete":
      handleDelete();
      break;
  }
});
