import { useState, useEffect } from "react"

function Counter (){
const [balance, setBalance] = useState(0);
const [isAutoClickerOn, setIsAutoClickerOn] = useState(false);
const [transactions, setTransactions] = useState([]);
const [amount, setAmount] = useState(0);
const [description, setDescription] = useState("");

const handleIncrement = () => {
  setBalance(prevBalance => prevBalance + Number(amount));
  setTransactions(prevTransactions => [...prevTransactions, `${description}: $${amount}`]);
  setAmount(0);
  setDescription("");
}

const handleDecrement = () => {
   if (balance >= amount){
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
}

const handleClearHistory = () => {
    setTransactions([]);
  
}

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
        <h1 style={{ color: balance >= 10 ? 'orange' : 'black' }}>{ balance }</h1>
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
            <li key={index}>{item}</li>
        ))}
     </ul>
        </>
    )

} 

export default Counter