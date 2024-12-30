"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { Button } from "@nextui-org/button";

import TWForm from "../../UI/form/TWForm";
import TWInput from "../../UI/form/TWInput";
import Loading from "../../UI/Loading";

import {
  useGetExperience,
  useUpdateExperience,
} from "@/src/hooks/experience.hook";

export default function UpdateExperience({ id }: { id: string }) {
  const router = useRouter();
  const { mutate: update, data, isPending, isSuccess } = useUpdateExperience();
  const { data: experience, isPending: experiencePending } =
    useGetExperience(id);
  const [defaultValues, setDetfaultValues] = useState({
    companyName: experience?.data.companyName,
    companyLogo: experience?.data.companyLogo,
    totalYears: experience?.data.totalYears,
    designation: experience?.data.designation,
    description: experience?.data.description,
  });

  useEffect(() => {
    if (!isPending && isSuccess && data) {
      router.push("/dashboard/admin/manage-experience");
    }
  }, [isPending, isSuccess]);
  useEffect(() => {
    if (!experiencePending && experience) {
      setDetfaultValues({
        companyName: experience?.data.companyName,
        companyLogo: experience?.data.companyLogo,
        totalYears: experience?.data.totalYears,
        designation: experience?.data.designation,
        description: experience?.data.description,
      });
    }
  }, [experience, experiencePending]);

  const onsubmit = (data: FieldValues) => {
    update({ id, experienceData: data });
  };

  if (experiencePending) return <Loading />;

  return (
    <>
      <h2 className="text-center">UPDATE EXPERIENCE</h2>
      <div className="p-8 rounded-lg shadow-md md:w-1/2 w-full mx-auto">
        <TWForm
          // resolver={zodResolver()}
          defaultValues={defaultValues}
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
            <TWInput label="Description" name="description" />
          </div>

          {isPending ? (
            <Button
              isLoading
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              color="primary"
            >
              Updating
            </Button>
          ) : (
            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Update
            </Button>
          )}
        </TWForm>
      </div>
    </>
  );
}
