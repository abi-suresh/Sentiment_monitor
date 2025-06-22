import React from 'react';
import './Timeline.css';

const Timeline = ({ steps }) => {
  return (
    <div className="timeline">
      {steps.map((step, idx) => (
        <div key={idx} className={`step ${step.complete ? 'done' : ''}`}>
          <div className="circle">{step.complete ? '✅' : idx + 1}</div>
          <span>{step.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
