import React from 'react';

import './title-bar.styles.scss';

const TitleBar = ({ title }) => {
  return(
    <div className="title-bar">
      <h1>{title}</h1>
    </div>
  )
}

export default TitleBar;