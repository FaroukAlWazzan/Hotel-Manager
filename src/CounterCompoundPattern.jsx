import { createContext, useContext, useState } from "react";

const CounterContext = createContext();

function CounterCompoundPattern({ children }) {
  const [count, setCount] = useState(0);

  function increment() {
    setCount((c) => c + 1);
  }
  function decrement() {
    setCount((c) => c - 1);
  }

  return (
    <CounterContext.Provider value={{ count, increment, decrement }}>
      <span>{children}</span>
    </CounterContext.Provider>
  );
}

function Count() {
  const { count } = useContext(CounterContext);
  return <span>{count}</span>;
}

function Label({ children }) {
  return <span>{children}</span>;
}

function Increment({ icon }) {
  const { increment } = useContext(CounterContext);
  return <button onClick={increment}>{icon}</button>;
}

function Decrement({ icon }) {
  const { decrement } = useContext(CounterContext);

  return <button onClick={decrement}>{icon}</button>;
}

CounterCompoundPattern.Count = Count;
CounterCompoundPattern.Increment = Increment;
CounterCompoundPattern.Decrement = Decrement;
CounterCompoundPattern.Label = Label;

export default CounterCompoundPattern;
