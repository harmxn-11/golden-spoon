"use client"

import { useState } from "react"

type OrderStatus = "pending" | "accepted" | "rejected"

interface Order {
  id: string
  table: string
  items: string[]
  amount: number
  status: OrderStatus
}

export default function KitchenPage() {
  // 💰 Admin-defined pay per order
  const PAY_PER_ORDER = 50

  const [balance, setBalance] = useState(150)

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-101",
      table: "Table 4",
      items: ["Burger", "Fries", "Coke"],
      amount: 420,
      status: "pending"
    },
    {
      id: "ORD-102",
      table: "Table 2",
      items: ["Pizza", "Cold Coffee"],
      amount: 350,
      status: "pending"
    }
  ])

  // ✅ ACCEPT ORDER
  const acceptOrder = (id: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? { ...order, status: "accepted" }
          : order
      )
    )

    setBalance((prev) => prev + PAY_PER_ORDER)
  }

  // ❌ REJECT ORDER
  const rejectOrder = (id: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? { ...order, status: "rejected" }
          : order
      )
    )
  }

  // 💸 WITHDRAW BALANCE
  const withdrawBalance = () => {
    if (balance === 0) return
    alert(`₹${balance} withdrawal request sent`)
    setBalance(0)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black px-6 py-14">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>
            <h1 className="text-3xl font-extrabold text-gray-800">
              Kitchen Dashboard
            </h1>
            <p className="text-gray-500">
              Manage incoming orders & earnings
            </p>
          </div>

          {/* BALANCE CARD */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
            <p className="text-sm text-gray-500">Current Balance</p>
            <p className="text-3xl font-extrabold text-emerald-600">
              ₹{balance}
            </p>
            <button
              onClick={withdrawBalance}
              className="mt-4 px-6 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
            >
              Withdraw
            </button>
          </div>
        </div>

        {/* ORDERS */}
        <div className="grid gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white/95 backdrop-blur rounded-3xl shadow-xl p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                {/* ORDER INFO */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {order.id} • {order.table}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    Items: {order.items.join(", ")}
                  </p>

                  <p className="mt-2 font-semibold text-gray-700">
                    Bill Amount: ₹{order.amount}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-4">
                  {order.status === "pending" && (
                    <>
                      <button
                        onClick={() => acceptOrder(order.id)}
                        className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => rejectOrder(order.id)}
                        className="px-5 py-2 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 transition"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {order.status === "accepted" && (
                    <span className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-700 font-semibold">
                      Accepted (+₹{PAY_PER_ORDER})
                    </span>
                  )}

                  {order.status === "rejected" && (
                    <span className="px-4 py-2 rounded-xl bg-red-100 text-red-600 font-semibold">
                      Rejected
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <p className="text-center text-gray-400">
              No orders available
            </p>
          )}
        </div>

      </div>
    </main>
  )
}
