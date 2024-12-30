import { FieldValues } from "react-hook-form";

import axiosInstance from "../lib/AxiosInstance";

export const createProject = async (projectData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/projects", projectData);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getAllProjects = async () => {
  try {
    const { data } = await axiosInstance.get("/projects");

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteProject = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/projects/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
