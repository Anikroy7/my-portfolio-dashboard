"use client";

import { Button } from "@nextui-org/button";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { TBlog } from "@/src/types";
import { useDeleteBlog, useGetAllBlogs } from "@/src/hooks/blog.hook";
import Loading from "@/src/components/UI/Loading";
import BlogDetailsModal from "@/src/components/dashboard/admin/BlogDetailsModal";
import { DeleteIcon } from "@/src/assets/icons";

export default function BlogPage() {
  const router = useRouter();
  const { data, isPending } = useGetAllBlogs();
  const { mutate: deleteBlog, isPending: isDeletePending } = useDeleteBlog();

  const handleDelteBlog = (id: string) => {
    const isConfirm = confirm("Blog will be deleted?");

    if (isConfirm) {
      deleteBlog({ id });
    }
  };

  if (isPending || isDeletePending) return <Loading />;
  const blogs = data?.data || [];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Blog List</h2>
        <Button
          color="primary"
          onClick={() => router.push("/dashboard/admin/manage-blog/add")}
        >
          Add
        </Button>
      </div>
      <Table aria-label="Blogs Table">
        <TableHeader>
          <TableColumn>BLOG IMAGE</TableColumn>
          <TableColumn>BLOG TITLE</TableColumn>
          <TableColumn>CATEGORIES</TableColumn>
          <TableColumn>DESCRIPTION</TableColumn>
          <TableColumn>CREATED AT</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        {blogs?.length > 0 ? (
          <TableBody>
            {blogs.map((blog: TBlog) => (
              <TableRow key={blog.id}>
                {/* Blog Image */}
                <TableCell>
                  <Image
                    alt={blog.title}
                    height={100}
                    src={blog.image}
                    style={{
                      width: "100px",
                      height: "auto",
                      borderRadius: "8px",
                    }}
                    width={100}
                  />
                </TableCell>

                {/* Blog Title */}
                <TableCell>{blog.title}</TableCell>

                {/* Categories */}
                <TableCell>
                  <ul className="list-disc pl-4">
                    {blog.categories.map((category, index) => (
                      <li key={index} className="list-none">
                        {category}
                      </li>
                    ))}
                  </ul>
                </TableCell>

                {/* Description */}
                <TableCell>
                  <BlogDetailsModal details={blog.description} />
                </TableCell>

                {/* Created At */}
                <TableCell>
                  {new Date(blog.createdAt).toLocaleString()}
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Tooltip color="danger" content="Delete Blog">
                      <span className="text-lg text-danger cursor-pointer active:opacity-50">
                        <DeleteIcon onClick={() => handleDelteBlog(blog.id)} />
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody emptyContent={"No blogs to display."}>{[]}</TableBody>
        )}
      </Table>
    </>
  );
}
