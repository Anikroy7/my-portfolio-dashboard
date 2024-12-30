"use server";

import { FieldValues } from "react-hook-form";

import axiosInstance from "../lib/AxiosInstance";

export const createSkill = async (skillData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/skills", skillData);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getAllSkills = async () => {
  try {
    const { data } = await axiosInstance.get("/skills");

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
export const deleteSkill = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/skills/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
