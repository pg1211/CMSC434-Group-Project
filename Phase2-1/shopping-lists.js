document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("shopping-form");
    const input = document.getElementById("item-input");
    const list = document.getElementById("shopping-list");
  
    // Handle form submission
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const newItem = input.value.trim();
  
      if (newItem) {
        // Add item to the list
        const listItem = document.createElement("li");
        listItem.textContent = newItem;
        list.appendChild(listItem);
  
        // Clear the input
        input.value = "";
      }
    });
  });
  