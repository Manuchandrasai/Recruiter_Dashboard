export default function Stepper({ currentStep }) {
  const steps = ["Basic Details", "Requirements", "Visibility & Filters"];
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-gradient-to-r from-purple-300 via-pink-200 to-yellow-100 rounded-xl mb-6">
      {steps.map((step, index) => (
        <div key={index} className={`text-center flex-1 ${currentStep === index ? "text-purple-700 font-bold" : "text-gray-500"}`}>
          <div className="text-sm">{step}</div>
        </div>
      ))}
    </div>
  );
}