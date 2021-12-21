import './styles/index.css';
import graph from '../images/graph.png';

let graphContainer = document.querySelector('.action__logo');
let tryButton = document.querySelector('.textbox__button');
let textBoxArea = document.querySelector('.action__textbox');
let imageArea = document.querySelector('.action__logo');
let solutionContainer = document.querySelectorAll('.action__solution');
let solutionForm = document.querySelector('.solution__form');
let solutionFormCriteria = document.querySelector('.solution__subform');
let buttonBeyond = document.querySelector('.solution__button-beyond');
let boxForTemplates = document.querySelector('.solution__criterias');
let templatePhrase = document.getElementById('solution__criteria');

let initialQuestion;
let solutionVariants;
let solutionCriteria = new Map();

const matrixOfCriteria = (solutionCriteria) => {
    
}

solutionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let inputs = solutionForm.querySelectorAll('.solution__input');
    initialQuestion = inputs[0];
    solutionVariants = inputs[1].value.split(' ');
    console.log(initialQuestion);
    console.log(solutionVariants);
    solutionContainer[1].classList.remove('action__solution-hidden');
    solutionContainer[0].classList.add('action__solution-hidden');
});

solutionFormCriteria.addEventListener('submit', (event) => {
    event.preventDefault();
    let inputCriteria = solutionFormCriteria.querySelector('.solution__input').value;
    let inputImportance = solutionFormCriteria.querySelector('.solution__select').value;
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
    currentPhrase.textContent = `${inputCriteria} | Оценка ${inputImportance}`
    boxForTemplates.append(currentPhrase);
});

buttonBeyond.addEventListener('click', () => {
    console.log(solutionCriteria);
})

tryButton.addEventListener('click', () => {
    textBoxArea.remove();
    imageArea.remove();
    solutionContainer[0].classList.remove('action__solution-hidden');
});

graphContainer.src = graph;


