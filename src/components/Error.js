import React from "react";
import error from "../images/warning.svg";
function Error() {
  return (
    <div className="status">
      <img src={error} alt="" width="100" height="100" />
      <p>Something went Wrong</p>
      <p>Please Check Your Internet connection</p>
    </div>
  );
}

export default Error;
