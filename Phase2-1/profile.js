document.addEventListener("DOMContentLoaded", function () {
    //JSON business

    profile = JSON.parse(localStorage.getItem('profile'));
    if (profile == null){
        profile = {
            "First Name" : "Jaques",
            "Last Name" : "Webster",
            "Age" : 20, 
            "Dislikes" : "Pineappple",
            "Cooking Level" : "Beginner",
            "Baking Level" : "Advanced",
            "Restrictions" : ["Gluten Free, Vegan"]
        };
    }
    localStorage.setItem('profile', JSON.stringify(profile));

    //Information in page
    const firstname = document.getElementById("firstname");
    const lastname = document.getElementById("lastname");

    //Set values from json
    firstname.textContent = profile["First Name"];
    lastname.textContent = profile["Last Name"];

    const age = document.getElementById("age");
    age.textContent = "Age: " + profile["Age"];
    const dislikes = document.getElementById("dislikes-text");
    dislikes.textContent = profile["Dislikes"];
    const cookingLevel = document.getElementById("cooking-level");
    const bakingLevel = document.getElementById("baking-level");
    cookingLevel.textContent = "Cooking Level: " + profile["Cooking Level"];
    bakingLevel.textContent = "Baking Level: " + profile["Baking Level"];
    const restrictions = document.getElementById("restrictions-text");

    string = "";
    count = 0;
    profile["Restrictions"].forEach(element => {
        if(count > 0)
            string += ", "
        string += element;
        count += 1;
    });
    restrictions.textContent = string







    //Buttons and form(functionality stuff)
    const editButton = document.getElementById("edit");
    const cancelButton = document.getElementById("cancel")
    const popup = document.getElementById("popup");
    const form = document.getElementById("popup-form");
    const firstnameInput = document.getElementById("firstnameInput");
    const lastnameInput = document.getElementById("lastnameInput");
    const dislikesInput = document.getElementById("dislikes-input");
    const ageInput = document.getElementById("ageInput");
 





    editButton.onclick = function(){
        popup.style.display = 'flex';
    }

    cancelButton.onclick = function(){
        popup.style.display = 'none';
        form.reset();
    }


  
    // Handle form submission
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      //Name
      firstname.textContent = firstnameInput.value;
      profile['First Name'] = firstname.textContent;
      lastname.textContent = lastnameInput.value;
      profile['Last Name'] = lastname.textContent;
      age.textContent = "Age: " + ageInput.value;
      profile["Age"] = ageInput.value;
      dislikes.textContent = dislikesInput.value;
      profile['Dislikes'] = dislikesInput.value;
      profile["Age"] = ageInput.value;



      //Cooking level
      cookingLevelArr = document.querySelectorAll('input[name = "cooking"]:checked');
      cookingLevel.textContent = "Cooking Level: " + cookingLevelArr[0].value;
      profile["Cooking Level"] = cookingLevelArr[0].value;
      //Baking level
      bakingLevelArr = document.querySelectorAll('input[name = "baking"]:checked');
      bakingLevel.textContent = "Baking Level: " + bakingLevelArr[0].value;
      profile["Baking Level"] = BakingLevelArr[0].value;

      


      //Restrictions
      res = []
      cbs = document.querySelectorAll('input[type = "checkbox"]:checked');
      cbs.forEach((element) =>{
        res.push(element.value);
      });

      profile['Restrictions'] = res;

      string = "";
      count = 0;
      profile["Restrictions"].forEach(element => {
          if(count > 0)
              string += ", "
          string += element;
          count += 1;
      });
      restrictions.textContent = string



      localStorage.setItem('profile', JSON.stringify(profile));
      popup.style.display = "none";
    });

    inputSubmit.onclick = function(){
        localStorage.setItem('profile', JSON.stringify(profile));
        popup.style.display = 'none';
    }

    //https://www.w3schools.com/howto/howto_js_popup.asp
    //Used this source for popup functionality reference
   
     //https://www.w3schools.com/howto/howto_js_popup.asp
     //Used this source for popup functionality reference







 

  });
  