export default class Popup { 

    constructor(popupSelector) { //Конструктор 
        this._popup = document.querySelector(`.${popupSelector}`); 
        this._popupCloseButton = this._popup.querySelector(`.popup__close`); 
    }

    open() { //Функция открытия popup'а
        this._popup.classList.add('popup_opened'); 
        document.addEventListener('keydown', () => { //FIX: Заменил дублирующиеся методы на одну строчку кода 
            this._handleEscClose(); 
        }); 
    } 

    close() { //Функция закрытия popup'а 
        this._popup.classList.remove('popup_opened'); 
        document.removeEventListener('keydown', () => { //FIX: Заменил дублирующиеся методы на одну строчку кода 
            this._handleEscClose(); 
        }); 
    } 

    _handleOverlayClose() { //Функция закрытия popup'а при нажатии на Overlay 
        if (event.target !== event.currentTarget) { 
            return 
        } else { 
            this.close(); 
        } 
    } 

    _handleEscClose() { //Функция закрытия popup'а при нажатии на ESC 
        if (event.key === 'Escape') { 
            this.close(); 
        } 
    } 

    setEventListeners() { //Установка всех слушателей на popup и его элементы
        this._popup.classList.remove('popup_opened'); 
        this._popupCloseButton.addEventListener('click', () => { 
            this.close(); 
        }) 
        this._popup.addEventListener('mousedown', () => { 
            this._handleOverlayClose(); 
        }) 
    } 
} 