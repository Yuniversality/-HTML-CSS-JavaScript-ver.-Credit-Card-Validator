// When page loads, do these functions
window.onload = function pageLoad() {
    console.log("The page has loaded"); 
    addYearOptions();
}

// Function for adding options to the year option select 
function addYearOptions()
{
    let today = new Date();  
    const yearSelect = document.getElementById("expiration_year_select"); 

    for (let i = 0; i <= 10; i++)
    {
        const newOption = document.createElement("option");
        newOption.textContent = Number(today.getFullYear()) + i;
        yearSelect.append(newOption);
    } 
}

// Function to change the credit card logo in the credit card input field
// based on what the user types in
function identifyCreditCard()
{
    const userInput = document.getElementById("credit_card_number_input");
    const inputString = (userInput.value).toString();
    const inputAddon = document.getElementById("credit_card_logo");
    const errorLabel = document.getElementById("invalid_credit_card_label");
    //errorLabel.textContent = " ";

    const firstDigit = Number(inputString[0]);
    const first2Digits = Number(inputString.substring(0,2));
    const first3Digits = Number(inputString.substring(0,3));
    const first4Digits = Number(inputString.substring(0,4));
    const first6Digits = Number(inputString.substring(0,6));

    // Switch statement based on first digit of credit card number
    switch(firstDigit)
    {
        // JCB card, starts with 1800 and has length 15
        case 1:
            inputAddon.src = "img/Diners_Club_Logo3.svg";
            inputAddon.setAttribute("title", "Diners Club");

            // If the number is too long or does not have 1800 at the front, then it is not a Diners Club card
            if ((inputString.length > 15) || ((inputString.length == 2) && (first2Digits != 18))
            || ((inputString.length == 3) && (first3Digits != 180)) 
            || ((inputString.length >= 4) && (first4Digits != 1800)))
            {
                inputAddon.src = "img/Blue_question_mark_icon.svg";
                inputAddon.setAttribute("title", "Unknown");
            }
            break;

        /*
        *   Can be a Mastercard or JCB card
        *   Mastercards 2-series start with 2 and have length 16
        *   JCB card may start with 2123 and has length 15
        */ 
        case 2:
            inputAddon.src = "img/Mastercard_2019_logo.svg";
            inputAddon.setAttribute("title", "Mastercard");

            // If it starts with 21, then we assume it's a JCB card
            if (first2Digits == 21)
            {
                inputAddon.src = "img/JCB_logo.svg";
                inputAddon.setAttribute("title", "JCB");

                // If it's more than 15 digits or doesn't start with 2123, then it's not a JCB card
                if ((inputString.length > 15)
                || ((inputString.length == 3) && (first3Digits != 212)) 
                || ((inputString.length == 4) && (first4Digits != 2123)))
                {
                    inputAddon.src = "img/Blue_question_mark_icon.svg";
                    inputAddon.setAttribute("title", "Unknown");
                }
            }

            // If it's more than 16 digits, then it's not a Mastercard
            else if (inputString.length > 16)
            {
                inputAddon.src = "img/Blue_question_mark_icon.svg";
                inputAddon.setAttribute("title", "Unknown");
            }
            break;

        /*
        *   Can be AMEX, Diners Club, or JCB card
        *   AMEX start with 37 or 34 and have length 15
        *   Diners Club starting with 3 have starts ranging
        *       from 300-305 (inclusive), 309, 36, 38, or 39
        *       and have length 14
        *   JCB cards can also start with 3 and have length 16
        */
        case 3:
            inputAddon.src = "img/JCB_logo.svg";
            inputAddon.setAttribute("title", "JCB");

            // If it starts with a 34 or 37, then we assume it's an AMEX
            if ((first2Digits == 34) || (first2Digits == 37))
            {
                inputAddon.src = "img/American_Express_logo_(2018).svg";
                inputAddon.setAttribute("title", "AMEX");

                // If it's longer than 15 digits, then it's not an AMEX
                if (inputString.length > 15)
                {
                    inputAddon.src = "img/Blue_question_mark_icon.svg";
                    inputAddon.setAttribute("title", "Unknown");
                }
            }

            // Handle Diners Club card cases
            else if (((first3Digits >= 300) && (first3Digits <= 305))
            || (first3Digits == 309) || (first3Digits == 36)
            || (first2Digits == 38) || (first2Digits == 39))
            {
                inputAddon.src = "img/Diners_Club_Logo3.svg";
                inputAddon.setAttribute("title", "Diners Club");

                // If it's longer than 14 digits, then it's not a Doners Club card
                if (inputString.length > 14)
                {
                    inputAddon.src = "img/Blue_question_mark_icon.svg";
                    inputAddon.setAttribute("title", "Unknown");
                }
            }

            // If it's more than 16 digits long, then it's not a JCB card
            else if (inputString.length > 16)
            {
                inputAddon.src = "img/Blue_question_mark_icon.svg";
                inputAddon.setAttribute("title", "Unknown");
            }
            break;

        // Visa card, start with 4 and have length 13 or 16
        case 4:
            inputAddon.src = "img/Visa_2021.svg";
            inputAddon.setAttribute("title", "Visa");

            // If the number is too long, then it is not a Visa card
            if (inputString.length > 16)
            {
                inputAddon.src = "img/Blue_question_mark_icon.svg";
                inputAddon.setAttribute("title", "Unknown");
            }
            break;

        // Mastercard, starts with 5 and have 16 digits
        case 5:
            inputAddon.src = "img/Mastercard_2019_logo.svg";
            inputAddon.setAttribute("title", "Mastercard");

            // If the number is too long, then it is not a Mastercard card
            if (inputString.length > 16)
            {
                inputAddon.src = "img/Blue_question_mark_icon.svg";
                inputAddon.setAttribute("title", "Unknown");
            }
            break;

        /*
        *   Can be a Discover or UnionPay card
        *   Discover cards can start with 6011, 65, 
        *       622126‑622925 (inclusive), 644-649 (inclusive)
        *       and have length 16
        *   UnionPay cards start with 62 and have length 16-19 (inclusive)
        *   Arbitrarily, I will have 62 numbers first show up as UnionPay cards 
        *       even though they can be Discover cards
        */
        case 6:
            inputAddon.src = "img/Blue_question_mark_icon.svg";
            inputAddon.setAttribute("title", "Unknown");

            // Handle Discover card cases
            if ((inputString.length <= 16) 
            && ((first2Digits == 65) || (first4Digits == 6011)
            || ((first3Digits >= 644) && (first3Digits <= 649)) 
            || ((first6Digits >= 622126) && (first6Digits <= 622925))))
            {
                inputAddon.src = "img/Discover_Card_logo.svg";
                inputAddon.setAttribute("title", "Discover");

            }

            // If it starts with 62, then it is a UnionPay card
            else if ((inputString.length <= 19) && (first2Digits == 62))
            {
                inputAddon.src = "img/UnionPay_logo.svg";
                inputAddon.setAttribute("title", "UnionPay");
            }
            else 
            {
                inputAddon.src = "img/Blue_question_mark_icon.svg";
                inputAddon.setAttribute("title", "Unknown");
            }
            break;
        
        // For all the other cases
        default:
            inputAddon.src = "img/Blue_question_mark_icon.svg";
            // Can also do: inputAddon.setAttribute("src", "../img/Blue_question_mark_icon.svg");
            inputAddon.setAttribute("title", "Unknown");
            break;
    }
}

