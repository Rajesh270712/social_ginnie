import { AppBar, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Icons from "../Icons/icons";
import "./NavBar.scss";
function NavBar() {
  return (
    <AppBar
      position="static"
      classes={{
        root: "navigation-bar",
      }}
    >
      <Toolbar variant="dense" classes={{ root: "tool-bar" }}>
        {/* <Icons.phyllo_logo /> */}
        <Box className="img-box" >
        <img src="social.png" alt="PNG Image"></img>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
