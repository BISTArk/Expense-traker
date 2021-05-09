const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const tex = document.getElementById('name');
const amount = document.getElementById('amount');
const reset = document.getElementById('reset');

localStorage.setItem('transactions',null);


const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
);
  
let transactionsvar = localStorage.getItem('transactions') !== 'null' ? localStorageTransactions:[];

function generateId(){
    return Math.floor(Math.random()*1000000);
}

function addtransaction(e){
    e.preventDefault();

    const trans = {
        transid: generateId(),
        text: tex.value,
        amt: amount.value
    };

    transactionsvar.push(trans);

    addtransDOM(trans);
    updateUI();
    updateStorage();

    tex.value = '';
    amount.value = '';
}

function removetrans(id){
    transactionsvar = transactionsvar.filter(t=>t.transid !== id);

    updateStorage();
    init();
    updateUI();
}

function addtransDOM(trans){

    const sign = trans.amt<0?'-':'+';

    const item = document.createElement('li');

    item.classList.add(trans.amt>=0?'plus':'minus')

    item.innerHTML=`
        ${trans.text}<span>${sign}${Math.abs(trans.amt)}</span>
        <button class="del-btn" onClick="removetrans(${trans.transid})">x</button>
    `

    list.appendChild(item);
}

function updateUI(){
    const amts = transactionsvar.map(transactionvar => transactionvar.amt).map(Number);
    const total = parseFloat(amts.reduce((x,y)=>x+=y, 0)).toFixed(2);

    const totalincome = parseFloat(amts.filter(x=>x>0).reduce((y,z)=>y+=z,0)).toFixed(2);
    const totalexpense = parseFloat(amts.filter(x=>x<0).reduce((y,z)=>y+=z,0)).toFixed(2);

    balance.innerText = `$${total}`;
    income.innerText = `$${totalincome}`;
    expense.innerText = `$${totalexpense}`;

}

function updateStorage(){
localStorage.setItem('transactions',JSON.stringify(transactionsvar));
}

function init() {
    list.innerHTML = '';
  
    transactionsvar.forEach(addtransDOM);
    updateUI();
}

function rese(e){
    e.preventDefault();

    localStorage.setItem('transactions',[]);
    transactionsvar = []
    init();
}



init();

reset.addEventListener('click',rese);
form.addEventListener('submit',addtransaction);