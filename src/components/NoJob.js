import React from "react";
import nojob from "../images/broke.svg";
function NoJob() {
  return (
    <div className="status">
      <img src={nojob} alt="" width="100" height="100" />
      <p>No Job Found</p>
    </div>
  );
}

export default NoJob;
