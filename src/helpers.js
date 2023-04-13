export const isWorkingTime = (startTime, endTime) => {
  const localTime = new Date(Date.now());
  const hours = localTime.getHours();
  return hours >= parseInt(startTime) && hours < parseInt(endTime);
}