import './styles/index.css';
import graph from '../images/graph.png';

let graphContainer = document.querySelector('.action__logo');
let tryButton = document.querySelector('.textbox__button');
let textBoxArea = document.querySelector('.action__textbox');
let imageArea = document.querySelector('.action__logo');
let solutionContainer = document.querySelectorAll('.action__solution');
let solutionForm = document.querySelector('.solution__form');
let solutionFormCriteria = document.querySelector('.solution__subform');
let solutionFormValues = document.querySelector('.solution__subform-two');
let buttonBeyond = document.querySelector('.solution__button-beyond');
let boxForTemplates = document.querySelector('.solution__criterias');
let templatePhrase = document.getElementById('solution__criteria');
let templateBox = document.getElementById('solution__choose-box');
let templateInput = document.getElementById('solution__choose-values');
let templateAnswer = document.getElementById('solution__answers');

let initialQuestion;
let solutionVariants;
let solutionCriteria = new Map();
let matrixCriteria;
let matrixCriteriaSum;
let matrixCriteriaChanged;
let matrixCriteriaTarget;
let matrixCriteriaTransposed;
let matrixMultiplyed;
let arrayOfOtherMatrix = [];
let generatedMatrixForEachCriteria = [];
let solutionValuesCriteria = [];

const transposingMatrix = (A) => {
    var m = A.length, n = A[0].length, AT = [];
    for (var i = 0; i < n; i++)
        { AT[ i ] = [];
            for (var j = 0; j < m; j++) AT[ i ][j] = A[j][ i ];
        }
    return AT;
}

const multiplyMatrix = (matrix, vector) => {
    let answer = [];
    matrix.forEach((item) => {
        let summary = 0;
        item.forEach((element, index) => {
            summary += element * vector[index];
        });
        answer.push(Math.floor(summary * 100) / 100);
    });
    return answer;
}

const matrixOfCriteria = (solutionCriteria, matrixSize) => {
    let currentCriterias = Array.from(solutionCriteria.values());
    console.log(solutionCriteria);
    let array = new Array();
    for (let i = 0; i < matrixSize; i++) {
        array[i] = new Array();
        for (let j = 0; j < matrixSize; j++) {
            array[i][j] = Number(currentCriterias[i]) / Number(currentCriterias[j]);
        }
    }
    return array;
}

const getSumOfColumn = (matrix) => {
    let row, col, sum = matrix[0].slice();
    for( row = 1; row < matrix.length; row++) {
        for( col = 0; col < sum.length; col++) {
            sum[col] += matrix[row][col];
        }
    }
    return sum;
}

const changeMatrixWithDivision = (matrix, sumOfColumns) => {
    let array = new Array();
    for (let i = 0; i < matrix.length; i++) {
        array[i] = new Array();
        for (let j= 0; j < matrix.length; j++) {
            array[i][j] = matrix[i][j] / sumOfColumns[j];
        };
    };
    return array;
}

const sumMatrixRows = (matrix) => {
    let answer = [];
    matrix.forEach((item) => {
        let average = item.reduce((a, b) => a + b, 0) / item.length;
        answer.push(Math.floor(average * 100) / 100);
    });
    return answer;
}

solutionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let inputs = solutionForm.querySelectorAll('.solution__input');
    initialQuestion = inputs[0].value;
    solutionVariants = inputs[1].value.split(' ');
    solutionContainer[1].classList.remove('action__solution-hidden');
    solutionContainer[0].classList.add('action__solution-hidden');
});

solutionFormCriteria.addEventListener('submit', (event) => {
    event.preventDefault();
    let inputCriteria = solutionFormCriteria.querySelector('.solution__input').value;
    let inputImportance = solutionFormCriteria.querySelector('.solution__select').value;
    let textImportance = inputImportance.toLowerCase();
    switch(String(inputImportance)) {
        case 'Несущественно':
            inputImportance = 1;
            break;
        case 'Не очень важно':
            inputImportance = 2;
            break;
        case 'Важно':
            inputImportance = 3;
            break;
    }
    solutionCriteria.set(inputCriteria, inputImportance);
    let currentTemplate = templatePhrase.content.cloneNode(true);
    let currentPhrase = currentTemplate.querySelector('.criteria__values');
    currentPhrase.textContent = `${inputCriteria} | Оценка ${textImportance}`
    boxForTemplates.append(currentPhrase);
});

