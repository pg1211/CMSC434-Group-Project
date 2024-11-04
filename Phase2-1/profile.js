// Selecting elements
const editButton = document.getElementById("edit");
const popup = document.getElementById("popup");
const form = document.getElementById("popup-form");
const cancelButton = document.getElementById("cancel");
const gvButton = document.getElementById("group-voting");

// Profile fields
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const age = document.getElementById("age");
const restrictionsText = document.getElementById("restrictions-text");
const dislikesText = document.getElementById("dislikes-text");
const cookingLevel = document.getElementById("cooking-level");
const bakingLevel = document.getElementById("baking-level");

// Input fields in the popup
const firstNameInput = document.getElementById("firstnameInput");
const lastNameInput = document.getElementById("lastnameInput");
const ageInput = document.getElementById("ageInput");
const dislikesInput = document.getElementById("dislikes-input");
const restrictionCheckboxes = [
    document.getElementById("gfcheck"),
    document.getElementById("pfcheck"),
    document.getElementById("sfcheck"),
    document.getElementById("dfcheck"),
    document.getElementById("vegetariancheck"),
    document.getElementById("vegancheck")
];
const cookingRadios = document.getElementsByName("cooking");
const bakingRadios = document.getElementsByName("baking");

// Load saved profile data from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
    savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
        profile = JSON.parse(savedProfile);

        firstName.textContent = profile.firstName;
        lastName.textContent = profile.lastName;
        age.textContent = "Age: " + profile.age;
        restrictionsText.textContent = profile.restrictions;
        dislikesText.textContent = profile.dislikes;
        cookingLevel.textContent = "Cooking Level: " + profile.cookingLevel;
        bakingLevel.textContent = "Baking Level: " + profile.bakingLevel;
    }
});

// Show popup
editButton.addEventListener("click", () => {
    popup.style.display = "flex";
});

// Hide popup on cancel
cancelButton.addEventListener("click", () => {
    popup.style.display = "none";
});

gvButton.addEventListener("click", () => {

})

// Handle form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Gather updated profile data
    updatedProfile = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        age: ageInput.value,
        restrictions: Array.from(restrictionCheckboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value),
        dislikes: dislikesInput.value,
        cookingLevel: Array.from(cookingRadios).find((radio) => radio.checked).value,
        bakingLevel: Array.from(bakingRadios).find((radio) => radio.checked).value,
    };

    // Update profile display
    firstName.textContent = updatedProfile.firstName;
    lastName.textContent = updatedProfile.lastName;
    age.textContent = "Age: " + updatedProfile.age;
    restrictionsText.textContent = updatedProfile.restrictions.join(", ");
    dislikesText.textContent = updatedProfile.dislikes;
    cookingLevel.textContent = "Cooking Level: " + updatedProfile.cookingLevel;
    bakingLevel.textContent = "Baking Level: " + updatedProfile.bakingLevel;

    // Save to localStorage as a JSON string
    localStorage.setItem("profile", JSON.stringify(updatedProfile));

    // Hide popup
    popup.style.display = "none";
});
