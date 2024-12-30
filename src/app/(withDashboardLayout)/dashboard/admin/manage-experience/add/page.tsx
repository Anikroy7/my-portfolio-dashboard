"use client";

import { Button } from "@nextui-org/button";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";

import { useCreateExperience } from "@/src/hooks/experience.hook";
import TWInput from "@/src/components/UI/form/TWInput";
import TWForm from "@/src/components/UI/form/TWForm";
const MainEditor = dynamic(
  () => import("@/src/components/UI/form/TextEditor/NotePicker"),
  { ssr: false },
);

export default function AddExperience() {
  const router = useRouter();
  const { mutate: create, data, isPending, isSuccess } = useCreateExperience();
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (!isPending && isSuccess && data) {
      router.push("/dashboard/admin/manage-experience");
    }
  }, [isPending, isSuccess]);

  const onsubmit = (data: FieldValues) => {
    create({
      ...data,
      description: content,
    });
  };

  return (
    <>
      <h2 className="text-center">ADD EXPERIENCE</h2>
      <div className="p-8 rounded-lg shadow-md md:w-1/2 w-full mx-auto">
        <TWForm
          // resolver={zodResolver()}
          onSubmit={onsubmit}
        >
          <div className="my-3">
            <TWInput label="Company name" name="companyName" />
          </div>
          <div className="my-3">
            <TWInput label="Company logo" name="companyLogo" />
          </div>
          <div className="my-3">
            <TWInput label="Total years" name="totalYears" />
          </div>
          <div className="my-3">
            <TWInput label="Designation" name="designation" />
          </div>
          <div className="my-3">
            <MainEditor content={content} setContent={setContent} />
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
