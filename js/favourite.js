document.addEventListener("DOMContentLoaded", function () {
  const favouriteBookList = document.querySelector(".favourite-list");

  let favouriteBooks = JSON.parse(localStorage.getItem("favouriteBooks")) || [];
  let readBooks = JSON.parse(localStorage.getItem("readBooks")) || [];
  let unreadBooks = JSON.parse(localStorage.getItem("unreadBooks")) || [];

  const renderFavouriteBooks = () => {
    favouriteBookList.innerHTML = "";

    if (favouriteBooks.length === 0) {
      const p = document.createElement("p");
      p.classList.add('favourite-info');
      p.innerHTML = "No books added yet";
      favouriteBookList.appendChild(p);
      return;
    }

    favouriteBooks.forEach((book, index) => {

        let isRead = readBooks.some((readBook) => readBook.title === book.title);
        let isReadButton = isRead ? "Added to read" : "Add to read";

        let isUnread = unreadBooks.some((unreadBook) => unreadBook.title === book.title);
        let isUnreadButton = isUnread ? "Added to unread" : "Add to unread";


        const favouriteBook = document.createElement('div');
        favouriteBook.classList.add('favouritebook-list');

        favouriteBook.innerHTML = `
        <section class="favouritebook-section">
        <section class="cover-img">
        <img class="book-cover" src="${book.coverImage}" alt="${book.title}" />
        </section>
        <section class="favourite-data">
        <h2>${book.title}</h2>
        <p><strong>Author:</strong> ${book.name} ${book.surname}</p>
        <p><strong>Species:</strong> ${book.species}</p>
        <p><strong>Start Date:</strong> ${book.startDate}</p>
        <p><strong>End Date:</strong> ${book.endDate ? book.endDate : "No finished yet"}</p>
        <p><strong>Description:</strong> ${book.description ? book.description : "No description"}</p>
        <section class="button">
        <button type="button" data-index="${index}" class="delete-btn">Delete book</button>
        <button type="button" data-index="${index}" class="read-btn">${isReadButton}</button>
        <button type="button" data-index="${index}" class="unread-btn">${isUnreadButton}</button>
         </section>
        </section>
        </section>
        `;

        favouriteBookList.appendChild(favouriteBook);
    })

    document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            let index = parseInt(e.target.getAttribute('data-index'), 10);

            favouriteBooks.splice(index, 1);
            localStorage.setItem("favouriteBooks", JSON.stringify(favouriteBooks));
            renderFavouriteBooks();
        })
    })

    document.querySelectorAll('.read-btn').forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            let index = parseInt(e.target.getAttribute('data-index'), 10);
            let book = favouriteBooks[index];


            if(!readBooks.some((readBook) => readBook.title === book.title)){
                readBooks.push(favouriteBooks[index]);
                unreadBooks = unreadBooks.filter((unreadBook) => unreadBook.title !== book.title);
                localStorage.setItem("readBooks", JSON.stringify(readBooks));
                localStorage.setItem("unreadBooks", JSON.stringify(unreadBooks));
                localStorage.setItem("favouriteBooks", JSON.stringify(favouriteBooks));
                renderFavouriteBooks();

                if(typeof renderReadBooks === "function" && typeof renderUnreadBooks === "function"){
                    renderReadBooks();
                    renderUnreadBooks();
                } 
            }
        })
    })

    document.querySelectorAll('.unread-btn').forEach((button) => {
        button.addEventListener('click', (e) => {
            let index = e.target.getAttribute("data-index");
            let book = favouriteBooks[index];

            if(!unreadBooks.some((unreadBook) => unreadBook.title === book.title)){
                unreadBooks.push(favouriteBooks[index]);
                readBooks = readBooks.filter((readBook) => readBook.title !== book.title);
                localStorage.setItem("favouriteBooks", JSON.stringify(favouriteBooks));
                localStorage.setItem("unreadBooks", JSON.stringify(unreadBooks));
                localStorage.setItem("readBooks", JSON.stringify(readBooks));
                renderFavouriteBooks();

                if(typeof renderReadBooks === "function" && renderUnreadBooks === "function"){
                    renderReadBooks();
                    renderUnreadBooks();
                }
            }
        })
    })

  };
  renderFavouriteBooks();
});
