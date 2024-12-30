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
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

import { TProject } from "@/src/types";
import { useDeleteProject, useGetAllProjects } from "@/src/hooks/project.hook";
import Loading from "@/src/components/UI/Loading";
import { DeleteIcon } from "@/src/assets/icons";

export default function ProjectPage() {
  const router = useRouter();
  const { data, isPending } = useGetAllProjects();
  const { mutate: deleteProject, isPending: isDeletePending } =
    useDeleteProject();

  const handleDelteProject = (id: string) => {
    const isConfirm = confirm("Project will be deleted?");

    if (isConfirm) {
      deleteProject({ id });
    }
  };

  if (isPending || isDeletePending) return <Loading />;
  const projects = data?.data || [];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Project List</h2>
        <Button
          color="primary"
          onClick={() => router.push("/dashboard/admin/manage-project/add")}
        >
          Add
        </Button>
      </div>
      <Table aria-label="Projects Table">
        <TableHeader>
          <TableColumn>PROJECT IMAGE</TableColumn>
          <TableColumn>PROJECT NAME</TableColumn>
          <TableColumn>CATEGORY</TableColumn>
          <TableColumn>DESCRIPTION</TableColumn>
          <TableColumn>LINKS</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        {projects?.length > 0 ? (
          <TableBody>
            {projects.map((project: TProject) => (
              <TableRow key={project.id}>
                <TableCell>
                  <Image
                    alt="Project Image"
                    height={100}
                    src={project.images[0]}
                    style={{ width: "100px", height: "auto" }}
                    width={100}
                  />
                </TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.category}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>
                  <ul className="list-disc pl-4">
                    {project.projectLink.map((link) => (
                      <li key={link.id} className=" list-none">
                        <span>{link.name}: </span>
                        <a
                          className="text-blue-500 underline"
                          href={link.link}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    {/*  <Tooltip content="Edit project">
                      <span
                        className="text-lg text-default-400 cursor-pointer active:opacity-50"
                        onClick={() => router.push(`/dashboard/admin/manage-project/edit/${project.id}`)}
                      >
                        <EditIcon />
                      </span>
                    </Tooltip> */}
                    <Tooltip color="danger" content="Delete project">
                      <span className="text-lg text-danger cursor-pointer active:opacity-50">
                        <DeleteIcon
                          onClick={() => handleDelteProject(project.id)}
                        />
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody emptyContent={"No projects to display."}>{[]}</TableBody>
        )}
      </Table>
    </>
  );
}
