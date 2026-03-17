"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createUser, getUser, signInUser } from "@/firebase/Users";
import { createRestraunt } from "@/firebase/restraunts";
import { hashPassword } from "@/handlers/bcrypt";
import { User } from "@/types/User";
import { Restaurant } from "@/types/Restraunt";
export default function RestaurantRegisterPage() {
  const router = useRouter();

  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantEmail, setRestaurantEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const restaurant = {
        name: restaurantName,
        email: restaurantEmail,
        phoneNumber,
        address,
        createdAt: new Date().toISOString(),
      };

      const user = {
        name: ownerName,
        email: ownerEmail,
        phone: ownerPhone,
        password
      };
      const userId = await createUser(user as any,"ADMIN");
      await createRestraunt(restaurant as any,userId);
      const userProfile = (await getUser(userId)) as any;
      if(userProfile.role="ADMIN"){
          router.push("/u");
        }else{
          router.push("/u/orders");
        }
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-xl bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-2xl">
            🍽
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800">
            Register Restaurant
          </h1>
          <p className="text-gray-500 mt-2">Create your restaurant dashboard</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Restaurant Name
            </label>
            <input
              type="text"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              required
              className="w-full px-4 py-3 text-black rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Restaurant Email
            </label>
            <input
              type="email"
              value={restaurantEmail}
              onChange={(e) => setRestaurantEmail(e.target.value)}
              required
              className="w-full px-4 py-3 text-black rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full px-4 py-3 text-black rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 text-black rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Owner Name
            </label>
            <input
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              required
              className="w-full px-4 py-3 text-black rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Owner Email
            </label>
            <input
              type="email"
              value={ownerEmail}
              onChange={(e) => setOwnerEmail(e.target.value)}
              required
              className="w-full px-4 py-3 text-black rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Owner Phone
            </label>
            <input
              type="tel"
              value={ownerPhone}
              onChange={(e) => setOwnerPhone(e.target.value)}
              className="w-full px-4 py-3 text-black rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 text-black rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-all duration-200 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register Restaurant"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          Already Have an account?{" "}
          <Link
            href="/login"
            className="text-emerald-600 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}
