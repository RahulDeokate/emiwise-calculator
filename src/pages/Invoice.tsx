
import { Card } from "@/components/ui/card";

const Invoice = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">EMI Invoice</h1>
        <p className="text-muted-foreground">
          Generate and download your EMI payment schedule
        </p>
      </div>
      <Card className="p-6">
        <p className="text-center text-muted-foreground">
          Invoice generation coming in the next iteration
        </p>
      </Card>
    </div>
  );
};

export default Invoice;
