const enter = document.getElementById('enter');
const guessnum = document.getElementById('guessnum');
const inputA = document.getElementById('A');
const inputB = document.getElementById('B');
var ans = [0, 0];
var results = [];
const isValid = (array) => {
    // Convert array to Set to remove duplicates and compare lengths
    return array.length === new Set(array).size && array.length === 5;
}
function generatePermutations(remainingDigits, currentNumber) {
    if (currentNumber.length === 5) {
        results.push(currentNumber)
    } else {
        remainingDigits.forEach(digit => {
            const updatedDigits = [...remainingDigits];
            const updatedNumber = [...currentNumber];
            updatedDigits.splice(updatedDigits.indexOf(digit), 1);
            updatedNumber.push(digit);
            generatePermutations(updatedDigits, updatedNumber);
        });
    }
}
function compareNumbers(answer, guess) {
    let A = 0;
    let B = 0;

    // Convert numbers to arrays if they aren't already
    const answerArray = Array.isArray(answer) ? answer : [...answer.toString()];
    const guessArray = Array.isArray(guess) ? guess : [...guess.toString()];

    // Check for exact matches (A)
    for (let i = 0; i < 5; i++) {
        if (guessArray[i] === answerArray[i]) {
            A++;
        }
    }

    // Check for number matches in wrong positions (B)
    for (let i = 0; i < 5; i++) {
        if (answerArray.includes(guessArray[i]) && guessArray[i] !== answerArray[i]) {
            B++;
        }
    }

    return { A, B };
}

function analyzeFrequencies() {
    // 建立5個位置的計數器
    const positionCounts = Array(5).fill().map(() => Array(10).fill(0));

    // 計算每個位置的數字出現次數
    results.forEach(combination => {
        for (let i = 0; i < 5; i++) {
            positionCounts[i][parseInt(combination[i])]++;
        }
    });

    // 更新表格
    const tbody = document.querySelector('#frequencyTable tbody');
    tbody.innerHTML = ''; // 清空表格内容

    // 為每個位置創建一行
    for (let position = 0; position < 5; position++) {
        const row = document.createElement('tr');

        // 添加位置標籤
        const positionCell = document.createElement('td');
        positionCell.textContent = `第${position + 1}位`;
        row.appendChild(positionCell);

        // 添加每個數字的出現機率
        for (let digit = 0; digit < 10; digit++) {
            const cell = document.createElement('td');
            const frequency = (positionCounts[position][digit] / results.length * 100).toFixed(1);
            cell.textContent = `${frequency}%`;

            // 如果機率大於0，添加高亮
            if (frequency > 0) {
                cell.classList.add('highlight');
            }

            row.appendChild(cell);
        }

        tbody.appendChild(row);
    }

    // 更新剩餘組合數
    document.getElementById('remainingCount').textContent = results.length;
}

function updateHistory(guess, result) {
    const tbody = document.querySelector('#historyTable tbody');
    const row = document.createElement('tr');

    const guessCell = document.createElement('td');
    guessCell.textContent = guess.join('');
    row.appendChild(guessCell);

    const resultCell = document.createElement('td');
    resultCell.textContent = `${result[0]}A${result[1]}B`;
    row.appendChild(resultCell);

    tbody.insertBefore(row, tbody.firstChild);
}

// 添加新的變量
const answerInput = document.getElementById('answer');
const checkNumInput = document.getElementById('checkNum');
const setAnswerBtn = document.getElementById('setAnswer');
const checkAnswerBtn = document.getElementById('checkAnswer');
const checkResult = document.getElementById('checkResult');

let secretAnswer = null;

// 添加出題功能
setAnswerBtn.addEventListener('click', () => {
    const answer = [...answerInput.value].map(num => parseInt(num, 10));
    if (!isValid(answer)) {
        checkResult.textContent = '請輸入5個不重複的數字！';
        checkResult.className = 'result error';
        return;
    }
    secretAnswer = answer;
    answerInput.value = '';
    checkResult.textContent = '答案已設定！';
    checkResult.className = 'result success';
});

// 添加檢查功能
checkAnswerBtn.addEventListener('click', () => {
    if (!secretAnswer) {
        checkResult.textContent = '請先設定答案！';
        checkResult.className = 'result error';
        return;
    }

    const guess = [...checkNumInput.value].map(num => parseInt(num, 10));
    if (!isValid(guess)) {
        checkResult.textContent = '請輸入5個不重複的數字！';
        checkResult.className = 'result error';
        return;
    }

    const result = compareNumbers(secretAnswer, guess);
    checkResult.textContent = `結果：${result.A}A${result.B}B`;
    checkResult.className = 'result success';
    checkNumInput.value = '';

    if (result.A === 5) {
        checkResult.textContent = '恭喜答對了！🎉';
    }
});

window.onload = async () => {
    generatePermutations([...Array(10).keys()], []);
    analyzeFrequencies(); // 初始化表格

    enter.addEventListener('click', () => {
        ans = { A: parseInt(inputA.value), B: parseInt(inputB.value) };
        const guess = [...guessnum.value].map(num => parseInt(num, 10));
        if (!isValid(guess)) return;
        updateHistory(guess, [ans.A, ans.B]);

        results = results.filter(elm => {
            const comparison = compareNumbers(guess, elm);
            return comparison.A === ans.A && comparison.B === ans.B;
        });
        analyzeFrequencies();
    })
}