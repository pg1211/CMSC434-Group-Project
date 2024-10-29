/***
 * Needed a lot of help for this one. :3
 * General idea is that all data is stored in localStorage with inventory being the key, and the 
 * value being stored is stringified JSON, which can then be parsed out when needed.
 * I've attached my sources for general topics referenced below.
 * Any more specific cases I've referenced are above where they are used.
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
 * Inner HTML
 * https://www.w3schools.com/jsref/prop_html_innerhtml.asp
 * 
 * Event listener
 * https://www.w3schools.com/js/js_htmldom_eventlistener.asp
 */

// I had a field day determining that removing const was the only thing I needed to make this work for all edge cases.
inventory = JSON.parse(localStorage.getItem('inventory'));

if (inventory == null) {
    inventory = {
        "categories": ["Produce", "Meat", "Dairy", "Grains"],
        "items": []
    };
}

localStorage.setItem('inventory', JSON.stringify(inventory));

// Load categories into the dropdown for the filter section and the edit/add popups
categoryDropdown = document.getElementById('categoryDropdown');
itemCategory = document.getElementById('itemCategory');
categories = inventory.categories;
categories.forEach(category => {
    let option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryDropdown.appendChild(option);

    // For cloneNode, https://www.w3schools.com/jsref/met_node_clonenode.asp was referenced
    let categoryOption = option.cloneNode(true);
    itemCategory.appendChild(categoryOption);
});

// Render items based on selected category
renderItems = (category) => {
    itemList = document.getElementById('itemList');
    itemList.innerHTML = '';

    items = inventory.items;
    // For filtering, https://www.w3schools.com/jsref/jsref_filter.asp was referenced
    if (category == 'all') {
        filteredItems = items;
    } else {
        filteredItems = items.filter(item => item.category == category)
    }

    filteredItems.forEach((item, index) => {
        li = document.createElement('li');
        // I've changed the innerHTML here for the 3 buttons instead of just the edit screen, as well as adding units.
        // Unfortunately, have to check units for format, as if "unit" = none, then no unit should be shown
        // I know what looks below seems psychotic, but &nbsp helps to ensure that spacing stays consistent
        if (item.unit == "none") {
            li.innerHTML = `
            <div class="number-section">
                <span class="item-quantity">${item.quantity}</span>
                <span class="item-unit">&nbsp&nbsp&nbsp&nbsp</span>
            </div>
            ${item.name}
            <div class="item-buttons">
                <button class="plus-button" data-index="${index}">+</button>
                <button class="minus-button" data-index="${index}">-</button>
                <button class="delete-button" data-index="${index}">
                    <img class="delete-icon" src="local-resources/trash-can-regular.png" alt="DeleteIcon" />
                </button>
            </div>`;
        } else {
            li.innerHTML = `
            <div class="number-section">
                <span class="item-quantity">${item.quantity}</span>
                <span class="item-unit">${item.unit}</span>
            </div>
            ${item.name}
            <div class="item-buttons">
                <button class="plus-button" data-index="${index}">+</button>
                <button class="minus-button" data-index="${index}">-</button>
                <button class="delete-button" data-index="${index}">
                    <img class="delete-icon" src="local-resources/trash-can-regular.png" alt="DeleteIcon" />
                </button>
            </div>`;
        }
        itemList.appendChild(li);
    });
};

// Initial render with All categories
renderItems('all');

// Re-render the page with the selected filter option
document.getElementById('filterButton').addEventListener('click', () => {
    selectedCategory = categoryDropdown.value;
    renderItems(selectedCategory);
});

// Popup for Add/Edit item
popup = document.getElementById('popup');
closePopup = document.querySelector('.close');
popupTitle = document.getElementById('popupTitle');
submitItemButton = document.getElementById('submitItemButton');
deleteItemButton = document.getElementById('deleteItemButton');
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

// Plus, Minus, and Trash button functionality
document.getElementById('itemList').addEventListener('click', (e) => {
    index = e.target.dataset.index;

    if (e.target.classList.contains('plus-button')) {
        inventory.items[index].quantity += 1;
    } else if (e.target.classList.contains('minus-button')) {
        if (inventory.items[index].quantity > 1) {
            inventory.items[index].quantity -= 1;
        } else {
            // If '-' is ever used when quantity = 1, then item gets removed! :3
            inventory.items.splice(index, 1);
        }
    } else if (e.target.classList.contains('delete-button')) {
        inventory.items.splice(index, 1);
    }

    // Update localStorage and re-render items
    localStorage.setItem('inventory', JSON.stringify(inventory));
    renderItems(categoryDropdown.value);
});

// Add/Edit item form submission
itemForm.addEventListener('submit', (e) => {
    e.preventDefault();

    newItem = {
        name: document.getElementById('itemName').value,
        quantity: parseInt(document.getElementById('itemQuantity').value),
        unit: document.getElementById('itemUnit').value,
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
        // For splicing, https://www.w3schools.com/jsref/jsref_splice.asp was referenced
        inventory.items.splice(editIndex, 1);
        localStorage.setItem('inventory', JSON.stringify(inventory));
        renderItems(categoryDropdown.value);
        popup.style.display = 'none';
    }
});
