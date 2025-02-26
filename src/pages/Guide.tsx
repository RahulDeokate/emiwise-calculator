
import { Card } from "@/components/ui/card";

const Guide = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">User Guide</h1>
        <p className="text-muted-foreground">
          Learn how to use our EMI calculator effectively
        </p>
      </div>
      <Card className="p-6">
        <p className="text-center text-muted-foreground">
          Guide content coming in the next iteration
        </p>
      </Card>
    </div>
  );
};

export default Guide;
