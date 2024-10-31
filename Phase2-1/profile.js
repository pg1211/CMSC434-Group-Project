document.addEventListener("DOMContentLoaded", function () {
    //dislikes
    const form = document.getElementById("dislike-form");
    const input = document.getElementById("dislike-input");
    const list = document.getElementById("dislike-list");
  
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

    //https://www.w3schools.com/howto/howto_js_popup.asp
    //Used this source for popup functionality reference
    var dislikesButton = document.getElementById("dislikes");
    var dislikesPopup = document.getElementById("dislike-popup");
    var restrictionsButton = document.getElementById("restrictions");
    var frButton = document.getElementById("favorite-recipes");
    var frPopup = document.getElementById("fr-popup");
    var restrictionsPopup = document.getElementById("restrictions-popup");
    var cbPopup = document.getElementById("cooking-baking-popup");
    var cbbutton = document.getElementById("cb-button");
    dislikesButton.onclick = function() {
        if (dislikesPopup.style.display == "block"){
            dislikesPopup.style.display = "none";
        }
        else
            dislikesPopup.style.display = "block";
        restrictionsPopup.style.display = "none";
        cbPopup.style.display = "none";
        frPopup.style.display = "none";

     }
     //Favorite recipes
     const frForm = document.getElementById("fr-form");
     const frInput = document.getElementById("fr-input");
     const frList = document.getElementById("fr-list");
   
     // Handle form submission
     frForm.addEventListener("submit", function (e) {
       e.preventDefault();
       const newItem = frInput.value.trim();
   
       if (newItem) {
         // Add item to the list
         const listItem = document.createElement("li");
         listItem.textContent = newItem;
         frList.appendChild(listItem);
   
         // Clear the input
         frInput.value = "";
       }
     });
     frButton.onclick = function() {
         if (frPopup.style.display == "block"){
             frPopup.style.display = "none";
         }
         else
             frPopup.style.display = "block";
         restrictionsPopup.style.display = "none";
         cbPopup.style.display = "none";
         dislikesPopup.style.display = "none";
      }

     //Restrictions
     const restform = document.getElementById("restrictions-form");
     const restinput = document.getElementById("restrictions-input");
     const restlist = document.getElementById("restrictions-list");
   
     // Handle form submission
     restform.addEventListener("submit", function (e) {
       e.preventDefault();
       const newItem = restinput.value.trim();
   
       if (newItem) {
         // Add item to the list
         const listItem = document.createElement("li");
         listItem.textContent = newItem;
         restlist.appendChild(listItem);
   
         // Clear the input
         restinput.value = "";
       }
     });
 
     //https://www.w3schools.com/howto/howto_js_popup.asp
     //Used this source for popup functionality reference

     restrictionsButton.onclick = function() {
        if (restrictionsPopup.style.display == "block"){
            restrictionsPopup.style.display = "none";
        }
        else
            restrictionsPopup.style.display = "block";
        dislikesPopup.style.display = "none";
        cbPopup.style.display = "none";
        frPopup.style.display = "none";

      }
 
      //cooking and baking buttons
      cbbutton.onclick = function() {
        if (cbPopup.style.display == "block"){
            cbPopup.style.display = "none";
        }
        else{
            cbPopup.style.display = "block"
        }
        dislikesPopup.style.display = "none";
        restrictionsPopup.style.display = "none";
        frPopup.style.display = "none";
      }
      var cookLevel = document.getElementById("cooking-level");
      var bakeLevel = document.getElementById("baking-level");
      var cookBeg = document.getElementById("cooking-beginner-button");
      var cookinter = document.getElementById("cooking-inter-button");
      var cookAdvanced = document.getElementById("cooking-advanced-button");
      var bakeBeg = document.getElementById("baking-beginner-button");
      var bakeInter = document.getElementById("baking-inter-button");
      var bakeAdvanced = document.getElementById("baking-advanced-button");



      cookBeg.onclick = function() {
        cookLevel.textContent = "Cooking Level: Beginner";
        cookBeg.style.backgroundColor = "#00496e"
        cookinter.style.backgroundColor = "#005c8a"
        cookAdvanced.style.backgroundColor = "#005c8a"

      }
      cookinter.onclick = function() {
        cookLevel.textContent = "Cooking Level: Intermediate";
        cookinter.style.backgroundColor = "#00496e"
        cookBeg.style.backgroundColor = "#005c8a"
        cookAdvanced.style.backgroundColor = "#005c8a"

      }
      cookAdvanced.onclick = function() {
        cookLevel.textContent = "Cooking Level: Advanced";
        cookAdvanced.style.backgroundColor = "#00496e"
        cookBeg.style.backgroundColor = "#005c8a"
        cookinter.style.backgroundColor = "#005c8a"



      }
      bakeBeg.onclick = function() {
        bakeLevel.textContent = "Baking Level: Beginner";
        bakeBeg.style.backgroundColor = "#00496e"
        bakeInter.style.backgroundColor = "#005c8a"
        bakeAdvanced.style.backgroundColor = "#005c8a"
      }
      bakeInter.onclick = function() {
        bakeLevel.textContent = "Baking Level: Intermediate";
        bakeInter.style.backgroundColor = "#00496e"
        bakeBeg.style.backgroundColor = "#005c8a"
        bakeAdvanced.style.backgroundColor = "#005c8a"
      }
      bakeAdvanced.onclick = function() {
        bakeLevel.textContent = "Baking Level: Advanced";
        bakeAdvanced.style.backgroundColor = "#00496e"
        bakeBeg.style.backgroundColor = "#005c8a"
        bakeInter.style.backgroundColor = "#005c8a"
      }
      

  });
  