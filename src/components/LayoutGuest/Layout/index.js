import React from 'react';

import './style.scss';

const LayoutBoard = ({ children, className, mode }) => {
  return <div className={`guest ${className}`}>{children}</div>;
};

export default LayoutBoard;
