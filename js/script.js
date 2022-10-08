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

const activites = document.querySelectorAll('#activities-box [type="checkbox"]')

const paymentMethods = document.querySelectorAll('.payment-methods > div');
const paymentMethodSelect = document.getElementById('payment');
const paymentMethodCreditCard = document.querySelector('#payment [value="credit-card"]');
const creditCardForms = document.getElementById('credit-card');
const paypalInfo = document.getElementById('paypal');
const bitCoinInfo = document.getElementById('bitcoin');

const submitBtn = document.querySelector('[type="submit"]');


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

//
// Form submit
//

const nameValidation = /[a-zA-Z]/;
const nameInput = document.getElementById('name');

const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const emailInput = document.getElementById('email');

const cardValidation = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
const cardInput = document.getElementById('cc-num');

        // Test Credit Card Account Numbers //
            // American Express: 378282246310005
            // MasterCard: 5105105105105100
            // Visa: 4111111111111111
            // Diners Club: 30569309025904
        // /Test Credit Card Account Numbers //

const zipValidation = /^\d{5}$/;
const zipInput = document.getElementById('zip');

const cvvValidation = /^\d{3}$/;
const cvvInput = document.getElementById('cvv');

// Takes a field element and a validation string then validates the fieldvalue. Returns true or false.
function validateField(field, validationString) {
    const InputValue = field.value;
    const validationResult = validationString.test(InputValue);
    if (!validationResult) {
        field.parentNode.classList.add('not-valid');
        return validationResult;
    } else {
        field.parentNode.classList.remove('not-valid');
        return validationResult;
    }

    }

// Turns a nodelist to an array, then checks if any of the elements in the array is checked. Returns true or false.
function isAnyInputChecked(nodeLi) {
    const arr = Array.from(nodeLi);
    const result = arr.some( element => element.checked );
    if (!result) {
        nodeLi.parentNode.classList.add('not-valid');
        return result;
    } else {
        nodeLi.parentNode.classList.remove('not-valid');
        return result;
    }

}

function validateAllElements() {
    validateField(nameInput, nameValidation)
    validateField(nameInput, nameValidation)
    validateField(emailInput, emailValidation)
    validateField(cardInput, cardValidation)
    validateField(zipInput, zipValidation)
    validateField(cvvInput, cvvValidation)
    isAnyInputChecked(activites)
}



// The "Register for Activities" section must have at least one activity selected.

function submitForms(btn) {
    if (validateField(nameInput, nameValidation)) {
        console.log('submit');
    }
    console.log(`name: ${validateField(nameInput, nameValidation)}`);
    console.log(`email: ${validateField(emailInput, emailValidation)}`);
    console.log(`card: ${validateField(cardInput, cardValidation)}`);
    console.log(`zip: ${validateField(zipInput, zipValidation)}`);
    console.log(`cvv: ${validateField(cvvInput, cvvValidation)}`);
    console.log(isAnyInputChecked(activites))
}

