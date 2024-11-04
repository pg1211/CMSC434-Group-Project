profile = JSON.parse(localStorage.getItem('profile'));

if (profile == null) {
    profile = {
        "firstName": "Jaques",
        "lastName": "Webster",
        "age": 20,
        "restrictions": ["Gluten Free", "Vegan"],
        "dislikes": "Pineappple",
        "cookingLevel": "Beginner",
        "bakingLevel": "Advanced",
    }
    localStorage.setItem('profile', JSON.stringify(profile));
}

inventory = JSON.parse(localStorage.getItem('inventory'));

if (inventory == null) {
    inventory = {
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
    };
    localStorage.setItem('inventory', JSON.stringify(inventory));
}


// search filter
//based on code from https://www.geeksforgeeks.org/how-to-use-checkbox-inside-select-option-using-javascript/
let show = true;

function showCheckboxes() {
    let checkboxes = document.getElementById("checkBoxes");
    if (show) {
        checkboxes.style.display = "block";
        show = false;
    } else {
        checkboxes.style.display = "none";
        show = true;
    }
}

//recipe list functionality

//uncomment if you need to alter recipes
//localStorage.removeItem('recipes');

//list of sample recipes
recipes = JSON.parse(localStorage.getItem('recipes'));
if (recipes == null) {
    recipes = [
    {
        name: 'PB&J',
        rating: 4,
        favorite: true,
        ingredients: [{foodItem: 'bread', amount: 20}, {foodItem: 'peanut butter', amount: 20}, {foodItem: 'jelly', amount: 20}],
        restrictedFor: ['Gluten Free', 'Peanut Free'],
        instructions: 'Spread peanut butter on one slice of bread and jelly on another. Then layer the slices together such that the peanut butter and jelly touch.'
    },
    {
        name: 'Cereal and Milk',
        rating: 5,
        favorite: false,
        ingredients: [{foodItem: 'cereal', amount: 20}, {foodItem: 'milk', amount: 20}],
        restrictedFor: ['Dairy Free', 'Vegan'],
        instructions: 'Pour cereal into a bowl and add milk.'
    },
    {
        name: 'Toast with Butter',
        rating: 2,
        favorite: true,
        ingredients: [{foodItem: 'bread', amount: 20}, {foodItem: 'butter', amount: 20}],
        restrictedFor: ['Gluten Free', 'Dairy Free', 'Vegan'],
        instructions: 'Cook bread in the toaster and then spread butter on it.'
    },
    {
        name: 'Spaghetti Marinara',
        rating: 4,
        favorite: false,
        ingredients: [{foodItem: 'spaghetti', amount: 20}, {foodItem: 'marinara sauce', amount: 20}],
        restrictedFor: ['Gluten Free'],
        instructions: 'Boil the spaghetti and microwave a cup of marina sauce. Pour the sauce onto the spaghetti.'
    },
    {
        name: 'Grilled Cheese Sandwich',
        rating: 1,
        favorite: false,
        ingredients: [{foodItem: 'bread', amount: 20}, {foodItem: 'cheese', amount: 20}, {foodItem: 'butter', amount: 20}],
        restrictedFor: ['Gluten Free', 'Dairy Free', 'Vegan'],
        instructions: 'Butter two slices of bread and place cheese between them on the unbuttered sides. Then cook it in a pan on the stove or grill.'
    },
    {
        name: 'Ultimate Butter',
        rating: 3,
        favorite: true,
        ingredients: [{foodItem: 'butter', amount: 20}, {foodItem: 'peanut butter', amount: 20}],
        restrictedFor: ['Dairy Free', 'Peanut Free', 'Vegan'],
        instructions: 'Combine butter and peanut butter in a bowl and whisk together.'
    },
    {
        name: 'Boiled Carrots',
        rating: 1,
        favorite: false,
        ingredients: [{foodItem: 'carrot', amount: 20}],
        restrictedFor: [],
        instructions: 'Boil the carrots in a pot of water.'
    },
    {
        name: 'Fruit Salad',
        rating: 3,
        favorite: true,
        ingredients: [{foodItem: 'banana', amount: 20}, {foodItem: 'strawberry', amount: 20}, {foodItem: 'orange', amount: 20}],
        restrictedFor: [],
        instructions: 'Slice up and toss together fruits. Add sugar to taste.'
    }
    ]
localStorage.setItem('recipes', JSON.stringify(recipes));
}

