import React, { useEffect, useState } from "react";
import useGuestTodo from "../context/GuestTodoContext";

const Section = ({ todo }) => {
  const [inputVal, setInputVal] = useState("");
  const [inputVal2, setInputVal2] = useState("");
  const [result, setResult] = useState("");
  const [selectState, setSelectState] = useState("you");
  const { updateSplitBillMessage } = useGuestTodo();

  useEffect(() => {
    const input = Number(inputVal);
    const input2 = Number(inputVal2);

    if (input2 > input) {
      setInputVal2(input.toString()); // Reset inputVal2 to inputVal if it exceeds
    }

    const subtractionResult = input - input2;
    setResult(subtractionResult);
  }, [inputVal, inputVal2]);

  const handleInputValChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      // Allow only numbers and decimal points
      setInputVal(value);
    }
  };

  const handleInputVal2Change = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) && Number(value) <= Number(inputVal)) {
      // Allow only numbers and ensure inputVal2 does not exceed inputVal
      setInputVal2(value);
    }
  };

  const splitBill = () => {
    let message = "";
    if (selectState === "you") {
      message = `${todo.name} owes you $${result}`;
    } else if (selectState === todo.name) {
      message = `You owe ${todo.name} $${result}`;
    }
    updateSplitBillMessage(todo.id, message);
    setInputVal("");
    setInputVal2("");
    setSelectState("");
  };

  return (
    <div>
      <h2 className="font-bold text-3xl text-gray-600">
        Split a bill with {todo.name}
      </h2>
      <div className="mt-6 flex flex-col gap-y-2">
        <div className="flex justify-between">
          <p className="font-semibold text-gray-700">💰 Bill Value</p>
          <input
            type="text"
            value={inputVal}
            className="focus:outline-none text-center max-w-[8rem] rounded border border-orange-200 p-1"
            onChange={handleInputValChange}
          />
        </div>
        <div className="flex justify-between">
          <p className="font-semibold text-gray-700">🧍‍♀️ Your Expense</p>
          <input
            type="text"
            value={inputVal2}
            onChange={handleInputVal2Change}
            className="focus:outline-none text-center max-w-[8rem] rounded border border-orange-200 p-1"
          />
        </div>
        <div className="flex justify-between">
          <p className="font-semibold text-gray-700">👫 {`${todo.name}`} Expense</p>
          <input
            type="text"
            value={result}
            disabled
            className="focus:outline-none max-w-[8rem] text-center rounded border border-orange-200 p-1"
          />
        </div>
        <div className="flex justify-between">
          <p className="font-semibold text-gray-700">🤑 Who is paying bill</p>
          <select
            onChange={(e) => setSelectState(e.target.value)}
            value={selectState}
            className="focus:outline-none text-center w-[8rem] rounded border border-orange-200 p-1"
          >
            <option value="" disabled>
              -- Select --
            </option>
            <option value="you">you</option>
            <option value={todo.name}>{todo.name.toLowerCase()}</option>
          </select>
        </div>
        <button
          type="button"
          onClick={() => splitBill()}
          className="focus:outline-none text-sm w-[8rem] font-semibold ml-auto rounded bg-orange-300 mt-3 py-1"
        >
          Split Bill
        </button>
      </div>
    </div>
  );
};

export default Section;
