import FormContainer from "./components/FormContainer";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 md:p-8">
        {/* App Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-700">
            BI Rating Calculator
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Check your borrower intelligence score
          </p>
        </div>

        {/* Main Multi-Step Form */}
        <FormContainer />
      </div>
    </div>
  );
}
