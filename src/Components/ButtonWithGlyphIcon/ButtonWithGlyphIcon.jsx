import React from "react";
import Button from "@mui/material/Button";
import "./ButtonWithGlyphIcon.scss";
import useMediaQuery from "@mui/material/useMediaQuery";

const styles = {
  background: "#2262ED",
  textTransform: "none",
  color: "#fff",
  borderColor: "#2262ED",
  width: "264px",
  height: "44px",
  fontFamily: "Inter",
  fontStyle: "normal",
  fontSize: "16px",
  borderRadius: "4px",
  borderStyle: "solid",
  cursor: "pointer",
  textAlign: "center",
  paddingLeft: "16px",
  justifyContent: "start",
  "& .MuiButton-startIcon": {
    marginRight: "10px",
    "& .MuiSvgIcon-root ": {
      width: "24px",
      height: "24px",
    },
  },
};

const mobileStyles = {
  background: "#2262ED",
  textTransform: "none",
  color: "#fff",
  borderColor: "#2262ED",
  width: "100%",
  height: "44px",
  fontFamily: "Inter",
  fontStyle: "normal",
  fontSize: "16px",
  borderRadius: "4px",
  borderStyle: "solid",
  cursor: "pointer",
  textAlign: "center",
  paddingLeft: "16px",
  justifyContent: "start",
  "& .MuiButton-startIcon": {
    marginRight: "10px",
    "& .MuiSvgIcon-root ": {
      width: "24px",
      height: "24px",
    },
  },
};
function ButtonWithGlyphIcon({ icon, text, click }) {
  const matches = useMediaQuery("(max-width:430px)");
  return (
    <Button
      variant="outlined"
      startIcon={icon}
      sx={matches ? mobileStyles : styles}
      onClick={() => click()}
      classes={{
        root: "glyph-btn",
      }}
    >
      {text}
    </Button>
  );
}

export default ButtonWithGlyphIcon;
