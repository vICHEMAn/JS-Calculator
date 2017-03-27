//------------ Variables ------------------------------------

var currentOperationCounter = "";
var currCalc = 0;
var accumulatedCounter = "";

var AC = document.getElementById('AC');
var CE = document.getElementById('CE');

var one = document.getElementById('one');
var two = document.getElementById('two');
var three = document.getElementById('three');
var four = document.getElementById('four');
var five = document.getElementById('five');
var six = document.getElementById('six');
var seven = document.getElementById('seven');
var eight = document.getElementById('eight');
var nine = document.getElementById('nine');
var zero = document.getElementById('zero');

var divided = document.getElementById('divided');
var times = document.getElementById('times');
var minus = document.getElementById('minus');
var plus = document.getElementById('plus');
var equals = document.getElementById('equals');

var accumulator = document.getElementById('accumulator');
var currentOperation = document.getElementById('currentOperation');

//------------ Helper Functions ------------------------------------

function tooManyAcc () {
  return (accumulator.innerHTML.length > 14 || currentOperation.innerHTML.length > 24) ? true : false;
}

function addEventClick (item, value) {
  item.addEventListener("click", function () {
    if (tooManyAcc()) {
      accumulator.innerHTML = "exceeded limit";
      currentOperation.innerHTML = 0;
      accumulatedCounter = "";
      currentOperationCounter = "";
      currCalc = 0;
    } else {
      accumulatedCounter += value;
      accumulator.innerHTML = accumulatedCounter;
      currentOperationCounter += value;
      currentOperation.innerHTML = currentOperationCounter;
    }
  }, false);
}

function addOperationsEventClick (item, operation) {
  item.addEventListener("click", function () {
    if (tooManyAcc()) {
      accumulator.innerHTML = "exceeded limit";
      currentOperation.innerHTML = 0;
      accumulatedCounter = "";
      currentOperationCounter = "";
    } else {
      if (currentOperationCounter !== "" && !/[+\-\/x\.]$/.test(currentOperationCounter)) {
        accumulator.innerHTML = operation;
        accumulatedCounter = "";
        currentOperationCounter += operation;
        currentOperation.innerHTML = currentOperationCounter;
      }
    }
  });
}

//------------ Button bindings ------------------------------------

addEventClick(one,1);
addEventClick(two,2);
addEventClick(three,3);
addEventClick(four,4);
addEventClick(five,5);
addEventClick(six,6);
addEventClick(seven,7);
addEventClick(eight,8);
addEventClick(nine,9);

addOperationsEventClick(plus,"+");
addOperationsEventClick(minus,"-");
addOperationsEventClick(times,"*");
addOperationsEventClick(divided,"/");

AC.addEventListener("click", function () {
  accumulatedCounter = "";
  currentOperationCounter = "";
  currCalc = 0;
  accumulator.innerHTML = 0;
  currentOperation.innerHTML = 0;
});

CE.addEventListener("click", function () {
  var length = accumulatedCounter.length;
  currentOperationCounter = currentOperationCounter.slice(0, -length-1);
  currentOperation.innerHTML = currentOperationCounter;
  if (currentOperationCounter === "") {
    currentOperation.innerHTML = 0;
  }

  accumulatedCounter = "";
  accumulator.innerHTML = 0;
});

zero.addEventListener("click", function () {
  if (tooManyAcc()) {
    accumulator.innerHTML = "exceeded limit";
    currentOperation.innerHTML = 0;
    accumulatedCounter = "";
    currentOperationCounter = "";
    currCalc = 0;
  } else {
    if (accumulatedCounter !== "") {
      accumulatedCounter += 0;
      accumulator.innerHTML = accumulatedCounter;
      currentOperationCounter += 0;
      currentOperation.innerHTML = currentOperationCounter;
    }
  }
}, false);

dot.addEventListener("click", function () {
  if (tooManyAcc()) {
    accumulator.innerHTML = "exceeded limit";
    currentOperation.innerHTML = 0;
    accumulatedCounter = "";
    currentOperationCounter = "";
    currCalc = 0;
  } else {
    if (!/\.$/.test(currentOperationCounter)) {
      if (accumulatedCounter === "" || /[+\-\/x\.]/.test(accumulatedCounter)) {
        accumulatedCounter += "0.";
        accumulator.innerHTML = accumulatedCounter;
        currentOperationCounter += "0.";
        currentOperation.innerHTML = currentOperationCounter;
      } else {
        accumulatedCounter += ".";
        accumulator.innerHTML = accumulatedCounter;
        currentOperationCounter += ".";
        currentOperation.innerHTML = currentOperationCounter;
      }
    }
  }
}, false);

equals.addEventListener("click", function () {
  if (currentOperationCounter !== ""){
    var evalResult = eval(currentOperationCounter);
    currentOperationCounter += "=" + evalResult;
    if (currentOperationCounter.length > 24 || evalResult.length > 14) {
      accumulator.innerHTML = "exceeded limit";
      currentOperation.innerHTML = 0;
      accumulatedCounter = "";
      currentOperationCounter = "";
    } else {
      accumulator.innerHTML = evalResult;
      currentOperation.innerHTML = currentOperationCounter;
      accumulatedCounter = "";
      currentOperationCounter = "";
    }
  }
}, false);
