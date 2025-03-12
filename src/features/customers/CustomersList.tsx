
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
import BrandLogo from "@/components/ui-custom/BrandLogo";

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
    <div className="container mx-auto p-2 sm:p-4 md:p-6 lg:p-8 h-[calc(100vh-4rem)]">
      <Card className="h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-4">
            <BrandLogo size={40} className="hidden sm:block" />
            <CardTitle className="text-xl sm:text-2xl">
              {isArabic ? "العملاء" : "Customers"}
            </CardTitle>
          </div>
          <Button 
            onClick={handleAddClick} 
            size="sm"
            className="bg-[#F97316] hover:bg-[#EA580C] text-white text-xs sm:text-sm"
          >
            <Plus className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">
              {isArabic ? "إضافة عميل" : "Add Customer"}
            </span>
          </Button>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-hidden flex flex-col gap-4 p-2 sm:p-4">
          <div className="relative w-full max-w-md">
            <Search className={`absolute ${isArabic ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4`} />
            <Input
              placeholder={isArabic ? "البحث عن عميل..." : "Search customers..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`${isArabic ? 'pr-10' : 'pl-10'} h-10 text-sm border-[#0D7C39] focus-visible:ring-[#0D7C39]`}
            />
          </div>
          
          <div className="flex-1 overflow-auto border rounded-md bg-white">
            <Table>
              <TableHeader className="sticky top-0 bg-card z-10">
                <TableRow>
                  <TableHead className="text-xs sm:text-sm">{isArabic ? "الاسم" : "Name"}</TableHead>
                  <TableHead className="text-xs sm:text-sm">{isArabic ? "رقم الهاتف" : "Phone"}</TableHead>
                  <TableHead className="text-xs sm:text-sm hidden md:table-cell">{isArabic ? "البريد الإلكتروني" : "Email"}</TableHead>
                  <TableHead className="text-xs sm:text-sm hidden lg:table-cell">{isArabic ? "الرقم الضريبي" : "Tax Number"}</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24 text-sm">
                      {isArabic ? "لا يوجد عملاء" : "No customers found"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium text-xs sm:text-sm">{customer.name}</TableCell>
                      <TableCell className="text-xs sm:text-sm">{customer.phone || "-"}</TableCell>
                      <TableCell className="text-xs sm:text-sm hidden md:table-cell">{customer.email || "-"}</TableCell>
                      <TableCell className="text-xs sm:text-sm hidden lg:table-cell">{customer.taxNumber || "-"}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1 sm:gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 text-[#0D7C39] hover:text-[#0D7C39] hover:bg-green-50"
                            onClick={() => handleEditClick(customer)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-500 hover:bg-red-50"
                            onClick={() => handleDeleteClick(customer.id || "")}
                          >
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
