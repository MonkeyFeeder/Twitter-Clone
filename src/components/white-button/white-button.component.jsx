import React from 'react';

import './white-button.styles.scss';

const WhiteButton = ({ children, ...otherProps }) => {
  return(
    <button className="white-button" {...otherProps} >
      {children}
    </button>
  );
}

export default WhiteButton;

