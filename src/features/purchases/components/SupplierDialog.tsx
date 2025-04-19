
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Supplier, Language } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { v4 as uuidv4 } from 'uuid';

interface SupplierDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: Supplier | null;
  onSave: (supplier: Supplier) => Promise<void>;
  language: Language;
}

const SupplierDialog: React.FC<SupplierDialogProps> = ({
  open,
  onOpenChange,
  initialData,
  onSave,
  language
}) => {
  const { language: contextLanguage } = useLanguage();
  const isArabic = (language || contextLanguage) === 'ar';
  
  const [name, setName] = useState<string>('');
  const [nameAr, setNameAr] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [taxNumber, setTaxNumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [contactPerson, setContactPerson] = useState<string>('');
  
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setNameAr(initialData.nameAr || '');
      setPhone(initialData.phone || '');
      setEmail(initialData.email || '');
      setTaxNumber(initialData.taxNumber || '');
      setAddress(initialData.address || '');
      setContactPerson(initialData.contactPerson || '');
    } else {
      // Reset form
      setName('');
      setNameAr('');
      setPhone('');
      setEmail('');
      setTaxNumber('');
      setAddress('');
      setContactPerson('');
    }
  }, [initialData, open]);
  
  const handleSubmit = async () => {
    // Validate required fields
    if (!name.trim()) {
      alert(isArabic ? 'يرجى إدخال اسم المورد' : 'Please enter supplier name');
      return;
    }
    
    const supplier: Supplier = {
      id: initialData?.id || uuidv4(),
      name,
      nameAr,
      phone,
      email,
      taxNumber,
      address,
      contactPerson
    };
    
    await onSave(supplier);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {initialData 
              ? (isArabic ? 'تعديل بيانات المورد' : 'Edit Supplier') 
              : (isArabic ? 'إضافة مورد جديد' : 'Add New Supplier')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">{isArabic ? 'اسم المورد' : 'Supplier Name'}</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isArabic ? 'أدخل اسم المورد' : 'Enter supplier name'}
              />
            </div>
            <div>
              <Label htmlFor="nameAr">{isArabic ? 'اسم المورد (بالعربية)' : 'Supplier Name (Arabic)'}</Label>
              <Input
                id="nameAr"
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                placeholder={isArabic ? 'أدخل اسم المورد بالعربية' : 'Enter supplier name in Arabic'}
                dir="rtl"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">{isArabic ? 'رقم الهاتف' : 'Phone Number'}</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={isArabic ? 'أدخل رقم الهاتف' : 'Enter phone number'}
              />
            </div>
            <div>
              <Label htmlFor="email">{isArabic ? 'البريد الإلكتروني' : 'Email'}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isArabic ? 'أدخل البريد الإلكتروني' : 'Enter email address'}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="taxNumber">{isArabic ? 'الرقم الضريبي' : 'Tax Number'}</Label>
            <Input
              id="taxNumber"
              value={taxNumber}
              onChange={(e) => setTaxNumber(e.target.value)}
              placeholder={isArabic ? 'أدخل الرقم الضريبي' : 'Enter tax number'}
            />
          </div>
          
          <div>
            <Label htmlFor="address">{isArabic ? 'العنوان' : 'Address'}</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={isArabic ? 'أدخل العنوان' : 'Enter address'}
            />
          </div>
          
          <div>
            <Label htmlFor="contactPerson">{isArabic ? 'الشخص المسؤول' : 'Contact Person'}</Label>
            <Input
              id="contactPerson"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              placeholder={isArabic ? 'أدخل اسم الشخص المسؤول' : 'Enter contact person name'}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {isArabic ? 'إلغاء' : 'Cancel'}
          </Button>
          <Button onClick={handleSubmit}>
            {isArabic ? 'حفظ' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SupplierDialog;
