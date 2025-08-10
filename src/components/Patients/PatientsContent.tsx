import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PatientForm } from "./PatientForm";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  FileText, 
  User,
  Calendar,
  Phone,
  MapPin
} from "lucide-react";

export const PatientsContent = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState([
    {
      id: "PAT-001",
      firstName: "John",
      lastName: "Smith",
      dateOfBirth: "1985-03-15",
      gender: "male",
      phone: "(555) 123-4567",
      email: "john.smith@email.com",
      address: "123 Main St, Springfield, IL",
      emergencyContact: "Jane Smith",
      emergencyPhone: "(555) 987-6543",
      insuranceProvider: "Blue Cross",
      insuranceNumber: "BC123456789",
      registrationDate: "2024-01-10",
      lastVisit: "2024-01-15",
      status: "active"
    },
    {
      id: "PAT-002",
      firstName: "Emily",
      lastName: "Davis",
      dateOfBirth: "1992-07-22",
      gender: "female",
      phone: "(555) 234-5678",
      email: "emily.davis@email.com",
      address: "456 Oak Ave, Springfield, IL",
      emergencyContact: "Robert Davis",
      emergencyPhone: "(555) 876-5432",
      insuranceProvider: "Aetna",
      insuranceNumber: "AE987654321",
      registrationDate: "2024-01-12",
      lastVisit: "2024-01-15",
      status: "active"
    },
    {
      id: "PAT-003",
      firstName: "Michael",
      lastName: "Brown",
      dateOfBirth: "1978-11-08",
      gender: "male",
      phone: "(555) 345-6789",
      email: "michael.brown@email.com",
      address: "789 Pine St, Springfield, IL",
      emergencyContact: "Sarah Brown",
      emergencyPhone: "(555) 765-4321",
      insuranceProvider: "United Health",
      insuranceNumber: "UH456789123",
      registrationDate: "2024-01-08",
      lastVisit: "2024-01-14",
      status: "inactive"
    }
  ]);

  const filteredPatients = patients.filter(patient =>
    `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const handleSavePatient = (patientData: any) => {
    if (selectedPatient) {
      setPatients(prev => prev.map(p => p.id === patientData.id ? patientData : p));
    } else {
      setPatients(prev => [...prev, patientData]);
    }
    setSelectedPatient(null);
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (showForm) {
    return (
      <PatientForm
        patient={selectedPatient}
        onClose={() => {
          setShowForm(false);
          setSelectedPatient(null);
        }}
        onSave={handleSavePatient}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients by name, ID, or phone..."
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
        <Button 
          className="medical-button-primary gap-2"
          onClick={() => setShowForm(true)}
        >
          <Plus className="h-4 w-4" />
          New Patient
        </Button>
      </div>

      {/* Patients Grid */}
      <div className="grid gap-4">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="medical-card hover:shadow-[var(--shadow-medium)] transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-foreground">
                        {patient.firstName} {patient.lastName}
                      </h3>
                      <Badge 
                        variant={patient.status === "active" ? "default" : "secondary"}
                        className={patient.status === "active" ? "medical-status-success" : ""}
                      >
                        {patient.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Patient ID: {patient.id}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Age: {calculateAge(patient.dateOfBirth)} years
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        {patient.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {patient.address.split(',')[0]}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      <span>Last visit: {patient.lastVisit}</span>
                      {patient.insuranceProvider && (
                        <span className="ml-4">Insurance: {patient.insuranceProvider}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedPatient(patient);
                      setShowForm(true);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-1" />
                    Bills
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <Card className="medical-card">
          <CardContent className="text-center py-12">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No patients found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Try adjusting your search criteria" : "Get started by registering your first patient"}
            </p>
            <Button 
              className="medical-button-primary gap-2"
              onClick={() => setShowForm(true)}
            >
              <Plus className="h-4 w-4" />
              Register New Patient
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};