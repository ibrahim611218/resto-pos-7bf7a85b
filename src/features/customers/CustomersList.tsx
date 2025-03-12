
import React, { useState } from "react";
import { Customer } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash } from "lucide-react";
import CustomerDialog from "./components/CustomerDialog";
import DeleteConfirmationDialog from "./components/DeleteConfirmationDialog";
import { useCustomers } from "./hooks/useCustomers";
import { useLanguage } from "@/context/LanguageContext";

const CustomersList: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  
  const { 
    customers, 
    searchTerm, 
    setSearchTerm,
    filteredCustomers, 
    addCustomer, 
    updateCustomer, 
    deleteCustomer 
  } = useCustomers();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerToDelete, setCustomerToDelete] = useState<string | null>(null);

  const handleAddClick = () => {
    setSelectedCustomer(null);
    setIsDialogOpen(true);
  };

  const handleEditClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setCustomerToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedCustomer(null);
  };

  const handleDialogSave = (customer: Customer) => {
    if (selectedCustomer) {
      updateCustomer(customer);
    } else {
      addCustomer(customer);
    }
    setIsDialogOpen(false);
    setSelectedCustomer(null);
  };

  const handleDeleteConfirm = () => {
    if (customerToDelete) {
      deleteCustomer(customerToDelete);
    }
    setIsDeleteDialogOpen(false);
    setCustomerToDelete(null);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setCustomerToDelete(null);
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>
            {isArabic ? "العملاء" : "Customers"}
          </CardTitle>
          <Button onClick={handleAddClick} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            {isArabic ? "إضافة عميل" : "Add Customer"}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className={`absolute ${isArabic ? 'right-3' : 'left-3'} top-3 text-muted-foreground h-4 w-4`} />
            <Input
              placeholder={isArabic ? "البحث عن عميل..." : "Search customers..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`${isArabic ? 'pr-10' : 'pl-10'}`}
            />
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{isArabic ? "الاسم" : "Name"}</TableHead>
                  <TableHead>{isArabic ? "رقم الهاتف" : "Phone"}</TableHead>
                  <TableHead>{isArabic ? "البريد الإلكتروني" : "Email"}</TableHead>
                  <TableHead>{isArabic ? "الرقم الضريبي" : "Tax Number"}</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24">
                      {isArabic ? "لا يوجد عملاء" : "No customers found"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.phone || "-"}</TableCell>
                      <TableCell>{customer.email || "-"}</TableCell>
                      <TableCell>{customer.taxNumber || "-"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEditClick(customer)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(customer.id || "")}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Customer Dialog */}
      <CustomerDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSave={handleDialogSave}
        customer={selectedCustomer}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default CustomersList;
