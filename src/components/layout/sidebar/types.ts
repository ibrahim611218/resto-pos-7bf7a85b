
import { UserRole } from "@/types";

export interface SidebarLink {
  name: string;
  name_en: string;
  path: string;
  icon: React.ComponentType<any>;
  isAdminOnly?: boolean;
  requiredEmail?: string;
  roles?: UserRole[];
  subMenuItems?: SidebarLink[];
}
