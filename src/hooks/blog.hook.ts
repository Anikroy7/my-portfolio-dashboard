import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { queryClient } from "../lib/Providers";
import { createBlog, deleteBlog, getAllBlogs } from "../services/blog.service";

export const useCreateBlog = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_BLOG"],
    mutationFn: async (blogData) => await createBlog(blogData),
    onSuccess: (data) => {
      if (data) {
        if (data.success) {
          queryClient.invalidateQueries({ queryKey: ["GET_ALL_BLOGS"] });
          toast.success(data.message);
        }
        if (!data.success) {
          data.errorSources.map((e: { message: string }, index: number) =>
            toast.error(e.message, { id: `error-${index}` }),
          );
        }
      } else {
        toast.error("Something went wrong");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useDeleteBlog = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["DELETE_BLOG"],
    mutationFn: async ({ id }) => {
      return await deleteBlog(id);
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["GET_ALL_BLOGS"] });
        toast.success(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllBlogs = () => {
  return useQuery({
    queryKey: ["GET_ALL_BLOGS"],
    queryFn: async () => {
      const response = await getAllBlogs();

      return response;
    },
  });
};
