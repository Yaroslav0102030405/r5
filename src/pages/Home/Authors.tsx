import { useCounter } from "../../components/useCounter/UseCounter";

const Authors = () => {
  const [count, increment, decrement, reset] = useCounter(0, 5);
  return (
    <>
      <h1>Друга сторінка Счетчик: {count}</h1>
      <button onClick={increment}>Додати</button>
      <button onClick={decrement}>Відняти</button>
      <button onClick={reset}>Зброс</button>
    </>
  );
};

export default Authors;
