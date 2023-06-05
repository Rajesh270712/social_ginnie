import React from "react";

import "./PlatformIconBox.scss";

 const PlatformIconBox = ({ icon, text, id, onClickPlatform }) => {
  return (
    <div
      className="platform-icon-group"
      onClick={(e) => {
        // redirectToPlatformPage(e);
        onClickPlatform(id, text.toLowerCase());
      }}
    >
      <div>{icon}</div>
      <p>{text}</p>
    </div>
  );
};

export default PlatformIconBox
