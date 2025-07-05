import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import CreateCategoryForm from "@/components/Create/CreateCategoryForm";
import CreateSubcategoryForm from "@/components/Create/CreateSubcategoryForm";
import ManageSubcategories from "@/components/ManageSubcategories";
import CategoryList from "@/components/admin/categories/CategoryList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CategoriesPage() {
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata.role !== "admin") {
    redirect("/");
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Kategori Yönetimi</h1>
          <p className="text-muted-foreground">
            Kategorilerinizi ve alt kategorilerinizi yönetin
          </p>
        </div>
        
        <Tabs defaultValue="create-category" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="create-category">Kategori Oluştur</TabsTrigger>
            <TabsTrigger value="create-subcategory">Alt Kategori Oluştur</TabsTrigger>
            <TabsTrigger value="manage-subcategories">Alt Kategorileri Yönet</TabsTrigger>
            <TabsTrigger value="list-categories">Kategori Listesi</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create-category" className="space-y-4">
            <CreateCategoryForm />
          </TabsContent>
          
          <TabsContent value="create-subcategory" className="space-y-4">
            <CreateSubcategoryForm />
          </TabsContent>
          
          <TabsContent value="manage-subcategories" className="space-y-4">
            <ManageSubcategories />
          </TabsContent>
          
          <TabsContent value="list-categories" className="space-y-4">
            <CategoryList />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
