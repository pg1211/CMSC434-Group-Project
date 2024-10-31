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

//list of sample recipes
const recipes = [
    {
        name: 'PB&J',
        rating: 4,
        favorite: true,
        ingredients: ['bread', 'peanut butter', 'jelly'],
        instructions: 'Spread peanut butter on one slice of bread and jelly on another. Then layer the slices together such that the peanut butter and jelly touch.'
    },
    {
        name: 'Cereal and Milk',
        rating: 5,
        favorite: false,
        ingredients: ['cereal', 'milk'],
        instructions: 'Pour cereal into a bowl and add milk.'
    },
    {
        name: 'Toast with Butter',
        rating: 2,
        favorite: true,
        ingredients: ['bread', 'butter'],
        instructions: 'Cook bread in the toaster and then spread butter on it.'
    },
    {
        name: 'Spaghetti Marinara',
        rating: 4,
        favorite: false,
        ingredients: ['spaghetti', 'marinara sauce',],
        instructions: 'Boil the spaghetti and microwave a cup of marina sauce. Pour the sauce onto the spaghetti.'
    },
    {
        name: 'Grilled Cheese Sandwich',
        rating: 1,
        favorite: false,
        ingredients: ['bread', 'cheese', 'butter'],
        instructions: 'Butter two slices of bread and place cheese between them on the unbuttered sides. Then cook it in a pan on the stove or grill.'
    },
    {
        name: 'Ultimate Butter',
        rating: 3,
        favorite: true,
        ingredients: ['butter', 'peanut butter'],
        instructions: 'Combine butter and peanut butter in a bowl and whisk together.'
    }
];

//display the list of recipes
function displayRecipes(filteredRecipes) {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';
    filteredRecipes.forEach((recipe, index) => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.setAttribute('data-index', index);
        const stars = '★'.repeat(recipe.rating) + '☆'.repeat(5 - recipe.rating);
        recipeDiv.innerHTML = `
            <h3>${recipe.name}</h3>
            <p>Rating: <span class="stars">${stars}</span></p>
            <p>Ingredients: ${recipe.ingredients.join(', ')}</p>
            <button onclick="toggleFavorite(${index})">
                ${recipe.favorite ? '❤️ Unfavorite' : '🤍 Favorite'}
            </button>
            <button onclick="openModal(${index})">View Details</button>
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
    const currentInventory = ['bread', 'peanut butter', 'milk', 'butter', 'cheese'];

    const filteredRecipes = recipes.filter(recipe => {
        const favoriteEnough = !favoriteChecked || recipe.favorite;
        const ratedEnough = !ratingChecked || recipe.rating >= 3;
        const ingredientsEnough = !inventoryChecked || recipe.ingredients.every(ingredient => currentInventory.includes(ingredient));

        return favoriteEnough && ratedEnough && ingredientsEnough;
    });

    displayRecipes(filteredRecipes);
}

//open individual recipe modal
function openModal(index) {
    const recipe = recipes[index];
    document.getElementById('modal-recipe-name').innerText = recipe.name;
    document.getElementById('modal-recipe-rating').innerHTML = `Rating: <span class="stars">${'★'.repeat(recipe.rating)}${'☆'.repeat(5 - recipe.rating)}</span>`;
    document.getElementById('modal-recipe-ingredients').innerText = `Ingredients: ${recipe.ingredients.join(', ')}`;
    document.getElementById('modal-recipe-instructions').innerText = `Instructions: ${recipe.instructions}`;
    document.getElementById('recipeModal').style.display = 'block';
}

//close modal
function closeModal() {
    document.getElementById('recipeModal').style.display = 'none';
}

//favorite or unfavorite recipes
function toggleFavorite(index) {
    recipes[index].favorite = !recipes[index].favorite;
    filterRecipes();
}

//display recipes
displayRecipes(recipes);

//show checkboxes
function showCheckboxes() {
    const checkboxes = document.getElementById('checkBoxes');
    checkboxes.style.display = checkboxes.style.display === "block" ? "none" : "block";
}

