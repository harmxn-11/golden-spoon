"use client"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">

      {/* HERO */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-6 py-28 text-center">
          <span className="inline-block mb-4 px-4 py-1 text-sm rounded-full bg-white/10 backdrop-blur">
            🚀 Smart Restaurant Solution
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            QR Based Ordering <br />
            <span className="text-emerald-600" >Without Waiters</span>
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-gray-300">
            Let customers scan QR codes, order food, and pay online.
            Orders go directly to the kitchen — fast, smart & contactless.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/scan">
              <button className="bg-emerald-600 px-8 py-4 rounded-xl font-semibold hover:bg-emerald-600 transition shadow-lg">
                Scan QR & Order
              </button>
            </Link>

            <Link href="/login">
              <button className="border border-white/30 px-8 py-4 rounded-xl hover:bg-white/10 transition">
                Admin Dashboard
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Why Restaurants Love It
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Contactless Ordering",
                desc: "Customers scan QR and order instantly from their phone.",
                icon: "📱",
              },
              {
                title: "Live Kitchen Orders",
                desc: "Orders reach kitchen in real time. No confusion.",
                icon: "👨‍🍳",
              },
              {
                title: "Online Payments",
                desc: "UPI, Cards & Wallets supported directly from website.",
                icon: "💳",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur p-8 rounded-3xl border border-white/10 hover:text-emerald-600 transition"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section className="py-24 bg-black/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Built for Everyone
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "🙋 Customer",
                items: [
                  "Scan QR on table",
                  "View live menu",
                  "Place order",
                  "Pay online",
                ],
              },
              {
                title: "👨‍🍳 Kitchen",
                items: [
                  "Receive orders instantly",
                  "Update order status",
                  "Mark order as served",
                ],
              },
              {
                title: "🛠 Admin",
                items: [
                  "Manage menu items",
                  "Enable / disable dishes",
                  "Control pricing",
                  "View all orders",
                ],
              },
            ].map((role, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/10 hover:text-emerald-600 transition"
              >
                <h3 className="text-xl font-semibold mb-4">{role.title}</h3>
                <ul className="space-y-2 text-gray-300">
                  {role.items.map((item, j) => (
                    <li key={j}>✔ {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white/10 backdrop-blur rounded-3xl shadow-2xl p-5 md:p-10 border border-white/10">
            <h2 className="text-3xl font-bold text-center mb-4">
              Contact Us
            </h2>
            <p className="text-center text-gray-300 mb-10">
              Have questions or want to onboard your restaurant?
            </p>

            <form className="grid gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 focus:border-emerald-500 outline-none"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 focus:border-emerald-500 outline-none"
              />

              <textarea
                rows={4}
                placeholder="Your Message"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 focus:border-emerald-500 outline-none"
              />

              <button
                type="submit"
                className="bg-emerald-600 py-4 rounded-xl font-semibold hover:bg-emerald-600 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-gray-400 py-8 text-center">
        © 2026 QR Menu Ordering System. Built with Next.js.
      </footer>

    </main>
  )
}
