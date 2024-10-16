const inventory = JSON.parse(localStorage.getItem('inventory')) || {
    "categories": ["Produce", "Meat", "Dairy"],
    "items": []
};

// Save inventory to localStorage if not already saved
localStorage.setItem('inventory', JSON.stringify(inventory));

// Load categories into the dropdown
const categoryDropdown = document.getElementById('categoryDropdown');
const itemCategory = document.getElementById('itemCategory');
inventory.categories.forEach(category => {
    let option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryDropdown.appendChild(option);

    // Load categories in the popup form as well
    let categoryOption = option.cloneNode(true);
    itemCategory.appendChild(categoryOption);
});

// Render items based on selected category
const renderItems = (category) => {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = ''; // Clear previous items

    const items = JSON.parse(localStorage.getItem('inventory')).items;
    const filteredItems = category === 'all' ? items : items.filter(item => item.category === category);

    filteredItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} (Quantity: ${item.quantity}) <button class="edit-button" data-index="${index}">Edit</button>`;
        itemList.appendChild(li);
    });
};

// Initial render showing all items
renderItems('all');

// Filter button functionality
document.getElementById('filterButton').addEventListener('click', () => {
    const selectedCategory = categoryDropdown.value;
    renderItems(selectedCategory);
});

// Popup for Add/Edit item
const popup = document.getElementById('popup');
const closePopup = document.querySelector('.close');
const popupTitle = document.getElementById('popupTitle');
const itemForm = document.getElementById('itemForm');
const submitItemButton = document.getElementById('submitItemButton');
const deleteItemButton = document.getElementById('deleteItemButton');
let editIndex = null; // To track if editing an existing item

// Add Item button functionality
document.getElementById('addItemButton').addEventListener('click', () => {
    popupTitle.textContent = 'Add Item';
    submitItemButton.textContent = 'Add Item'; // Button text changes to "Add Item"
    deleteItemButton.style.display = 'none'; // Hide delete button for adding
    itemForm.reset(); // Clear previous form data
    popup.style.display = 'flex';
    editIndex = null; // This indicates we're adding, not editing
});

// Close popup
closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Edit button functionality
document.getElementById('itemList').addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-button')) {
        const index = e.target.dataset.index;
        const item = inventory.items[index];
        popupTitle.textContent = 'Edit Item';
        submitItemButton.textContent = 'Edit Item'; // Button text changes to "Edit Item"
        document.getElementById('itemName').value = item.name;
        document.getElementById('itemQuantity').value = item.quantity;
        document.getElementById('itemCategory').value = item.category;
        popup.style.display = 'flex';
        deleteItemButton.style.display = 'block'; // Show delete button for editing
        editIndex = index; // Set index for editing
    }
});

// Add/Edit item form submission
itemForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newItem = {
        name: document.getElementById('itemName').value,
        quantity: parseInt(document.getElementById('itemQuantity').value),
        category: document.getElementById('itemCategory').value
    };

    if (editIndex !== null) {
        // Edit existing item
        inventory.items[editIndex] = newItem;
    } else {
        // Add new item
        inventory.items.push(newItem);
    }

    // Save updated inventory to localStorage and re-render
    localStorage.setItem('inventory', JSON.stringify(inventory));
    renderItems(categoryDropdown.value);
    popup.style.display = 'none'; // Close popup
});

// Delete item functionality
deleteItemButton.addEventListener('click', () => {
    if (editIndex !== null) {
        // Remove the item from the inventory
        inventory.items.splice(editIndex, 1);
        localStorage.setItem('inventory', JSON.stringify(inventory));
        renderItems(categoryDropdown.value);
        popup.style.display = 'none'; // Close popup
    }
});
