/***
 * Needed a lot of help for this one. :3
 * General idea is that all data is stored in localStorage with inventory being the key, and the 
 * value being stored is stringified JSON. I've attached all of my sources for topics referenced below.
 * 
 * localStorage
 * https://www.w3schools.com/jsref/prop_win_localstorage.asp
 * 
 * Stringifying
 * https://www.w3schools.com/js/js_json_stringify.asp
 * 
 * HTML DOM Manipulation
 * https://www.w3schools.com/js/js_htmldom_methods.asp
 * 
 */

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
    itemList.innerHTML = '';

    const items = JSON.parse(localStorage.getItem('inventory')).items;
    // For filtering, https://www.w3schools.com/jsref/jsref_filter.asp was referenced
    const filteredItems = category === 'all' ? items : items.filter(item => item.category === category);

    filteredItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} (Quantity: ${item.quantity}) <button class="edit-button" data-index="${index}">Edit</button>`;
        itemList.appendChild(li);
    });
};

// Initial render showing all items
renderItems('all');

// Filter
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

// Add Item
document.getElementById('addItemButton').addEventListener('click', () => {
    popupTitle.textContent = 'Add Item';
    submitItemButton.textContent = 'Add Item';
    deleteItemButton.style.display = 'none';
    itemForm.reset();
    popup.style.display = 'flex';
    editIndex = null;
});

// Close popup
closePopup.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Edit item
document.getElementById('itemList').addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-button')) {
        const index = e.target.dataset.index;
        const item = inventory.items[index];
        popupTitle.textContent = 'Edit Item';
        submitItemButton.textContent = 'Edit Item';
        document.getElementById('itemName').value = item.name;
        document.getElementById('itemQuantity').value = item.quantity;
        document.getElementById('itemCategory').value = item.category;
        popup.style.display = 'flex';
        deleteItemButton.style.display = 'block';
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
    popup.style.display = 'none';
});

// Delete item
deleteItemButton.addEventListener('click', () => {
    if (editIndex !== null) {
        inventory.items.splice(editIndex, 1);
        localStorage.setItem('inventory', JSON.stringify(inventory));
        renderItems(categoryDropdown.value);
        popup.style.display = 'none';
    }
});