solutionFormValues.addEventListener('submit', (event) => {
    event.preventDefault();
    let solutionCriterias = Array.from(solutionCriteria.keys()).length;
    let solutionCriteriasText = Array.from(solutionCriteria.keys()).reverse();
    let criterias = document.querySelectorAll('.criteria__input');
    let allTitles = solutionFormValues.querySelectorAll('.choose__title');
    let counter = 0
    allTitles.forEach((item, index) => {
        let currentData = new Map();
        let currentArray = [];
        for (let i = counter; i <= solutionCriterias * allTitles.length; i++) {
            if (currentArray.length >= solutionCriterias) {
                currentArray.forEach((item, i) => {
                    currentData.set(item, solutionCriteriasText[i]);
                });
                currentArray.push(item.textContent, currentData);
                solutionValuesCriteria.push(currentArray);
                return;
            } else {
                currentArray.push(criterias[i].value);
            }
            counter++;
        };
    });
    for (let i = 0; i < solutionValuesCriteria[0].length - 2; i++) {
        let newMap = new Map();
        for (let j = 0; j < solutionValuesCriteria.length; j++) {
            newMap.set(solutionValuesCriteria[j][solutionValuesCriteria[j].length - 2], Number(solutionValuesCriteria[j][i]));
        }
        let generatedMatrix = matrixOfCriteria(newMap, newMap.size);
        generatedMatrixForEachCriteria.push(generatedMatrix);
    };
    generatedMatrixForEachCriteria.forEach((currentMatrix) => {
        let currentSum = getSumOfColumn(currentMatrix);
        let currentChangedMatrix = changeMatrixWithDivision(currentMatrix, currentSum);
        let currentTarget = sumMatrixRows(currentChangedMatrix);
        arrayOfOtherMatrix.push(currentTarget);
    });
    matrixCriteriaTransposed = transposingMatrix(arrayOfOtherMatrix);
    matrixMultiplyed = multiplyMatrix(matrixCriteriaTransposed, matrixCriteriaTarget);
    let variants = solutionVariants;
    variants.reverse();
    let answer = [];
    matrixMultiplyed.forEach((item, index) => {
        answer[index] = [item, variants[index]];
    });
    let arrayOfKeys = [];
    answer.forEach((item) => {
        arrayOfKeys.push(item[0]);
    });
    arrayOfKeys.sort();
    solutionContainer[3].classList.remove('action__solution-hidden');
    solutionContainer[2].classList.add('action__solution-hidden');
    arrayOfKeys.forEach((item) => {
        let currentAnswer = templateAnswer.content.cloneNode(true);
        let phrase = currentAnswer.querySelector('.answers__phrase');
        let searchItem;
        answer.forEach((element) => {
            if (element[0] === item) {
                searchItem = element[1];
                return;
            }
        });
        phrase.textContent = searchItem;
        let box = document.querySelector('.solution__box-answers');
        box.prepend(phrase);
    })
})

buttonBeyond.addEventListener('click', () => {
    matrixCriteria = matrixOfCriteria(solutionCriteria, solutionCriteria.size);
    matrixCriteriaSum = getSumOfColumn(matrixCriteria);
    matrixCriteriaChanged = changeMatrixWithDivision(matrixCriteria, matrixCriteriaSum);
    matrixCriteriaTarget = sumMatrixRows(matrixCriteriaChanged);
    solutionContainer[2].classList.remove('action__solution-hidden');
    solutionContainer[1].classList.add('action__solution-hidden');
    solutionVariants.forEach((currentVariant) => {
        let criteriasArray = Array.from(solutionCriteria.keys());
        let currentTemplate = templateBox.content.cloneNode(true);
        let currentTitle = currentTemplate.querySelector('.choose__title');
        currentTitle.textContent = `${currentVariant}`;
        criteriasArray.forEach((currentCriteria) => {
            let currentInputTemplate = templateInput.content.cloneNode(true);
            let currentTitle = currentInputTemplate.querySelector('.criteria__values');
            currentTitle.textContent = `${currentCriteria}`;
            solutionFormValues.prepend(currentInputTemplate);
        });
        solutionFormValues.prepend(currentTitle);
    })
})

tryButton.addEventListener('click', () => {
    textBoxArea.remove();
    imageArea.remove();
    solutionContainer[0].classList.remove('action__solution-hidden');
});

graphContainer.src = graph;


