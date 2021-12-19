import Popup from './Popup.js'; 

export default class PopupWithForm extends Popup { 

    constructor(popup, {callback}) { //Конструктор 
        super(popup); 
        this._callbackFunction = callback; //Коллбек функция, передаваемая как аргумент 
    } 

    close() { //Перезаписанная функция с открытием popup'а, в которой форма обнуляется //FIX: Заменил open() на close() 
        super.close(); 
        this._currentForm.reset(); 
    } 

    _getInputValues() { //Получение данных из массива всех полей ввода с селектором 
        this._inputValues = []; 
        this._inputs = this._currentForm.querySelectorAll('.popup__input'); 
        this._inputs.forEach((item) => { 
            this._inputValues[item.name] = item.value; 
        });
        return this._inputValues; 
    } 

    _submitHandler(event) { //Функция, срабатывающая при отправке формы и вызывающая функцию коллбек вместе с закрытием popup'а 
        event.preventDefault(); 
        this._callbackFunction(this._getInputValues()); 
        this.close(); //FIX: Изменил вызов с super.close() на this._close() 
    }

    setEventListeners() { //Установка слушателей 
        super.setEventListeners(); 
        this._currentForm = this._popup.querySelector('.popup__form'); 
        this._currentForm.addEventListener('submit', (event) => { 
                this._submitHandler(event); 
        }); 
    }
}
