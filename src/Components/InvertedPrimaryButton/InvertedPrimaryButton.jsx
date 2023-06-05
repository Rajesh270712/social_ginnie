import React from "react";

import "./InvertedPrimaryButton.scss";

export default function InvertedPrimaryButton({
  label,
  className = "",
  icon,
  ...otherProps
}) {
  return (
    <button
      type="primary"
      className={`inverted-button-container ${className}`}
      {...otherProps}
    >
      {icon}
      {label}
    </button>
  );
}
