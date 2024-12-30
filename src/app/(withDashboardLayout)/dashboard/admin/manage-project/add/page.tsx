"use client";

import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { MdClose, MdOutlineAttachment } from "react-icons/md";
import { Badge } from "@nextui-org/badge";
import { Select, SelectItem } from "@nextui-org/select";

import TWInput from "@/src/components/UI/form/TWInput";
import TWForm from "@/src/components/UI/form/TWForm";
import ResourceForm from "@/src/components/UI/form/HandleResouces";
import { TResource } from "@/src/types";
import { useGetAllSkills } from "@/src/hooks/skill.hook";
import Loading from "@/src/components/UI/Loading";
import { uploadMultipleImages } from "@/src/utils/uploadMultipleImages";
import { useCreateProject } from "@/src/hooks/project.hook";
import dynamic from "next/dynamic";
const MainEditor = dynamic(
  () => import("@/src/components/UI/form/TextEditor/NotePicker"),
  { ssr: false },
);


export default function AddProject() {
  const router = useRouter();
  const [resources, setResources] = useState<TResource[]>([]);
  const [content, setContent] = useState<string>("");

  const [images, setImages] = useState<File[]>([]);
  const [avatarPreview, setAvatarPreview] = useState<string[]>([]);
  const { mutate: create, data, isPending, isSuccess } = useCreateProject();
  const [techValues, setTechValues] = useState<Set<string>>(new Set([""]));
  const { data: skillsData, isPending: skillPending } = useGetAllSkills();

  useEffect(() => {
    if (!isPending && isSuccess && data) {
      router.push("/dashboard/admin/manage-project");
    }
  }, [isPending, isSuccess]);

  if (skillPending) return <Loading />;
  const skills = skillsData?.data || [];

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allFiles = e.target.files;

    if (allFiles?.length) {
      for (let i = 0; i < allFiles.length; i++) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setAvatarPreview((prev) => [...prev, reader.result as string]);
          setImages((prev) => [...prev, allFiles[i] as File]);
        };
        reader.readAsDataURL(allFiles[i]);
      }
    }
  };

  const handleRemoveImage = (ind: number) => {
    setAvatarPreview([
      ...avatarPreview.filter((image, index) => index !== ind),
    ]);
    setImages([...images.filter((image, index) => index !== ind)]);
  };
  const handleTechSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTechValues(new Set(e.target.value.split(",")));
  };

  const onsubmit = async (data: FieldValues) => {
    const technologies = [];

    for (const x of Array.from(techValues)) {
      if (x) {
        technologies.push(x);
      }
    }
    const imageUrls = await uploadMultipleImages(images);

    const projectData = {
      ...data,
      projectLinks: resources,
      images: imageUrls,
      technologies,
      description: content
    };

    create(projectData);
  };

  return (
    <>
      <h2 className="text-center">ADD PROJECT</h2>
      <div className="p-8 rounded-lg shadow-md md:w-1/2 w-full mx-auto">
        <TWForm
          // resolver={zodResolver()}
          onSubmit={onsubmit}
        >
          {/* New Section for Name and Link Inputs */}
          <div className="my-3">
            <TWInput label="Project Category" name="category" />
          </div>
          <div className="flex w-full flex-col gap-2 my-3">
            <Select
              className="w-full "
              isMultiline={true}
              label="Project Technology"
              placeholder="Select Technology"
              selectedKeys={techValues}
              selectionMode="multiple"
              onChange={handleTechSelectionChange}
            >
              {skills.map(
                (item: {
                  id: string;
                  technology: { name: string; logo: string; id: string };
                }) => (
                  <SelectItem key={item.technology.id}>
                    {item.technology.name}
                  </SelectItem>
                ),
              )}
            </Select>
          </div>
          <div className="my-3">
            <TWInput label="Project name" name="name" />
          </div>
          <div className="my-3">
            <MainEditor content={content} setContent={setContent} />
          </div>
          <div className="my-3">
            <ResourceForm resources={resources} setResources={setResources} />
          </div>
          <div className="mt-4">
            <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-5\800 transition duration-300 ease-in-out ">
              <div className="flex flex-col items-center justify-center">
                {/* Attachment Icon from React Icons */}
                <MdOutlineAttachment className="w-8 h-8 text-gray-400" />
                <span className="text-sm font-medium text-gray-500">
                  click to upload
                </span>
              </div>
              <input
                multiple
                className="hidden"
                type="file"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
          <div className="my-3 flex flex-wrap gap-5">
            {avatarPreview.map((a, index) => (
              <Badge
                key={index}
                className="cursor-pointer"
                color="danger"
                content={<MdClose className="text-white " />}
                size="lg"
                onClick={() => handleRemoveImage(index)}
              >
                <Avatar className="h-40 w-40" radius="md" src={a} />
              </Badge>
            ))}
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
