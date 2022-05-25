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

    // Switch statement based on first digit of credit card number
    switch(Number(inputString[0]))
    {
        // JCB card, starts with 1800 and has length 15
        case 1:
            inputAddon.src = "../img/Diners_Club_Logo3.svg";
            inputAddon.setAttribute("title", "Diners Club");

            // If the number is too long or does not have 1800 at the front, then it is not a Diners Club card
            if ((inputString.length > 15) || ((inputString.length == 2) && (inputString.substring(0,2) != "18"))
                || ((inputString.length == 3) && (inputString.substring(0,3) != "180")) 
                || ((inputString.length >= 4) && (inputString.substring(0,4) != "1800")))
            {
                inputAddon.src = "../img/Blue_question_mark_icon.svg";
                inputAddon.setAttribute("title", "Unknown");
            }
            break;

        /*
        *   Can be a Mastercard or JCB card
        *   Mastercards 2-series start with 2 and have length 16
        *   JCB card may start with 2123 and has length 15
        */ 
        case 2:
            inputAddon.src = "../img/Mastercard_2019_logo.svg";
            inputAddon.setAttribute("title", "Mastercard");

            // If it starts with 21, then we assume it's a JCB card
            if (inputString.substring(0,2) == "21")
            {
                inputAddon.src = "../img/JCB_logo.svg";
                inputAddon.setAttribute("title", "JCB");

                // If it's more than 15 digits or doesn't start with 2123, then it's not a JCB card
                if ((inputString.length > 15)
                     || ((inputString.length == 3) && (inputString.substring(0,3) != "212")) 
                     || ((inputString.length == 4) && (inputString.substring(0,4) != "2123"))
                    )
                {
                    inputAddon.src = "../img/Blue_question_mark_icon.svg";
                    inputAddon.setAttribute("title", "Unknown");
                }
            }
            // If it's more than 16 digits, then it's not a Mastercard
            else if (inputString.length > 16)
            {
                inputAddon.src = "../img/Blue_question_mark_icon.svg";
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

            break;

        // Visa card, start with 4 and have length 13 or 16
        case 4:
            inputAddon.src = "../img/Visa_2021.svg";
            inputAddon.setAttribute("title", "Visa");

            // If the number is too long, then it is not a Visa card
            if (inputString.length > 16)
            {
                inputAddon.src = "../img/Blue_question_mark_icon.svg";
                inputAddon.setAttribute("title", "Unknown");
            }
            break;

        // Mastercard, starts with 5 and have 16 digits
        case 5:
            inputAddon.src = "../img/Mastercard_2019_logo.svg";
            inputAddon.setAttribute("title", "Mastercard");

            // If the number is too long, then it is not a Mastercard card
            if (inputString.length > 16)
            {
                inputAddon.src = "../img/Blue_question_mark_icon.svg";
                inputAddon.setAttribute("title", "Unknown");
            }
            break;

        /*
        *   Can be a Discover or UnionPay card
        *   Discover cards can start with 6011, 65, 
        *       622126‑622925 (inclusive), 644-649 (inclusive)
        *       and have length 16
        *   UnionPay cards start with 62 and have length 16-19 (inclusive)
        *   Arbitrarily, I will have 62 numbers show up as UnionPay cards even
        *       though they can be Discover cards
        */
        case 6:
            
            break;
        default:
            inputAddon.src = "../img/Blue_question_mark_icon.svg";
            // Can also do: inputAddon.setAttribute("src", "../img/Blue_question_mark_icon.svg");
            inputAddon.setAttribute("title", "Unknown");
            break;
    }
}

function passesLuhnsAlgorithm(creditCardNumber)
{
    let runningSum = 0;
    
}
