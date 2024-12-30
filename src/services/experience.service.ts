"use server";

import { FieldValues } from "react-hook-form";

import axiosInstance from "../lib/AxiosInstance";

export const createExperience = async (experienceData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/experiences", experienceData);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
export const updateExperience = async (
  id: string,
  experienceData: FieldValues,
) => {
  try {
    const { data } = await axiosInstance.patch(
      `/experiences/${id}`,
      experienceData,
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getAllExperiences = async () => {
  try {
    const { data } = await axiosInstance.get("/experiences");

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getExperience = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/experiences/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteExperience = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/experiences/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
