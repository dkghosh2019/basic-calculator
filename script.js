// Select all buttons and the display screen using your exact variables
const buttonValue = document.querySelectorAll("button");
const screenValue = document.querySelector("#number");

// This variable stores the current math expression (e.g., "5+3-2")
let currentExpression = "";

// Loop through each button in the collection to listen for user clicks
buttonValue.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.innerText;

    if (value === "C") {
      // Clear button: Reset everything to blank
      currentExpression = "";
      screenValue.innerText = "0";
    } 
    else if (value === "=") {
      // Equals button: Run the math logic and show the final answer
      if (currentExpression !== "") {
        const result = calculateExpression(currentExpression);
        screenValue.innerText = result;
        currentExpression = String(result); // Allow further math on the result
      }
    } 
    else {
      // Number or Operator button (+, -, 0-9): Append to the text string
      currentExpression += value;
      screenValue.innerText = currentExpression;
    }
  });
});

//  implements the PEMDAS order of operations (specifically MDAS
function calculateExpression(expression) {
  // Use the fixed regex to split the string into an array of tokens
  let tokens = expression.match(/(\d+|[+\-*/])/g);
  
  if (!tokens) return 0;

  // --- PASS 1: Handle Multiplication (*) and Division (/) ---
  let i = 0;
  while (i < tokens.length) {
    if (tokens[i] === "*" || tokens[i] === "/") {
      const operator = tokens[i];
      const prevNum = parseFloat(tokens[i - 1]);
      const nextNum = parseFloat(tokens[i + 1]);

      // Error guard against incomplete inputs (like "5 *")
      if (isNaN(nextNum)) break;

      let partialResult = 0;
      if (operator === "*") {
        partialResult = prevNum * nextNum;
      } else if (operator === "/") {
        // Prevent crashing if dividing by zero
        partialResult = nextNum === 0 ? "Error" : prevNum / nextNum;
      }

      // Replace the 3 processed tokens (num1, operator, num2) with the single result
      tokens.splice(i - 1, 3, partialResult);
      
      // Since we shrunk the array, we do not increment 'i'. 
      // It stays at the same index to check the next token.
    } else {
      i++;
    }
  }

  // If division by zero occurred, bubble the error up
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

  return total;
}

