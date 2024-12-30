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

import { TExperience } from "@/src/types";
import {
  useDeleteExperience,
  useGetAllExperiences,
} from "@/src/hooks/experience.hook";
import Loading from "@/src/components/UI/Loading";
import { DeleteIcon, EditIcon } from "@/src/assets/icons";

export default function ExperiencePage() {
  const router = useRouter();
  const { data, isPending } = useGetAllExperiences();
  const { mutate: deleteExperience, isPending: isDeletePending } =
    useDeleteExperience();

  const handleDelteExperience = (id: string) => {
    const isConfirm = confirm("Experience will be deleted?");

    if (isConfirm) {
      deleteExperience({ id });
    }
  };

  if (isPending || isDeletePending) return <Loading />;
  const experiences = data?.data || [];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Experience List</h2>
        <Button
          color="primary"
          onClick={() => router.push("/dashboard/admin/manage-experience/add")}
        >
          Add
        </Button>
      </div>

      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>COMPANY LOGO</TableColumn>
          <TableColumn>COMPANY NAME</TableColumn>
          <TableColumn>DESIGNATION</TableColumn>
          <TableColumn>DESCRIPTION</TableColumn>
          <TableColumn>TOTAL YEARS</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        {experiences?.length > 0 ? (
          <TableBody>
            {experiences?.map((item: TExperience) => (
              <TableRow key={item.id}>
                <TableCell>
                  <img
                    alt={`${item.companyName} logo`}
                    src={item.companyLogo}
                    style={{ width: "100px", height: "auto" }}
                  />
                </TableCell>
                <TableCell>{item.companyName}</TableCell>
                <TableCell>{item.designation}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.totalYears}</TableCell>
                <TableCell>
                  <div className="relative flex items-center gap-2">
                    <Tooltip content="Edit experience">
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EditIcon
                          onClick={() =>
                            router.push(
                              `/dashboard/admin/manage-experience/edit/${item.id}`,
                            )
                          }
                        />
                      </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete experience">
                      <span className="text-lg text-danger cursor-pointer active:opacity-50">
                        <DeleteIcon
                          onClick={() => handleDelteExperience(item.id)}
                        />
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody emptyContent={"No experiences to display."}>
            {[]}
          </TableBody>
        )}
      </Table>
    </>
  );
}
