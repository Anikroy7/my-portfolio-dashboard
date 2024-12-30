import { FieldValues } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createProject,
  deleteProject,
  getAllProjects,
} from "../services/project.service";
import { queryClient } from "../lib/Providers";

export const useCreateProject = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_PROJECT"],
    mutationFn: async (projectData) => await createProject(projectData),
    onSuccess: (data) => {
      if (data) {
        if (data.success) {
          queryClient.invalidateQueries({ queryKey: ["GET_ALL_PROJECTS"] });
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

export const useGetAllProjects = () => {
  return useQuery({
    queryKey: ["GET_ALL_PROJECTS"],
    queryFn: async () => {
      const response = await getAllProjects();

      return response;
    },
  });
};

export const useDeleteProject = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["DELETE_PROJECT"],
    mutationFn: async ({ id }) => {
      return await deleteProject(id);
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["GET_ALL_PROJECTS"] });
        toast.success(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
