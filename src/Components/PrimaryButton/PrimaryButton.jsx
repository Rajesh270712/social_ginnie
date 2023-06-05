import { Button } from "@mui/material";
import React from "react";

import "./PrimaryButton.scss";

export default function PrimaryButton({
  label,
  className = "",
  icon,
  hidden = false,
  ...otherProps
}) {
  return (
    <Button
      className={`button-container ${className} ${otherProps.disabled ? "disabled-button" : ""
        }`}
      {...otherProps}
      variant="contained"
      hidden={hidden}
      classes={{
        root: "primary-button"
      }}
    >
      {icon}
      {label}
    </Button>
  );
}
