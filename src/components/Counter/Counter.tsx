import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  reset,
  incrementByAmount,
  decrementByAmount,
} from "../../state/counterSlice";
import type { RootState, AppDispatch } from "../../state/store";

const Counter = () => {
  const [num, setNum] = useState<number>(0);
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch: AppDispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(incrementByAmount(num));
  };

  const handleDecrement = () => {
    dispatch(decrementByAmount(num));
  };

  const handleReset = () => {
    dispatch(reset());
  };

  const handleIncrementOne = () => {
    dispatch(increment());
  };

  const handleDecrementOne = () => {
    dispatch(decrement());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNum(Number(e.target.value));
  };
  return (
    <>
      <p>Счетчик: {count}</p>
      <input type="number" value={num} onChange={handleChange} />
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
      <button onClick={handleIncrementOne}>+ 1</button>
      <button onClick={handleDecrementOne}>- 1</button>
      <button onClick={handleReset}>Зброс</button>
    </>
  );
};

export default Counter;
