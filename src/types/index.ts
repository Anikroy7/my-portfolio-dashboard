import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type IInput = {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
  placeholder?: string;
};
export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  profileImage: string;
  // dateOfBirth: string;
  address: string;
  role: "user" | "admin";
  status: "active" | "blocked";
  isDeleted: boolean;
};

export type TExperience = {
  id: string;
  companyLogo: string;
  companyName: string;
  designation: string;
  description: string;
  totalYears: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
};

export type TProjectLink = {
  id: string;
  name: string;
  link: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TProject = {
  id: string;
  name: string;
  category: string;
  description: string;
  images: string[];
  projectLink: TProjectLink[];
  projectTechnology: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TBlog = {
  id: string;
  title: string;
  image: string;
  description: string;
  categories: string[];
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
};

export type TResource = { index?: string | number; name: string; link: string };
