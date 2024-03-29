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


// Validations 
const nameValidation = /^[a-zA-Z\s]+$/;
const nameInput = document.getElementById('name');

const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const emailInput = document.getElementById('email');

const cardValidation = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
const cardInput = document.getElementById('cc-num');

const zipValidation = /^\d{5}$/;
const zipInput = document.getElementById('zip');

const cvvValidation = /^\d{3}$/;
const cvvInput = document.getElementById('cvv');


// Error messages
const nameErrorOne = 'Name field cannot be blank';
const nameErrorTwo = 'The name field can only contain letters and spaces';

const emailErrorOne = 'Email field cannot be blank';
const emailErrorTwo = 'Email address must be formatted correctly';


/////////////////
/// Functions ///
/////////////////

// Display the color options that are available for the selected design. 
function selectColors(design) {
    const ShowColors = document.querySelectorAll(`[data-theme="${design}"]`);
    ShowColors.forEach( element => element.hidden = false);
}


// If any activity matches the time of the selected activity and disable activity
function checkActivityTimeAdd(checkBox) {
    const activityTime = checkBox.dataset.dayAndTime;
    activites.forEach(element => {
        if ( !element.checked && element.dataset.dayAndTime === activityTime) {
            element.disabled = true;
            element.parentNode.classList.add('disabled');
        }
    });
}

// If the activity time don't match the time of the selected activity and disable activity
function checkActivityTimeRemove(checkBox) {
    const activityTime = checkBox.dataset.dayAndTime;
    activites.forEach(element => {
        if ( !element.checked && element.dataset.dayAndTime === activityTime) {
            element.disabled = false;
            element.parentNode.classList.remove('disabled');
        }
    });
}

// Validates a field and returns true or false. Takes a field element and a validation string.
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




// Validates all element and store the validationresult in an array. Returns the array with the result to use in the submit eventlistener.
function validateAllElements() {
    const validationStatus = [];
    validationStatus.push(validateField(nameInput, nameValidation));
        conditionalErrorText(nameInput, nameErrorOne, nameErrorTwo); // Updates the condition error message
    validationStatus.push(validateField(emailInput, emailValidation));
        // conditionalErrorText();
        conditionalErrorText(emailInput, emailErrorOne, emailErrorTwo); // Updates the condition error message
    validationStatus.push(isAnyInputChecked(activites, activitesSection));
    if (paymentMethodSelect.value === 'credit-card') { // If creditcard is selected as payment method, validate crecitcard fields. 
        validationStatus.push(validateField(cardInput, cardValidation));
        validationStatus.push(validateField(zipInput, zipValidation));
        validationStatus.push(validateField(cvvInput, cvvValidation));
    }
    return validationStatus;
}

// Updates a condition error message.
function conditionalErrorText(field, errorBlank, errorFormat) {
    if (field.value === '') {
        field.parentNode.lastElementChild.innerHTML = errorBlank;
    } else {
        field.parentNode.lastElementChild.innerHTML = errorFormat;
    }
}


////////////////
/// Pageload ///
////////////////

// Add focus to the namefield on pageload
nameField.focus();

// Hides the "other" field under job role on pageload. 
otherJobRole.style.display = 'none';

// Disables the t-shirt color element on pageload.
tShirtColor.disabled = true;

// Selects creditcard as default payment on pageload
paymentMethodCreditCard.selected = true;

// Removes paypal info on pageload
paypalInfo.style.display = 'none';

// Removes bitcoin info on pageload
bitCoinInfo.style.display = 'none';


//////////////////////
/// EventListeners ///
//////////////////////

// Listens for a change in the job role dropdown and displays/hides the "other" "text field" based on the user’s selection.
jobRole.addEventListener('change', (e) => {
    const element = e.target;
    if (element.value === 'other') {
        otherJobRole.style.display = '';
    } else {
        otherJobRole.style.display = 'none';
    }
});

//Listens for a change in the t-shirt design dropdown and updates the form based on the selected element. 
tShirtDesign.addEventListener('change', (e) => {
    const element = e.target;
    tShirtColor.disabled = false; //Enables the colordropdown
    hiddenColorOption.selected = true; // Selects the "pick a color" option if the user changes design. 
    hiddenColorOption.innerHTML = 'Select color'; // Changes the text in the hidden option to "select color"
    colors.forEach( element => element.hidden = true); // Hides all options
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
    activitiesCost.innerHTML = `Total: $${activitesTotalCost}`; // Updates the innerHTML and displays the totalcost on the page.
    isAnyInputChecked(activites, activitesSection);
});

// listens for a change in the paymentMethodSelect
paymentMethodSelect.addEventListener('change', (e) => {
    const paymentType = e.target.value; // Stores the selected payment method value.
    paymentMethods.forEach( element => {
        if (element.id === paymentType) { // Displays the paymentmethod with an id that matches the selected payment method value.
            element.style.display = '';
        } else if (element.id !== paymentType && !element.classList.contains('payment-method-box')){ // Removes all other payment methods.
            element.style.display = 'none';
        }
    });
});


// Adds the focus class to the the activitie boxes on focus
activitesSection.addEventListener('focus', (e) => {
    const focusTarget = e.target;
    focusTarget.parentNode.classList.add('focus');
}, true);

// Removes the focus class from the the activitie boxes on blur
activitesSection.addEventListener('blur', (e) => {
    const focusTarget = e.target;
    focusTarget.parentNode.classList.remove('focus');
}, true);



// OnkeyUp validations
// Listens for a keyup in the selected fields and validates the field.
nameField.addEventListener('keyup', () => {
    validateField(nameInput, nameValidation);
    conditionalErrorText(nameInput, nameErrorOne, nameErrorTwo);
});
emailField.addEventListener('keyup', () => {
    validateField(emailInput, emailValidation);
    conditionalErrorText(emailInput, emailErrorOne, emailErrorTwo);
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



// Listens for a submit event.
    // Validates all elements, if any element returns false, prevent default, else submit
form.addEventListener('submit', (e) => {
    validationStatus = validateAllElements(); 
    if (validationStatus.some(element => !element)) {  
        e.preventDefault();
    }
});