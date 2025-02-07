document.addEventListener("DOMContentLoaded", function () {
    const readBookList = document.querySelector('.read-list');

    
    let readBooks = JSON.parse(localStorage.getItem('readBooks')) || [];

    const renderReadBooks = () => {
       
        readBookList.innerHTML = "";

       
        if (readBooks.length === 0) {
            const p = document.createElement('p');
            p.classList.add('read-info');
            p.innerHTML = 'No books added yet';
            readBookList.appendChild(p);
            return;
        }

      
        readBooks.forEach((book, index) => {
            if (!book || !book.title) return; 

            const readBook = document.createElement('div');
            readBook.classList.add('readbook-list');

            readBook.innerHTML = `
                <section class="readbook-section">
                    <section class="cover-img">
                        <img class="book-cover" src="${book.coverImage}" alt="${book.title}" />
                    </section>
                    <section class="read-data">
                        <h2>${book.title}</h2>
                        <p><strong>Author:</strong> ${book.name} ${book.surname}</p>
                        <p><strong>Species:</strong> ${book.species}</p>
                        <p><strong>Start Date:</strong> ${book.startDate}</p>
                        <p><strong>End Date:</strong> ${book.endDate}</p>
                        <p><strong>Description:</strong> ${book.description || "No description"}</p>
                        <button class="delete-btn" data-index="${index}" type="button">Delete book</button>
                    </section>
                </section>
            `;

            readBookList.appendChild(readBook);
        });

       
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                let index = e.target.getAttribute('data-index');
                readBooks.splice(index, 1);
                localStorage.setItem("readBooks", JSON.stringify(readBooks));
                renderReadBooks();  
            });
        });
    };

   
    renderReadBooks(); 
});
