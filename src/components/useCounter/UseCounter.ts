import { useDebugValue, useState } from "react";

type IUseCounter = [number, () => void, () => void, () => void];

export function useCounter(initialValue: number, addSum: number): IUseCounter {
  const [count, setCount] = useState<number>(initialValue);

  useDebugValue(count);

  const increment = () => {
    setCount((prevState) => prevState + addSum);
  };

  const decrement = () => {
    setCount((prevState) => prevState - addSum);
  };

  const reset = () => {
    setCount(initialValue);
  };

  return [count, increment, decrement, reset];
}
