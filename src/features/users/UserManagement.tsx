
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockUsers } from "@/features/auth/data/mockUsers";
import { User, UserRole } from "@/types";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { PlusCircle, Edit, Trash, Key } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Extend User type to include password for the form
interface UserWithPassword extends User {
  password: string;
}

const UserManagement: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  const [users, setUsers] = useState<UserWithPassword[]>(
    mockUsers.map(user => ({ ...user, password: "********" }))
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserWithPassword | null>(null);
  const [newUser, setNewUser] = useState<UserWithPassword>({
    id: "",
    name: "",
    email: "",
    role: "cashier",
    password: ""
  });
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const handleAddUser = () => {
    // Basic validation
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (newUser.password.length < 6) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل" : "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }
    
    // Check if email already exists
    if (users.some(user => user.email === newUser.email)) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "البريد الإلكتروني موجود بالفعل" : "Email already exists",
        variant: "destructive"
      });
      return;
    }
    
    // Add new user
    const userId = Math.random().toString(36).substring(2, 9);
    setUsers([...users, { ...newUser, id: userId }]);
    setIsAddDialogOpen(false);
    
    // Reset form
    setNewUser({
      id: "",
      name: "",
      email: "",
      role: "cashier",
      password: ""
    });
    
    toast({
      title: isArabic ? "تم إضافة المستخدم" : "User Added",
      description: isArabic ? "تمت إضافة المستخدم بنجاح" : "User has been added successfully"
    });
  };
  
  const handleEditUser = () => {
    if (!currentUser) return;
    
    // Basic validation
    if (!currentUser.name || !currentUser.email) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Update user
    setUsers(users.map(user => 
      user.id === currentUser.id ? { ...currentUser } : user
    ));
    
    setIsEditDialogOpen(false);
    setCurrentUser(null);
    
    toast({
      title: isArabic ? "تم تحديث المستخدم" : "User Updated",
      description: isArabic ? "تم تحديث بيانات المستخدم بنجاح" : "User has been updated successfully"
    });
  };
  
  const handleChangePassword = () => {
    if (!currentUser) return;
    
    // Basic validation
    if (!newPassword || !confirmPassword) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword.length < 6) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل" : "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic ? "كلمات المرور غير متطابقة" : "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    // Update password
    setUsers(users.map(user => 
      user.id === currentUser.id ? { ...user, password: newPassword } : user
    ));
    
    setIsPasswordDialogOpen(false);
    setCurrentUser(null);
    setNewPassword("");
    setConfirmPassword("");
    
    toast({
      title: isArabic ? "تم تغيير كلمة المرور" : "Password Changed",
      description: isArabic ? "تم تغيير كلمة المرور بنجاح" : "Password has been changed successfully"
    });
  };
  
  const handleDeleteUser = () => {
    if (!currentUser) return;
    
    // Delete user
    setUsers(users.filter(user => user.id !== currentUser.id));
    
    setIsDeleteDialogOpen(false);
    setCurrentUser(null);
    
    toast({
      title: isArabic ? "تم حذف المستخدم" : "User Deleted",
      description: isArabic ? "تم حذف المستخدم بنجاح" : "User has been deleted successfully"
    });
  };
  
  const getRoleName = (role: UserRole): string => {
    switch (role) {
      case "admin":
        return isArabic ? "مدير" : "Admin";
      case "cashier":
        return isArabic ? "كاشير" : "Cashier";
      case "kitchen":
        return isArabic ? "مطبخ" : "Kitchen";
      default:
        return role;
    }
  };
  
  return (
    <div className="container p-4" dir={isArabic ? "rtl" : "ltr"}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{isArabic ? "إدارة المستخدمين" : "User Management"}</CardTitle>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            {isArabic ? "إضافة مستخدم" : "Add User"}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{isArabic ? "الاسم" : "Name"}</TableHead>
                  <TableHead>{isArabic ? "البريد الإلكتروني" : "Email"}</TableHead>
                  <TableHead>{isArabic ? "الدور" : "Role"}</TableHead>
                  <TableHead className="text-right">{isArabic ? "الإجراءات" : "Actions"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleName(user.role)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            setCurrentUser(user);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            setCurrentUser(user);
                            setIsPasswordDialogOpen(true);
                          }}
                        >
                          <Key className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            setCurrentUser(user);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Add User Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isArabic ? "إضافة مستخدم جديد" : "Add New User"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">{isArabic ? "الاسم" : "Name"}</Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{isArabic ? "البريد الإلكتروني" : "Email"}</Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{isArabic ? "كلمة المرور" : "Password"}</Label>
              <Input
                id="password"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">{isArabic ? "الدور" : "Role"}</Label>
              <Select
                value={newUser.role}
                onValueChange={(value: UserRole) => setNewUser({ ...newUser, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={isArabic ? "اختر الدور" : "Select role"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">{isArabic ? "مدير" : "Admin"}</SelectItem>
                  <SelectItem value="cashier">{isArabic ? "كاشير" : "Cashier"}</SelectItem>
                  <SelectItem value="kitchen">{isArabic ? "مطبخ" : "Kitchen"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              {isArabic ? "إلغاء" : "Cancel"}
            </Button>
            <Button onClick={handleAddUser}>
              {isArabic ? "إضافة" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isArabic ? "تعديل المستخدم" : "Edit User"}</DialogTitle>
          </DialogHeader>
          {currentUser && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="edit-name">{isArabic ? "الاسم" : "Name"}</Label>
                <Input
                  id="edit-name"
                  value={currentUser.name}
                  onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">{isArabic ? "البريد الإلكتروني" : "Email"}</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={currentUser.email}
                  onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-role">{isArabic ? "الدور" : "Role"}</Label>
                <Select
                  value={currentUser.role}
                  onValueChange={(value: UserRole) => setCurrentUser({ ...currentUser, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">{isArabic ? "مدير" : "Admin"}</SelectItem>
                    <SelectItem value="cashier">{isArabic ? "كاشير" : "Cashier"}</SelectItem>
                    <SelectItem value="kitchen">{isArabic ? "مطبخ" : "Kitchen"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              {isArabic ? "إلغاء" : "Cancel"}
            </Button>
            <Button onClick={handleEditUser}>
              {isArabic ? "حفظ" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Change Password Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isArabic ? "تغيير كلمة المرور" : "Change Password"}
            </DialogTitle>
            <DialogDescription>
              {isArabic 
                ? `تغيير كلمة المرور للمستخدم: ${currentUser?.name}`
                : `Change password for user: ${currentUser?.name}`
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="new-password">
                {isArabic ? "كلمة المرور الجديدة" : "New Password"}
              </Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">
                {isArabic ? "تأكيد كلمة المرور" : "Confirm Password"}
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
              {isArabic ? "إلغاء" : "Cancel"}
            </Button>
            <Button onClick={handleChangePassword}>
              {isArabic ? "تغيير" : "Change"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isArabic ? "تأكيد الحذف" : "Confirm Deletion"}
            </DialogTitle>
            <DialogDescription>
              {isArabic 
                ? `هل أنت متأكد من حذف المستخدم: ${currentUser?.name}؟`
                : `Are you sure you want to delete user: ${currentUser?.name}?`
              }
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              {isArabic ? "إلغاء" : "Cancel"}
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              {isArabic ? "حذف" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
