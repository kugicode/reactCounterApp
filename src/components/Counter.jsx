import { useState, useEffect } from "react"

function Counter (){
const [count, setCount] = useState(0);
const [isAutoClickerOn, setIsAutoClickerOn] = useState(false);
const [history, setHistory] = useState([]);

const handleIncrement = () => {
  setCount(count + 1);
  setHistory([...history, count + 1]);
}

const handleDecrement = () => {
   if (count > 0){
    setCount(count - 1)
   }
}

const toggleAutoClicker = () => {
setIsAutoClickerOn(!isAutoClickerOn);
}

const handleReset = () => {
    console.log("Counter has been reset!");
    setCount(0);
}

const handleClearHistory = () => {
    setHistory([]);
}

useEffect (() => {
if (isAutoClickerOn) {
    const interval = setInterval(() => {
        setCount(prev => prev + 1)

    }, 1000);

    return () => clearInterval(interval) ;
}


}, [isAutoClickerOn])

    return (
        <>
        <h1 style={{ color: count >= 10 ? 'orange' : 'black' }}>{ count }</h1>
     <button onClick={handleIncrement} style={{ backgroundColor: "green", color: "white" }}>Level Up</button>
     <button onClick={handleDecrement} style={{ backgroundColor: "red", color: "white" }}>Level Down</button>
     <button onClick={handleReset}>Reset</button>
     <button onClick={handleClearHistory}>Clear History</button>
     <button onClick={toggleAutoClicker}>
        { isAutoClickerOn ? "stop" : "start" }
     </button>
     {/* {count >= 10 ? <p>MAX POWER REACHED! ⚡</p> : <p></p>} */}
     {count >= 10 && <p>MAX POWER REACHED! ⚡</p>}
     <ul>
        {history.map((item, index) => (
            <li key={index}>Level up to {item}</li>
        ))}
     </ul>
        </>
    )

} 

export default Counter