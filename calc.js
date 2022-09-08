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

let buttons = document.querySelectorAll('button')
let operator = null;
let number1 = null;
let number2 = null;

buttons.forEach(button => button.addEventListener('click', function() {
  if (button.className==='operator') {
    operator = button.innerText;
  } else if (button.className==='number' && !number1) {
    number1 = button.innerText;
    console.log(number1)
  } else if (button.className==='number' && !operator) {
    number1 += button.innerText;
    console.log(number1)
  } else if (button.className==='number' && operator && !number2) {
    number2 = button.innerText;
  } else if (button.className==='number' && operator && number2) {
    number2 += button.innerText;
  } else if (button.className==='equals' && number1 && number2 && operator) {
    answer = operate(operator, number1, number2);
    console.log(answer)
    number1 = answer;
    console.log(number1)
    operator = null;
    number2 = null;
  } else if (button.className==='clear') {
    operator = null;
    number1 = null;
    number2 = null;
  }
}))
