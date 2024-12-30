import { FieldValues } from "react-hook-form";

import axiosInstance from "../lib/AxiosInstance";

export const createBlog = async (skillData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/blogs", skillData);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getAllBlogs = async () => {
  try {
    const { data } = await axiosInstance.get("/blogs");

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
export const deleteBlog = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/blogs/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
