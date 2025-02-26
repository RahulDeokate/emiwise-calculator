
import { Link } from "react-router-dom";
import { ArrowRight, PiggyBank, Calculator, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const infoCards = [
  {
    title: "What is EMI?",
    description:
      "EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month.",
    icon: Calculator,
  },
  {
    title: "Why Calculate EMI?",
    description:
      "Understanding your EMI helps you plan your finances better and ensures you can comfortably manage loan repayments within your budget.",
    icon: PiggyBank,
  },
  {
    title: "Loan Duration Impact",
    description:
      "A longer loan tenure reduces your monthly EMI but increases the total interest paid. Choose wisely based on your financial capacity.",
    icon: Clock,
  },
];

const Home = () => {
  return (
    <div className="flex flex-col items-center space-y-12 animate-fade-in">
      <div className="text-center space-y-4 max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Calculate Your EMI
        </h1>
        <p className="text-xl text-muted-foreground">
          Plan your loan repayments with our simple and accurate EMI calculator
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link to="/calculator" className="flex items-center space-x-2">
            <span>Calculate Now</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {infoCards.map((card, index) => (
          <Card
            key={index}
            className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <CardHeader>
              <div className="flex items-center space-x-2">
                <card.icon className="h-5 w-5 text-primary" />
                <CardTitle>{card.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                {card.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
