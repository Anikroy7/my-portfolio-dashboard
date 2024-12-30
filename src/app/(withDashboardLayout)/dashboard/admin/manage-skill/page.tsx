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

import { useDeleteSkill, useGetAllSkills } from "@/src/hooks/skill.hook";
import Loading from "@/src/components/UI/Loading";
import { DeleteIcon } from "@/src/assets/icons";

export default function Page() {
  const router = useRouter();
  const { data, isPending } = useGetAllSkills();
  const { mutate: deleteSkill, isPending: isDeletePending } = useDeleteSkill();
  const handleDelteSkill = (id: string) => {
    const isConfirm = confirm("Skill will be deleted?");

    if (isConfirm) {
      deleteSkill({ id });
    }
  };

  if (isPending || isDeletePending) return <Loading />;
  const skills = data?.data || [];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Skill List</h2>
        <Button
          color="primary"
          onClick={() => router.push("/dashboard/admin/manage-skill/add")}
        >
          Add
        </Button>
      </div>

      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>LOGO</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        {skills?.length > 0 ? (
          <TableBody>
            {skills?.map(
              (item: {
                id: string;
                technology: { name: string; logo: string; id: string };
              }) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <img
                      alt={`${item.technology.name} logo`}
                      src={item.technology.logo}
                      style={{ width: "200px", height: "130px" }}
                    />
                  </TableCell>
                  <TableCell>{item.technology.name}</TableCell>
                  <TableCell>
                    <div className="relative flex items-center gap-2">
                      <Tooltip color="danger" content="Delete skill">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                          <DeleteIcon
                            onClick={() => handleDelteSkill(item.id)}
                          />
                        </span>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        ) : (
          <TableBody emptyContent={"No skills to display."}>{[]}</TableBody>
        )}
      </Table>
    </>
  );
}
