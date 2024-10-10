function displayChoices() {
    // Get selected radio button value
    const radioChoices = document.getElementsByName('radioChoice');
    let selectedRadio;
    for (const radio of radioChoices) {
      if (radio.checked) {
        selectedRadio = radio.value;
        break;
      }
    }
  
    // Get selected dropdown value
    const dropdown = document.getElementById('dropdown');
    const selectedDropdown = dropdown.value;
  
    // Display the selected options
    const output = document.getElementById('output');
    if (selectedRadio) {
      output.innerHTML = `You selected: ${selectedRadio} from radio buttons and ${selectedDropdown} from the dropdown.`;
    } else {
      output.innerHTML = `Please select a radio button and dropdown option.`;
    }
  }
  