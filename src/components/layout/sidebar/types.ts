
import { ReactNode } from "react";

export interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export interface SidebarLink {
  name: string;
  path: string;
  icon: ReactNode;
  children?: SidebarLink[];
}
