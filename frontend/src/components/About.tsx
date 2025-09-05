import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <section className="flex flex-col md:flex-row items-center  py-20 px-6 md:px-20 gap-12 bg-gray-50">
      <div className="md:w-1/2 flex ">
        <img
          src="/aboutimg.jpg"
          alt="SpendWise App"
          className="rounded-xl shadow-xl  max-w-md hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="md:w-1/2 md:text-end">
        <h1 className="text-4xl md:text-5xl font-extrabold text-amber-600 mb-6">
          About SpendWise
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          SpendWise is your all-in-one companion for smarter money management.
          With an easy-to-use interface, you can track your daily expenses, set
          personalized budgets, and stay on top of your spending habits. Our
          goal is to help you simplify financial planning, reduce stress, and
          make saving a natural part of your routine—all in one convenient
          place.
        </p>
        <Button className="" variant={"getbtn"} size={"lg"}>
          Learn More
        </Button>
      </div>
    </section>
  );
}
