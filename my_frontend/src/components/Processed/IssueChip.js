import React from 'react';
import Chip from '@mui/material/Chip';
import { red, green } from '@mui/material/colors';

const IssueChip = ({ issue, severity }) => {
  const chipColor = severity === 'High' ? red[500] : green[500];

  const underlineStyle = {
    borderBottom: `2px solid ${chipColor}`,
    display: 'inline-block',
    paddingBottom: '2px', 
    paddingRight: '5px', 
    margin: ' 0px 100px', 
    fontFamily: 'Source Code Pro, monospace',
  };
  return (
    <div className='font_text' style={underlineStyle}>{issue}</div>
  );
};

export default IssueChip;
