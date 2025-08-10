import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  Download,
  Eye,
  Edit,
  DollarSign,
  Calendar,
  User
} from "lucide-react";

export const BillingContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bills] = useState([
    {
      id: "INV-2024-001",
      patientName: "John Smith",
      patientId: "PAT-001",
      services: [
        { name: "General Consultation", amount: 150.00 },
        { name: "Blood Test", amount: 75.00 },
        { name: "X-Ray", amount: 200.00 }
      ],
      subtotal: 425.00,
      tax: 34.00,
      discount: 10.00,
      total: 449.00,
      status: "paid",
      date: "2024-01-15",
      dueDate: "2024-01-30",
      paymentDate: "2024-01-16"
    },
    {
      id: "INV-2024-002", 
      patientName: "Emily Davis",
      patientId: "PAT-002",
      services: [
        { name: "Specialist Consultation", amount: 250.00 },
        { name: "CT Scan", amount: 800.00 }
      ],
      subtotal: 1050.00,
      tax: 84.00,
      discount: 0.00,
      total: 1134.00,
      status: "pending",
      date: "2024-01-15",
      dueDate: "2024-01-30",
      paymentDate: null
    },
    {
      id: "INV-2024-003",
      patientName: "Michael Brown", 
      patientId: "PAT-003",
      services: [
        { name: "Emergency Room Visit", amount: 500.00 },
        { name: "Medication", amount: 125.00 },
        { name: "Follow-up Consultation", amount: 150.00 }
      ],
      subtotal: 775.00,
      tax: 62.00,
      discount: 50.00,
      total: 787.00,
      status: "overdue",
      date: "2024-01-10",
      dueDate: "2024-01-25",
      paymentDate: null
    }
  ]);

  const filteredBills = bills.filter(bill =>
    bill.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="medical-status-success">Paid</Badge>;
      case "pending":
        return <Badge className="medical-status-warning">Pending</Badge>;
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "text-success";
      case "pending":
        return "text-warning";
      case "overdue":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bills by ID, patient name..."
              className="pl-10 bg-muted/50 border-border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
        <Button className="medical-button-primary gap-2">
          <Plus className="h-4 w-4" />
          New Invoice
        </Button>
      </div>

      {/* Bills Grid */}
      <div className="grid gap-4">
        {filteredBills.map((bill) => (
          <Card key={bill.id} className="medical-card hover:shadow-[var(--shadow-medium)] transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-foreground">{bill.id}</h3>
                      {getStatusBadge(bill.status)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      {bill.patientName} ({bill.patientId})
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Date: {bill.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Due: {bill.dueDate}
                      </div>
                      <div className={`flex items-center gap-2 text-sm font-medium ${getStatusColor(bill.status)}`}>
                        <DollarSign className="h-4 w-4" />
                        ${bill.total.toFixed(2)}
                      </div>
                    </div>
                    
                    {/* Services Summary */}
                    <div className="mt-3">
                      <p className="text-sm font-medium text-foreground mb-1">Services:</p>
                      <div className="text-sm text-muted-foreground">
                        {bill.services.map((service, index) => (
                          <span key={index}>
                            {service.name} (${service.amount.toFixed(2)})
                            {index < bill.services.length - 1 && ", "}
                          </span>
                        ))}
                      </div>
                    </div>

                    {bill.paymentDate && (
                      <div className="text-sm text-success">
                        Paid on: {bill.paymentDate}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="medical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Outstanding</p>
                <p className="text-2xl font-bold text-warning">$1,921.00</p>
              </div>
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="medical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Paid This Month</p>
                <p className="text-2xl font-bold text-success">$449.00</p>
              </div>
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="medical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overdue Bills</p>
                <p className="text-2xl font-bold text-destructive">1</p>
              </div>
              <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {filteredBills.length === 0 && (
        <Card className="medical-card">
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No bills found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Try adjusting your search criteria" : "Get started by creating your first invoice"}
            </p>
            <Button className="medical-button-primary gap-2">
              <Plus className="h-4 w-4" />
              Create New Invoice
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};