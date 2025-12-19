"use client";
import { useState } from "react";

export default function Home() {
  const [inputs, setInputs] = useState({
    baseSalary: "",
    erCpfRate: "",
    eeCpfRate: "",
  });
  const [outputs, setOutputs] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch("https://8080-cs-563084796540-default.cs-asia-east1-jnrc.cloudshell.dev/api/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        calculator: "payroll-v1",
        inputs: {
          baseSalary: parseFloat(inputs.baseSalary),
          erCpfRate: parseFloat(inputs.erCpfRate),
          eeCpfRate: parseFloat(inputs.eeCpfRate),
        },
      }),
    });

    const data = await response.json();
    setOutputs(data.outputs);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Payroll Calculator
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Base Salary
            </label>
            <input
              type="number"
              value={inputs.baseSalary}
              onChange={(e) =>
                setInputs({ ...inputs, baseSalary: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ER CPF Rate (e.g., 0.17 for 17%)
            </label>
            <input
              type="number"
              step="0.01"
              value={inputs.erCpfRate}
              onChange={(e) =>
                setInputs({ ...inputs, erCpfRate: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              EE CPF Rate (e.g., 0.20 for 20%)
            </label>
            <input
              type="number"
              step="0.01"
              value={inputs.eeCpfRate}
              onChange={(e) =>
                setInputs({ ...inputs, eeCpfRate: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? "Calculating..." : "Calculate"}
          </button>
        </form>

        {outputs && (
          <div className="mt-6 p-4 bg-green-50 rounded-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Results:
            </h2>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium">ER CPF:</span> {outputs.erCpf}
              </p>
              <p>
                <span className="font-medium">EE CPF:</span> {outputs.eeCpf}
              </p>
              <p>
                <span className="font-medium">Take Home Pay:</span>{" "}
                {outputs.takeHomePay}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
