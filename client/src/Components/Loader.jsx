import React from "react";

const Loader = () => {
  return (
    <div className='loader-wrapper'>
      <div class='lds-ring'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
