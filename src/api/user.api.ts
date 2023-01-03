import httpClient from "./httpClient";

const END_POINT = "/user";

const getUsers = () => httpClient.get(END_POINT);

// you can pass arguments to use as request parameters/data
const getUsersByEnterpriseId = (id: string) =>
  httpClient.get(`${END_POINT}/${id}`);
// maybe more than one..

export { getUsers, getUsersByEnterpriseId };
