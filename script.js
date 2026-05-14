const buttonValue = document.querySelectorAll("button");
const screenValue = document.querySelector("#number");

let currentExpression = "";

buttonValue.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.innerText;

    if (value === "C") {
      currentExpression = "";
      screenValue.innerText = "0";
    } 
    else if (value === "=") {
      if (currentExpression !== "") {
        const result = calculateExpression(currentExpression);
        screenValue.innerText = result;
        currentExpression = String(result); 
      }
    } 
    else {
      currentExpression += value;
      screenValue.innerText = currentExpression;
    }
  });
});

function calculateExpression(expression) {
  // 1. The updated regex to capture whole numbers AND floating-point decimals
  let tokens = expression.match(/(\d+\.?\d*|[+\-*/])/g);
  
  if (!tokens) return 0;

  // --- PASS 1: Handle Multiplication (*) and Division (/) ---
  let i = 0;
  while (i < tokens.length) {
    if (tokens[i] === "*" || tokens[i] === "/") {
      const operator = tokens[i];
      
      // 2. Using parseFloat so decimal values are preserved
      const prevNum = parseFloat(tokens[i - 1]);
      const nextNum = parseFloat(tokens[i + 1]);

      if (isNaN(nextNum)) break;

      let partialResult = 0;
      if (operator === "*") {
        partialResult = prevNum * nextNum;
      } else if (operator === "/") {
        partialResult = nextNum === 0 ? "Error" : prevNum / nextNum;
      }

      tokens.splice(i - 1, 3, partialResult);
    } else {
      i++;
    }
  }

  if (tokens.includes("Error")) return "Error";

  // --- PASS 2: Handle Addition (+) and Subtraction (-) ---
  let total = parseFloat(tokens[0]);

  for (let j = 1; j < tokens.length; j += 2) {
    const operator = tokens[j];
    const nextNum = parseFloat(tokens[j + 1]);

    if (isNaN(nextNum)) break;

    if (operator === "+") {
      total += nextNum;
    } else if (operator === "-") {
      total -= nextNum;
    }
  }

  // 3. Fix JavaScript binary rounding glitches
  return Math.round(total * 1e10) / 1e10;
}
