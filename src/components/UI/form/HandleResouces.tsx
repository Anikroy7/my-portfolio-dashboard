"use client";

import { Tooltip } from "@nextui-org/tooltip";
import React from "react";
import { FaPlus } from "react-icons/fa";

import { TResource } from "@/src/types";
import { DeleteIcon } from "@/src/assets/icons";
type TResourceFormProps = {
  resources: TResource[];
  setResources: any;
};

const ResourceForm: React.FC<TResourceFormProps> = ({
  resources,
  setResources,
}) => {
  const handleAddResource = () => {
    setResources([...resources, { name: "", link: "" }]);
  };

  const handleResourceChange = (
    index: number,
    field: keyof TResource,
    value: string,
  ) => {
    const updatedResources = [...resources];

    updatedResources[index][field] = value;
    setResources(updatedResources);
  };

  const handleRemoveResource = (index: number) => {
    const updatedResources = resources.filter(
      (_: unknown, i: number) => i !== index,
    );

    setResources(updatedResources);
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between bg-default-900 text-default-50 p-2">
        <h3 className="text-md font-semibold">Add Resources</h3>
        <button
          className="flex items-center gap-2 rounded bg-green-500 text-white px-3 py-2 hover:bg-green-600"
          type="button"
          onClick={handleAddResource}
        >
          <FaPlus />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {resources.map((resource: TResource, index: number) => (
          <div key={index} className="flex items-center gap-4 mt-2">
            <input
              className="flex-1 border p-2 rounded"
              placeholder="Enter resource name"
              type="text"
              value={resource.name}
              onChange={(e) =>
                handleResourceChange(index, "name", e.target.value)
              }
            />
            <input
              className="flex-1 border p-2 rounded"
              placeholder="Enter resource link"
              type="text"
              value={resource.link}
              onChange={(e) =>
                handleResourceChange(index, "link", e.target.value)
              }
            />
            <Tooltip color="danger" content="delete" size="sm">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon onClick={() => handleRemoveResource(index)} />
              </span>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceForm;
