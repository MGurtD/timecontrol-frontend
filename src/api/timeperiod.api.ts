import httpClient from "./httpClient";

const END_POINT = "/timeperiod";

// you can pass arguments to use as request parameters/data
const getTimePeriodsByUserId = (userId: string) =>
  httpClient.get(`${END_POINT}/${userId}`);
// maybe more than one..

export { getTimePeriodsByUserId };
