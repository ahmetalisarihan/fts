import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import CreateCarousel from "@/components/Create/CreateCarousel";
import DeleteCarousel from "@/components/Delete/DeleteCarousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CarouselPage() {
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata.role !== "admin") {
    redirect("/");
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Carousel Yönetimi</h1>
          <p className="text-muted-foreground">
            Ana sayfa carousel'ınızı yönetin
          </p>
        </div>
        
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Carousel Oluştur</TabsTrigger>
            <TabsTrigger value="manage">Carousel Yönet</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="space-y-4">
            <CreateCarousel />
          </TabsContent>
          
          <TabsContent value="manage" className="space-y-4">
            <DeleteCarousel />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
