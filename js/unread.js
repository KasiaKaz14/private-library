document.addEventListener("DOMContentLoaded", function () {
    const unreadBookList = document.querySelector(".unread-list");

    let unreadBooks = JSON.parse(localStorage.getItem("unreadBooks")) || [];
    let readBooks = JSON.parse(localStorage.getItem('readBooks')) || [];

    try{
        unreadBooks = JSON.parse(localStorage.getItem('unreadBooks')) || [];
    } catch (e){
        console.log(e);
        unreadBooks.innerHTML = "No books added yet";
        
    }

    const renderUnreadBooks = () => {
        unreadBookList.innerHTML = "";

        if (unreadBooks.length === 0) {
            const p = document.createElement("p");
            p.classList.add("unread-info");
            p.innerHTML = "No books added yet";
            unreadBookList.appendChild(p);
            return;
        }

        unreadBooks.forEach((book, index) => {
            const unreadBook = document.createElement('div');
            unreadBook.classList.add('unreadbook-list');

            unreadBook.innerHTML = `
                <section class="unreadbook-section">
                    <section class="cover-img">
                        <img class="book-cover" src="${book.coverImage}" alt="${book.title}" />
                    </section>
                    <section class="unread-data">
                        <h2>${book.title}</h2>
                        <p><strong>Author:</strong> ${book.name} ${book.surname}</p>
                        <p><strong>Species:</strong> ${book.species}</p>
                        <p><strong>Start Date:</strong> ${book.startDate ? book.startDate : "No info added"}</p>
                        <p><strong>Description:</strong> ${book.description ? book.description : "No description"}</p>
                        <section class="button">
                        <button type="button" class="delete-btn" data-index="${index}">Delete book</button>
                        <button type="button" class="read-btn" data-index="${index}">Add to read</button>
                        </section>
                    </section>
                </section>
            `;

            unreadBookList.appendChild(unreadBook);
        });

        document.querySelectorAll('.delete-btn').forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                let index = parseInt(e.target.getAttribute('data-index'), 10);
                
                unreadBooks.splice(index, 1);
                localStorage.setItem("unreadBooks", JSON.stringify(unreadBooks));
                renderUnreadBooks();
            });
        });

        document.querySelectorAll('.read-btn').forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();

                let index = parseInt(e.target.getAttribute('data-index'), 10);


                if(!readBooks.some((readBook) => readBook.title === unreadBooks[index].title)){
                    readBooks.push(unreadBooks[index]);
                    unreadBooks.splice(index, 1);
                    localStorage.setItem('unreadBooks', JSON.stringify(unreadBooks));
                    localStorage.setItem('readBooks', JSON.stringify(readBooks));
                    renderUnreadBooks();

                    if(typeof renderReadBooks === "function"){
                        renderReadBooks();
                    }
                }
            })
        })

    };

    renderUnreadBooks();
});
