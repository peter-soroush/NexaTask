import React from "react";

function RadioButton({ status, setStatus, value, title, children }) {
  return (
    <div className="add-form__input--second">
      <div className={value}>
        {children}
        <label htmlFor={value}>&nbsp;{title}</label>
        <input
          type="radio"
          id={value}
          name={value}
          value={value}
          checked={status === value}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>
    </div>
  );
}

export default RadioButton;
