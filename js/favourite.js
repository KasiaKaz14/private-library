document.addEventListener("DOMContentLoaded", function () {
    const favouriteBookList = document.querySelector(".favourite-list");
  
    let favouriteBooks = JSON.parse(localStorage.getItem("favouriteBooks")) || [];
    let readBooks = JSON.parse(localStorage.getItem("readBooks")) || [];
    let unreadBooks = JSON.parse(localStorage.getItem("unreadBooks")) || [];
    let books = JSON.parse(localStorage.getItem('books')) || [];
  
    const renderFavouriteBooks = () => {
      favouriteBookList.innerHTML = "";
  
      if (favouriteBooks.length === 0) {
        const p = document.createElement("p");
        p.classList.add("favourite-info");
        p.innerHTML = "No books added yet";
        favouriteBookList.appendChild(p);
        return;
      }
  
      favouriteBooks.forEach((book, index) => {
        if (!book || !book.title) return;
  
        let isRead = readBooks.some((readBook) => readBook?.title === book.title);
        let isReadButton = isRead ? "Added to read" : "Add to read";
  
        let isUnread = unreadBooks.some((unreadBook) => unreadBook?.title === book.title);
        let isUnreadButton = isUnread ? "Added to unread" : "Add to unread";

        let isFinishedInfo = isRead ? book.endDate : "Not finished yet";
  
        const favouriteBook = document.createElement("div");
        favouriteBook.classList.add("favouritebook-list");
  
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
              <p><strong>End Date:</strong> ${isFinishedInfo}</p>
              <p><strong>Description:</strong> ${book.description || "No description"}</p>
              <section class="button">
                <button type="button" data-index="${index}" class="delete-btn">Delete book</button>
                <button type="button" data-index="${index}" class="read-btn">${isReadButton}</button>
                <button type="button" data-index="${index}" class="unread-btn">${isUnreadButton}</button>
              </section>
            </section>
          </section>
        `;
  
        favouriteBookList.appendChild(favouriteBook);
      });
  
      document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          let index = parseInt(e.target.getAttribute("data-index"), 10);
          if (isNaN(index) || !favouriteBooks[index]) return;
  
          favouriteBooks.splice(index, 1);
          localStorage.setItem("favouriteBooks", JSON.stringify(favouriteBooks));
          localStorage.setItem('readBooks', JSON.stringify(readBooks));
          localStorage.setItem("unreadBooks", JSON.stringify(unreadBooks));

          renderFavouriteBooks();

          if(typeof renderReadBooks === "function" && renderUnreadBooks === "function"){
            renderReadBooks();
            renderUnreadBooks();
          }
        });
      });
  
      document.querySelectorAll(".read-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          let index = parseInt(e.target.getAttribute("data-index"), 10);
          let book = favouriteBooks[index];
  
          if (!book) return;
  
          if (!readBooks.some((readBook) => readBook && readBook.title === book.title)) {
            book.endDate = new Date().toDateString();
            readBooks.push(book);
            unreadBooks = unreadBooks.filter((unreadBook) => unreadBook.title !== book.title);
            localStorage.setItem("readBooks", JSON.stringify(readBooks));
            localStorage.setItem("unreadBooks", JSON.stringify(unreadBooks));
            localStorage.setItem("books", JSON.stringify(books));
            renderFavouriteBooks();
  
            if (typeof renderReadBooks === "function" && typeof renderUnreadBooks === "function" && typeof renderBooks === "function") {
              renderReadBooks();
              renderUnreadBooks();
              renderBooks();
            }
          }
        });
      });
  
      document.querySelectorAll(".unread-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
          let index = parseInt(e.target.getAttribute("data-index"), 10);
          let book = favouriteBooks[index];
  
          if (!book) return;
  
          if (!unreadBooks.some((unreadBook) => unreadBook.title === book.title)) {
            unreadBooks.push(book);
            readBooks = readBooks.filter((readBook) => readBook.title !== book.title);
            localStorage.setItem("unreadBooks", JSON.stringify(unreadBooks));
            localStorage.setItem("readBooks", JSON.stringify(readBooks));
            renderFavouriteBooks();
  
            if (typeof renderReadBooks === "function" && typeof renderUnreadBooks === "function") {
              renderReadBooks();
              renderUnreadBooks();
            }
          }
        });
      });
    };
  
    renderFavouriteBooks();
  });
  