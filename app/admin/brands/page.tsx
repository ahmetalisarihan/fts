import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import CreateBrandForm from "@/components/Create/CreateBrand";
import BrandList from "@/components/admin/brands/BrandList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BrandsPage() {
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata.role !== "admin") {
    redirect("/");
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Marka Yönetimi</h1>
          <p className="text-muted-foreground">
            Markalarınızı ekleyin, düzenleyin ve yönetin
          </p>
        </div>
        
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">Marka Listesi</TabsTrigger>
            <TabsTrigger value="create">Marka Oluştur</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-4">
            <BrandList />
          </TabsContent>
          
          <TabsContent value="create" className="space-y-4">
            <CreateBrandForm />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
