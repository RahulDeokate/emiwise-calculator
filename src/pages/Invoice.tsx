
import { useLocation, Navigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { toast } from "sonner";

interface EMIData {
  principalAmount: number;
  monthlyEMI: number;
  totalAmount: number;
  totalInterest: number;
}

const Invoice = () => {
  const location = useLocation();
  const emiData = location.state?.emiData as EMIData;
  const [name, setName] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!emiData) {
    return <Navigate to="/calculator" replace />;
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateMonthlySchedule = () => {
    const schedule = [];
    let remainingPrincipal = emiData.principalAmount;
    const months = 12; // Assuming 1 year for simplicity
    
    for (let i = 1; i <= months; i++) {
      const interest = (remainingPrincipal * 10) / 1200; // Assuming 10% annual interest
      const principal = emiData.monthlyEMI - interest;
      remainingPrincipal -= principal;
      
      schedule.push({
        month: i,
        emi: emiData.monthlyEMI,
        principal: principal,
        interest: interest,
        balance: remainingPrincipal > 0 ? remainingPrincipal : 0
      });
    }
    
    return schedule;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    let yPos = margin;
    
    // Add logo if uploaded
    if (logo) {
      doc.addImage(logo, "JPEG", margin, yPos, 40, 20);
      yPos += 30;
    }

    // Add title with styling
    doc.setFontSize(24);
    doc.setTextColor(49, 71, 58);
    doc.text("EMI Payment Schedule", pageWidth / 2, yPos, { align: "center" });
    yPos += 20;
    
    // Add customer details with styling
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Customer Name: ${name}`, margin, yPos);
    yPos += 10;
    doc.text(`Start Date: ${format(date!, "PPP")}`, margin, yPos);
    yPos += 20;
    
    // Add EMI summary with styling
    doc.setFontSize(14);
    doc.setTextColor(49, 71, 58);
    doc.text("EMI Summary", margin, yPos);
    yPos += 10;
    
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    const summaryData = [
      [`Principal Amount: ₹${emiData.principalAmount.toFixed(2)}`],
      [`Monthly EMI: ₹${emiData.monthlyEMI.toFixed(2)}`],
      [`Total Amount: ₹${emiData.totalAmount.toFixed(2)}`],
      [`Total Interest: ₹${emiData.totalInterest.toFixed(2)}`]
    ];

    (doc as any).autoTable({
      startY: yPos,
      body: summaryData,
      theme: 'plain',
      styles: { fontSize: 12, cellPadding: 2 },
    });

    yPos = (doc as any).lastAutoTable.finalY + 20;

    // Add monthly schedule table
    const schedule = generateMonthlySchedule();
    const headers = ["Month", "EMI", "Principal", "Interest", "Balance"];
    const data = schedule.map(item => [
      item.month.toString(),
      `₹${item.emi.toFixed(2)}`,
      `₹${item.principal.toFixed(2)}`,
      `₹${item.interest.toFixed(2)}`,
      `₹${item.balance.toFixed(2)}`
    ]);

    (doc as any).autoTable({
      head: [headers],
      body: data,
      startY: yPos,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [49, 71, 58], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [237, 244, 242] }
    });
    
    // Save the PDF
    doc.save("emi-schedule.pdf");
    toast.success("EMI Plan downloaded successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">EMI Plan</h1>
        <p className="text-muted-foreground">
          Generate and download your EMI payment schedule
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label>Company Logo (Optional)</Label>
            <div className="flex gap-4">
              <Input
                type="file"
                ref={fileInputRef}
                onChange={handleLogoUpload}
                accept="image/*"
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                <Upload className="mr-2" />
                Upload Logo
              </Button>
              {logo && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLogo(null)}
                >
                  Remove Logo
                </Button>
              )}
            </div>
            {logo && (
              <div className="mt-2">
                <img
                  src={logo}
                  alt="Uploaded logo"
                  className="max-h-20 object-contain"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>EMI Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">EMI Details</h3>
            <div className="grid gap-2">
              <div className="flex justify-between">
                <span>Principal Amount</span>
                <span>₹{emiData.principalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly EMI</span>
                <span>₹{emiData.monthlyEMI.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount</span>
                <span>₹{emiData.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Interest</span>
                <span>₹{emiData.totalInterest.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Button 
            onClick={generatePDF} 
            className="w-full"
            disabled={!name || !date}
          >
            Download EMI Plan
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Invoice;
