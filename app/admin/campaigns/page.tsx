import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import CreateCampaigns from "@/components/Create/CreateCampaigns";
import DeleteCampaign from "@/components/Delete/DeleteCampain";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CampaignsPage() {
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata.role !== "admin") {
    redirect("/");
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Kampanya Yönetimi</h1>
          <p className="text-muted-foreground">
            Kampanyalarınızı oluşturun ve yönetin
          </p>
        </div>
        
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Kampanya Oluştur</TabsTrigger>
            <TabsTrigger value="manage">Kampanya Yönet</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="space-y-4">
            <CreateCampaigns />
          </TabsContent>
          
          <TabsContent value="manage" className="space-y-4">
            <DeleteCampaign />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
