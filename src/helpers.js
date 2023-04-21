export const isWorkingTime = (startTime, endTime) => {
  if (!startTime) return false;

  const localTime = new Date();
  const hours = localTime.getHours();
  const start = parseInt(startTime);
  let end = parseInt(endTime);

  if (end < start) {
    end += 24;
  }

  return hours >= start && hours < end;
}