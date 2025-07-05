import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import CreateProductForm from "@/components/Create/CreateProductForm";
import ProductList from "@/components/admin/products/ProductList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProductsPage() {
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata.role !== "admin") {
    redirect("/");
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Ürün Yönetimi</h1>
          <p className="text-muted-foreground">
            Ürünlerinizi ekleyin, düzenleyin ve yönetin
          </p>
        </div>
        
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">Ürün Listesi</TabsTrigger>
            <TabsTrigger value="create">Ürün Oluştur</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-4">
            <ProductList />
          </TabsContent>
          
          <TabsContent value="create" className="space-y-4">
            <CreateProductForm />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
