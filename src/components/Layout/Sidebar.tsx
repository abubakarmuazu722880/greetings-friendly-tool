import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  CreditCard, 
  ClipboardList,
  TrendingUp,
  Settings,
  Building2,
  Stethoscope,
  Pill
} from "lucide-react";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "patients", label: "Patients", icon: Users },
  { id: "billing", label: "Billing", icon: FileText },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "services", label: "Services", icon: Stethoscope },
  { id: "pharmacy", label: "Pharmacy", icon: Pill },
  { id: "reports", label: "Reports", icon: TrendingUp },
  { id: "departments", label: "Departments", icon: Building2 },
  { id: "settings", label: "Settings", icon: Settings },
];

export const Sidebar = ({ currentPage, onNavigate }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn(
      "medical-card border-r bg-card h-screen transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <ClipboardList className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg text-foreground">MediBill</h2>
              <p className="text-xs text-muted-foreground">Hospital Management</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0"
        >
          <LayoutDashboard className="h-4 w-4" />
        </Button>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-11",
                isActive ? "medical-button-primary text-primary-foreground" : "hover:bg-muted",
                collapsed && "justify-center px-2"
              )}
              onClick={() => onNavigate(item.id)}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};