"use server";

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";

import axiosInstance from "../lib/AxiosInstance";

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/signin", userData);

    (await cookies()).set("accessToken", data.accessToken);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
export const signupUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/signup", userData);

    (await cookies()).set("accessToken", data.accessToken);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const logout = async() => {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");
};

export const forgotPassword = async (bodyData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/forget-password",
      bodyData,
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const resetPassword = async (bodyData: FieldValues) => {
  const { token, email, newPassword } = bodyData;

  try {
    const { data } = await axiosInstance.post(
      "/auth/reset-password",
      { email, newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);

    return {
      userId: decodedToken.userId,
      email: decodedToken.email,
      role: decodedToken.role,
    };
  }

  return decodedToken;
};

export const logoutUser = async () => {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = (await cookies()).get("refreshToken")?.value;

    const res = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    });

    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