// Event listener that triggers these functions when the "submit" button is clicked
document.getElementById("submit_button").onclick = function() {
    //passesLuhnsAlgorithm();
    validateDropdownInputs();
    validateCreditCardInput();
    validateOtherInputs();
};

// Checks to see if the inputted credit card number is valid by seeing if it
// passes Luhn's Algorithm
function passesLuhnsAlgorithm()
{
    /* 
	*   For keeping track of every other digit to double.
	*   Since the for loop starts at the last credit card digit, we
	*   set position = 1 so every even number is a number we need to 
	*   do the double procedure on while the odd numbers we just add.
	*/
    let position = 1;
    var sum = 0;
    
    const creditCardNumber = document.getElementById("credit_card_number_input");
    const creditCardNumberInput = creditCardNumber.value;
    for (let i = (creditCardNumberInput.length - 1); i >= 0; i--)
	{
		// For even positions
		if ((position % 2) == 0)
		{
			// If the digit is at an even position, double it
			let digitNum = Number(creditCardNumberInput[i]) * 2;
			// If the product is >=10, then we add the digits of the 
			// product together then add them to the sum
			if (digitNum >= 10)
			{
				let digit1 = Math.floor(digitNum / 10);
				let digit2 = digitNum % 10;
				sum = sum + digit1 + digit2;
			}
            // If the product is <10, then add it normally
			else
			{
				sum = sum + digitNum;
			}
		}
		// For odd positions
        // Add the digit to the sum normally
		else
		{
			sum = sum + Number(creditCardNumberInput[i]);
		}
		position++;
	}

	// If the mod = 0, then we return true, else false
    // Need to round first because sometimes the sum is a float, not an int
    return !(Math.floor(sum) % 10);
}

