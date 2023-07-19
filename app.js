const info = {
    calResult: document.querySelector(".result"),
    calBody: document.querySelectorAll("button"),
    buttons: document.querySelectorAll("button"),
    resNum: null,
    nextNum: null,
    operator: null,
    dot: false,
    equal: null,
};

let { calResult, calBody, buttons, resNum, nextNum, dot, operator, equal } = info;

// Listeners for all buttons

function buttonsHandler() {
    buttons.forEach(item => {
        if (item.className === "number") {
            item.addEventListener("click", (e) => {
                if (!resNum && !operator && !nextNum) {
                    resNum = e.target.textContent;
                    calResult.innerHTML = `${resNum}`;
                } else if (!operator && !nextNum) {
                    if (resNum.length < 14) {
                        resNum += e.target.textContent;
                        calResult.innerHTML = `${resNum}`;
                    }
                } else if (!nextNum && resNum && operator) {
                    nextNum = e.target.textContent;
                    calResult.innerHTML = `${nextNum}`;
                } else if (nextNum) {
                    if (nextNum.length < 14) {
                        nextNum += e.target.textContent;
                        calResult.innerHTML = `${nextNum}`;
                    }
                } else if (operator && !resNum && !nextNum) {
                    clearAll();
                }
            })
        }
        else if (item.className === "dot") {
            item.addEventListener("click", () => {
                if (!dot) {
                    if (resNum && !nextNum && !resNum.toString().includes(".")) {
                        resNum += ".";
                        clearResult(resNum);
                        dot = true;
                    } else if (resNum && nextNum) {
                        nextNum += ".";
                        clearResult(nextNum);
                        dot = true;
                    }
                }
            })
        } else if (item.textContent === "CE") {
            item.addEventListener("click", () => {
                clearAll();
            });
        } else if (item.className === "operator") {
            item.addEventListener("click", () => {
                dot = false;
                if (item.textContent === "=") {
                    equal = "=";
                    mathOperations(operator);
                }
                else {
                    operator = item.value;
                    mathOperations(operator);
                    equal = null;
                }
            });
        } else if (item.textContent === "√") {
            item.addEventListener("click", () => {
                if (resNum && !nextNum) {
                    resNum = Math.sqrt(resNum);
                    clearResult(cutResult(`= ${resNum}`));
                } else if (nextNum) {
                    nextNum = Math.sqrt(nextNum);
                    clearResult(cutResult(`${nextNum}`));
                }
            })
        }
        else if (item.textContent === "!") {
            item.addEventListener("click", () => {
                if (resNum && !nextNum) {
                    resNum = factorial(resNum);
                    clearResult(cutResult(`= ${resNum}`));
                } else if (nextNum) {
                    nextNum = factorial(nextNum);
                    clearResult(cutResult(`${nextNum}`));
                }
            })
        } else if (item.textContent === "-/+") {
            item.addEventListener("click", () => {
                if (resNum && !nextNum) {
                    resNum = negOrPosNum(resNum);
                    clearResult(cutResult(`${resNum}`));
                } else if (nextNum) {
                    nextNum = negOrPosNum(nextNum);
                    clearResult(cutResult(`${nextNum}`));
                }
            })
        }
    })
};
function mathOperations(oper) {
    if (resNum && nextNum) {
        switch (operator) {
            case "+":
                resNum = +resNum;
                nextNum = +nextNum;
                resNum += nextNum;
                nextNum = null;
                operator = oper;
                clearResult(cutResult(`= ${resNum}`));
                break;
            case "-":
                resNum -= nextNum;
                nextNum = null;
                operator = oper;
                clearResult(cutResult(`= ${resNum}`));
                break;
            case "/":
                resNum /= nextNum;
                nextNum = null;
                operator = oper;
                clearResult(cutResult(`= ${resNum}`));
                break;
            case "*":
                resNum *= nextNum;
                nextNum = null;
                operator = oper;
                clearResult(cutResult(`= ${resNum}`));
                break;
            default:
                break;
        }
    }
};
function clearAll() {
    resNum = null;
    nextNum = null;
    operator = null;
    dot = false;
    calResult.innerHTML = "0";
};
function clearResult(result) {
    calResult.innerHTML = "";
    calResult.innerHTML = `${result}`;
};
function checkLength(num) {
    if (num.length < 14) {
        return true;
    }
    return false;
};
function cutResult(num) {
    num = num.slice(0, 14);
    return num;
};
function factorial(n) {
    if (n < 169) {
        n = Math.trunc(n);
        if (n === 0) {
            return 1;
        }
        return n * factorial(n - 1);
    } else {
        return 'Big Integer';
    }
};
// function percentOfNum(n) {
//     return n / 100;
// };
function negOrPosNum(n) {
    n *= -1;
    return n.toString();
};
function main() {
    buttonsHandler();
};
main();