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

function isReplacingResult() {
  return (mode === "justEvaluated") || (mode === "inputtingNum2" && num2 === "");
}

function handleDivideByZero() {
  clear();
  appendToDisplay("(╯°□°)╯︵ ┻━┻");
}

function formatScientific(num) {
  return num
    .toExponential(6)
    .replace(/(\.\d*?[1-9])0+e/, "$1e")
    .replace(/\.0+e/, "e");
}

function formatWithRounding(num, maxChars) {
  const MIN_DECIMALS = 2;
  const isNegative = num < 0;

  const intPart = Math.abs(num).toString().split(".")[0];
  const intLen = intPart.length;

  // Reserve space for decimal point (always) and minus sign (only if needed)
  const reserved = 1 + (isNegative ? 1 : 0); 
  const maxDecimalDigits = maxChars - intLen - reserved;

  const decimals = Math.max(MIN_DECIMALS, maxDecimalDigits);
  let rounded = num.toFixed(decimals);

  // Strip trailing zeros and dot
  rounded = rounded.replace(/\.?0+$/, "");
  if (rounded === "-0") rounded = "0";

  return rounded;
}

function formatForDisplay(num) {
  const MAX_LENGTH = 14;
  const abs = Math.abs(num);

  const isScientific = abs !== 0 && (abs < 1e-6 || abs >= 1e12);

  const result = isScientific
    ? formatScientific(num)
    : formatWithRounding(num, MAX_LENGTH);

  // Fall back to scientific notation if the rounded result is too long
  return result.length <= MAX_LENGTH ? result : formatScientific(num);
}

function evaluateAndDisplayResult() {
  if (num2 === "0" && operation === "/") {
    handleDivideByZero();
    return;
  }

  const result = operate(Number(num1), Number(num2), operation);
  const formattedResult = formatForDisplay(result);

  // Set num1 to the result to allow for chaining operators and equals
  num1 = result.toString();

  clearDisplay();
  appendToDisplay(formattedResult);
}

function handleInput(value) {
  // A number or decimal was clicked after evaluating — start fresh
  if (mode === "justEvaluated") {
    clear();
    mode = "inputtingNum1";
  }

  // Disallow multiple decimals
  const isDecimal = value === ".";
  const current = mode === "inputtingNum1" ? num1 : num2;
  if (isDecimal && current.includes(".")) return;

  // If starting with a decimal, prefix with "0"
  if (isDecimal && current === "") value = "0.";

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
  if (num1 === "") return; // An operator was clicked before the first number

  if (num2 !== "" && mode !== "justEvaluated") {
    // An operator was clicked before evaluating the previous expression
    evaluateAndDisplayResult();
  }

  num2 = "";
  mode = "inputtingNum2";
  operation = value;
}

function handleEquals() {
  if (num1 === "" || num2 === "" || operation === null) return;

  evaluateAndDisplayResult();
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

  let current = removeLastCharacter(display.textContent);

  const shouldClear = (
    current.includes("e") ||
    current === "-" ||
    current === "." ||
    current === "-."
  );

  if (shouldClear) {
    current = "";
  }
  
  // User is modifying the displayed result, treat it as a new first number
  if (isReplacingResult()) {
    num2 = "";
    operation = null;
    mode = "inputtingNum1";
  }

  clearDisplay();
  appendToDisplay(current);

  if (mode === "inputtingNum1") {
    num1 = current;
  } else {
    num2 = current;
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
    case "decimal":
      handleInput(value);
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
