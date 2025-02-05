document.addEventListener("DOMContentLoaded", function () {
    const select = document.getElementById("bookFilter");
  
    select.addEventListener("change", function () {
      const selectedValue = select.value;
  
      if (selectedValue) {
        window.location.href = `./${selectedValue}.html`;
      }
    });
  });
  