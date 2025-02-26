
import { useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
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
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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

  if (!emiData) {
    return <Navigate to="/calculator" replace />;
  }

  const generatePDF = () => {
    // In a real application, this would generate a PDF
    alert("PDF generation would be implemented here");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">EMI Invoice</h1>
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
            Download Invoice
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Invoice;
