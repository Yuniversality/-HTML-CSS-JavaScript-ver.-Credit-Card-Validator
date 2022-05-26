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
    console.log(userInput.value);
    let inputString = (userInput.value).toString();
    console.log(inputString.length);
    const inputAddon = document.getElementById("credit_card_logo");
    const errorLabel = document.getElementById("invalid_credit_card_label");
    errorLabel.textContent = " ";

    let firstDigit = Number(inputString[0]);
    let first2Digits = Number(inputString.substring(0,2));
    let first3Digits = Number(inputString.substring(0,3));
    let first4Digits = Number(inputString.substring(0,4));
    let first6Digits = Number(inputString.substring(0,6));

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
            if ((inputString.length <= 16) && (first2Digits == 65)
            || ((first3Digits >= 644) && (first3Digits <= 649))
            || ((first6Digits >= 622126) && (first6Digits <= 622925)))
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

function passesLuhnsAlgorithm(creditCardNumber)
{
    let runningSum = 0;
    
}
