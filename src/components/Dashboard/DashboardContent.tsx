import { StatsCard } from "./StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  Users,
  FileText,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Plus
} from "lucide-react";

export const DashboardContent = () => {
  const recentBills = [
    { id: "INV-2024-001", patient: "John Smith", amount: "$1,250.00", status: "paid", date: "2024-01-15" },
    { id: "INV-2024-002", patient: "Emily Davis", amount: "$850.50", status: "pending", date: "2024-01-15" },
    { id: "INV-2024-003", patient: "Michael Brown", amount: "$2,100.00", status: "overdue", date: "2024-01-14" },
    { id: "INV-2024-004", patient: "Sarah Wilson", amount: "$675.25", status: "paid", date: "2024-01-14" },
  ];

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

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value="$125,430"
          change="+12% from last month"
          changeType="positive"
          icon={DollarSign}
          color="primary"
        />
        <StatsCard
          title="Active Patients"
          value="1,234"
          change="+5% from last month"
          changeType="positive"
          icon={Users}
          color="success"
        />
        <StatsCard
          title="Pending Bills"
          value="48"
          change="3 overdue"
          changeType="negative"
          icon={FileText}
          color="warning"
        />
        <StatsCard
          title="Today's Revenue"
          value="$8,430"
          change="+8% from yesterday"
          changeType="positive"
          icon={TrendingUp}
          color="secondary"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Bills */}
        <Card className="medical-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Bills</CardTitle>
            <Button size="sm" className="medical-button-primary">
              <Plus className="h-4 w-4 mr-2" />
              New Bill
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBills.map((bill) => (
                <div key={bill.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{bill.id}</p>
                    <p className="text-sm text-muted-foreground">{bill.patient}</p>
                    <p className="text-xs text-muted-foreground">{bill.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{bill.amount}</p>
                    {getStatusBadge(bill.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <Button className="medical-button-primary h-12 justify-start gap-3">
                <Users className="h-5 w-5" />
                Register New Patient
              </Button>
              <Button className="medical-button-secondary h-12 justify-start gap-3">
                <FileText className="h-5 w-5" />
                Create Invoice
              </Button>
              <Button variant="outline" className="h-12 justify-start gap-3 border-border hover:bg-muted">
                <DollarSign className="h-5 w-5" />
                Process Payment
              </Button>
              <Button variant="outline" className="h-12 justify-start gap-3 border-border hover:bg-muted">
                <TrendingUp className="h-5 w-5" />
                View Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts & Notifications */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-warning" />
            Important Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <Clock className="h-5 w-5 text-warning mt-0.5" />
              <div>
                <p className="font-medium text-foreground">3 bills are overdue</p>
                <p className="text-sm text-muted-foreground">Follow up required for outstanding payments</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-success/10 border border-success/20 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Insurance claim approved</p>
                <p className="text-sm text-muted-foreground">$2,450 will be deposited within 2-3 business days</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};