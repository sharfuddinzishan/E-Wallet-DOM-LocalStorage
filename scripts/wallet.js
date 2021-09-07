const header = document.getElementById('header');
const totalBalance = document.getElementById('totalBalance');
const totalIncome = document.getElementById('totalIncome');
const totalExpenses = document.getElementById('totalExpenses');
const transactionType = document.getElementById('transactionType');
const transactionNote = document.getElementById('transactionNote');
const transactionAmount = document.getElementById('transactionAmount');
const transactionSubmit = document.getElementById('transactionSubmit');
const transactionHistory = document.getElementById('transactionHistory');

transactionSubmit.addEventListener('click', invokeTransaction);

function invokeTransaction() {
    let typeInput = parseInt(transactionType.value);
    let noteInput = transactionNote.value;
    let amountInput = parseInt(transactionAmount.value);
    if (!noteInput || amountInput <= 0) {
        return
    }
    let parseWallet = JSON.parse(getWallet());
    let objWallet = updateWallet(parseWallet, typeInput, amountInput);
    updateBalanceSection(objWallet)
}

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
    return walletObj;
}
let updateBalanceSection = walletObj => {
    let { income, expense, balance } = walletObj;
    totalBalance.innerText = balance;
    totalIncome.innerText = income;
    totalExpenses.innerText = expense;
}