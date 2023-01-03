import httpClient from "./httpClient";

const END_POINT = "/enterprise";

const getEnterprises = () => httpClient.get(END_POINT);

// you can pass arguments to use as request parameters/data
const getEnterprise = (id: string) => httpClient.get(`${END_POINT}/${id}`);
// maybe more than one..

export { getEnterprises, getEnterprise };
