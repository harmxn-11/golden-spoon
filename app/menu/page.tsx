"use client"

import { useState } from "react"

interface MenuItem {
  id: string
  name: string
  price: number
}

interface MenuSection {
  id: string
  title: string
  items: MenuItem[]
}

interface CartItem extends MenuItem {
  qty: number
}

export default function CustomerMenuPage() {
  const [orderType, setOrderType] = useState<"dine-in" | "takeaway">("dine-in")

  const menu: MenuSection[] = [
    {
      id: "s1",
      title: "Starters",
      items: [
        { id: "i1", name: "Paneer Tikka", price: 240 },
        { id: "i2", name: "Veg Manchurian", price: 180 },
      ],
    },
    {
      id: "s2",
      title: "Main Course",
      items: [
        { id: "i3", name: "Paneer Butter Masala", price: 260 },
        { id: "i4", name: "Dal Makhani", price: 220 },
      ],
    },
  ]

  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === item.id)
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        )
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, qty: i.qty - 1 } : i
        )
        .filter((i) => i.qty > 0)
    )
  }

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )

  const payNow = () => {
    if (!cart.length) {
      alert("Please add items to cart")
      return
    }

    alert(
      `Proceeding to UPI Payment\nOrder Type: ${orderType}\nTotal: ₹${totalAmount}`
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white px-6 py-16">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

        {/* MENU */}
        <div className="lg:col-span-2 space-y-10">
          <h1 className="text-3xl font-extrabold">Menu</h1>

          {menu.map((section) => (
            <div
              key={section.id}
              className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/10"
            >
              <h2 className="text-2xl font-bold mb-6">
                {section.title}
              </h2>

              <div className="space-y-4">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center bg-black/40 p-4 rounded-xl"
                  >
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-400 text-sm">
                        ₹{item.price}
                      </p>
                    </div>

                    <button
                      onClick={() => addToCart(item)}
                      className="bg-orange-500 px-4 py-2 rounded-xl font-semibold hover:bg-orange-600 transition"
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CART */}
        <div className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/10 h-fit sticky top-20">
          <h2 className="text-2xl font-bold mb-4">Your Order</h2>

          {/* ORDER TYPE */}
          <div className="flex gap-3 mb-6">
            {["dine-in", "takeaway"].map((type) => (
              <button
                key={type}
                onClick={() => setOrderType(type as any)}
                className={`flex-1 py-2 rounded-xl font-semibold transition ${
                  orderType === type
                    ? "bg-orange-500"
                    : "bg-black/40 border border-white/20"
                }`}
              >
                {type === "dine-in" ? "Dine In" : "Takeaway"}
              </button>
            ))}
          </div>

          {/* CART ITEMS */}
          {cart.length === 0 ? (
            <p className="text-gray-400 text-center">
              No items added yet
            </p>
          ) : (
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-400">
                      ₹{item.price} × {item.qty}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="px-3 py-1 bg-black/40 rounded"
                    >
                      −
                    </button>
                    <button
                      onClick={() => addToCart(item)}
                      className="px-3 py-1 bg-black/40 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TOTAL */}
          <div className="border-t border-white/10 pt-4 mb-6">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>

          {/* PAYMENT */}
          <button
            onClick={payNow}
            className="w-full bg-emerald-600 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition"
          >
            Pay via UPI
          </button>

          <p className="text-xs text-gray-400 text-center mt-3">
            Secure UPI payment • No extra charges
          </p>
        </div>
      </div>
    </main>
  )
}
