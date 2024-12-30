"use client";

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FieldValues } from "react-hook-form";

import { useCreateSkill } from "@/src/hooks/skill.hook";
import TWInput from "@/src/components/UI/form/TWInput";
import TWForm from "@/src/components/UI/form/TWForm";

export default function Page() {
  const router = useRouter();
  const { mutate: create, data, isPending, isSuccess } = useCreateSkill();

  useEffect(() => {
    if (!isPending && isSuccess && data) {
      router.push("/dashboard/admin/manage-skill");
    }
  }, [isPending, isSuccess]);

  const onsubmit = (data: FieldValues) => {
    create(data);
  };

  return (
    <>
      <h2 className="text-center">ADD SKILL</h2>
      <div className="p-8 rounded-lg shadow-md md:w-1/2 w-full mx-auto">
        <TWForm
          // resolver={zodResolver()}
          onSubmit={onsubmit}
        >
          <div className="my-3">
            <TWInput label="Name" name="name" />
          </div>
          <div className="my-3">
            <TWInput label="Logo" name="logo" />
          </div>
          {isPending ? (
            <Button
              isLoading
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              color="primary"
            >
              Adding
            </Button>
          ) : (
            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Add
            </Button>
          )}
        </TWForm>
      </div>
    </>
  );
}
