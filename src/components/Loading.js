import React from "react";
import loading from "../images/github.svg";
function Loading() {
  return (
    <div className="status">
      <img src={loading} alt="" width="100" height="100" />
      <p>Loading...</p>
    </div>
  );
}

export default Loading;
