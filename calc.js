function operate(operator, number1, number2) {
  if (operator==='+') {
    return number1 + number2;
  } else if (operator==='-') {
    return number1 - number2;
  } else if (operator==='x') {
    return number1 * number2;
  } else if (operator==='/') {
    return number1 / number2;
  } else {
    return 'nope';
  }
}

function updateScreen() {
  screenUpdate = document.getElementById('screen');
  screenDisplay = document.createElement('p');
  if (operator && number2) {
    screenDisplay.innerText = `${number1} ${operator} ${number2}`;
  } else if (operator && !number2) {
    screenDisplay.innerText = `${number1} ${operator}`;
  } else if (!operator && !number2) {
    screenDisplay.innerText = `${number1}`;
  }
  screenUpdate.appendChild(screenDisplay);
};

let buttons = document.querySelectorAll('button')
let operator = null;
let number1 = null;
let number2 = null;
let answer = null;


buttons.forEach(button => button.addEventListener('click', function() {
  if (button.className==='operator') {
    operator = button.innerText;
  } else if (button.className==='number' && !number1) {
    number1 = button.innerText;
  } else if (button.className==='number' && !operator) {
    number1 += button.innerText;
  } else if (button.className==='number' && operator && !number2) {
    number2 = button.innerText;
  } else if (button.className==='number' && operator && number2) {
    number2 += button.innerText;
  } else if (button.className==='equals' && number1 && number2 && operator) {
    answer = operate(operator, number1, number2);
    number1 = answer;
    operator = null;
    number2 = null;
  } else if (button.className==='clear') {
    operator = null;
    number1 = null;
    number2 = null;
    answer = null;
  }
  updateScreen();
}))
