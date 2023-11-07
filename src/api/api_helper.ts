import { axiosInstance } from "./axiosInstance";

export async function get<R>(url: string, config = {}): Promise<R> {
  return axiosInstance.get(url, { ...config }).then(response => response.data);
}

export async function post<T, R>(url: string, data: T, config = {}): Promise<R> {
  return axiosInstance
    .post(url, { ...data }, { ...config })
    .then(response => response.data);
}

export async function put<T, R>(url: string, data: T, config = {}): Promise<R> {
  return axiosInstance
    .put(url, { ...data }, { ...config })
    .then(response => response.data);
}

export async function patch<T, R>(url: string, data: T, config = {}): Promise<R> {
  return axiosInstance
    .patch(url, { ...data }, { ...config })
    .then(response => response.data);
}

export async function del<R>(url: string, config = {}): Promise<R> {
  return axiosInstance
    .delete(url, { ...config })
    .then(response => response.data);
}