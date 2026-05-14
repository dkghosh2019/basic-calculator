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

// Custom calculation logic strictly for + and - without using dangerous eval()
function calculateExpression(expression) {
  // Use a regular expression to split numbers and keep the + or - signs
  const tokens = expression.match(/(\d+|\+|-|\*|\/)/g);
  
  if (!tokens) return 0;

  // Start with the very first number in our sequence
  let total = parseInt(tokens[0], 10);

  // Loop through the remaining tokens to add or subtract
  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const nextNumber = parseInt(tokens[i + 1], 10);

    // Skip calculations if a number or operator is missing at the trailing edge
    if (isNaN(nextNumber)) break; 

    if (operator === "+") {
      total += nextNumber;
    } else if (operator === "-") {
      total -= nextNumber;
    } else if (operator === "*") {
      total *= nextNumber;
    } else if (operator === "/") {
      total /= nextNumber;
    }
  }

  return total;
}
