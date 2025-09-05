import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is SpendWise free?",
    a: "Yes! SpendWise has a free version with basic features.",
  },
  {
    q: "Can I use it on mobile?",
    a: "Absolutely! SpendWise works on all devices.",
  },
  {
    q: "Does SpendWise track expenses automatically?",
    a: "Yes! You can log and categorize your expenses easily to stay on top of your budget.",
  },
];

export default function Faqs() {
  return (
    <section className="py-20 bg-gray-50  px-6 md:px-20 ">
      <div className=" max-w-4xl mx-auto ">
        <h2 className="text-3xl font-bold text-center mb-12 text-amber-600">
          FAQs
        </h2>
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-medium">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
