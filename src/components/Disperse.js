import React, { useState } from "react";

function LineNumberTextArea({ value, onChange }) {
  return (
    <div className="line-number-textarea">
      <div className="line-numbers">
        {value.split("\n").map((_, index) => (
          <div key={index} className="line-number">
            {index + 1}
          </div>
        ))}
      </div>
      <div>
        <textarea value={value} onChange={onChange} />
      </div>
    </div>
  );
}

function Disperse() {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [duplicate, setDuplicate] = useState(false);

  const clearMessages = () => {
    setErrorMessage([]);
    setSuccessMessage("");
    setDuplicate(false);
  };

  const onSubmit = () => {
    clearMessages();
    const arr = value.split("\n").filter((item) => item?.trim() !== "");

    if (arr.length === 0) {
      setErrorMessage(["Please enter the address and amount"]);
      return;
    }

    const addressMap = new Map();

    for (let i = 0; i < arr.length; i++) {
      const str = arr[i];
      const parts = str.split(/[=,\s]/);

      if (parts.length !== 2 || isNaN(parts[1])) {
        setErrorMessage([`Line ${i + 1} has a wrong amount`]);
        return;
      }

      if (addressMap.has(parts[0])) {
        addressMap.get(parts[0]).push(i + 1);
      } else {
        addressMap.set(parts[0], [i + 1]);
      }
    }
    const a = [];
    addressMap.forEach((lineNumbers, address) => {
      console.log(errorMessage);
      if (lineNumbers.length > 1) {
        a.push(
          `Address ${address} has duplicates in lines: ${lineNumbers.join(",")}`
        );
      }
    });

    if (a.length) {
      setErrorMessage(a);
      setDuplicate(true);
    } else {
      setSuccessMessage("Successful");
    }
  };

  const keepFirstOne = () => {
    clearMessages();
    const arr = value.split("\n").filter((item) => item?.trim() !== "");
    const addressMap = new Map();

    const newArr = arr.filter((str) => {
      const parts = str.split(/[=,\s]/);
      if (!addressMap.has(parts[0])) {
        addressMap.set(parts[0], true);
        return true;
      }
      return false;
    });

    setValue(newArr.join("\n"));
  };

  const combineBalances = () => {
    clearMessages();
    const arr = value.split("\n").filter((item) => item?.trim() !== "");
    const addressMap = new Map();

    arr.forEach((str) => {
      const parts = str.split(/[=,\s]/);
      if (addressMap.has(parts[0])) {
        addressMap.set(
          parts[0],
          String(Number(addressMap.get(parts[0])) + Number(parts[1]))
        );
      } else {
        addressMap.set(parts[0], parts[1]);
      }
    });

    const combinedArray = Array.from(addressMap.entries())
      .map(([address, value]) => `${address} ${value}`)
      .join("\n");

    setValue(combinedArray);
  };

  return (
    <div>
      <LineNumberTextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {errorMessage && errorMessage.length && duplicate ? (
        <div className="disperse-errorMessage-duplicacy">
          <div>Duplicate Error</div>
          <div>
            <span onClick={() => keepFirstOne()}>Keep The First One</span>
            <span></span>
            <span onClick={() => combineBalances()}>Combine Balance</span>
          </div>
        </div>
      ) : (
        <></>
      )}
      {errorMessage && errorMessage.length ? (
        <div className="disperse-errorMessage">
          <div>
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
                strokeWidth="2"
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                alignmentBaseline="middle"
                fontSize="18"
                fontWeight="bold"
                fill="red"
              >
                i
              </text>
            </svg>
          </div>
          <div>
            {errorMessage.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
      {successMessage && (
        <div className="disperse-successMessage">{successMessage}</div>
      )}
      <button className="disperse-btn" onClick={() => onSubmit()}>
        Next
      </button>
    </div>
  );
}

export default Disperse;
