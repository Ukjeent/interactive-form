const form = document.querySelector('form');

const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const cardField = document.getElementById('cc-num');
const zipField = document.getElementById('zip');
const cvvField = document.getElementById('cvv');
const jobRole = document.getElementById('title');
const otherJobRole = jobRole.nextElementSibling;

const tShirtColor = document.getElementById('color');
const tShirtDesign = document.getElementById('design');
const colors = document.querySelectorAll('[data-theme]');
const hiddenColorOption = document.querySelector('#color option');

const activitesSection = document.querySelector('#activities');
const activitiesCost = document.getElementById('activities-cost');
let activitesTotalCost = 0;

const activites = document.querySelectorAll('#activities-box [type="checkbox"]');

const paymentMethods = document.querySelectorAll('.payment-methods > div');
const paymentMethodSelect = document.getElementById('payment');
const paymentMethodCreditCard = document.querySelector('#payment [value="credit-card"]');
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


// Checks if any activity matches the time of the selected activity and disables all activities that matches
function checkActivityTimeAdd(checkBox) {
    const activityTime = checkBox.dataset.dayAndTime;
    activites.forEach(element => {
        if ( !element.checked && element.dataset.dayAndTime === activityTime) {
            element.disabled = true;
            element.parentNode.classList.add('disabled');
        }
    });
}

// Checks if any activity matches the time of the selected activity and enables the selected activities that don't match.
function checkActivityTimeRemove(checkBox) {
    const activityTime = checkBox.dataset.dayAndTime;
    activites.forEach(element => {
        if ( !element.checked && element.dataset.dayAndTime === activityTime) {
            element.disabled = false;
            element.parentNode.classList.remove('disabled');
        }
    });
}

// Takes a field element and a validation string then validates the fieldvalue. Returns true or false.
function validateField(field, validationString) {
    const InputValue = field.value;
    const hint = field.parentNode.lastElementChild;
    const result = validationString.test(InputValue);
    if (!result) {
        field.parentNode.classList.add('not-valid');
        field.parentNode.classList.remove('valid');
        hint.style.display = 'block';
    } else {
        field.parentNode.classList.remove('not-valid');
        field.parentNode.classList.add('valid');
        hint.style.display = 'none';
    }
    return result;
}

// Turns a nodelist to an array, then checks if any of the elements in the array is checked. Returns true or false.
function isAnyInputChecked(nodeLi, errorElement) {
    const arr = Array.from(nodeLi);
    const result = arr.some( element => element.checked );
    if (!result) {
        errorElement.classList.add('not-valid');
        errorElement.classList.remove('valid');
    } else {
        errorElement.classList.remove('not-valid');
        errorElement.classList.add('valid');
    }
    return result;
}

// Validates all element and store the validationresult. Returns the array with the result to use in the submit eventlistener.
function validateAllElements() {
    const validationStatus = [];
    validationStatus.push(validateField(nameInput, nameValidation));
    validationStatus.push(validateField(emailInput, emailValidation));
        conditionalErrorText(); 
    validationStatus.push(isAnyInputChecked(activites, activitesSection));
    if (paymentMethodSelect.value === 'credit-card') { // If creditcard is selected as payment method, validate crecitcard fields. 
        validationStatus.push(validateField(cardInput, cardValidation));
        validationStatus.push(validateField(zipInput, zipValidation));
        validationStatus.push(validateField(cvvInput, cvvValidation));
    }
    return validationStatus;
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
    hiddenColorOption.innerHTML = 'Select color'; // Changes the text in the hidden option to "select another color"
    colors.forEach( element => element.hidden = true); //Hides all options
    selectColors(element.value); // Displays the options that are available for the selected design
});

//Listens for a change in the register for actvites fieldset updates the total cost of the users selected activites
activitesSection.addEventListener('change', (e) => {
    checkBox = e.target;
    if (checkBox.checked) {
        activitesTotalCost += parseInt(checkBox.dataset.cost);
        checkActivityTimeAdd(checkBox);
    } else {
        activitesTotalCost -= parseInt(checkBox.dataset.cost);
        checkActivityTimeRemove(checkBox);
    }
    activitiesCost.innerHTML = `Total: $${activitesTotalCost}`; // Updates the innerHTML and displays the totlacost on the page.
    isAnyInputChecked(activites, activitesSection);
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
// focus & blur 
//

// Adds the focus class to the the activities boxes on focus
activitesSection.addEventListener('focus', (e) => {
    const focusTarget = e.target;
    focusTarget.parentNode.classList.add('focus');
}, true);

// Removes the focus class from the the activities boxes on blur
activitesSection.addEventListener('blur', (e) => {
    const focusTarget = e.target;
    focusTarget.parentNode.classList.remove('focus');
}, true);


//
// Validations 
//

const nameValidation = /[a-zA-Z]/;
const nameInput = document.getElementById('name');

const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const emailInput = document.getElementById('email');

const cardValidation = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
const cardInput = document.getElementById('cc-num');

const zipValidation = /^\d{5}$/;
const zipInput = document.getElementById('zip');

const cvvValidation = /^\d{3}$/;
const cvvInput = document.getElementById('cvv');


// OnkeyUp validations
nameField.addEventListener('keyup', () => {
    validateField(nameInput, nameValidation);
});
emailField.addEventListener('keyup', () => {
    validateField(emailInput, emailValidation);
    conditionalErrorText();
});

cardField.addEventListener('keyup', () => {
    validateField(cardInput, cardValidation);
});

zipField.addEventListener('keyup', () => {
    validateField(zipInput, zipValidation);
});
cvvField.addEventListener('keyup', () => {
    validateField(cvvInput, cvvValidation);
});

function conditionalErrorText() {
    if (emailInput.value === '') {
        emailInput.parentNode.lastElementChild.innerHTML = 'Email field cannot be blank';
    } else {
        emailInput.parentNode.lastElementChild.innerHTML = 'Email address must be formatted correctly';
    }
}



// Listens for a submit event
form.addEventListener('submit', (e) => {
    validationStatus = validateAllElements(); // Validates all elements 
    if (validationStatus.some(element => !element)) {  // If any element returns false, prevent default, else submit
        e.preventDefault();
    }
});



/////////////////////////////////////////////

// Validate selectlist

// function isAnyInputSelected(select, validationString) {
//     const result = select.value !== validationString;
//     if (!result) {
//         select.classList.add('not-valid');
//         select.previousElementSibling.classList.add('not-valid');
//         return result;
//     } else {
//         select.classList.remove('not-valid');
//         select.previousElementSibling.classList.reomve('not-valid');
//         return result;
//     }
// }

// validationStatus.push(isAnyInputSelected(jobRole, 'Select Job Role'));
