`use strict`

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;          

    this.hasBeenAdded = false;
} 

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);

    myLibrary.push(book);
}

function displayLibrary() {
    let cards = document.querySelector('.content > .cards');
    for (const book of myLibrary) {
        if (!book.hasBeenAdded) {
            //create card element
            let book_card = document.createElement('card');
            book_card.classList.add('card');

            //book title
            let book_title = document.createElement('h1');
            book_title.classList.add('title');
            let title = document.createTextNode(book.title);
            book_title.appendChild(title);

            //book info
            let book_info = document.createElement('p');
            book_info.classList.add('info');
            book_info.innerHTML = `Author: ${book.author} <br /> Pages: ${book.pages}`;
            
            let changeReadStatus = document.createElement('button');
            if (book.read) {
                changeReadStatus.textContent = "Book Read";
                changeReadStatus.classList.add('read');
            } else {
                changeReadStatus.textContent = "Book Not Read";
            }

            changeReadStatus.addEventListener('click', function(e) {
                if (this.classList.contains('read')) {
                    this.textContent = "Book Not Read";
                    this.classList.remove("read");
                } else {
                    this.textContent = "Book Read";
                    this.classList.add("read");
                }
            });

            let removeButton = document.createElement('button');
            removeButton.classList.add('remove');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', function(e) {
                console.log(this);
                this.parentElement.remove();
            });

            //add read class
            if (book.read) {
                book_card.classList.add('read');
            }

            let breaking = document.createElement('br');
            
            book_card.appendChild(book_title);
            book_card.appendChild(book_info);
            book_card.appendChild(changeReadStatus);
            book_card.appendChild(breaking);
            book_card.appendChild(removeButton);

            cards.appendChild(book_card);
            book.hasBeenAdded = true;
        }
    }
}

let addButton = document.querySelector('button.add');
addButton.addEventListener('click', (e)=> {
    openForm();
    displayLibrary();
});

let resetButton = document.querySelector('button.reset');
resetButton.addEventListener('click', (e) => {
    let cards = document.querySelector('.cards');
    while(cards) {
        cards.removeChild(cards.lastChild);
    }
})

let removeButtons = document.querySelectorAll('button.remove');
removeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        console.log(this);
        this.parentElement.remove();
    })
});

function openForm() {
    document.querySelector('.form-popup').style.display = "flex";
}

function closeForm() {
    document.querySelector('.form-popup').style.display = "none";
}

let submitButton = document.querySelector('button.submit');
submitButton.addEventListener('click', function(e) {

    let titleField = document.querySelector('.details #title');
    let authorField = document.querySelector('.details #author');
    let pagesField = document.querySelector('.details #pages');
    let readField = document.querySelector('.details #read');

    if (titleField.value.length == 0) {
        alert("Add book title!");
    } else if (authorField.value.length == 0) {
        alert("Add book author!");
    } else if (pagesField.value.length == 0) {
        alert("Add number of pages!")
    } else {
        addBookToLibrary(titleField.value, authorField.value, pagesField.value, (readField.checked) ? true : false);
        displayLibrary();
        titleField.value = "";
        authorField.value = "";
        pagesField.value = "";
        readField.checked = false;
        closeForm();
    }
    e.preventDefault();
});

// let theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
// console.log(theHobbit.info());