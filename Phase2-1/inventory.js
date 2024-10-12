// Get elements from the DOM
const form = document.getElementById('inventoryForm');
const itemList = document.getElementById('items');

// Event listener for adding an item
form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the item and quantity from input fields
    const itemName = document.getElementById('item').value;
    const itemQuantity = document.getElementById('quantity').value;

    // Create a new list item
    const li = document.createElement('li');
    li.innerHTML = `
        ${itemName} (x${itemQuantity})
        <button class="delete-btn">Delete</button>
    `;

    // Append the new item to the list
    itemList.appendChild(li);

    // Clear input fields
    document.getElementById('item').value = '';
    document.getElementById('quantity').value = '';

    // Add delete functionality to the button
    li.querySelector('.delete-btn').addEventListener('click', function () {
        li.remove();
    });
});