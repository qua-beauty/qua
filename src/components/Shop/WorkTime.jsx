import React from 'react';

const WorkTime = ({ workTime = [] }) => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  console.log(workTime);
  return workTime && (
    <div>
      {workTime.map((item, index) => (
        <div key={index}>
          <h2>{daysOfWeek[index]}</h2>
          {item.workTime.length > 0 ? (
            <div>
              <p>Work Time: {item.workTime[0]} - {item.workTime[1]}</p>
              <p>Breaks: {item.breaks[0]} - {item.breaks[1]}</p>
            </div>
          ) : (
            <p>Disabled Day</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default WorkTime;
