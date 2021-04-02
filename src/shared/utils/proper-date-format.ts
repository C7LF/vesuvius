// Return date as UK format
export const properDateFormat = (date: Date): string => {
  const addZero = (num: number) => {
    if (num < 10) {
      return "0" + String(num);
    }
    return String(num);
  };

  let d = addZero(date.getDate());
  let m = addZero(date.getMonth() + 1);
  let y = date.getFullYear();

  return `${d}/${m}/${y}`;
};
