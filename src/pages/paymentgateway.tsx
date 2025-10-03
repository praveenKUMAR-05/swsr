// src/pages/PaymentGateway.jsx
import { useState } from "react";

export default function PaymentGateway() {
  const [method, setMethod] = useState("card");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Payment submitted via ${method.toUpperCase()}!`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="w-full max-w-md bg-black border border-gray-800 rounded-2xl p-8 shadow-lg">
        
        {/* Back Navigation */}
        <a href="/" className="text-sm text-gray-400 hover:text-green-400 mb-4 inline-block">
          ← Back to Homepage
        </a>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <h1 className="text-green-500 font-bold text-xl">EcoPay</h1>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-green-400 mb-2">
          Payment Gateway
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Choose your preferred payment method
        </p>

        {/* Payment Method Tabs */}
        <div className="flex gap-2 mb-6">
          {["card", "upi", "netbanking", "paypal"].map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
                method === m
                  ? "bg-green-500 text-black"
                  : "bg-gray-900 text-gray-400 hover:bg-gray-800"
              }`}
            >
              {m === "card" && "Card"}
              {m === "upi" && "UPI"}
              {m === "netbanking" && "NetBanking"}
              {m === "paypal" && "PayPal"}
            </button>
          ))}
        </div>

        {/* Dynamic Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {method === "card" && (
            <>
              <div>
                <label className="block text-sm text-gray-300">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-3 rounded-md bg-gray-900 border border-gray-700 text-white focus:border-green-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300">Expiry</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full p-3 rounded-md bg-gray-900 border border-gray-700 text-white focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300">CVC</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full p-3 rounded-md bg-gray-900 border border-gray-700 text-white focus:border-green-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-300">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full p-3 rounded-md bg-gray-900 border border-gray-700 text-white focus:border-green-500"
                  required
                />
              </div>
            </>
          )}

          {method === "upi" && (
            <div>
              <label className="block text-sm text-gray-300">UPI ID</label>
              <input
                type="text"
                placeholder="username@upi"
                className="w-full p-3 rounded-md bg-gray-900 border border-gray-700 text-white focus:border-green-500"
                required
              />
            </div>
          )}

          {method === "netbanking" && (
            <div>
              <label className="block text-sm text-gray-300">Select Bank</label>
              <select
                className="w-full p-3 rounded-md bg-gray-900 border border-gray-700 text-white focus:border-green-500"
                required
              >
                <option value="">-- Choose Bank --</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
              </select>
            </div>
          )}

          {method === "paypal" && (
            <div>
              <label className="block text-sm text-gray-300">PayPal Email</label>
              <input
                type="email"
                placeholder="your-paypal@email.com"
                className="w-full p-3 rounded-md bg-gray-900 border border-gray-700 text-white focus:border-green-500"
                required
              />
            </div>
          )}

          {/* Pay Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3 rounded-md transition"
          >
            Pay now
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            🔒 Your payment is secure and encrypted
          </p>
        </form>
      </div>
    </div>
  );
}
