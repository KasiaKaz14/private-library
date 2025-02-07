document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.querySelector(".add");
    const form = document.querySelector(".form");
    const fileInput = document.querySelector(".file");
    const img = document.querySelector(".form__img");
 
  
    if (!addButton || !form || !fileInput || !img) {
      console.error("Błąd: Jeden z elementów nie został znaleziony!");
      return;
    }
  
    let coverImageData = "";
  
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
   
  
      if (file) {
        const reader = new FileReader();
  
        reader.onload = function (e) {
          coverImageData = e.target.result;
          img.src = coverImageData;
          img.style.display = "block";
          file.style.display = "none";
        };
  
        reader.readAsDataURL(file);
      }
    });
  
    addButton.addEventListener("click", (e) => {
      e.preventDefault();
  
      const title = document.querySelector(".title").value;
      const name = document.querySelector(".name").value;
      const surname = document.querySelector(".surname").value;
      const species = document.querySelector(".species").value;
      const startDate = document.querySelector(".start-date").value;
      const endDate = document.querySelector(".end-date").value;
      const description = document.querySelector(".description").value;
  
      if (!title || !name || !surname || !species || !startDate) {
        alert("Fill in all fields!");
        return;
      }
  
      if (!coverImageData) {
        alert("Please upload a cover image!");
        return;
      }
  
      const book = {
        title,
        name,
        surname,
        species,
        startDate,
        endDate,
        description,
        coverImage: coverImageData,
      };
  
      let books = JSON.parse(localStorage.getItem("books")) || [];
      books.push(book);
      localStorage.setItem("books", JSON.stringify(books));
      
  
      localStorage.setItem("books", JSON.stringify(books));
  
      alert("Book added successfully!");
  
      form.reset();
      img.src = "";
      img.style.display = "none";
      fileInput.value = "";
      coverImageData = "";
    });
  });
  