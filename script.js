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

const display = document.querySelector("#display-text");

const buttons = document.querySelector("#button-container");
buttons.addEventListener("click", (event) => {
  const value = event.target.dataset.value;
  if (!value) return // Click wasn't on a number button

  appendToDisplay(value);
});
