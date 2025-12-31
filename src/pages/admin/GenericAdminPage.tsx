import { useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";

const GenericAdminPage = () => {
  const location = useLocation();
  const pageName = location.pathname.split('/').filter(Boolean).map(
    word => word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' > ');

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Construction className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">{pageName}</h1>
        <p className="text-muted-foreground mb-6">This page is under construction</p>
        <Button variant="outline" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default GenericAdminPage;
