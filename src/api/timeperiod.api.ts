import { TimePeriod } from "../types";
import httpClient from "./httpClient";

const END_POINT = "/timeperiod";

const getTimePeriodsByUserId = (userId: string) =>
  httpClient.get(`${END_POINT}/${userId}`);

const createTimePeriod = (timePeriod: TimePeriod) =>
  httpClient.post(END_POINT, timePeriod);

const updateTimePeriod = (timePeriod: TimePeriod) =>
  httpClient.put(`${END_POINT}/${timePeriod.id}`, timePeriod);

export { getTimePeriodsByUserId, createTimePeriod, updateTimePeriod };
