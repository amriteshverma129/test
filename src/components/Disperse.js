import React, { useState } from "react";

function Disperse() {
  const [value, setValue] = useState("");
  const [keepFirstOneValue, setKeepFirstOneValue] = useState("");
  const [combineBalancesValue, setConbineBalancesValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = () => {
    setErrorMessage("");
    const arr = value.split("\n").filter((item) => item?.trim() !== "");
    if (arr.length === 0) {
      setErrorMessage("Please enter the address and amount ");
      return;
    }
    const newMap = new Map();

    for (let i = 0; i < arr.length; i++) {
      const str = arr[i];
      const parts = str.split(/[=,\s]/);
      if (parts.length !== 2 || isNaN(parts[1])) {
        setErrorMessage(`Line ${i + 1} wrong amount`);
        return;
      }
      if (newMap.has(parts[0])) {
        newMap.set(parts[0], newMap.get(parts[0]) + 1);
      } else {
        newMap.set(parts[0], 1);
      }
    }
    keepFirstOne(arr);
    combineBalances(arr);
  };

  const keepFirstOne = (arr) => {
    const newMap = new Map();
    const newArr = arr.filter((str) => {
      const parts = str.split(/[=,\s]/);
      if (newMap.has(parts[0])) {
        return false;
      } else {
        newMap.set(parts[0], parts[1]);
        return true;
      }
    });
    setKeepFirstOneValue(newArr.join("\n"));
  };

  const combineBalances = (arr) => {
    const newMap = new Map();
    arr.forEach((str) => {
      const parts = str.split(/[=,\s]/);
      if (newMap.has(parts[0])) {
        newMap.set(
          parts[0],
          String(Number(newMap.get(parts[0])) + Number(parts[1]))
        );
      } else {
        newMap.set(parts[0], parts[1]);
      }
    });
    const combinedArray = [];
    newMap.forEach((value, key) => {
      combinedArray.push(key + " " + value);
    });
    setConbineBalancesValue(combinedArray.join("\n"));
  };

  return (
    <div>
      <textarea value={value} onChange={(e) => setValue(e.target.value)} />
      {errorMessage && (
        <div className="disperse-errorMessage">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
            >
              <circle
                cx="15"
                cy="15"
                r="12"
                fill="transparent"
                stroke="red"
                stroke-width="2"
              />
              <text
                x="50%"
                y="50%"
                text-anchor="middle"
                alignment-baseline="middle"
                font-size="18"
                font-weight="bold"
                fill="red"
              >
                i
              </text>
            </svg>
          </span>
          <span>{errorMessage}</span>
        </div>
      )}
      <button className="disperse-btn" onClick={() => onSubmit()}>
        Next
      </button>
      {keepFirstOneValue.trim() ? (
        <>
          <div>keepFirstOneValue</div>
          <div></div>
          <textarea value={keepFirstOneValue} />
        </>
      ) : (
        <></>
      )}
      {combineBalancesValue.trim() ? (
        <>
          <div>combineBalances</div>
          <div>
            <textarea value={combineBalancesValue} />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Disperse;
