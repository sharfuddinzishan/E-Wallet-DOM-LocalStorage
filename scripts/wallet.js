/*************************
 * Get Common Element Path 
 * ********************* */
const header = document.getElementById('header');
const totalBalance = document.getElementById('totalBalance');
const totalIncome = document.getElementById('totalIncome');
const totalExpenses = document.getElementById('totalExpenses');
const transactionType = document.getElementById('transactionType');
const transactionNote = document.getElementById('transactionNote');
const transactionAmount = document.getElementById('transactionAmount');
const transactionSubmit = document.getElementById('transactionSubmit');
const transactionHistory = document.getElementById('transactionHistory');
const inputError = document.getElementById('inputError');

/********************************************
 * When Submit Button Triggered
 * **************************************** */
transactionSubmit.addEventListener('click', invokeTransaction);
function invokeTransaction() {
    // Get inputs and Validate
    let typeInput = parseInt(transactionType.value);
    let noteInput = transactionNote.value;
    let amountInput = parseInt(transactionAmount.value);
    if (!noteInput || amountInput <= 0) {
        // Show Error 
        displayInputError(1);
        return;
    }
    // Hide Error 
    displayInputError(0);
    // Update localStorage Statement Key
    updateStatement(statementParse, typeInput, amountInput, noteInput, new Date().toUTCString());
    // Update localStorage Wallet Key 
    updateWallet(walletParse, typeInput, amountInput);
    // Update Page Balance and Statement Section 
    balanceSectionUpdate(walletParse);
    statementSectionUpdate(statementParse);
}

/*****************************************
 * Get Item From Local Storage
 * ************************************ */
let getWallet = () => {
    if (localStorage.getItem("wallet"))
        return localStorage.getItem("wallet");
    else {
        const walletInfo = {
            income: 0,
            expense: 0,
            balance: 0
        };
        localStorage.setItem('wallet', JSON.stringify(walletInfo));
        return localStorage.getItem("wallet");
    }
}
let getStatement = () => {
    if (localStorage.getItem("statement"))
        return localStorage.getItem("statement");
    else {
        const statementInfo = [];
        localStorage.setItem('statement', JSON.stringify(statementInfo));
        return localStorage.getItem("statement");
    }
}
/*****************************************
 * Update Local Storage
 * ************************************* */
let updateWallet = (walletObj, actionType, amountGiven) => {
    if (actionType) {
        walletObj.income += amountGiven;
        walletObj.balance = walletObj.income - walletObj.expense;
    }
    else {
        walletObj.expense += amountGiven;
        walletObj.balance = walletObj.income - walletObj.expense;
    }
    localStorage.setItem('wallet', JSON.stringify(walletObj));
    // return walletObj;
}
let updateStatement = (statementsArray, typeTransaction, amountRequest, textSummary, triggerTime) => {
    let statementObj = {};
    statementObj.summary = textSummary;
    statementObj.time = triggerTime;
    statementObj.amount = amountRequest;
    statementObj.type = typeTransaction == 1 ? '+' : '-';
    statementsArray.unshift(statementObj);
    localStorage.setItem('statement', JSON.stringify(statementsArray));
    // return statementsArray;
}
/******************************************
 * Update Page Information for 
 * Balance and Transaction History
 * ************************************* */
let balanceSectionUpdate = walletObj => {
    let { income, expense, balance } = walletObj;
    balance <= 0 ?
        `${header.classList.toggle("bg-danger", true)} ${header.classList.toggle("bg-success", false)}`
        : `${header.classList.toggle("bg-danger", false)} ${header.classList.toggle("bg-success", true)}`;
    totalBalance.innerText = balance;
    totalIncome.innerText = income;
    totalExpenses.innerText = expense;
}
let statementSectionUpdate = statementsArray => {
    transactionHistory.innerHTML = "";
    statementsArray.forEach(statement => {
        let listItem = document.createElement('li');
        listItem.className = "list-group-item list-group-item-action text-break";
        listItem.innerHTML = `
            <div class="d-flex flex-column flex-sm-row justify-content-between">
                <h5 class="mb-1 fw-bold">${statement.summary}</h5>
                <small class="${statement.type === '+' ? `text-success` : `text-danger`} fw-bold fs-3">${statement.type + '$' + statement.amount}</small>
            </div>
            <small class="text-muted">${statement.time}</small>
            `
        transactionHistory.appendChild(listItem);
    });
}
/*****************************************
 * Error Displayed Section
 * ************************************* */
let displayInputError = (isDisplayed) => {
    if (isDisplayed) {
        inputError.classList.toggle('d-none', false)
    }
    else {
        inputError.classList.toggle('d-none', true)
    }
}
/*************************************
 * onLoad Page Action
 * ********************************* */
displayInputError(0); // Disable Display Error Message 
// Get Data From Local Storage 
let walletParse = JSON.parse(getWallet());
let statementParse = JSON.parse(getStatement());
// Display Data from localStorage to Page
balanceSectionUpdate(walletParse);
statementSectionUpdate(statementParse);