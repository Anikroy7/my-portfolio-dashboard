import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  createExperience,
  deleteExperience,
  getAllExperiences,
  getExperience,
  updateExperience,
} from "../services/experience.service";
import { queryClient } from "../lib/Providers";

export const useCreateExperience = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_EXPERIENCE"],
    mutationFn: async (experienceData) =>
      await createExperience(experienceData),
    onSuccess: (data) => {
      if (data) {
        if (data.success) {
          queryClient.invalidateQueries({ queryKey: ["GET_ALL_EXPERIENCES"] });
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
export const useUpdateExperience = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_EXPERIENCE"],
    mutationFn: async ({ id, experienceData }) =>
      await updateExperience(id, experienceData),
    onSuccess: (data) => {
      if (data) {
        if (data.success) {
          queryClient.invalidateQueries({ queryKey: ["GET_ALL_EXPERIENCES"] });
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

export const useGetAllExperiences = () => {
  return useQuery({
    queryKey: ["GET_ALL_EXPERIENCES"],
    queryFn: async () => {
      const response = await getAllExperiences();

      return response;
    },
  });
};
export const useGetExperience = (id: string) => {
  return useQuery({
    queryKey: ["GET_EXPERIENCE"],
    queryFn: async () => {
      const response = await getExperience(id);

      return response;
    },
  });
};

export const useDeleteExperience = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["DELETE_EXPERIENCE"],
    mutationFn: async ({ id }) => {
      return await deleteExperience(id);
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["GET_ALL_EXPERIENCES"] });
        toast.success(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
