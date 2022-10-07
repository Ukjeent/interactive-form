const nameField = document.getElementById('name');
const jobRole = document.getElementById('title');
const otherJobRole = jobRole.nextElementSibling;

const tShirtColor = document.getElementById('color');
const tShirtDesign = document.getElementById('design');
const colors = document.querySelectorAll('[data-theme]');
const hiddenColorOption = document.querySelector('#color option');

const activitesSection = document.getElementById('activities');
const activitiesCost = document.getElementById('activities-cost');
let activitesTotalCost = 0;

const paymentMethods = document.querySelectorAll('.payment-methods > div');
const paymentMethodSelect = document.getElementById('payment');
const paymentMethodCreditCard = document.querySelector('#payment [value="credit-card"]');
const creditCardForms = document.getElementById('credit-card');
const paypalInfo = document.getElementById('paypal');
const bitCoinInfo = document.getElementById('bitcoin');


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
    hiddenColorOption.innerHTML = 'Select color' // Changes the text in the hidden option to "select another color"
    colors.forEach( element => element.hidden = true); //Hides all options
    selectColors(element.value) // Displays the options that are available for the selected design
});

//Listens for a change in the register for actvites fieldset updates the total cost of the users selected activites
activitesSection.addEventListener('change', (e) => {
    checkBox = e.target;
    if (checkBox.checked) {
        activitesTotalCost += parseInt(checkBox.dataset.cost);
    } else {
        activitesTotalCost -= parseInt(checkBox.dataset.cost);
    }
    activitiesCost.innerHTML = `Total: $${activitesTotalCost}`; // Updates the innerHTML and displays the totlacost on the page.
});

//
// payment
//

paymentMethodCreditCard.selected = true; //Selects creditcard as default payment on pageload
paypalInfo.style.display = 'none'; //Removes paypal info on pageload
bitCoinInfo.style.display = 'none';//Removes bitcoin info on pageload

// listens for a change in the paymentMethodSelect
paymentMethodSelect.addEventListener('change', (e) => {
    const paymentType = e.target.value; // Stores the selected payment method value
    paymentMethods.forEach( element => {
        if (element.id === paymentType) { // Displays the paymentmethod with an id that matches the selected payment method value
            element.style.display = '';
        } else if (element.id !== paymentType && !element.classList.contains('payment-method-box')){ // Removes all other payment method fields
            element.style.display = 'none';
        }
    });
});