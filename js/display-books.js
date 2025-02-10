document.addEventListener("DOMContentLoaded", function () {
    const bookList = document.querySelector(".book-list");
  
    
    let books = JSON.parse(localStorage.getItem("books")) || [];
    let readBooks = JSON.parse(localStorage.getItem("readBooks")) || [];
    let unreadBooks = JSON.parse(localStorage.getItem("unreadBooks")) || [];
  
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

        let isUnread = unreadBooks.some((unreadBook) => unreadBook.title === book.title);
        let isUnreadButton = isUnread ? "Added to unread" : "Add to unread";

        let isFinished = readBooks.some((readBook) => readBook.endDate === book.endDate);
        let isFinishedInfo = isFinished ? book.endDate : "Not finished yet";
  
        const bookItem = document.createElement("div");
        bookItem.classList.add("book-item");
  
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
                      <p><strong>End Date:</strong> ${isFinishedInfo}</p>
                      <p><strong>Description:</strong> ${book.description || "No description"}</p>
                      <section class="button">
                          <button type="button" class="delete-btn" data-index="${index}">Delete book</button>
                          <button type="button" class="read-btn" data-index="${index}">${isReadButton}</button>
                          <button type="button" class="unread-btn" data-index="${index}">${isUnreadButton}</button>
                      </section>
                  </section>
              </section>
              `;
        bookList.appendChild(bookItem);
      });
  
      document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
          let index = e.target.getAttribute("data-index");
          books.splice(index, 1);
          localStorage.setItem("books", JSON.stringify(books));
          renderBooks();
        });
      });
  
      document.querySelectorAll(".read-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
          let index = e.target.getAttribute("data-index");
          if (!readBooks.some((readBook) => readBook.title === books[index].title)) {
            books[index].endDate = new Date().toISOString().split("T")[0];
            readBooks.push(books[index]);
            localStorage.setItem("readBooks", JSON.stringify(readBooks));
            localStorage.setItem("books", JSON.stringify(books)); // Zapisz zmiany w książkach
            renderBooks();
          }
        });
      });
  
      document.querySelectorAll(".unread-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
          let index = e.target.getAttribute("data-index");
          if (!unreadBooks.some((unreadBook) => unreadBook.title === books[index].title)) {
            unreadBooks.push(books[index]);
            localStorage.setItem("unreadBooks", JSON.stringify(unreadBooks));
            renderBooks();
          }
        });
      });
    };
  
    renderBooks();
  });
  