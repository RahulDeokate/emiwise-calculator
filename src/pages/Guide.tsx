
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Guide = () => {
  const faqs = [
    {
      question: "What is EMI?",
      answer: "EMI (Equated Monthly Installment) is a fixed amount that a borrower pays to the lender on a specified date each month. It consists of both principal and interest components."
    },
    {
      question: "How is EMI calculated?",
      answer: "EMI is calculated using the formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1), where P is Principal amount, r is interest rate per month, and n is total number of months."
    },
    {
      question: "What factors affect my EMI?",
      answer: "Your EMI is affected by three main factors: the principal loan amount, interest rate, and loan tenure (duration). Higher principal and interest rates increase EMI, while longer tenure reduces it."
    },
    {
      question: "Can I reduce my EMI?",
      answer: "Yes, you can reduce your EMI by: extending your loan tenure, making partial prepayments, or transferring your loan to a lender offering lower interest rates."
    },
    {
      question: "What happens if I miss an EMI payment?",
      answer: "Missing an EMI payment can result in late payment charges, negative impact on your credit score, and additional interest charges. It's important to maintain timely payments."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">User Guide</h1>
        <p className="text-muted-foreground">
          Learn how to use our EMI calculator effectively
        </p>
      </div>

      <Card className="p-6">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left hover:bg-[#EDF4F2] hover:text-[#31473A] px-4 rounded-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
};

export default Guide;
