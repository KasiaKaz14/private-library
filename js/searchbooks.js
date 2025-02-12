document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".header__find");
    const searchButton = document.querySelector(".search-btn");
    const searchBookList = document.querySelector(".book-list");
    const mainContent = document.querySelector(".main");
    const addBook = document.querySelector(".add-book");

    const apiKey = "AIzaSyC06IIzotR9hsmMJ5TY9ivaDJ8kGbeJvvQ";
    let books = [];

    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
        try {
            books = JSON.parse(storedBooks);
        } catch (error) {
            console.error("Błąd parsowania danych książek z localStorage:", error);
            books = [];
        }
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
                        <img class="book-cover-img" src="${book.coverImage}" alt="${book.title}" />
                    </section>
                    <section class="book-data">
                        <h2>${book.title}</h2>
                        <p><strong>Author:</strong> ${book.author}</p>
                        <p><strong>Published Date:</strong> ${book.publishedDate || "Unknown"}</p>
                        <p><strong>Description:</strong> ${book.description || "No description"}</p>
                        <section class="btns">
                        <button class="read-btn">Add to Read</button>
                        <button class="unread-btn">Add to Unread</button>
                        <button class="add-btn">Add to book list</button>
                         <button class="favourite-btn">Add to favourite</button>
                          </section>
                    </section>
                </section>
            `;

            const addToBookListBtn = bookDiv.querySelector(".add-btn");
addToBookListBtn.addEventListener('click', () => addToBookList(book));

            const addToReadBtn = bookDiv.querySelector(".read-btn");
            addToReadBtn.addEventListener("click", () => addToReadList(book));


            const addToUnreadBtn = bookDiv.querySelector(".unread-btn");
            addToUnreadBtn.addEventListener("click", () => addToUnreadList(book));
    
         const addToFavouriteBtn = bookDiv.querySelector('.favourite-btn');
         addToFavouriteBtn.addEventListener('click', () => addToFavouriteList(book));

            searchBookList.appendChild(bookDiv);
        });

       
  
    
    };

   
    const addToReadList = (book) => {
        let readBooks = JSON.parse(localStorage.getItem("readBooks")) || [];
        
        if (!readBooks.some((readBook) => readBook.title === book.title)) {
            readBooks.push(book);
            localStorage.setItem("readBooks", JSON.stringify(readBooks));
            alert(`"${book.title}" added to your reading list!`);
        } else {
            alert(`"${book.title}" is already in your reading list.`);
        }

        
        localStorage.setItem("readBooks", JSON.stringify(readBooks));
    };

    const addToUnreadList = (book) => {
        let unreadBooks = JSON.parse(localStorage.getItem("unreadBooks")) || [];

        if(!unreadBooks.some((unreadBook) => unreadBook.title === book.title)){
            unreadBooks.push(book);
            localStorage.setItem("unreadBooks", JSON.stringify(unreadBooks));
            alert(`"${book.title}" added to your unreading list!`);
        } else {
            alert(`"${book.title}" is already in your unreading list.`);
        }

        localStorage.setItem("unreadBooks", JSON.stringify(unreadBooks));

    }

    const addToBookList = (book) => {
        let books = JSON.parse(localStorage.getItem("books")) || [];

        if(!books.some((b) => b.title === book.title)){
            books.push(book);
            localStorage.setItem("books", JSON.stringify(books));
            alert(`${book.title} added to your book list!`)
        } else {
            alert(`"${book.title}" is already in your book list.`);
        }

        localStorage.setItem("books", JSON.stringify(books));
    }

    const addToFavouriteList = (book) => {
        let favouriteBooks = JSON.parse(localStorage.getItem("favouriteBooks")) || [];

        if(!favouriteBooks.some((favourite) => favourite.title === book.title)){
            favouriteBooks.push(book);
            localStorage.setItem("favouriteBooks", JSON.stringify(favouriteBooks));
            alert(`${book.title} added to your favourite list!`)
        } else {
            alert(`"${book.title}" is already in your favourite list.`);
        }

        localStorage.setItem("favouriteBooks", JSON.stringify(favouriteBooks));
    }

    const searchBook = async () => {
        const searchQuery = searchInput.value.toLowerCase().trim();

        if (searchQuery) {
            mainContent.style.display = "none";
            addBook.style.display = "none";

          
            const filteredLocalBooks = books.filter((book) =>
                (book.title ? book.title.toLowerCase() : "").includes(searchQuery) ||
                (book.author ? book.author.toLowerCase() : "").includes(searchQuery)
            );

          
            try {
                const response = await fetch(
                    `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${apiKey}&maxResults=10`
                );
                const data = await response.json();

                const googleBooks = data.items
                    ? data.items.map((item) => ({
                          title: item.volumeInfo.title || "No title",
                          author: item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "Unknown",
                          publishedDate: item.volumeInfo.publishedDate || "Unknown",
                          description: item.volumeInfo.description || "No description",
                          coverImage: item.volumeInfo.imageLinks
                              ? item.volumeInfo.imageLinks.thumbnail
                              : "https://via.placeholder.com/150",
                      }))
                    : [];

                
                const allBooks = [...filteredLocalBooks, ...googleBooks];
                renderBooks(allBooks);
            } catch (error) {
                console.error("Błąd pobierania danych z Google Books API:", error);
            }
        } else {
            
            mainContent.style.display = "block";
            addBook.style.display = "block";
            searchBookList.innerHTML = "";
        }
    };

  
    searchButton.addEventListener("click", (e) => {
        e.preventDefault();
        searchBook();
    });

  
    searchInput.addEventListener("input", searchBook);
});
