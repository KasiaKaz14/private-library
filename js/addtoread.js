document.addEventListener("DOMContentLoaded", function () {
    const readBookList = document.querySelector('.read-list');

    
    let readBooks = JSON.parse(localStorage.getItem('readBooks')) || [];
    let unreadBooks = JSON.parse(localStorage.getItem('unreadBooks')) || [];

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
                        <section class="button">
                        <button class="delete-btn" data-index="${index}" type="button">Delete book</button>
                        <button class="unread-btn" data-index="${index}" type="button">Add to unread</button>
                        </section>
                    </section>
                </section>
            `;

            readBookList.appendChild(readBook);
        });

       
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                let index = parseInt(e.target.getAttribute('data-index'), 10);
                readBooks.splice(index, 1);
                localStorage.setItem("readBooks", JSON.stringify(readBooks));
                renderReadBooks();  
            });
        });

        document.querySelectorAll('.unread-btn').forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                let index = parseInt(e.target.getAttribute('data-index'), 10);
                if(!unreadBooks.some((unreadBook) => unreadBook.title === readBooks[index].title)) {
                    unreadBooks.push(readBooks[index]);
                    readBooks.splice(index, 1);
                    localStorage.setItem('readBooks', JSON.stringify(readBooks));
                    localStorage.setItem('unreadBooks', JSON.stringify(unreadBooks));
                    renderReadBooks();
                    if(typeof renderUnreadBooks === "function") {
                        renderUnreadBooks ();
                    }
                }
            })
        })

    };

   
    renderReadBooks(); 
});
