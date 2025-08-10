import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  currentPage: string;
}

const pageTitle = {
  dashboard: "Dashboard",
  patients: "Patient Management",
  billing: "Billing & Invoicing",
  payments: "Payment Processing",
  services: "Medical Services",
  pharmacy: "Pharmacy Management",
  reports: "Reports & Analytics",
  departments: "Department Management",
  settings: "Settings",
};

export const Header = ({ currentPage }: HeaderProps) => {
  return (
    <header className="medical-card border-b bg-card px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {pageTitle[currentPage as keyof typeof pageTitle] || "Hospital Management"}
          </h1>
          <p className="text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search patients, bills, or records..."
              className="pl-10 bg-muted/50 border-border"
            />
          </div>

          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-xs p-0 flex items-center justify-center"
            >
              3
            </Badge>
          </Button>

          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">Dr. Sarah Johnson</p>
              <p className="text-muted-foreground">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};