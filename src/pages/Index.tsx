import { useState } from "react";
import { Sidebar } from "@/components/Layout/Sidebar";
import { Header } from "@/components/Layout/Header";
import { DashboardContent } from "@/components/Dashboard/DashboardContent";
import { PatientsContent } from "@/components/Patients/PatientsContent";
import { BillingContent } from "@/components/Billing/BillingContent";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderContent = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardContent />;
      case "patients":
        return <PatientsContent />;
      case "billing":
        return <BillingContent />;
      case "payments":
        return <div className="p-6">Payments feature coming soon...</div>;
      case "services":
        return <div className="p-6">Services feature coming soon...</div>;
      case "pharmacy":
        return <div className="p-6">Pharmacy feature coming soon...</div>;
      case "reports":
        return <div className="p-6">Reports feature coming soon...</div>;
      case "departments":
        return <div className="p-6">Departments feature coming soon...</div>;
      case "settings":
        return <div className="p-6">Settings feature coming soon...</div>;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 flex flex-col">
        <Header currentPage={currentPage} />
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
