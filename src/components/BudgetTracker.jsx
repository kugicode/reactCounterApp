import { useState, useEffect } from "react"

function BudgetTracker (){
const [isFirstLoad, setIsFirstLoad] = useState(true);
const [balance, setBalance] = useState(0);
const [isAutoClickerOn, setIsAutoClickerOn] = useState(false);
const [transactions, setTransactions] = useState([]);
const [amount, setAmount] = useState(0);
const [description, setDescription] = useState("");

const handleIncrement = () => {
    if(description === "" || amount <=0){
        alert("Please add a valid description amount!");
        return
    }
  setBalance(prevBalance => prevBalance + Number(amount));
  setTransactions(prevTransactions => [...prevTransactions, `Income + ${description}: $${amount}`]);
  setAmount(0);
  setDescription("");
}

const handleDecrement = () => {
    if(description === "" || amount <= 0){
        alert("Please enter a valid description amount!");
        return
    }
   if (balance >= Number(amount)){
    const expenseAmount = Number(amount);
    setBalance(prev => prev - expenseAmount);
    setTransactions(prev => [...prev, `Expense - ${description}: -$${expenseAmount}`]);
    setAmount(0);
    setDescription("");
   }
   else{
    alert("Not enough balance!");
   }
}

const toggleAutoClicker = () => {
setIsAutoClickerOn(!isAutoClickerOn);
}

const handleReset = () => {
    console.log("Counter has been reset!");
    setBalance(0);
    setTransactions([]);
    localStorage.removeItem("balance");
    localStorage.removeItem("transactions");
}

const handleClearHistory = () => {
    setTransactions([]);
  
}

const handleDeleteTransaction = (index) => {
    setTransactions(prev => prev.filter((item, i) => i !== index))
}

useEffect(() => {
const savedBalance = localStorage.getItem("balance");
if(savedBalance){
    setBalance(JSON.parse(savedBalance));
}

const savedTransactions = localStorage.getItem("transactions");
if(savedTransactions){
    setTransactions(JSON.parse(savedTransactions));
}

setIsFirstLoad(false)

}, []) // Empty array = runs once when app starts!

useEffect(() => {
    if(!isFirstLoad){
 localStorage.setItem("balance", JSON.stringify(balance));
    }
},[balance]);

useEffect(() => {
    if(!isFirstLoad){
localStorage.setItem("transactions", JSON.stringify(transactions));
    }
},[transactions])

useEffect (() => {
if (isAutoClickerOn) {
    const interval = setInterval(() => {
        setBalance(prev => prev + 1)

    }, 1000);

    return () => clearInterval(interval) ;
}


}, [isAutoClickerOn])

    return (
        <>
        <h2 style={{textAlign: "center", color: "darkcyan"}}>Budget Tracker</h2>
        <h1 style={{ color: balance >= 10 ? 'orange' : 'black' }}>{ balance }</h1>
        <h2>Total income: {transactions.filter(item => item.includes("Income"))
        .map(item => Number(item.split("$")[1])) //extract the number here
        .reduce((total, num) => total + num, 0)
        }
        </h2>
        <h2>Total expense: { transactions.filter(item => item.includes("Expense"))
        .map(item => Number(item.split("-$")[1]))
        .reduce((total, num) => total + num, 0)
         }
        </h2>
     <button onClick={handleIncrement} style={{ backgroundColor: "green", color: "white" }}>Level Up</button>
     <button onClick={handleDecrement} style={{ backgroundColor: "red", color: "white" }}>Level Down</button>
     <button onClick={handleReset}>Reset</button>
    {transactions.length > 0 && <button onClick={handleClearHistory}>Clear History</button> }
     <button onClick={toggleAutoClicker}>
        { isAutoClickerOn ? "stop" : "start" }
     </button>
        <input type="text" placeholder="What did you buy?" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>
     {/* {count >= 10 ? <p>MAX POWER REACHED! ⚡</p> : <p></p>} */}
     {balance >= 10 && <p>MAX POWER REACHED! ⚡</p>}
     <ul>
        {transactions.map((item, index) => (
            <li key={index} style={{color: item.includes("Income")? "green" : "red"}}>{item} 
            <button onClick={() =>handleDeleteTransaction(index)} style={{
                backgroundColor: "red",
                color: "white",
                padding: "2px 6px",
                borderRadius: "6px",
                marginLeft: "2px"
            }}>X</button></li>
        ))}
     </ul>
        </>
    )

} 

export default BudgetTracker