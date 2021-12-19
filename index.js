import popupWithForm from './components/popupWithForm.js';

const createPopupButton = document.querySelector('.button__create');
const deletePopupButton = document.querySelector('.button__delete');
const addPopupButton = document.querySelector('.button__add');
const removePopupButton = document.querySelector('.button__remove');
const infoPopupButton = document.querySelector('.button__info');
const searchPopupButton = document.querySelector('.button__search');
const givePopupButton = document.querySelector('.button__give');
const returnPopupButton = document.querySelector('.button__return');
const listPopupButton = document.querySelector('.button__list');

let arrayOfBooks = [];
let arrayOfBooksInCathalog = [
    {
        title: '1984',
        authors: 'Джордж Оруэлл',
        year: '1999',
        publisher: 'Эксмо',
        quantity: '249',
        id: '1',
        instance: '20',
        picked: []
    },
    {
        title: '451 Градус по Фаренгейту',
        authors: 'Рэй Брэдбери',
        year: '2014',
        publisher: 'Звезда',
        quantity: '223',
        id: '2',
        instance: '43',
        picked: []
    }
]

class Book {
    constructor(title, authors, year, publisher, quantity) {
        this.title = title;
        this.authors = authors;
        this.year = year;
        this.publisher = publisher;
        this.quantity = quantity;
    }
}

class CathalogBook extends Book {
    constructor(title, authors, year, publisher, quantity, id, instance, picked) {
        super(title, authors, year, publisher, quantity);
        this.id = id;
        this.instance = instance;
        this.picked = picked;
    }
}

class Section {
    constructor({items, renderer}, containerSelector) { //Контсруктор 
        this._renderedItems = items; 
        this._renderer = renderer; //Коллбек функция 
        this._container = document.querySelector(`.${containerSelector}`); 
    }

    renderItems() { //Функция вызывающая для каждой карточки другую функцию, создающую саму карточку 
        this._renderedItems.forEach(item => this._renderer(item)) 
    }

    addItem(element) { //Добавление элемента в DOM 
        this._container.prepend(element); 
    }

    removeItem(element) {
        this._container.removeChild(element);
    }
}

class Paragraph {
    constructor(data) { //Конструктор класса с вводимыми данными 
        this.data = data;
    };

    getTemplate() {
        const paragraphItem = document.querySelector('#paragraph').content.cloneNode(true);
        return paragraphItem;
    }

    generateParagraph() {
        this.element = this.getTemplate();
        this.paragraph = this.element.querySelector('.flex__paragraph');
        this.paragraph.textContent = `
        ${this.data.id}. ${this.data.title} | ${this.data.authors} | ${this.data.year} | ${this.data.publisher} |
        ${this.data.quantity} | ${this.data.instance} | ${this.data.picked}
        `;
        return this.paragraph;
    }
}

const initialCathalogBooks = new Section({
    items: arrayOfBooksInCathalog,
    renderer: (item) => {
            const createdParagraph = new Paragraph(item);
            let paragraph = createdParagraph.generateParagraph();
            initialCathalogBooks.addItem(paragraph);
        }
    },
    'flex__output'
);

initialCathalogBooks.renderItems();

const popupCreate = new popupWithForm('popup_create-book', {
    callback: ({title, authors, year, publisher, quantity}) => {
        let currentBook = new Book(title, authors, year, publisher, quantity);
        arrayOfBooks.push(currentBook);
        console.log(`Была создана книга с названием: ${currentBook.title} и автором: ${currentBook.authors}`);
        console.log(`Массив ещё не добавленных книг в каталог был изменен, теперь он выглядит так`);
        console.log(arrayOfBooks);
    }
});

const popupDelete = new popupWithForm('popup_delete-book', {
    callback: ({id}) => {
        console.log(`Была удалена книга с названием: ${arrayOfBooks[id].title} и автором: ${arrayOfBooks[id].authors}`);
        arrayOfBooks.splice(id, 1);
        console.log(`Массив ещё не добавленных книг в каталог был изменен, теперь он выглядит так`);
        console.log(arrayOfBooks);
    }
});

