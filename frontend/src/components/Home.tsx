import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center  py-20 px-6 md:px-20 gap-12 bg-gray-50">
      <div className="md:w-1/2 ">
        <h1 className="text-4xl md:text-5xl font-extrabold text-amber-600 mb-6">
          Welcome to SpendWise
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          SpendWise makes managing your money simple and stress-free. Keep track
          of your daily expenses, set monthly budgets, and see where your money
          is going in one clear view. Whether you want to save more, cut down on
          unnecessary spending, or just stay organized, SpendWise helps you stay
          on top of your finances with ease.
        </p>

        <Button className="" variant={"getbtn"} size={"lg"}>
          Get Started
        </Button>
      </div>
      <div className="md:w-1/2 flex justify-end">
        <img
          src="/About.jpg"
          alt="SpendWise App"
          className="rounded-xl shadow-xl  max-w-md hover:scale-105 transition-transform duration-300"
        />
      </div>
    </section>
  );
}
