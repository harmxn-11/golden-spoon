"use client"

import { useEffect, useState } from "react"
import {
  getAllPaymentRequests,
  updatePaymentStatus,
} from "@/lib/firebase/PaymentService"

export default function AdminPaymentsPage() {
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRequests()
  }, [])

  const loadRequests = async () => {
    setLoading(true)
    const data = await getAllPaymentRequests()
    setRequests(data)
    setLoading(false)
  }

  const handleUpdate = async (
    id: string,
    status: "approved" | "rejected"
  ) => {
    await updatePaymentStatus(id, status)
    loadRequests()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black p-8 text-white">

      <h1 className="text-3xl font-extrabold mb-8">
        💰 Payment Requests
      </h1>

      <div className="bg-white/95 text-gray-800 rounded-2xl p-6">

        {loading ? (
          <p>Loading payment requests...</p>
        ) : requests.length === 0 ? (
          <p>No payment requests found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Chef</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Payment Info</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {requests.map(req => (
                  <tr key={req.id} className="border-t">
                    <td className="p-3">
                      <p className="font-semibold">{req.userEmail}</p>
                      <p className="text-sm text-gray-500">Chef</p>
                    </td>

                    <td className="p-3 font-bold">₹{req.amount}</td>

                    <td className="p-3 text-sm">
                      {req.paymentMethod === "upi" ? (
                        <p>UPI: {req.upiId}</p>
                      ) : (
                        <>
                          <p>{req.bankDetails?.bankName}</p>
                          <p>Acc: {req.bankDetails?.accountNumber}</p>
                          <p>IFSC: {req.bankDetails?.ifsc}</p>
                        </>
                      )}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold
                          ${
                            req.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : req.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                      >
                        {req.status}
                      </span>
                    </td>

                    <td className="p-3 space-x-2">
                      {req.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleUpdate(req.id, "approved")
                            }
                            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              handleUpdate(req.id, "rejected")
                            }
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </main>
  )
}
