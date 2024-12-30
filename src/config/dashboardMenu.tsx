import { FaBlog, FaBrain, FaBriefcase, FaProjectDiagram } from "react-icons/fa";

export const adminMenuItems = [
  {
    path: "manage-blog",
    label: "Manage Blogs",
    icon: <FaBlog className="h-5 w-5" />, // More specific icon for blogs
  },
  {
    path: "manage-experience",
    label: "Manage Experiences",
    icon: <FaBriefcase className="h-5 w-5" />, // Represents work experience
  },
  {
    path: "manage-project",
    label: "Manage Projects",
    icon: <FaProjectDiagram className="h-5 w-5" />, // Better visual for projects
  },
  {
    path: "manage-skill",
    label: "Manage Skills",
    icon: <FaBrain className="h-5 w-5" />, // Symbolizes skills and knowledge
  },
];
