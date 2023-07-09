import { useState, useEffect } from 'react';

// Define the labels as constants
const MORNING = 'Morning';
const AFTERNOON = 'Afternoon';
const EVENING = 'Evening';

// Helper function to get the label of the day period
const getDayPeriodLabel = (hours) => {
  if (hours < 12) return MORNING;
  if (hours < 17) return AFTERNOON;
  return EVENING;
};

export const useAvailability = (workSchedule, granularity = 60) => {
  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    let start = new Date();
    start.setHours(0, 0, 0, 0); // Set time to start of the day
    let today = new Date(start.getTime()); // Save today's date for comparison
    let weekAvailability = [];

    for(let d = 0; d < 7; d++){ // Loop through the next 7 days
      let dayOfWeek = start.getDay();
      let workHours = workSchedule[dayOfWeek].workTime;

      let timePeriods = [
        { "name": MORNING, "timeSlots": [] },
        { "name": AFTERNOON, "timeSlots": [] },
        { "name": EVENING, "timeSlots": [] }
      ];

      if(workHours.length > 0){
        let breaks = workSchedule[dayOfWeek].breaks;
        let startHour = workHours[0];
        let endHour = workHours[1];

        for(let i = startHour * 60; i < endHour * 60; i+=granularity){
          let slot = new Date(start.getTime());
          slot.setHours(Math.floor(i / 60), i % 60, 0, 0);
          let timeslot = { time: slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isBreak: false };
          if(i >= breaks[0] * 60 && i < (breaks[0] + breaks[1]) * 60) timeslot.isBreak = true;

          // Determine the day period for each timeslot
          let dayPeriodLabel = getDayPeriodLabel(Math.floor(i / 60));
          let periodIndex = timePeriods.findIndex(period => period.name === dayPeriodLabel);
          if (periodIndex !== -1) {
            timePeriods[periodIndex].timeSlots.push(timeslot);
          }
        }
      }

      let dayAvailability = {
        "date": new Date(start.getTime()),
        "dayNumber": start.getDate(),
        "isToday": start.getTime() === today.getTime(),
        "isWeekend": dayOfWeek === 6 || dayOfWeek === 0,
        "weekday": start.toLocaleString('en-US', { weekday: 'short' }).toUpperCase(),
        "isDisabled": timePeriods.every(period => period.timeSlots.length === 0),
        "timePeriods": timePeriods
      };

      weekAvailability.push(dayAvailability);
      start.setDate(start.getDate() + 1); // Move to the next day
    }

    setAvailability(weekAvailability);
  }, [workSchedule, granularity]);

  return availability;
};
