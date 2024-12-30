"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import dynamic from "next/dynamic";
import { MdOutlineAttachment } from "react-icons/md";
import { Badge } from "@nextui-org/badge";
import { Avatar } from "@nextui-org/avatar";
import { Select, SelectItem } from "@nextui-org/select";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

import { techCategories } from "@/src/constant";
import uploadImage from "@/src/utils/uploadImage";
import { useCreateBlog } from "@/src/hooks/blog.hook";
import TWInput from "@/src/components/UI/form/TWInput";
import TWForm from "@/src/components/UI/form/TWForm";

const MainEditor = dynamic(
  () => import("@/src/components/UI/form/TextEditor/NotePicker"),
  { ssr: false },
);

export default function BlogPage() {
  const router = useRouter();
  const [content, setContent] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [techValues, setTechValues] = useState<Set<string>>(new Set([""]));
  const { mutate: create, data, isPending, isSuccess } = useCreateBlog();

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImageFile(file);
      const reader = new FileReader();

      reader.onload = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!isPending && isSuccess && data) {
      router.push("/dashboard/admin/manage-blog");
    }
  }, [isPending, isSuccess]);
  const onsubmit = async (data: FieldValues) => {
    const categories = [];

    for (const x of Array.from(techValues)) {
      if (x) {
        categories.push(x);
      }
    }
    const imageUrl = await uploadImage(imageFile as File);
    const blogData = {
      ...data,
      description: content,
      categories: categories,
      image: imageUrl,
    };

    create(blogData);
  };

  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTechValues(new Set(e.target.value.split(",")));
  };

  return (
    <>
      <h2 className="text-center">ADD BLOG</h2>
      <div className="p-8 rounded-lg shadow-md  w-[90%] mx-auto">
        <div className="my-3">
          <MainEditor content={content} setContent={setContent} />
        </div>
        <TWForm
          // resolver={zodResolver()}
          onSubmit={onsubmit}
        >
          <div className="flex w-full flex-col gap-2 my-3">
            <Select
              className="w-full "
              isMultiline={true}
              label="Blog Category"
              placeholder="Select a category"
              selectedKeys={techValues}
              selectionMode="multiple"
              onChange={handleSelectionChange}
            >
              {techCategories.map((item) => (
                <SelectItem key={item.key}>{item.label}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="my-3">
            <TWInput label="Title" name="title" />
          </div>
          <div className="mt-4">
            <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-500 transition duration-300 ease-in-out">
              <div className="flex flex-col items-center justify-center">
                <MdOutlineAttachment className="w-8 h-8 text-gray-400" />
                <span className="text-sm font-medium text-gray-500">
                  Click to upload
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
          <div className="my-3">
            {selectedImage && (
              <Badge className="cursor-pointer" color="danger" size="lg">
                <Avatar className="h-52 w-52" radius="md" src={selectedImage} />
              </Badge>
            )}
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
