# Simple Arithmetic Calculator

A clean, browser-based calculator built with **HTML**, **CSS**, and **JavaScript**. It supports basic arithmetic operations, decimal numbers, operator precedence, clearing the display, and simple error handling for division by zero.

## Project Preview

The calculator displays a centered UI with number keys, arithmetic operator keys, a clear button, and an equals button.

## Features

- Addition, subtraction, multiplication, and division
- Decimal number support
- Operator precedence support:
  - Multiplication and division are calculated before addition and subtraction
- Clear button to reset the calculator
- Division-by-zero handling with `Error`
- Rounded results to reduce JavaScript floating-point precision issues
- Responsive centered layout using CSS Flexbox and Grid

## Technologies Used

- HTML5
- CSS3
- JavaScript

## Project Structure

```text
JS-SimpleArithmeticCalculator/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run the Project

1. Download or clone the project.
2. Open the project folder.
3. Double-click `index.html`, or open it in a browser.
4. Start using the calculator.

No server or installation is required.

## How It Works

The HTML file defines the calculator layout, including the display screen and all calculator buttons.

The CSS file styles the calculator, centers it on the page, creates the button grid, and applies custom colors to the operator buttons.

The JavaScript file handles button clicks, builds the current arithmetic expression, clears the display when `C` is clicked, and calculates the final result when `=` is clicked.

## Calculation Logic

The calculator evaluates expressions in two passes:

1. First, it handles multiplication and division.
2. Then, it handles addition and subtraction.

This allows expressions like:

```text
2 + 3 * 4
```

to correctly return:

```text
14
```

instead of:

```text
20
```

## Example Usage

```text
Input:  10 + 5
Output: 15

Input:  8 / 2
Output: 4

Input:  2 + 3 * 4
Output: 14

Input:  5 / 0
Output: Error
```

## Future Improvements

- Add keyboard support
- Add backspace/delete button
- Prevent invalid expressions like `5++2`
- Add parentheses support
- Add percentage button
- Improve mobile responsiveness
- Add unit tests for the calculation function

## Author

Dipak Ghosh
