import './styles/index.css';
import favicon from '../images/close-icon2.svg';

const images = [
    { name: 'favicon', image: favicon },
]
const numbers = [2, 3, 5];
const doubledNumbers = numbers.map(number => number * 2);
console.log(doubledNumbers);
