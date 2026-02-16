"use client"

import { useEffect, useState } from "react"
import { getAllUsers, createNewUser } from "@/lib/firebase/UsersServivce"

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("user")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    const data = await getAllUsers()
    setUsers(data)
    setLoading(false)
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    try {
      await createNewUser({ email, password, role: role as any, phone })
      setSuccess("User created successfully")
      setEmail("")
      setPassword("")
      setPhone("")
      loadUsers()
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black p-8 text-white">

      <h1 className="text-3xl font-extrabold mb-8">👥 User Management</h1>

      {/* CREATE USER */}
      <div className="bg-white/95 text-gray-800 rounded-2xl p-6 mb-10">
        <h2 className="text-xl font-bold mb-4">Add New User</h2>

        <form
          onSubmit={handleCreateUser}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* EMAIL */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="user@restaurant.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300
                 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300
                 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* PHONE */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300
                 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* ROLE */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              User Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300
                 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="user">Customer</option>
              <option value="chef">Chef</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* SUBMIT */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 rounded-xl
                 font-semibold hover:bg-emerald-700
                 transition-all duration-200"
            >
              Create User
            </button>
          </div>
        </form>


        {error && <p className="text-red-600 mt-3">{error}</p>}
        {success && <p className="text-green-600 mt-3">{success}</p>}
      </div>

      {/* USERS TABLE */}
      <div className="bg-white/95 text-gray-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">All Users</h2>

        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} className="border-t">
                    <td className="p-3">{user.email}</td>
                    <td className="p-3 capitalize">{user.role}</td>
                    <td className="p-3">{user.phone || "-"}</td>
                    <td className="p-3 text-sm">
                      {user.createdAt?.toDate?.().toLocaleDateString()}
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
