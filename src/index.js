import './styles/index.css';
import graph from '../images/graph.png';

let graphContainer = document.querySelector('.action__logo');
let tryButton = document.querySelector('.textbox__button');
let textBoxArea = document.querySelector('.action__textbox');
let imageArea = document.querySelector('.action__logo');
tryButton.addEventListener('click', () => {
    console.log('hello');
    textBoxArea.remove();
    imageArea.remove();
})
graphContainer.src = graph;


