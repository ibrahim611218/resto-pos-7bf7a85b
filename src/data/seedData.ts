
import { Product, Category } from '@/types/products';
import { Customer } from '@/types/customers';

const categories: Category[] = [
  { id: "cat-95ae453b-5fda-4787-bef6-c0acadf46068", name: "طلبات محلي", nameAr: "", image: "/placeholder.svg", companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "cat-c7bb8cb9-ecde-4bc6-85b1-97181c08332c", name: "طلبات سفري", nameAr: "", image: "/placeholder.svg", companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "cat-40898a5f-e717-44ec-822b-bbe781015e7e", name: "سندويتشات ", nameAr: "", image: "/placeholder.svg", companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "cat-ce1a1fc3-1472-4612-9e0d-c1106a532973", name: "المشروبات", nameAr: "", image: "/placeholder.svg", companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "cat-8136b2e7-be59-461c-b9d3-552586e90617", name: "الحلى", nameAr: "", image: "/placeholder.svg", companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
];

const products: Product[] = [
  // طلبات سفري
  { id: "prod-f6553846-c7f8-40b5-8a7c-9e2ff3c4970e", name: "فول", nameAr: "", price: undefined, categoryId: "cat-c7bb8cb9-ecde-4bc6-85b1-97181c08332c", taxable: true, type: "sized", variants: [{ id: "var-d9c6b8ef-36fb-4a4c-a5c5-bbeb2fabd4e5", size: "small", price: 2 }, { id: "var-12234585-0b8b-46dc-a1a8-8ef7556146f1", size: "medium", price: 3 }, { id: "var-4ec5f30b-0888-4fdb-b988-5077c37ab3b8", size: "large", price: 4 }, { id: "var-3876c441-10e5-4853-b87e-cad74aee0f55", size: "xlarge", price: 5 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-2ea8a869-1a15-431c-91a2-9a942196e275", name: "فول مصلح", nameAr: "", price: undefined, categoryId: "cat-c7bb8cb9-ecde-4bc6-85b1-97181c08332c", taxable: true, type: "sized", variants: [{ id: "var-de48d63a-fa0f-4252-a7a1-95bef2be238a", size: "small", price: 3 }, { id: "var-42c6f690-6fc3-467e-b6cd-50b6bd1fdeaa", size: "medium", price: 4 }, { id: "var-fe95d437-5299-4503-878c-b4522896b2a1", size: "large", price: 5 }, { id: "var-54a523ed-ae21-48cd-af8e-406c72191226", size: "xlarge", price: 6 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-a4eef8c4-0362-42ca-bd90-616103968dc4", name: "شكشوكة", nameAr: "", price: undefined, categoryId: "cat-c7bb8cb9-ecde-4bc6-85b1-97181c08332c", taxable: true, type: "sized", variants: [{ id: "var-e771f072-a6c0-4cac-afed-ed052245ce51", size: "medium", price: 3 }, { id: "var-ad4d37a1-907e-4374-81f3-e2c41f61f6d3", size: "xlarge", price: 6 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-63336978-8ab2-4d7f-b420-4a0e1dc86d08", name: "بيض مقلي", nameAr: "", price: 6, categoryId: "cat-c7bb8cb9-ecde-4bc6-85b1-97181c08332c", taxable: true, type: "single", variants: [{ id: "var-d9d76cb9-a5f7-42ea-a1bf-1ae76326f457", size: "regular", price: 6 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-46617ed8-0333-4305-a751-ed6c6a0602ba", name: "حبة طعمية محشية", nameAr: "", price: 1, categoryId: "cat-c7bb8cb9-ecde-4bc6-85b1-97181c08332c", taxable: true, type: "single", variants: [{ id: "var-2dced381-c3ae-4617-864a-1fef7df60cb3", size: "regular", price: 1 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-72068a2e-f341-428b-99ca-5a622a6f8b0e", name: "3حبة طعمية ", nameAr: "", price: 1, categoryId: "cat-c7bb8cb9-ecde-4bc6-85b1-97181c08332c", taxable: true, type: "single", variants: [{ id: "var-fb237792-4ff6-49ea-b258-85ad59119535", size: "regular", price: 1 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-54f44e53-0063-4950-a7a3-764b1cee5899", name: "حبة بيض مسلوق", nameAr: "", price: 1.5, categoryId: "cat-c7bb8cb9-ecde-4bc6-85b1-97181c08332c", taxable: true, type: "single", variants: [{ id: "var-f8687592-f96e-4890-a672-98edb0338900", size: "regular", price: 1.5 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-5df7f15f-224f-4217-8b07-8dbee5737007", name: "طبق جبن", nameAr: "", price: undefined, categoryId: "cat-c7bb8cb9-ecde-4bc6-85b1-97181c08332c", taxable: true, type: "sized", variants: [{ id: "var-079ba470-6b73-4a19-91bc-7c36dd0d96a3", size: "small", price: 2 }, { id: "var-f7b19175-3b6b-47ee-81de-497e14e6859f", size: "medium", price: 3 }, { id: "var-8f65956f-0353-47fb-8202-3c598143e955", size: "large", price: 4 }, { id: "var-85c817af-c4b5-4fb8-a99b-7c9103f3b11f", size: "xlarge", price: 5 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-e9647aea-768a-4ac0-8d20-f080140bb8b4", name: "بطاطس", nameAr: "", price: undefined, categoryId: "cat-c7bb8cb9-ecde-4bc6-85b1-97181c08332c", taxable: true, type: "sized", variants: [{ id: "var-629dd1be-ef5b-45dc-84aa-47c74d3e7ece", size: "small", price: 2 }, { id: "var-cd3ff03e-4da8-4f5b-a368-f71028405ed4", size: "medium", price: 3 }, { id: "var-a0e864f1-0d95-4b56-b62a-9acbce9d8a11", size: "large", price: 4 }, { id: "var-8e7c066c-6841-447d-81bc-b496ac928e60", size: "xlarge", price: 5 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-f427417f-64c9-4422-bd5d-a5251779c291", name: "بزنجان", nameAr: "", price: undefined, categoryId: "cat-c7bb8cb9-ecde-4bc6-85b1-97181c08332c", taxable: true, type: "sized", variants: [{ id: "var-7be318f8-20f6-42ac-99d0-ffe6e97efe53", size: "small", price: 2 }, { id: "var-dd415262-df1c-4673-8cab-175f022ba504", size: "medium", price: 3 }, { id: "var-0653b714-efac-48bd-8def-fe16cbf70878", size: "large", price: 4 }, { id: "var-9fd43cab-9661-4a43-9c21-25b3b808c9d9", size: "xlarge", price: 5 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-2a2a0a73-91af-4fb7-852b-bc69aafd5bd8", name: "مسقعة", nameAr: "", price: undefined, categoryId: "cat-c7bb8cb9-ecde-4bc6-85b1-97181c08332c", taxable: true, type: "sized", variants: [{ id: "var-c18631c0-fee0-468f-ab63-4ddc2e194e18", size: "small", price: 2 }, { id: "var-c20f7298-936b-44e3-8eff-13116cc04f6c", size: "medium", price: 3 }, { id: "var-3fdb879d-4062-4286-a69b-fc86f92035e8", size: "large", price: 4 }, { id: "var-4540e416-592f-4f35-a07b-e4351e89def1", size: "xlarge", price: 5 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-8e381557-ba06-4320-a176-9f06f29f9ec3", name: "قرنبيط", nameAr: "", price: undefined, categoryId: "cat-c7bb8cb9-ecde-4bc6-85b1-97181c08332c", taxable: true, type: "sized", variants: [{ id: "var-c330368a-9270-4261-bee6-1d497e9b6f1d", size: "small", price: 2 }, { id: "var-92d3f125-4efd-48ac-a57c-f4eda9a4d702", size: "medium", price: 3 }, { id: "var-9b5905d6-fb95-4ba6-8a46-3d1617870332", size: "large", price: 4 }, { id: "var-1d0374cf-f381-46bf-b393-8e2f9dfc4fbc", size: "xlarge", price: 5 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-e9aa3fd4-a1e6-4e0b-b902-63e2aff1160c", name: "سلطة", nameAr: "", price: undefined, categoryId: "cat-c7bb8cb9-ecde-4bc6-85b1-97181c08332c", taxable: true, type: "sized", variants: [{ id: "var-0ed21821-093c-419b-bb99-6555e9ac94f9", size: "small", price: 2 }, { id: "var-1c873620-816a-44d8-8537-30b89d41581b", size: "medium", price: 3 }, { id: "var-bc25f22d-d89e-4161-bba4-f819027e9064", size: "large", price: 4 }, { id: "var-70cecf9a-e514-4c31-8719-ec8f0ad92144", size: "xlarge", price: 5 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-4d5cd361-ef25-4413-810e-df91c4847fe2", name: "طبق ورد", nameAr: "", price: undefined, categoryId: "cat-c7bb8cb9-ecde-4bc6-85b1-97181c08332c", taxable: true, type: "sized", variants: [{ id: "var-965d5af7-ad8a-4c73-8881-1db8ff9256d7", size: "medium", price: 3 }, { id: "var-3d3af19e-7eb7-4c6f-8755-ab16c9ba6f19", size: "xlarge", price: 5 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-7423fc76-8c38-4b4d-bfeb-9b4a4adcb3bb", name: "طبق مشكل", nameAr: "", price: undefined, categoryId: "cat-c7bb8cb9-ecde-4bc6-85b1-97181c08332c", taxable: true, type: "sized", variants: [{ id: "var-cef7b8a4-4c68-4397-8867-2170f3b69356", size: "medium", price: 6 }, { id: "var-81dd0ad7-01f3-4593-b754-53624fec1eba", size: "xlarge", price: 12 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-77255882-0d20-4797-a353-2ab8ce774197", name: "مخلل", nameAr: "", price: undefined, categoryId: "cat-c7bb8cb9-ecde-4bc6-85b1-97181c08332c", taxable: true, type: "sized", variants: [{ id: "var-ab709ecc-1842-40cf-8c7e-0381948259d5", size: "small", price: 2 }, { id: "var-e323f497-3f48-41b3-8dd7-9592df52cb40", size: "medium", price: 3 }, { id: "var-c701b425-5965-40a5-a654-b6c99e5c6be6", size: "large", price: 4 }, { id: "var-42ae6219-8811-4e3b-a0e8-f35b4a4f932d", size: "xlarge", price: 5 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  // طلبات محلي
  { id: "prod-753d71b4-a49d-487a-8da9-c4589bea3d6d", name: "فول", nameAr: "", price: 6, categoryId: "cat-95ae453b-5fda-4787-bef6-c0acadf46068", taxable: true, type: "single", variants: [{ id: "var-a3b1c567-2d3c-451a-90f1-19f9c74f45fc", size: "regular", price: 6 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-978d9940-16ce-4891-8db4-f5c9e813db75", name: "فول مصلح", nameAr: "", price: 8, categoryId: "cat-95ae453b-5fda-4787-bef6-c0acadf46068", taxable: true, type: "single", variants: [{ id: "var-aaf826b3-df9e-4178-b630-62a0d91db16b", size: "regular", price: 8 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-a2a153ee-d268-430c-ac22-f09d9317c632", name: "شكشوكة", nameAr: "", price: 6, categoryId: "cat-95ae453b-5fda-4787-bef6-c0acadf46068", taxable: true, type: "single", variants: [{ id: "var-fd58f0d0-8b2d-4e45-866e-6dc69afdffff", size: "regular", price: 6 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-f74e87c4-e329-4a8a-8eec-01bbd98d7d66", name: "بيض مقلي", nameAr: "", price: 6, categoryId: "cat-95ae453b-5fda-4787-bef6-c0acadf46068", taxable: true, type: "single", variants: [{ id: "var-a2f15b8e-a16b-4b34-a7ec-91f711b7fd3a", size: "regular", price: 6 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-71a6a09a-9f6a-4fab-9934-71066c085956", name: "حبة طعمية محشية", nameAr: "", price: 1, categoryId: "cat-95ae453b-5fda-4787-bef6-c0acadf46068", taxable: true, type: "single", variants: [{ id: "var-f4b5dfac-22a9-41fa-a21c-7a824fd5efbb", size: "regular", price: 1 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-1e1fdfa1-52e6-4151-a561-3046ecca0a7d", name: "3حبة طعمية ", nameAr: "", price: 1, categoryId: "cat-95ae453b-5fda-4787-bef6-c0acadf46068", taxable: true, type: "single", variants: [{ id: "var-e4e996c3-0a29-4c2e-80bb-f646f86b72bd", size: "regular", price: 1 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-e2bb4b95-569d-4d66-b8dc-19361b8b3565", name: "حبة بيض مسلوق", nameAr: "", price: 1.5, categoryId: "cat-95ae453b-5fda-4787-bef6-c0acadf46068", taxable: true, type: "single", variants: [{ id: "var-a6ae31b0-d450-4885-a55b-67e8cb0766ce", size: "regular", price: 1.5 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-1c64a867-3055-40f4-99c5-25fcd45006a3", name: "طبق جبن", nameAr: "", price: undefined, categoryId: "cat-95ae453b-5fda-4787-bef6-c0acadf46068", taxable: true, type: "sized", variants: [{ id: "var-cc9bad4f-67f0-4e57-88f8-ec91f62f059b", size: "medium", price: 3 }, { id: "var-0514744b-0032-4eee-b0cd-543bae4f783a", size: "xlarge", price: 5 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-0d00cae6-3cd6-4156-aa52-850764df6555", name: "بطاطس", nameAr: "", price: undefined, categoryId: "cat-95ae453b-5fda-4787-bef6-c0acadf46068", taxable: true, type: "sized", variants: [{ id: "var-f2638865-1fe2-4629-b956-265a812e9288", size: "medium", price: 3 }, { id: "var-022036c4-9877-4b1a-b1bb-d1fb75b26378", size: "xlarge", price: 5 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-d42e8bf6-6a80-4958-9469-6765e624500a", name: "بزنجان", nameAr: "", price: undefined, categoryId: "cat-95ae453b-5fda-4787-bef6-c0acadf46068", taxable: true, type: "sized", variants: [{ id: "var-355c6e22-377d-4291-96f5-1b6e85b9a261", size: "medium", price: 3 }, { id: "var-fcf5b53d-6e66-4127-874d-8900bc33a53f", size: "xlarge", price: 5 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-1541a774-190d-41ac-9c9c-b23564be6720", name: "مسقعة", nameAr: "", price: undefined, categoryId: "cat-95ae453b-5fda-4787-bef6-c0acadf46068", taxable: true, type: "sized", variants: [{ id: "var-767d3d5f-2373-4e9b-8b3e-aa0d58151699", size: "medium", price: 3 }, { id: "var-e780098c-9037-49b7-98ef-709ab971e01c", size: "xlarge", price: 5 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-3e487d9a-e7cf-4e14-95b4-679a5ad444e5", name: "قرنبيط", nameAr: "", price: undefined, categoryId: "cat-95ae453b-5fda-4787-bef6-c0acadf46068", taxable: true, type: "sized", variants: [{ id: "var-2b5e8564-89db-4900-a1db-4a282d5135d1", size: "medium", price: 3 }, { id: "var-56a5be67-8a4d-4e4e-bf89-9ea772be8b5e", size: "xlarge", price: 5 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-2958a86a-1666-4ef4-b2c1-2043c775dc8c", name: "سلطة", nameAr: "", price: undefined, categoryId: "cat-95ae453b-5fda-4787-bef6-c0acadf46068", taxable: true, type: "sized", variants: [{ id: "var-a12f8d29-da14-4e45-9d75-ecbcc1e18aa0", size: "medium", price: 3 }, { id: "var-222b1c0f-84cc-40b8-b9cb-2fc8fe53512f", size: "xlarge", price: 5 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-fe7b9b49-3e48-4356-ae73-4e46d249d646", name: "طبق ورد", nameAr: "", price: 5, categoryId: "cat-95ae453b-5fda-4787-bef6-c0acadf46068", taxable: true, type: "single", variants: [{ id: "var-ae7a0754-4522-4b47-b724-7a20a8fd9e74", size: "regular", price: 5 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-d105a0d4-f27d-4836-8f1e-7019c1860294", name: "طبق مشكل", nameAr: "", price: 6, categoryId: "cat-95ae453b-5fda-4787-bef6-c0acadf46068", taxable: true, type: "single", variants: [{ id: "var-cd4f28f1-b39a-4076-b05d-80b9ea19a927", size: "regular", price: 6 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  // سندويتشات
  { id: "prod-7d38a2da-914c-4230-bcea-ab133d1d68aa", name: "سندويتش طعمية", nameAr: "", price: 2.5, categoryId: "cat-40898a5f-e717-44ec-822b-bbe781015e7e", taxable: true, type: "single", variants: [{ id: "var-8d9d0bda-9cff-4f91-96ac-06232c684c08", size: "regular", price: 2.5 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-ae8bdfdb-8582-4d89-a0b6-b6a457e034c9", name: "سندويتش طعمية بالبيض", nameAr: "", price: 4, categoryId: "cat-40898a5f-e717-44ec-822b-bbe781015e7e", taxable: true, type: "single", variants: [{ id: "var-5dbc646d-e6ba-4189-8912-ba6dd3231a4c", size: "regular", price: 4 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-6be18693-4602-46bc-afd1-f5f885414623", name: "سندويتش طعمية مسقعة", nameAr: "", price: 3, categoryId: "cat-40898a5f-e717-44ec-822b-bbe781015e7e", taxable: true, type: "single", variants: [{ id: "var-c661ba28-0935-42e2-8ab7-c1fac2a4fc45", size: "regular", price: 3 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-1e7c8f9d-2bef-436b-8914-6effe62eb328", name: "سندويتش طعمية جبن", nameAr: "", price: 3, categoryId: "cat-40898a5f-e717-44ec-822b-bbe781015e7e", taxable: true, type: "single", variants: [{ id: "var-35e3eaaa-956c-4498-a5e6-1fbc3fdae990", size: "regular", price: 3 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-1fee6f76-f15a-4de5-805a-97eebb8f90ac", name: "سندويتش طعمية مهروس", nameAr: "", price: 3, categoryId: "cat-40898a5f-e717-44ec-822b-bbe781015e7e", taxable: true, type: "single", variants: [{ id: "var-32368350-fef2-4f42-b2d0-c16c926e975f", size: "regular", price: 3 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-8b543288-c497-478d-b5c0-2586194061f5", name: "سندويتش طعمية مشكل كل شئ", nameAr: "", price: 5, categoryId: "cat-40898a5f-e717-44ec-822b-bbe781015e7e", taxable: true, type: "single", variants: [{ id: "var-d52b1edf-dcbd-4d88-8dc7-c802193597b4", size: "regular", price: 5 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-ccf76f85-bd53-40f5-aca3-08dc4be3a53e", name: "سندويتش فول ", nameAr: "", price: 2.5, categoryId: "cat-40898a5f-e717-44ec-822b-bbe781015e7e", taxable: true, type: "single", variants: [{ id: "var-904176e4-8632-49af-9b3e-220d197d0a62", size: "regular", price: 2.5 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-1d28e821-1cc8-4c98-badb-f4532f77994b", name: "سندويتش فول و طعمية", nameAr: "", price: 3, categoryId: "cat-40898a5f-e717-44ec-822b-bbe781015e7e", taxable: true, type: "single", variants: [{ id: "var-da2063d3-831c-446d-9b81-766858def7bb", size: "regular", price: 3 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-7fa43c86-2521-4b69-a68a-2e40a686db23", name: "سندويتش فول بيض", nameAr: "", price: 4, categoryId: "cat-40898a5f-e717-44ec-822b-bbe781015e7e", taxable: true, type: "single", variants: [{ id: "var-2d846538-84c5-4ba4-bd3f-43bf18b7b3c7", size: "regular", price: 4 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-3a59c033-c103-4c8e-b1c8-dc274354d3c8", name: "سندويتش فول مشكل كل شئ", nameAr: "", price: 5, categoryId: "cat-40898a5f-e717-44ec-822b-bbe781015e7e", taxable: true, type: "single", variants: [{ id: "var-a711efea-6c40-4764-a4ee-8b01cc778fd3", size: "regular", price: 5 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-dfecfb9a-1be0-4665-94d0-2f3797ca070c", name: "سندويتش بطاطس", nameAr: "", price: 3, categoryId: "cat-40898a5f-e717-44ec-822b-bbe781015e7e", taxable: true, type: "single", variants: [{ id: "var-71c2fae9-0114-44db-a99d-cc51f98b286a", size: "regular", price: 3 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-71231413-01b7-4f8f-aaa2-146294384c2a", name: "سندويتش بطاطس بيض", nameAr: "", price: 4, categoryId: "cat-40898a5f-e717-44ec-822b-bbe781015e7e", taxable: true, type: "single", variants: [{ id: "var-a79fc1f7-c804-41f3-80b6-e88e6ea3c311", size: "regular", price: 4 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-aa29d605-1656-488c-9da4-1917dcb70897", name: "سندويتش شكشوكة", nameAr: "", price: 3, categoryId: "cat-40898a5f-e717-44ec-822b-bbe781015e7e", taxable: true, type: "single", variants: [{ id: "var-ef624265-837d-4dae-8b53-aaa0b9b4551d", size: "regular", price: 3 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-385ad1f4-bb99-4e50-8fe3-bc078772a815", name: "سندويتش جبن", nameAr: "", price: 3, categoryId: "cat-40898a5f-e717-44ec-822b-bbe781015e7e", taxable: true, type: "single", variants: [{ id: "var-9b48221d-36f1-4df8-bf1f-aa4a0b7508a4", size: "regular", price: 3 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-cdeed632-b2ff-4ffe-8512-8f0c6a05cbde", name: "سندويتش جبن بيض", nameAr: "", price: 4, categoryId: "cat-40898a5f-e717-44ec-822b-bbe781015e7e", taxable: true, type: "single", variants: [{ id: "var-589c3c9d-5de8-40b5-af1a-c982a9f6a780", size: "regular", price: 4 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-5d0aff6a-2ec4-4666-a6c2-09c58a309a5f", name: "سندويتش مسقعة", nameAr: "", price: 3, categoryId: "cat-40898a5f-e717-44ec-822b-bbe781015e7e", taxable: true, type: "single", variants: [{ id: "var-fe768467-af9e-4d99-a9aa-3317bf2aeb6e", size: "regular", price: 3 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-4084ae5e-f1a8-435b-b5de-9aa251c3b8a4", name: "سندويتش بزنجان", nameAr: "", price: 3, categoryId: "cat-40898a5f-e717-44ec-822b-bbe781015e7e", taxable: true, type: "single", variants: [{ id: "var-51b1de8a-a323-435e-9830-635ce3052431", size: "regular", price: 3 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-28b25042-6acf-4ee6-8dae-520a42f81f7f", name: "سندويتش قرنبيط", nameAr: "", price: 3, categoryId: "cat-40898a5f-e717-44ec-822b-bbe781015e7e", taxable: true, type: "single", variants: [{ id: "var-c30598d2-3fda-4292-b224-c217ad2c7a64", size: "regular", price: 3 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  // المشروبات
  { id: "prod-dfa87f8e-8573-4931-87cc-ed3c717f3f33", name: "كينزا", nameAr: "", price: 2, categoryId: "cat-ce1a1fc3-1472-4612-9e0d-c1106a532973", taxable: true, type: "single", variants: [{ id: "var-05302fa7-64f6-447d-9704-f52d89e7ab94", size: "regular", price: 2 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-696a2425-a570-4f4b-becf-178e1fc7f90e", name: "كولا", nameAr: "", price: 3, categoryId: "cat-ce1a1fc3-1472-4612-9e0d-c1106a532973", taxable: true, type: "single", variants: [{ id: "var-4bfd9bda-90de-4fe7-a962-ee924c4f6e44", size: "regular", price: 3 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-3f9a54f8-2177-40e7-bee5-f4f5bab07947", name: "مياه", nameAr: "", price: 1, categoryId: "cat-ce1a1fc3-1472-4612-9e0d-c1106a532973", taxable: true, type: "single", variants: [{ id: "var-587c0e63-022c-49ab-bb9c-e6b3776187c8", size: "regular", price: 1 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-6639cebf-dba6-4ba9-818f-01d4725eb22d", name: "شاي", nameAr: "", price: 1.5, categoryId: "cat-ce1a1fc3-1472-4612-9e0d-c1106a532973", taxable: true, type: "single", variants: [{ id: "var-950b4f53-597e-49b2-bccd-f4dcbe178298", size: "regular", price: 1.5 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  // الحلى
  { id: "prod-b5bbe49c-9397-45aa-8a6f-838932bdb20e", name: "مهلبيه", nameAr: "", price: 3, categoryId: "cat-8136b2e7-be59-461c-b9d3-552586e90617", taxable: true, type: "single", variants: [{ id: "var-e14041b9-f6d5-4e57-bdaa-2f3543cf90e1", size: "regular", price: 3 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
  { id: "prod-f9a7607f-f509-4393-b8d7-0948fdf37949", name: "ارز بلبن", nameAr: "", price: 3, categoryId: "cat-8136b2e7-be59-461c-b9d3-552586e90617", taxable: true, type: "single", variants: [{ id: "var-5c4df7ce-318c-4f69-92d1-b05d1a9a10a2", size: "regular", price: 3 }], companyId: "2ebf6577-89b1-438a-aeec-5af99d470d2a" },
];

const companies = [
  {
    id: "2ebf6577-89b1-438a-aeec-5af99d470d2a",
    name: "فلافل ابو عمر",
    isActive: true,
    createdAt: "2025-06-16T05:13:17.242Z",
    email: "slsaxx81@gmail.com",
    password: "123456",
    subscriptionStart: "2025-06-16T05:13:17.242Z",
    subscriptionEnd: "2030-04-02T00:00:00.000Z",
    address: "خميس مشيط الخالدية",
    phone: "0562894348"
  }
];

const customers: Customer[] = [];

/**
 * Seeds demo data into localStorage - clears old data and loads backup
 */
export const seedDemoData = () => {
  // Clear all existing data first
  localStorage.removeItem('stored-products');
  localStorage.removeItem('stored-categories');
  localStorage.removeItem('customers');
  localStorage.removeItem('companies');
  localStorage.removeItem('invoices');
  localStorage.removeItem('purchases');

  // Seed new data
  localStorage.setItem('stored-products', JSON.stringify(products));
  localStorage.setItem('stored-categories', JSON.stringify(categories));
  localStorage.setItem('customers', JSON.stringify(customers));
  localStorage.setItem('companies', JSON.stringify(companies));
  localStorage.setItem('invoices', JSON.stringify([]));
  localStorage.setItem('purchases', JSON.stringify([]));

  console.log(`Seeded ${products.length} products, ${categories.length} categories, ${companies.length} companies`);

  // Dispatch events to refresh UI
  window.dispatchEvent(new CustomEvent('product-updated'));
  window.dispatchEvent(new CustomEvent('category-updated'));
  window.dispatchEvent(new CustomEvent('customer-updated'));
};
