import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  HiOutlineChartBar,
  HiOutlineCurrencyDollar,
  HiOutlineUpload,
  HiOutlineDeviceMobile,
} from "react-icons/hi";

const features = [
  {
    title: "Track Expenses",
    desc: "Log every expense and see where your money goes.",
    icon: <HiOutlineChartBar className="w-10 h-10 text-amber-600 mb-4" />,
  },
  {
    title: "Budget Planning",
    desc: "Set budgets and get alerts when nearing limits.",
    icon: <HiOutlineCurrencyDollar className="w-10 h-10 text-amber-600 mb-4" />,
  },
  {
    title: "Upload Receipts",
    desc: "Easily upload images of your receipts and track your expenses automatically.",
    icon: <HiOutlineUpload className="w-10 h-10 text-amber-600 mb-4" />,
  },
  {
    title: "Multi-device",
    desc: "Access SpendWise from any device anytime.",
    icon: <HiOutlineDeviceMobile className="w-10 h-10 text-amber-600 mb-4" />,
  },
];

export default function Features() {
  return (
    <section className="py-20  px-6 md:px-20 text-center bg-gray-50">
      <h2 className="text-4xl md:text-5xl font-extrabold text-amber-600 mb-12">
        Features
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {features.map((f) => (
          <Card key={f.title} className="p-4">
            <CardContent className="text-center justify-center">
              <div className="text-center">{f.icon}</div>
              <CardTitle>{f.title}</CardTitle>
              <CardDescription>{f.desc}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
