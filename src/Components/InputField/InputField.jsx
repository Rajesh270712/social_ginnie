import { Input } from "antd";
import React from "react";
import "./InputField.scss";
import PropTypes from 'prop-types';


export default function InputField({ inputLabel, placeholder, errorMessage = "", hasError = false, ...otherParams }) {
  // whatever label is passed in, name will be the same, but formatted to lower case, with spaces replaced with underscores
  const name = inputLabel.toLowerCase().replaceAll(" ", "_");
  const fieldLabel = inputLabel[0].toUpperCase() + inputLabel.slice(1);
  return (
    <div className="input-field-container">
      <label htmlFor="input-field" className="input-label" >
        {`${fieldLabel} ${otherParams.showRequiredIcon ? "*" : ""}`}
      </label>
      <div className="input-icon-container" {...otherParams.inputContainerStyle}>
        <Input
          className={`input-field`}
          placeholder={placeholder}
          name={name}
          style={{
            fontSize: "14px",
            borderWidth: "1.5px",
            borderRadius: "4px",
            borderColor: hasError ? "#af0606" : "",
            // borderColor: "#e8e8f0",
            // border: "1.5px solid #e8e8f0",
          }}
          {...otherParams}
        />
        {/* <div className="input-right-icon">{otherParams.suffix}</div> */}
      </div>
      <span className="input-error-message">{errorMessage}</span>
    </div>
  );
}

