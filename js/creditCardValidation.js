// When page loads, do these functions
window.onload = function pageLoad() {
    console.log("The page has loaded"); 
    addYearOptions();
}

// Function for adding options to the year option select 
function addYearOptions()
{
    let today = new Date();  
    const yearSelect = document.getElementById("expiration_year"); 

    for (let i = 0; i <= 10; i++)
    {
        let newOption = document.createElement("option");
        newOption.textContent = Number(today.getFullYear()) + i;
        yearSelect.append(newOption);
    } 
}

function identifyCreditCard()
{
    let userInput = document.getElementById("credit_card_number_input");
    //console.log(userInput.value);
    let inputString = (userInput.value).toString();
    //console.log(inputString.length);
    const inputAddon = document.getElementById("credit_card_logo");
    const errorLabel = document.getElementById("invalid_credit_card_label");
    errorLabel.textContent = " ";
    switch(inputString.substring(0,1))
    {
        // JCB card, starts with 1800 and has length 15
        case 1:

            break;

        /*
        *   Can be a Mastercard or JCB card
        *   Mastercards 2-series start with 2 and have length 16
        *   JCB card may start with 2123 and has length 15
        */ 
        case 2:

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

            break;

        // Visa card, start with 4 and have length 13 or 16
        case 4:

            break;

        // Mastercard, starts with 5 and have 16 digits
        case 5:

            break;

        /*
        *   Can be a Discover or UnionPay card
        *   Discover cards can start with 6011, 65, 
        *       622126‑622925 (inclusive), 644-649 (inclusive)
        *       and have length 16
        *   UnionPay cards start with 62 and have length 16-19 (inclusive)
        */
        case 6:
            
            break;
        default:
            inputAddon.src = "../[JavaScript Version] Credit Card Number Validator/img/Blue_question_mark_icon.svg";
            break;
    }
    /*
    if (inputString.length == 1)
    {
        console.log("UserInput length = " + inputString.length);
        //input_addon.setAttribute("src", "../[JavaScript Version] Credit Card Number Validator/img/American_Express_logo_(2018).svg");
        input_addon.src = "../[JavaScript Version] Credit Card Number Validator/img/American_Express_logo_(2018).svg";
    }
    else
    {
        //input_addon.setAttribute("src","");
        input_addon.src = "../[JavaScript Version] Credit Card Number Validator/img/Blue_question_mark_icon.svg";
    }
    */
}

function passesLuhnsAlgorithm(creditCardNumber)
{
    let runningSum = 0;
    
}
