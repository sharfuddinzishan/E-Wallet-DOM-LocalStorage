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
    let type = transactionType.value;
    let note = transactionNote.value;
    let amount = transactionAmount.value;
    console.log(type, note, amount)
}