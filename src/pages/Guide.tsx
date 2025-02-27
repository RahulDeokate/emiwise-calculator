
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calculator, Info, Book, Shield, HelpCircle } from "lucide-react";

const Guide = () => {
  const sections = [
    {
      title: "EMI Basics",
      icon: Calculator,
      items: [
        {
          question: "What is EMI?",
          answer: "EMI (Equated Monthly Installment) is a fixed amount that a borrower pays to the lender on a specified date each month. It consists of both principal and interest components."
        },
        {
          question: "How is EMI calculated?",
          answer: "EMI is calculated using the formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1), where P is Principal amount, r is interest rate per month, and n is total number of months."
        }
      ]
    },
    {
      title: "Understanding Factors",
      icon: Info,
      items: [
        {
          question: "What factors affect my EMI?",
          answer: "Your EMI is affected by three main factors: the principal loan amount, interest rate, and loan tenure (duration). Higher principal and interest rates increase EMI, while longer tenure reduces it."
        },
        {
          question: "How does loan tenure affect EMI?",
          answer: "A longer loan tenure reduces your monthly EMI amount but increases the total interest paid. Conversely, a shorter tenure means higher EMIs but lower total interest."
        }
      ]
    },
    {
      title: "Tips & Best Practices",
      icon: Book,
      items: [
        {
          question: "Can I reduce my EMI?",
          answer: "Yes, you can reduce your EMI by: extending your loan tenure, making partial prepayments, or transferring your loan to a lender offering lower interest rates."
        },
        {
          question: "What is the ideal EMI to income ratio?",
          answer: "Financial experts recommend keeping your total EMIs within 40-50% of your monthly income. This ensures you have enough for other expenses and savings."
        }
      ]
    },
    {
      title: "Important Considerations",
      icon: Shield,
      items: [
        {
          question: "What happens if I miss an EMI payment?",
          answer: "Missing an EMI payment can result in late payment charges, negative impact on your credit score, and additional interest charges. It's important to maintain timely payments."
        },
        {
          question: "Should I opt for a longer tenure to reduce EMI?",
          answer: "While longer tenure reduces your monthly EMI, it significantly increases the total interest paid. Consider your financial capacity and long-term goals before deciding."
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in pb-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-[#31473A] to-[#4A6B56] bg-clip-text text-transparent">
          User Guide
        </h1>
        <p className="text-muted-foreground text-lg">
          Learn how to use our EMI calculator effectively
        </p>
      </div>

      <div className="grid gap-8">
        {sections.map((section, index) => (
          <div key={index} className="space-y-4">
            <div className="flex items-center gap-2 pb-2">
              <section.icon className="h-6 w-6 text-[#31473A]" />
              <h2 className="text-2xl font-semibold text-[#31473A]">{section.title}</h2>
            </div>
            <Card className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {section.items.map((item, itemIndex) => (
                  <AccordionItem key={itemIndex} value={`item-${index}-${itemIndex}`}>
                    <AccordionTrigger className="text-left hover:bg-[#EDF4F2] hover:text-[#31473A] px-4 rounded-lg text-base">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 text-muted-foreground text-base leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guide;
