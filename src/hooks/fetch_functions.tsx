import { axiosInstance, axiosRegularInstance } from "./axiosInstance";

export const auth_fetch = async ({ path }: { path: string }) => {
  try {
    const response = await axiosInstance.get(path, { withCredentials: true });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const regular_fetch = async ({ path }: { path: string }) => {
  try {
    const response = await axiosRegularInstance.get(path, {
      withCredentials: true,
    });
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};