const popupAdd = new popupWithForm('popup_add-book', {
    callback: ({id}) => {
        let currentBook = arrayOfBooks[id];
        let cathalogStyleBook = new CathalogBook(
            currentBook.title, currentBook.authors, currentBook.year, currentBook.publisher, currentBook.quantity, initialCathalogBooks._renderedItems.length + 1, 5, []
        )
        console.log(`Была добавлена книга с названием: ${currentBook.title} и автором: ${currentBook.authors}`);
        arrayOfBooksInCathalog.push(cathalogStyleBook);
        console.log(`Массив каталога доступных книг был изменен, теперь он выглядит так`);
        console.log(arrayOfBooksInCathalog);
    }
});

const popupRemove = new popupWithForm('popup_remove-book', {
    callback: ({id}) => {
        let currentBook = initialCathalogBooks._renderedItems[id];
        console.log(`Была удалена книга с названием: ${currentBook.title} и автором: ${currentBook.authors}`);
        arrayOfBooksInCathalog.splice(id, 1);
        console.log(`Массив каталога доступных книг был изменен, теперь он выглядит так`);
        console.log(arrayOfBooksInCathalog);
    }
});

const popupInfo = new popupWithForm('popup_info-book', {
    callback: ({id}) => {
        console.log(`Была выведена информация о книге с id: ${id}`);
        console.log(arrayOfBooksInCathalog[id - 1]);
    }
});

const popupSearch = new popupWithForm('popup_search-book', {
    callback: ({title}) => {
        for (let i = 0; i < arrayOfBooksInCathalog.length; i++) {
            if (arrayOfBooksInCathalog[i].title == title) {
                console.log(`По запросу была найдена следующая книга: Название - ${arrayOfBooksInCathalog[i].title} Автор - ${arrayOfBooksInCathalog[i].authors}`);
                console.log(arrayOfBooksInCathalog[i]);
            }
        }
    }
});

const popupGive = new popupWithForm('popup_give-book', {
    callback: ({id, name}) => {
        arrayOfBooksInCathalog[id].picked.push(name);
        console.log(`Книга с названием: ${arrayOfBooksInCathalog[id].title} была выдана читателю с именем: ${name}`);
        console.log(`Обновленный список читателей теперь выглядит следующим образом:`);
        arrayOfBooksInCathalog[id].instance = arrayOfBooksInCathalog[id].instance - 1;
        console.log(arrayOfBooksInCathalog[id].picked);
        console.log(arrayOfBooksInCathalog[id]);
    }
});

const popupReturn = new popupWithForm('popup_get-book', {
    callback: ({id, name}) => {
        arrayOfBooksInCathalog[id].picked.splice(name, 1);
        console.log(`Книга с названием: ${arrayOfBooksInCathalog[id].title} была возвращена читателем с именем: ${name}`);
        console.log(`Обновленный список читателей теперь выглядит следующим образом:`);
        arrayOfBooksInCathalog[id].instance = arrayOfBooksInCathalog[id].instance + 1;
        console.log(arrayOfBooksInCathalog[id].picked);
        console.log(arrayOfBooksInCathalog[id]);
    }
});

const popupList = new popupWithForm('popup_list-book', {
    callback: ({id}) => {
        console.log(`Список читателей по книге с названием: ${arrayOfBooksInCathalog[id].title} и номер в списке: ${id} выглядит следующим образом:`);
        console.log(arrayOfBooksInCathalog[id].picked);
    }
});

createPopupButton.addEventListener('click', () => {
    popupCreate.open();
});

addPopupButton.addEventListener('click', () => {
    popupAdd.open();
});

deletePopupButton.addEventListener('click', () => {
    popupDelete.open();
});

removePopupButton.addEventListener('click', () => {
    popupRemove.open();
});

infoPopupButton.addEventListener('click', () => {
    popupInfo.open();
});

searchPopupButton.addEventListener('click', () => {
    popupSearch.open();
});

givePopupButton.addEventListener('click', () => {
    popupGive.open();
});

returnPopupButton.addEventListener('click', () => {
    popupReturn.open();
});

listPopupButton.addEventListener('click', () => {
    popupList.open();
});

popupCreate.setEventListeners();
popupAdd.setEventListeners();
popupDelete.setEventListeners();
popupRemove.setEventListeners();
popupInfo.setEventListeners();
popupSearch.setEventListeners();
popupGive.setEventListeners();
popupReturn.setEventListeners();
popupList.setEventListeners();
