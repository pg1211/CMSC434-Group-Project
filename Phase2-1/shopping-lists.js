// a lot of the work accomplished here is taken pretty directly from
// the work that Will put into the inventory page; one of the big
// reasons for this (aside from Will being amazing) is for functional
// and stylistic continuity across pages. shopping list and inventory
// are incredibly similar pages; really the main difference is that items
// can be moved from the shopping li to inventory. hence, yeah.

// localStorage.clear()

// inventory section of localStorage
inventory = JSON.parse(localStorage.getItem('inventory'));
// shopping section of localStorage
shopping = JSON.parse(localStorage.getItem("shopping"))

if (shopping == null) {
  shopping = {
    "categories": ["Produce", "Meat", "Dairy", "Grains"],
    "items": [
            {
                "name": "Apple",
                "quantity": 6,
                "unit": "none",
                "category": "Produce"
            },
            {
                "name": "Chicken",
                "quantity": 12,
                "unit": "oz",
                "category": "Meat"
            },
            {
                "name": "Yogurt",
                "quantity": 20,
                "unit": "oz",
                "category": "Dairy"
            },
            {
                "name": "Bread",
                "quantity": 3,
                "unit": "none",
                "category": "Grains"
            },
            {
                "name": "Pear",
                "quantity": 3,
                "unit": "none",
                "category": "Produce"
            },
            {
                "name": "Cabbage",
                "quantity": 32,
                "unit": "oz",
                "category": "Produce"
            },
            {
                "name": "Soup",
                "quantity": 16,
                "unit": "oz",
                "category": "Meat"
            },
            {
                "name": "Donut",
                "quantity": 12,
                "unit": "none",
                "category": "Grains"
            },
            {
                "name": "Spinach",
                "quantity": 32,
                "unit": "none",
                "category": "Produce"
            },
            {
                "name": "Asparagus",
                "quantity": 8,
                "unit": "none",
                "category": "Produce"
            },
            {
                "name": "Nuggets",
                "quantity": 32,
                "unit": "oz",
                "category": "Meat"
            },
            {
                "name": "Mashed potatoes",
                "quantity": 17,
                "unit": "oz",
                "category": "Produce"
            },
            {
                "name": "Oreos",
                "quantity": 14,
                "unit": "none",
                "category": "Grains"
            },
            {
                "name": "Steak",
                "quantity": 16,
                "unit": "oz",
                "category": "Meat"
            },
            {
                "name": "Meatloaf",
                "quantity": 26,
                "unit": "oz",
                "category": "Meat"
            },
            {
                "name": "Banana",
                "quantity": 12,
                "unit": "none",
                "category": "Produce"
            }
        ]
  }
}

localStorage.setItem('shopping', JSON.stringify(shopping));


// Load categories into the dropdown for the filter section and the edit/add popups
categoryDropdown = document.getElementById('categoryDropdown');
itemCategory = document.getElementById('itemCategory');
categories = shopping.categories;
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

    items = shopping.items;
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
        shopping.items[index].quantity += 1;
    } else if (e.target.classList.contains('minus-button')) {
        if (shopping.items[index].quantity > 1) {
            shopping.items[index].quantity -= 1;
        } else {
            // If '-' is ever used when quantity = 1, then item gets removed! :3
            shopping.items.splice(index, 1);
        }
    } else if (e.target.classList.contains('delete-button')) {
        shopping.items.splice(index, 1);
    }

    // Update localStorage and re-render items
    localStorage.setItem('shopping', JSON.stringify(shopping));
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
        shopping.items[editIndex] = newItem;
    } else {
        // Add new item
        shopping.items.push(newItem);
    }

    // Save updated inventory to localStorage and re-render
    localStorage.setItem('shopping', JSON.stringify(shopping));
    renderItems(categoryDropdown.value);
    popup.style.display = 'none';
});

// Delete item
deleteItemButton.addEventListener('click', () => {
    if (editIndex !== null) {
        // For splicing, https://www.w3schools.com/jsref/jsref_splice.asp was referenced
        shopping.items.splice(editIndex, 1);
        localStorage.setItem('shopping', JSON.stringify(shopping));
        renderItems(categoryDropdown.value);
        popup.style.display = 'none';
    }
});
