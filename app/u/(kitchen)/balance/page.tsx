"use client"

import { useState } from "react"

export default function BankBalancePage() {
  const [balance, setBalance] = useState(350)

  const [bankName, setBankName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [ifsc, setIfsc] = useState("")
  const [upi, setUpi] = useState("")
  const [message, setMessage] = useState("")

  const handleSaveDetails = () => {
    setMessage("Payment details updated successfully")
  }

  const handleWithdraw = () => {
    if (balance === 0) {
      setMessage("No balance available for withdrawal")
      return
    }

    setMessage(`Withdrawal request of ₹${balance} sent to admin`)
    setBalance(0)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black px-6 py-16">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 mb-10">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Bank & Balance
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your payment details & withdrawals
          </p>
        </div>

        {/* BALANCE CARD */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 mb-10 text-center">
          <p className="text-sm text-gray-600">Available Balance</p>
          <p className="text-4xl font-extrabold text-emerald-600 mt-2">
            ₹{balance}
          </p>

          <button
            onClick={handleWithdraw}
            className="mt-6 px-8 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
          >
            Request Withdrawal
          </button>
        </div>

        {/* BANK DETAILS */}
        <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8">

          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Payment Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {/* BANK NAME */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Bank Name
              </label>
              <input
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="State Bank of India"
                className="w-full px-4 py-3 rounded-xl border border-gray-300
                           focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* ACCOUNT NUMBER */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Account Number
              </label>
              <input
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="XXXXXXXXXXXX"
                className="w-full px-4 py-3 rounded-xl border border-gray-300
                           focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* IFSC */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                IFSC Code
              </label>
              <input
                value={ifsc}
                onChange={(e) => setIfsc(e.target.value)}
                placeholder="SBIN0001234"
                className="w-full px-4 py-3 rounded-xl border border-gray-300
                           focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* UPI */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                UPI ID (Optional)
              </label>
              <input
                value={upi}
                onChange={(e) => setUpi(e.target.value)}
                placeholder="chef@upi"
                className="w-full px-4 py-3 rounded-xl border border-gray-300
                           focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={handleSaveDetails}
              className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
            >
              Save Details
            </button>
          </div>

          {/* MESSAGE */}
          {message && (
            <div className="mt-6 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg px-4 py-3">
              {message}
            </div>
          )}

        </div>
      </div>
    </main>
  )
}