//display the list of recipes
function displayRecipes(filteredRecipes) {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';
    filteredRecipes.forEach((recipe) => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.setAttribute('data-name', recipe.name);
        const stars = '\u2605'.repeat(recipe.rating) + '\u2606'.repeat(5 - recipe.rating);
        recipeDiv.innerHTML = `
            <h3>${recipe.name}</h3>
            <p>Rating: <span class="stars">${stars}</span></p>
            <p>Ingredients: ${recipe.ingredients.map(item => item.foodItem || 'error').join(', ')}</p>
            <button onclick="toggleFavorite('${recipe.name}')">
                ${recipe.favorite ? '<span style="color: red;">&#x2764;</span> Unfavorite' : '&#x2764 Favorite'}
            </button>
            <button onclick="openModal('${recipe.name}')">View Details</button>
        `;
        recipeList.appendChild(recipeDiv);
    });
}

//filter the recipes
//uses placeholder for current inventory
function filterRecipes() {
    const favoriteChecked = document.getElementById('fav').checked;
    const inventoryChecked = document.getElementById('inv').checked;
    const ratingChecked = document.getElementById('pos').checked;

    //inventory placeholder
    //in the final app this will be connected to the inventory page
    //const currentInventory = ['bread', 'peanut butter', 'milk', 'butter', 'cheese'];

    const filteredRecipes = recipes.filter(recipe => {
        const favoriteEnough = !favoriteChecked || recipe.favorite;
        const ratedEnough = !ratingChecked || recipe.rating >= 3;
        //const ingredientsEnough = !inventoryChecked || recipe.ingredients.every(ingredient => currentInventory.includes(ingredient.foodItem));
        const ingredientsEnough = !inventoryChecked || recipe.ingredients.every(ingredient => {
            const inventoryItem = inventory.items.find(item => item.name.toLowerCase() === ingredient.foodItem.toLowerCase());
            console.log(`Checking ingredient: ${ingredient.foodItem} - Inventory: ${inventoryItem ? inventoryItem.quantity : 'Not Found'}`);
            return inventoryItem && inventoryItem.quantity >= ingredient.amount; // Check if the item exists and has enough quantity
        });

        const unrestricted = profile.restrictions.every(restriction => !recipe.restrictedFor.includes(restriction));

        return favoriteEnough && ratedEnough && ingredientsEnough && unrestricted;
    });

    displayRecipes(filteredRecipes);
}

//open individual recipe modal
function openModal(name) {
    const recipe = recipes.find(recipe => recipe.name === name);
    document.getElementById('modal-recipe-name').innerText = recipe.name;
    document.getElementById('modal-recipe-rating').innerHTML = `Rating: <span class="stars">${'★'.repeat(recipe.rating)}${'☆'.repeat(5 - recipe.rating)}</span>`;
    document.getElementById('modal-recipe-ingredients').innerText = `Ingredients: ${recipe.ingredients.map(item => item.foodItem).join(', ')}`;
    document.getElementById('modal-recipe-instructions').innerText = `Instructions: ${recipe.instructions}`;
    document.getElementById('recipeModal').style.display = 'block';
}

//close modal
function closeModal() {
    document.getElementById('recipeModal').style.display = 'none';
}

//favorite or unfavorite recipes
function toggleFavorite(name) {
    const recipe = recipes.find(recipe => recipe.name === name);
    if (recipe) {
    recipe.favorite = !recipe.favorite;
    localStorage.setItem('recipes', JSON.stringify(recipes));
    filterRecipes();
    }
}

//display recipes
filterRecipes();

//show checkboxes
function showCheckboxes() {
    const checkboxes = document.getElementById('checkBoxes');
    checkboxes.style.display = checkboxes.style.display === "block" ? "none" : "block";
}

