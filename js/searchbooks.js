document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".header__find");
    const searchButton = document.querySelector(".search-btn");
    const searchBookList = document.querySelector(".book-list");
    const mainContent = document.querySelector('.main');
    const addBook = document.querySelector(".add-book");
    
  
    let books = [];
  
    const storedBooks = localStorage.getItem('books');
    
    if (storedBooks) {
      try {
        books = JSON.parse(storedBooks);
      } catch (error) {
        console.error("Błąd parsowania danych książek z localStorage:", error);
        books = []; 
      }
    } else {
      console.log("Brak książek w localStorage.");
      books = [];
    }
  
    const renderBooks = (bookstoDisplay) => {
      searchBookList.innerHTML = "";
  
      if (bookstoDisplay.length === 0) {
        const p = document.createElement("p");
        p.classList.add("search-info");
        p.innerHTML = "No books found";
        searchBookList.appendChild(p);
        return;
      }
  
      bookstoDisplay.forEach((book) => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book-item");
  
        bookDiv.innerHTML = `
  <section class="book">
    <section class="cover-img">
                <img class="book-cover-img" src="${book.coverImage}" alt="${
          book.title
        }" />
              </section>
              <section class="book-data">
  <h2>${book.title}</h2>
  <p><strong>Author:</strong> ${book.name} ${book.surname}</p>
  <p><strong>Species:</strong> ${book.species}</p>
  <p><strong>Start Date:</strong> ${book.startDate}</p>
  <p><strong>End Date:</strong> ${book.endDate || "Not finished yet"}</p>
  <p><strong>Description</strong> ${book.description || "No description"}</p>
   </section>
    </section>
  `;
  
        searchBookList.appendChild(bookDiv);
      });
    };
  
    const searchBook = (e) => {
      const searchQuery = searchInput.value.toLowerCase().trim();

      if(searchQuery){
        mainContent.style.display = "none";
        addBook.style.display = "none";
        favourite.style.display = "none";
    

    
  
      const filterBooks = books.filter((book) => {
        return (
          book.name.toLowerCase().includes(searchQuery) ||
          book.surname.toLowerCase().includes(searchQuery) ||
          book.title.toLowerCase().includes(searchQuery)
        );
      });
  
      renderBooks(filterBooks);
    } else {
        mainContent.style.display = "block";
        addBook.style.display = "block";
        searchBookList.innerHTML = "";
    }
}
  
    searchButton.addEventListener("click", (e) => {
      e.preventDefault();
      searchBook();
    });
  
    searchInput.addEventListener("input", searchBook); 
  });
  