// See if the user put in valid input for the credit card number and tells
// them where the input is invalid
function validateCreditCardInput()
{
    const userInput = document.getElementById("credit_card_number_input");
    const inputString = (userInput.value).toString();
    const creditCardErrorLabel = document.getElementById("invalid_credit_card_label");
    if (inputString.length <= 0)
    {
        creditCardErrorLabel.textContent = "Please enter a credit card number";
    }
    else if (!passesLuhnsAlgorithm())
    {
        creditCardErrorLabel.textContent = "Invalid credit card number";
    }
    else
    {
        creditCardErrorLabel.textContent = "";
    }
}

// See if the user put in valid input for the other input fields and tells
// them where the input is invalid
function validateOtherInputs()
{
    let emptyInputErrorDetected = 0;
    let invalidInputErrorDetected = 0;
    let noInputErrorText = "Please enter something for: ";
    let invalidInputErrorText = "Please enter valid input for: ";
    
    // Test if CVV field is empty or invalid
    const cvvInput = document.getElementById("cvv_input");
    const cvvInputText = cvvInput.value;
    if (cvvInputText.length <= 0)
    {
        noInputErrorText += "CVV ";
        emptyInputErrorDetected++;
    }
    else if (cvvInputText.length > 4)
    {
        invalidInputErrorText += "CVV ";
        invalidInputErrorDetected++;
    }
    
    // Test if the First Name field is empty
    const firstNameInput = document.getElementById("first_name_input");
    const firstNameInputText = firstNameInput.value;
    if (firstNameInputText.length <= 0)
    {
        noInputErrorText += "First Name ";
        emptyInputErrorDetected++;
    }

    // Test if the Last Name field is empty
    const lastNameInput = document.getElementById("last_name_input");
    const lastNameInputText = lastNameInput.value;
    if (lastNameInputText.length <= 0)
    {
        noInputErrorText += "Last Name ";
        emptyInputErrorDetected++;
    }

    // Test if the Address field is empty
    const addressInput = document.getElementById("address_input");
    const addressInputText = addressInput.value;
    if (addressInputText.length <= 0)
    {
        noInputErrorText += "Address ";
        emptyInputErrorDetected++;
    }

    // Test if the City field is empty
    const cityInput = document.getElementById("city_input");
    const cityInputText = cityInput.value;
    if (cityInputText.length <= 0)
    {
        noInputErrorText += "City ";
        emptyInputErrorDetected++;
    }

    // Test if the Zip Code field is empty or valid
    const zipCodeInput = document.getElementById("zip_code_input");
    const zipCodeInputText = zipCodeInput.value;
    if (zipCodeInputText.length <= 0)
    {
        noInputErrorText += "Zip Code ";
        emptyInputErrorDetected++;
    }
    else if (zipCodeInputText.length != 5)
    {
        invalidInputErrorText += "Zip Code ";
        invalidInputErrorDetected++;
    }

    // Display empty input errors
    const noInputErrorLabel = document.getElementById("no_input_error_label");
    if (emptyInputErrorDetected)
    {
        noInputErrorLabel.textContent = noInputErrorText;
    }
    else
    {
        noInputErrorLabel.textContent = "";
    }

    // Display invalid input errors
    const invalidInputErrorLabel = document.getElementById("invalid_input_error_label");
    if (invalidInputErrorDetected)
    {
        invalidInputErrorLabel.textContent = invalidInputErrorText;
    }
    else 
    {
        invalidInputErrorLabel.textContent = "";
    }
}

// See if the user actually made a choice for the dropdown inputs and 
// if not, then tell them to
function validateDropdownInputs()
{
    let errorText = "Please make a choice for: ";
    let errorDetected = 0;
    const monthSelect = document.getElementById("expiration_month_select");
    const monthSelectText = monthSelect.options[monthSelect.selectedIndex].text;
    if (monthSelectText == "Month")
    {
        errorText += "Month ";
        errorDetected++;
    }

    const yearSelect = document.getElementById("expiration_year_select");
    const yearSelectText = yearSelect.options[yearSelect.selectedIndex].text;
    if (yearSelectText == "Year")
    {
        errorText += "Year ";
        errorDetected++;
    }
    
    const stateSelect = document.getElementById("state_select");
    const stateSelectText = stateSelect.options[stateSelect.selectedIndex].text;
    if (stateSelectText == "Choose State")
    {
        errorText += "State ";
        errorDetected++;
    }

    const dropdownsErrorLabel = document.getElementById("dropdowns_error_label");
    if (errorDetected)
    {
        dropdownsErrorLabel.textContent = errorText;
    }
    else
    {
        dropdownsErrorLabel.textContent = "";
    }
}
