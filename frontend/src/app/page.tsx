import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-2 text-center">
        <div className="border shadow-lg rounded-2xl p-3 g-3">
          <h1 className="text-2xl font-bold mb-2">Total Expense</h1>
          <p className="text-lg text-gray-700">2000Rs</p>
        </div>
        <div className="border rounded-2xl p-3 g-3 shadow-lg">
          <h1 className="text-2xl font-bold mb-2">Total Income</h1>
          <p className="text-lg text-gray-700">24000Rs</p>
        </div>
        <div className="border rounded-2xl p-3 g-3 shadow-lg">
          <h1 className="text-2xl font-bold mb-2">Total Balance</h1>
          <p className="text-lg text-gray-700">22000Rs</p>
        </div>
      </div>
      <div className="p-4">Charts</div>
    </div>
  );
}
