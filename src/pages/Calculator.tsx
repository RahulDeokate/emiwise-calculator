
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface EMIData {
  principalAmount: number;
  monthlyEMI: number;
  totalAmount: number;
  totalInterest: number;
}

const Calculator = () => {
  const navigate = useNavigate();
  const [principalAmount, setPrincipalAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(10);
  const [loanTenure, setLoanTenure] = useState(12);
  const [emiData, setEmiData] = useState<EMIData | null>(null);

  const calculateEMI = () => {
    const principal = principalAmount;
    const ratePerMonth = interestRate / 12 / 100;
    const totalMonths = loanTenure;

    const emi =
      (principal *
        ratePerMonth *
        Math.pow(1 + ratePerMonth, totalMonths)) /
      (Math.pow(1 + ratePerMonth, totalMonths) - 1);

    const totalAmount = emi * totalMonths;
    const totalInterest = totalAmount - principal;

    setEmiData({
      principalAmount: principal,
      monthlyEMI: emi,
      totalAmount: totalAmount,
      totalInterest: totalInterest,
    });
  };

  const handleGenerateInvoice = () => {
    if (emiData) {
      navigate("/invoice", { state: { emiData } });
    }
  };

  const chartData = emiData
    ? [
        {
          name: "Principal Amount",
          value: emiData.principalAmount,
        },
        {
          name: "Total Interest",
          value: emiData.totalInterest,
        },
      ]
    : [];

  const COLORS = ["#4ade80", "#ff8787"];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">EMI Calculator</h1>
        <p className="text-muted-foreground">
          Calculate your Equated Monthly Installment (EMI) with ease
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Principal Amount (₹)</Label>
              <div className="flex gap-4">
                <Input
                  type="number"
                  value={principalAmount}
                  onChange={(e) => setPrincipalAmount(Number(e.target.value))}
                  className="w-full"
                />
                <Slider
                  value={[principalAmount]}
                  onValueChange={(value) => setPrincipalAmount(value[0])}
                  min={10000}
                  max={10000000}
                  step={10000}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Interest Rate (% per annum)</Label>
              <div className="flex gap-4">
                <Input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full"
                />
                <Slider
                  value={[interestRate]}
                  onValueChange={(value) => setInterestRate(value[0])}
                  min={1}
                  max={30}
                  step={0.1}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Loan Tenure (months)</Label>
              <div className="flex gap-4">
                <Input
                  type="number"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  className="w-full"
                />
                <Slider
                  value={[loanTenure]}
                  onValueChange={(value) => setLoanTenure(value[0])}
                  min={3}
                  max={360}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <Button 
            onClick={calculateEMI} 
            className="w-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Calculate EMI
          </Button>
        </div>

        {emiData && (
          <div className="space-y-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Details</TableHead>
                  <TableHead className="text-right">Amount (₹)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Principal Amount</TableCell>
                  <TableCell className="text-right">
                    {emiData.principalAmount.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Monthly EMI</TableCell>
                  <TableCell className="text-right">
                    {emiData.monthlyEMI.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Amount</TableCell>
                  <TableCell className="text-right">
                    {emiData.totalAmount.toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Interest</TableCell>
                  <TableCell className="text-right">
                    {emiData.totalInterest.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-center gap-4">
              {chartData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-sm">{entry.name}</span>
                </div>
              ))}
            </div>

            <Button 
              onClick={handleGenerateInvoice} 
              className="w-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Generate Invoice
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Calculator;
