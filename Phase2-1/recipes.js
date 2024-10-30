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

//recipe list functionality **IN PROGRESS**

// Sample list of recipe objects
const recipes = [
    {
        name: 'Pancakes',
        rating: 4,
        isFavorite: true,
        ingredients: ['flour', 'milk', 'eggs', 'sugar', 'butter']
    },
    {
        name: 'Omelette',
        rating: 5,
        isFavorite: false,
        ingredients: ['eggs', 'cheese', 'salt', 'pepper']
    },
    {
        name: 'Chocolate Cake',
        rating: 3,
        isFavorite: true,
        ingredients: ['flour', 'cocoa', 'sugar', 'eggs', 'butter']
    }
];

// Function to display recipes in the HTML
function displayRecipes(filteredRecipes) {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = ''; // Clear current list
    filteredRecipes.forEach((recipe, index) => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.setAttribute('data-index', index); // Store the index for referencing later
        recipeDiv.innerHTML = `
            <h3>${recipe.name}</h3>
            <p>Rating: ${recipe.rating}</p>
            <p>Ingredients: ${recipe.ingredients.join(', ')}</p>
            <p>${recipe.isFavorite ? '❤️ Favorite' : ''}</p>
        `;
        recipeDiv.onclick = () => openModal(index); // Attach click event to open modal
        recipeList.appendChild(recipeDiv);
    });
}

// Function to filter recipes based on user inputs
function filterRecipes() {
    const isFavoriteChecked = document.getElementById('fav').checked;
    const isInventoryChecked = document.getElementById('inv').checked;
    const isPositiveChecked = document.getElementById('pos').checked;

    // Define inventory (this could be dynamically managed)
    const inventoryIngredients = ['flour', 'milk', 'eggs', 'sugar', 'butter', 'cheese', 'salt', 'pepper'];

    const filteredRecipes = recipes.filter(recipe => {
        const meetsFavoriteCriteria = !isFavoriteChecked || recipe.isFavorite;
        const meetsPositiveCriteria = !isPositiveChecked || recipe.rating >= 4;
        const meetsInventoryCriteria = !isInventoryChecked || recipe.ingredients.every(ingredient => inventoryIngredients.includes(ingredient));

        return meetsFavoriteCriteria && meetsPositiveCriteria && meetsInventoryCriteria;
    });

    displayRecipes(filteredRecipes);
}

// Function to open the modal with recipe details
function openModal(index) {
    const recipe = recipes[index];
    document.getElementById('modal-recipe-name').innerText = recipe.name;
    document.getElementById('modal-recipe-rating').innerText = `Rating: ${recipe.rating}`;
    document.getElementById('modal-recipe-ingredients').innerText = `Ingredients: ${recipe.ingredients.join(', ')}`;
    document.getElementById('recipeModal').style.display = 'block';
}

// Function to close the modal
function closeModal() {
    document.getElementById('recipeModal').style.display = 'none';
}

// Display all recipes initially
displayRecipes(recipes);

// Show/Hide filter checkboxes
function showCheckboxes() {
    const checkboxes = document.getElementById('checkBoxes');
    checkboxes.style.display = checkboxes.style.display === "block" ? "none" : "block";
}

// Close the modal if user clicks outside of the modal content
window.onclick = function(event) {
    const modal = document.getElementById('recipeModal');
    if (event.target == modal) {
        closeModal();
    }
};
