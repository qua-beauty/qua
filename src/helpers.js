export const isWorkingTime = (startTime, endTime) => {
  if(!startTime) return false;

  const localTime = new Date(Date.now());
  const hours = localTime.getHours();
  return hours >= parseInt(startTime) && hours < parseInt(endTime);
}