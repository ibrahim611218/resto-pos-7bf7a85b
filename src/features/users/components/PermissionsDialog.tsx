
import React, { useMemo } from "react";
import { UserWithPassword } from "../types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

interface Permission {
  value: string;
  label: string;
  labelAr: string;
  description?: string;
  descriptionAr?: string;
  category: string;
  adminOnly?: boolean;
  cashierAllowed?: boolean;
  kitchenAllowed?: boolean;
}

interface PermissionsDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  selectedUser: UserWithPassword | null;
  permissions: Permission[];
  selectedPermissions: string[];
  setSelectedPermissions: (permissions: string[]) => void;
  onSavePermissions: () => void;
  isArabic: boolean;
}

const PermissionsDialog: React.FC<PermissionsDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedUser,
  permissions,
  selectedPermissions,
  setSelectedPermissions,
  onSavePermissions,
  isArabic
}) => {
  // Group permissions by category
  const permissionsByCategory = useMemo(() => {
    const categories: Record<string, Permission[]> = {};
    
    permissions.forEach(permission => {
      if (!categories[permission.category]) {
        categories[permission.category] = [];
      }
      categories[permission.category].push(permission);
    });
    
    return categories;
  }, [permissions]);
  
  const categoryNames = useMemo(() => Object.keys(permissionsByCategory), [permissionsByCategory]);

  const handleCheckboxChange = (checked: boolean | "indeterminate", permission: string) => {
    if (checked) {
      setSelectedPermissions([...selectedPermissions, permission]);
    } else {
      setSelectedPermissions(selectedPermissions.filter(p => p !== permission));
    }
  };

  const handleSelectAll = (category: string) => {
    const categoryPermissions = permissionsByCategory[category].map(p => p.value);
    const newPermissions = [...selectedPermissions];
    
    categoryPermissions.forEach(permission => {
      if (!newPermissions.includes(permission)) {
        newPermissions.push(permission);
      }
    });
    
    setSelectedPermissions(newPermissions);
  };

  const handleDeselectAll = (category: string) => {
    const categoryPermissions = permissionsByCategory[category].map(p => p.value);
    setSelectedPermissions(selectedPermissions.filter(p => !categoryPermissions.includes(p)));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" dir={isArabic ? "rtl" : "ltr"}>
        <DialogHeader>
          <DialogTitle>
            {isArabic ? "إدارة صلاحيات المستخدم" : "Manage User Permissions"}
            {selectedUser && (
              <span className="mr-2 text-muted-foreground">
                {selectedUser.name}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>
        
        {categoryNames.length > 0 ? (
          <Tabs defaultValue={categoryNames[0]} className="w-full">
            <TabsList className="mb-4 w-full overflow-x-auto">
              {categoryNames.map(category => (
                <TabsTrigger key={category} value={category} className="flex-1">
                  {isArabic ? category : category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categoryNames.map(category => (
              <TabsContent key={category} value={category} className="space-y-4">
                <div className="flex justify-between mb-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleSelectAll(category)}
                  >
                    {isArabic ? "تحديد الكل" : "Select All"}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleDeselectAll(category)}
                  >
                    {isArabic ? "إلغاء تحديد الكل" : "Deselect All"}
                  </Button>
                </div>
                
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    {permissionsByCategory[category].map(permission => (
                      <div key={permission.value} className="flex items-center gap-2">
                        <Checkbox 
                          id={permission.value}
                          checked={selectedPermissions.includes(permission.value)}
                          onCheckedChange={(checked) => handleCheckboxChange(checked, permission.value)}
                        />
                        <Label 
                          htmlFor={permission.value}
                          className="flex-1 cursor-pointer"
                        >
                          {isArabic ? permission.labelAr : permission.label}
                          {permission.description && (
                            <p className="text-xs text-muted-foreground">
                              {isArabic && permission.descriptionAr 
                                ? permission.descriptionAr 
                                : permission.description}
                            </p>
                          )}
                        </Label>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            {isArabic ? "لم يتم العثور على صلاحيات" : "No permissions found"}
          </div>
        )}
        
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {isArabic ? "إلغاء" : "Cancel"}
          </Button>
          <Button onClick={onSavePermissions}>
            {isArabic ? "حفظ" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PermissionsDialog;
