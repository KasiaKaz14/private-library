document.addEventListener("DOMContentLoaded", function () {
  const bookList = document.querySelector(".book-list");

  let books = JSON.parse(localStorage.getItem("books")) || [];
  let readBooks = JSON.parse(localStorage.getItem("readBooks")) || [];
  let unreadBooks = JSON.parse(localStorage.getItem("unreadBooks")) || [];
  let favouriteBooks = JSON.parse(localStorage.getItem("favouriteBooks")) || [];

  const renderBooks = () => {
    bookList.innerHTML = "";

    if (books.length === 0) {
      const p = document.createElement("p");
      p.classList.add("books-info");
      p.innerHTML = "No books added yet";
      bookList.appendChild(p);
      return;
    }

    books.forEach((book, index) => {
      if (!book || !book.title) return;

      let isRead = readBooks.some((readBook) => readBook.title === book.title);
      let isReadButton = isRead ? "Added to read" : "Add to read";

      let isUnread = unreadBooks.some(
        (unreadBook) => unreadBook.title === book.title
      );
      let isUnreadButton = isUnread ? "Added to unread" : "Add to unread";

      let isFinished = readBooks.some(
        (readBook) => readBook.endDate === book.endDate
      );
      let isFinishedInfo = isFinished ? book.endDate : "Not finished yet";

      let isFavourite = favouriteBooks.some(
        (favouriteBook) => favouriteBook.title === book.title
      );
      let isFavouriteButton = isFavourite
        ? "Added to favourite"
        : "Add to favourite";

      const bookItem = document.createElement("div");
      bookItem.classList.add("book-item");

      bookItem.innerHTML = `
              <section class="book">
                  <section class="cover-img">
                      <img src="${book.coverImage}" alt="${
        book.title
      }" class="book-cover">
                  </section>
                  <section class="book-data">
                      <h2>${book.title}</h2>
                      <p><strong>Author:</strong> ${book.name} ${
        book.surname
      }</p>
                      <p><strong>Species:</strong> ${book.species}</p>
                      <p><strong>Start Date:</strong> ${book.startDate}</p>
                      <p><strong>End Date:</strong> ${isFinishedInfo}</p>
                      <p><strong>Description:</strong> ${
                        book.description || "No description"
                      }</p>
                      <section class="button">
                          <button type="button" class="delete-btn" data-index="${index}">Delete book</button>
                          <button type="button" class="read-btn" data-index="${index}">${isReadButton}</button>
                          <button type="button" class="unread-btn" data-index="${index}">${isUnreadButton}</button>
                          <button type="button" class="favourite-btn" data-index="${index}">${isFavouriteButton}</button>
                      </section>
                  </section>
              </section>
              `;
      bookList.appendChild(bookItem);
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        let index = parseInt(e.target.getAttribute("data-index"), 10);
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        renderBooks();
      });
    });

    document.querySelectorAll(".read-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
          let index = parseInt(e.target.getAttribute("data-index"), 10);
          
          if (!readBooks.some((readBook) => readBook.title === books[index].title)) {
            books[index].endDate = new Date().toDateString().split("T");
            readBooks.push(books[index]);
            unreadBooks = unreadBooks.filter(
              (unreadBook) => unreadBook.title !== books[index].title
            );
      
            localStorage.setItem("readBooks", JSON.stringify(readBooks));
            localStorage.setItem("unreadBooks", JSON.stringify(unreadBooks));
            localStorage.setItem("books", JSON.stringify(books));
      
            renderBooks();
      
            if (typeof renderReadBooks === "function" && typeof renderUnreadBooks === "function") {
              renderReadBooks();
              renderUnreadBooks();
            }
          }
        });
      });

    document.querySelectorAll(".unread-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        let index = parseInt(e.target.getAttribute("data-index"), 10);
        let book = books[index];
     

        if (
          !unreadBooks.some((unreadBook) => unreadBook.title === book.title)
        ) {
          unreadBooks.push(book);
          readBooks = readBooks.filter(
            (readBook) => readBook.title !== book.title
          );
          localStorage.setItem("readBooks", JSON.stringify(readBooks));
          localStorage.setItem("unreadBooks", JSON.stringify(unreadBooks));
          localStorage.setItem("books", JSON.stringify(books));
          renderBooks();

          if (
            typeof renderReadBooks === "function" &&
            typeof renderUnreadBooks === "function"
          ) {
            renderReadBooks();
            renderUnreadBooks();
          }
        }
      });
    });

    document.querySelectorAll(".favourite-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();

        let index = parseInt(e.target.getAttribute("data-index"), 10);
        let book = { ...books[index] };

        if (
          !favouriteBooks.some(
            (favouriteBook) => favouriteBook.title === book.title
          )
        ) {
          favouriteBooks.push(book);
          localStorage.setItem(
            "favouriteBooks",
            JSON.stringify(favouriteBooks)
          );
          localStorage.setItem("books", JSON.stringify(books));
          renderBooks();
        }
      });
    });
  };

  renderBooks();
});
