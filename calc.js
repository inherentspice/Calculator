function operate(operator, number1, number2) {
  if (operator==='+') {
    return parseFloat(number1) + parseFloat(number2);
  } else if (operator==='-') {
    return number1 - number2;
  } else if (operator==='x' || operator==='*') {
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

function buttonAnimation(btn) {
  console.log(btn)
  if (isFinite(btn) || Object.values(operatorKeys).indexOf(btn) > -1 || Object.values(miscButtons).indexOf(btn) > -1) {
    let activeButton = document.querySelectorAll('.active');
    activeButton[0].className = activeButton[0].className.replace('active', '');
    btnSelected = document.getElementById(btn);
    btnSelected.className += ' active';
  }
}


let buttons = document.querySelectorAll('button')
let operator = null;
let number1 = 0;
let number2 = 0;
let answer = null;
const operatorKeys = {'plus': '+',
                      'minus': '-',
                      'divide': '/',
                      'multiply': '*'};


const miscButtons = {'decimal': '.',
                      'enter': 'Enter',
                      'backspace': 'Backspace',
                      'clear': 'clear'};



buttons.forEach(button => button.addEventListener('click', function() {
  if (button.className==='operator'  && number1 && number2) {
    answer = operate(operator, number1, number2);
    number1 = answer;
    operator = button.innerText;
    number2 = null;
  } else if (button.classList.contains('operator')) {
    operator = button.innerText;
  } else if (button.classList.contains('number') && !number1) {
    number1 = button.innerText;
  } else if (button.classList.contains('number') && !operator) {
    number1 += button.innerText;
  } else if (button.classList.contains('number') && operator && !number2) {
    number2 = button.innerText;
  } else if (button.classList.contains('number') && operator && number2) {
    number2 += button.innerText;
  } else if (button.classList.contains('equals') && number1 && number2 && operator) {
    answer = operate(operator, number1, number2);
    number1 = answer;
    operator = null;
    number2 = null;
  } else if (button.classList.contains('clear')) {
    operator = null;
    number1 = 0;
    number2 = null;
    answer = null;
  } else if (button.classList.contains('decimal')) {
    addDecimal();
  } else if (button.classList.contains('backspace')) {
    deletePrevious();
  }
  buttonAnimation(this.id);
  updateScreen();
}));

document.addEventListener('keydown', (e) => {
  let name = e.key;
  buttonAnimation(name);
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
