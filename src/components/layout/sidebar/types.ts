
import { ElementType, ReactNode } from "react";

export interface SidebarLink {
  name: string;
  name_en: string;
  path: string;
  icon: ElementType;
  subMenuItems?: SidebarLink[];
  isAction?: boolean;
  action?: string;
}

export interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}
