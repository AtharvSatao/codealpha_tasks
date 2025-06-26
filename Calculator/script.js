const display = document.getElementById('display');

function appendNumber(num) {
  display.value += num;
}

function appendOperator(operator) {
  if (display.value === "") return;
  const lastChar = display.value.slice(-1);
  if ("+-*/".includes(lastChar)) return;
  display.value += operator;
}

function appendDot() {
  const lastSegment = display.value.split(/[\+\-\*\/]/).pop();
  if (!lastSegment.includes(".")) {
    display.value += ".";
  }
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = "Error";
  }
}

// Keyboard support
document.addEventListener("keydown", function (event) {
  if (!isNaN(event.key) || "+-*/.".includes(event.key)) {
    display.value += event.key;
  } else if (event.key === "Enter") {
    calculateResult();
  } else if (event.key === "Backspace") {
    deleteLast();
  } else if (event.key.toLowerCase() === "c") {
    clearDisplay();
  }
});

function toggleSign() {
  if (display.value !== "") {
    if (display.value.startsWith("-")) {
      display.value = display.value.slice(1);
    } else {
      display.value = "-" + display.value;
    }
  }
}

function percent() {
  if (display.value !== "") {
    try {
      display.value = eval(display.value) / 100;
    } catch {
      display.value = "Error";
    }
  }
}
