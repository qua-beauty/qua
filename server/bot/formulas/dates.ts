
export const getTodayFormula = () => {
  return `IS_SAME({Date}, TODAY(), 'day')`;
};

export const getYesterdayFormula = () => {
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  const year = yesterday.getFullYear();
  const month = String(yesterday.getMonth() + 1).padStart(2, '0'); // JavaScript months are 0-indexed
  const day = String(yesterday.getDate()).padStart(2, '0');

  return `IS_SAME({Date}, DATETIME_PARSE('${year}-${month}-${day}', 'YYYY-MM-DD'), 'day')`;
};

export const getWeekFormula = () => {
  const now = new Date();
  const firstDayOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));

// Construct the formula
  return `{Date} >= '${firstDayOfWeek.toISOString()}'`;
};

export const getMonthFormula = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // JavaScript months are 0-indexed

  return `MONTH({Date}) = ${month}, YEAR({Date}) = ${year}`;
};