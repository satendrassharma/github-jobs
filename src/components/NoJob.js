import React from "react";
import nojob from "../images/broke.svg";
function NoJob({ children }) {
  return (
    <div className="status">
      <img src={nojob} alt="" width="100" height="100" />
      <p>No Job Found</p>
      {children}
    </div>
  );
}

export default NoJob;
