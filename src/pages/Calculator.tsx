
import { Card } from "@/components/ui/card";

const Calculator = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">EMI Calculator</h1>
        <p className="text-muted-foreground">
          Calculate your Equated Monthly Installment (EMI) with ease
        </p>
      </div>
      <Card className="p-6">
        <p className="text-center text-muted-foreground">
          Calculator implementation coming in the next iteration
        </p>
      </Card>
    </div>
  );
};

export default Calculator;
