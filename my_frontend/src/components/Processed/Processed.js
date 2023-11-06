import React from 'react';
import { useLocation } from 'react-router-dom';
import IssueChip from './IssueChip';
import { useNavigate } from 'react-router-dom';
import './Processed.css';

const Processed = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/'); 
  };

  const location = useLocation();
  const bandit = location.state.data_bandit;
  const reportLines = bandit.split('\n');


    const issues = reportLines.filter((line) => line.startsWith('>> Issue:'));
    console.log(issues.length);
    const pattern = /Severity: (\w+)\s+Confidence: (\w+)/g;

    
    const extractedInfo = [];
    let match;


    while ((match = pattern.exec(bandit))) {
    const severity = match[1];
    const confidence = match[2];
    extractedInfo.push({ severity, confidence });
    }

  const feedback = location.state.data_feedback;

  return (
    
    <div className='processed'>
    <div>
      <div className="text-section">
        <h1>Report</h1>
        {issues.map((issue, index) => (
          <div key={index}>
            <p>{issue}</p>
            {extractedInfo[index] && (
              <div>
                <IssueChip issue={"Severity : "+extractedInfo[index].severity} severity={extractedInfo[index].severity} />

                <IssueChip issue={"Confidence : "+extractedInfo[index].confidence} severity={extractedInfo[index].confidence} />

              </div>
            )}
          </div>
        ))}
      </div>
      <div className="feedback-container">
        <h1>Feedback</h1>
        <p>{feedback}</p>
      </div>
      <div variant="contained" className="custom-button" onClick={handleGoBack} >
               go back
       </div>
    </div>
  </div>
  
  );
};

export default Processed;