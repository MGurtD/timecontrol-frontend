/**
 * Use Date.getTime
 */
export const calculateDifferenceBetweenTimes = (
  Current: number,
  Target: number
) => {
  let CalcTime = Current - Target; // Current - Initiallized

  let Years = Math.floor(CalcTime / 1000 / 60 / 60 / 24 / 7 / 4 / 12);
  CalcTime -= Years * (1000 * 60 * 60 * 24 * 7 * 4 * 12);
  let Months = Math.floor(CalcTime / 1000 / 60 / 60 / 24 / 7 / 4);
  CalcTime -= Months * (1000 * 60 * 60 * 24 * 7 * 4);
  let Weeks = Math.floor(CalcTime / 1000 / 60 / 60 / 24 / 7);
  CalcTime -= Weeks * (1000 * 60 * 60 * 24 * 7);
  // The calculation seconds to days works properly & The calculation of weeks to years may be off slightly
  let Days = Math.floor(CalcTime / 1000 / 60 / 60 / 24);
  CalcTime -= Days * (1000 * 60 * 60 * 24);
  let Hours = Math.floor(CalcTime / 1000 / 60 / 60);
  CalcTime -= Hours * (1000 * 60 * 60);
  let Minutes = Math.floor(CalcTime / 1000 / 60);
  CalcTime -= Minutes * (1000 * 60);
  let Seconds = Math.floor(CalcTime / 1000);

  let differenceStr =
    (Days != 0 ? Days + (Days == 1 ? "day " : "days ") : "") +
    (Hours != 0
      ? (Hours <= 9 ? "0" + Hours : Hours) + (Hours == 1 ? "hr " : "hrs ")
      : "") +
    (Minutes != 0
      ? (Minutes <= 9 ? "0" + Minutes : Minutes) +
        (Minutes == 1 ? "min " : "mins ")
      : "") +
    (Seconds != 0
      ? (Seconds <= 9 ? "0" + Seconds : Seconds) +
        (Seconds == 1 ? "sec " : "secs ")
      : "");
  return differenceStr.toLowerCase().includes("nan") ? "" : differenceStr;
};
