import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  createSkill,
  deleteSkill,
  getAllSkills,
} from "../services/skill.service";
import { queryClient } from "../lib/Providers";

export const useCreateSkill = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_SKILL"],
    mutationFn: async (skillData) => await createSkill(skillData),
    onSuccess: (data) => {
      if (data) {
        if (data.success) {
          queryClient.invalidateQueries({ queryKey: ["GET_ALL_SKILLS"] });
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
export const useDeleteSkill = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["DELETE_SKILL"],
    mutationFn: async ({ id }) => {
      return await deleteSkill(id);
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["GET_ALL_SKILLS"] });
        toast.success(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllSkills = () => {
  return useQuery({
    queryKey: ["GET_ALL_SKILLS"],
    queryFn: async () => {
      const response = await getAllSkills();

      return response;
    },
  });
};
