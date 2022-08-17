import { useState } from "react";

const Rummikub = () => {
  return (
    <div className="rummi_container">
      <iframe
        src="https://rummikub-apps.com/"
        className="rummi_iframe"
        scrolling="no"
        frameBorder="0"
      />
    </div>
  );
};

export default Rummikub;
