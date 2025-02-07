document.addEventListener("DOMContentLoaded", function () {

    const bookList = document.querySelector('.book-list');


    let books = JSON.parse(localStorage.getItem("books")) || [];
    let readBooks = JSON.parse(localStorage.getItem("readBooks")) || [];

    if (books.length === 0) {
        const p = document.createElement('p');
        p.classList.add('books-info');
        p.innerHTML = "No books added yet";
        bookList.appendChild(p); 
        return;
    }

    const renderBooks = () => {
       
        bookList.innerHTML = '';

        if (books.length === 0) {
            const p = document.createElement('p');
            p.classList.add('books-info');
            p.innerHTML = "No books added yet";
            bookList.appendChild(p); 
            return;
        }

        books.forEach((book, index) => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');
const isRead = readBooks.some((readBook) => readBook.title === book.title);

            bookItem.innerHTML = `
            <section class="book">
            <section class="cover-img">
            <img src="${book.coverImage}" alt="${book.title}" class="book-cover">
            </section>
            <section class="book-data">
            <h2>${book.title}</h2>
            <p><strong>Author:</strong> ${book.name} ${book.surname}</p>
            <p><strong>Species:</strong> ${book.species}</p>
            <p><strong>Start Date:</strong> ${book.startDate}</p>
            <p><strong>End Date:</strong> ${book.endDate ? book.endDate : "Not finished yet"}</p>
            <p><strong>Description:</strong> ${book.description ? book.description : "No description"}</p>
            <section class="button">
            <button type="button" class="delete-btn" data-index="${index}">Delete book</button>
             <button type="button" class="read-btn" data-index="${index}" ${isRead} ? disable : " ">${isRead ? "Added to read" : "Add to read"}</button>
            </section>
            </section>
            </section>
            `;
            bookList.appendChild(bookItem);
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                let index = e.target.getAttribute("data-index"); 
                books.splice(index, 1); 
                localStorage.setItem("books", JSON.stringify(books)); 
                renderBooks();
            });
        });

        document.querySelectorAll('.read-btn').forEach(button => {
            button.addEventListener('click', (e) => {

                let index = e.target.getAttribute("data-index");

                if(!readBooks.some((readBook) => readBook.title === books[index].title)){
                    books[index].endDate = new Date().toISOString().split('T')[0];
                    readBooks.push(books[index]);
                    localStorage.setItem('readBooks', JSON.stringify(readBooks));
                    renderBooks();
                }

            })
        })

    };

    renderBooks(); 

});
