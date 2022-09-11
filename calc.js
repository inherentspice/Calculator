function operate(operator, number1, number2) {
  if (operator==='+') {
    return parseFloat(number1) + parseFloat(number2);
  } else if (operator==='-') {
    return number1 - number2;
  } else if (operator==='x') {
    return number1 * number2;
  } else if (operator==='/') {
    if (number2==='0') {
      window.alert('Nope')
      return 0
    } else {
      console.log(number2)
      return number1 / number2;
    };
  } else {
    return 'nope';
  }
}

function updateScreen() {
  let screenUpdate = document.getElementById('screen');
  let screenDisplay;

  if (screenUpdate.hasChildNodes()) {
    screenDisplay = screenUpdate.firstChild;
  } else {
    screenDisplay = document.createElement('p');
  }
  if (operator && number2) {
    screenDisplay.innerText = `${number1} ${operator} ${number2}`;
  } else if (operator && !number2) {
    screenDisplay.innerText = `${number1} ${operator}`;
  } else if (!operator && !number2) {
    screenDisplay.innerText = `${number1}`;
  }
  screenUpdate.appendChild(screenDisplay);
};

function addDecimal() {
  if ((number1 || number1===0) && !operator) {
    number1 += '.';
  } else if (!number2){
    number2 = 0;
    number2 += '.';
  } else {
    number2 += '.';
  }
};

function deletePrevious() {
  if (number1 && !operator) {
    number1 = number1.substring(0, number1.length - 1);
  } else if (operator && !number2) {
    operator = null;
  } else {
    number2 = number2.substring(0, number2.length - 1);
  }
};

let buttons = document.querySelectorAll('button')
let operator = null;
let number1 = null;
let number2 = null;
let answer = null;
const operatorKeys = {'plus': '+',
                      'minus': '-',
                      'divide': '/',
                      'multiply': 'x'}


buttons.forEach(button => button.addEventListener('click', function() {
  if (button.className==='operator'  && number1 && number2) {
    answer = operate(operator, number1, number2);
    number1 = answer;
    operator = button.innerText;
    number2 = null;
  } else if (button.className==='operator') {
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
    console.log(answer)
    number1 = answer;
    operator = null;
    number2 = null;
  } else if (button.className==='clear') {
    operator = null;
    number1 = 0;
    number2 = null;
    answer = null;
  } else if (button.className==='decimal') {
    addDecimal();
  } else if (button.className==='backspace') {
    deletePrevious();
  }

  updateScreen();
}));

document.addEventListener('keydown', (e) => {
  let name = e.key;

  if (Object.values(operatorKeys).indexOf(name) > -1 && number1 && number2) {
    answer = operate(operator, number1, number2);
    number1 = answer;
    operator = name;
    number2 = null;
  } else if (Object.values(operatorKeys).indexOf(name) > -1) {
    operator = name;
  } else if (isFinite(name) && !number1) {
    number1 = name;
  } else if (isFinite(name) && !operator) {
    number1 += name;
  } else if (isFinite(name) && operator && !number2) {
    number2 = name;
  } else if (isFinite(name) && operator && number2) {
    number2 += name;
  } else if (name==='Enter' && number1 && number2 && operator) {
    answer = operate(operator, number1, number2);
    number1 = answer;
    operator = null;
    number2 = null;
  } else if (name==='.') {
    addDecimal();
  } else if (name==='Backspace') {
    deletePrevious();
  };

  updateScreen();
});
