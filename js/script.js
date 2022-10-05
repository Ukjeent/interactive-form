const nameField = document.getElementById('name');
const jobRole = document.getElementById('title');
const otherJobRole = jobRole.nextElementSibling;
const tShirtColor = document.getElementById('color');
const tShirtDesign = document.getElementById('design');
const colors = document.querySelectorAll('[data-theme]');
const hiddenColorOption = document.querySelector('#color option');

/////////////////
/// Functions ///
/////////////////

// Displays the colors that matches the selected tshirt.
function selectColors(show) {
    const ShowColors = document.querySelectorAll(`[data-theme="${show}"]`);
    ShowColors.forEach( element => element.hidden = false);
}


////////////////////
/// FunctionsEnd ///
////////////////////


// Add focus to the namefield on pageload
nameField.focus();

// Hides the other job role field on pageload
otherJobRole.style.display = 'none';


// Listens for a change in the jobrole dropdown and displays/hides the "other" "text field" based on the user’s selection.
jobRole.addEventListener('change', (e) => {
    const element = e.target;
    if (element.value === 'other') {
        otherJobRole.style.display = '';
    } else {
        otherJobRole.style.display = 'none';
    }
});

// Disables the t-shirt color element on pageload
tShirtColor.disabled = true;


//Listens for a change in the t-shirt design dropdown
tShirtDesign.addEventListener('change', (e) => {
    const element = e.target;
    tShirtColor.disabled = false; //Enables the colordropdown
    hiddenColorOption.selected = true; //Selects the hidden option if the user changes design.
    hiddenColorOption.innerHTML = 'Select another color' // Changes the text in the hidden option to "select another color"
    colors.forEach( element => element.hidden = true); //Hides all options
    selectColors(element.value) // Displays the options that are available for the selected design
});