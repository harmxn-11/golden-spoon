"use client"

import { useState } from "react"

type Role = "admin" | "chef"

export default function ProfilePage() {
  // 🔁 Later replace with real user data
  const [role] = useState<Role>("admin")

  const profile = {
    name: role === "admin" ? "Restaurant Admin" : "Head Chef",
    email: role === "admin" ? "admin@restaurant.com" : "chef@restaurant.com",
    phone: "+91 98765 43210",
    role: role === "admin" ? "Administrator" : "Kitchen Staff",
    restaurant: "QR Menu Restaurant",
    joined: "12 Jan 2025",
    shift: role === "chef" ? "10:00 AM – 10:00 PM" : null
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto">

        {/* HEADER */}
        <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center text-white text-3xl font-bold">
              {profile.name.charAt(0)}
            </div>

            <div>
              <h1 className="text-3xl font-extrabold text-gray-800">
                {profile.name}
              </h1>
              <p className="text-gray-500">{profile.role}</p>
            </div>
          </div>
        </div>

        {/* DETAILS */}
        <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8">

          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Profile Details
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">

            <ProfileItem label="Full Name" value={profile.name} />
            <ProfileItem label="Email Address" value={profile.email} />
            <ProfileItem label="Phone Number" value={profile.phone} />
            <ProfileItem label="Role" value={profile.role} />
            <ProfileItem label="Restaurant" value={profile.restaurant} />
            <ProfileItem label="Joined On" value={profile.joined} />

            {profile.shift && (
              <ProfileItem label="Working Shift" value={profile.shift} />
            )}
          </div>

          {/* ACTIONS */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition">
              Edit Profile
            </button>

            <button className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
              Change Password
            </button>
          </div>

        </div>
      </div>
    </main>
  )
}

/* ---------- COMPONENT ---------- */
function ProfileItem({
  label,
  value
}: {
  label: string
  value: string
}) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  )
}
