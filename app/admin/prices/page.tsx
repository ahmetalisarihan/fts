import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import CreatePriceList from "@/components/Create/CreatePriceList";
import DeletePriceLists from "@/components/Delete/DeletePriceLists";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PricesPage() {
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata.role !== "admin") {
    redirect("/");
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fiyat Yönetimi</h1>
          <p className="text-muted-foreground">
            Fiyat listelerinizi oluşturun ve yönetin
          </p>
        </div>
        
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Fiyat Listesi Oluştur</TabsTrigger>
            <TabsTrigger value="manage">Fiyat Listeleri Yönet</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="space-y-4">
            <CreatePriceList />
          </TabsContent>
          
          <TabsContent value="manage" className="space-y-4">
            <DeletePriceLists />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
