import { useCounter } from "../../components/useCounter/UseCounter";
import { useNavigate } from "react-router-dom";

const Authors = () => {
  const navigate = useNavigate();
  const [count, increment, decrement, reset] = useCounter(0, 5);

  const handleButtonClick = () => {
    navigate("/");
  };
  return (
    <>
      <h1>Друга сторінка Счетчик: {count}</h1>
      <button onClick={increment}>Додати</button>
      <button onClick={decrement}>Відняти</button>
      <button onClick={reset}>Зброс</button>
      <button onClick={handleButtonClick}>На головну</button>
    </>
  );
};

export default Authors;
