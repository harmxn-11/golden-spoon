"use client"
import { getRestraunt } from "@/firebase/restraunts";
import { getUser } from "@/firebase/Users";
import { userStore } from "@/store/UserInfoStore";
import { useEffect, useState } from "react"

export default function ProfilePage() {
  const [editProfile,setEditProfile] = useState(true);
  const {user} = userStore();
  const role = user?.role || "CHEF";
  const [profile, setProfile] = useState<any>({
    
  });

  const [restaurant, setRestaurant] = useState<any>({
  });
  useEffect(()=>{
    const fetchData = async () => {
      const userProfile = await getUser(user!.id);
      const userRestraunt = await getRestraunt(user!.restraunt_id);
      setProfile(userProfile as any);
      setRestaurant(userRestraunt as any);
    };
    if(user){
      fetchData();     
    }
  },[user]);
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto">

        {/* HEADER */}
        <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center text-white text-3xl font-bold">
              {profile?.name?.charAt(0)}
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

            <ProfileItem disabled={editProfile} label="Full Name" value={profile.name} />
            <ProfileItem disabled={editProfile} label="Email Address" value={profile.email} />
            <ProfileItem disabled={editProfile} label="Phone Number" value={profile.phone} />
            <ProfileItem disabled={editProfile} label="Role" value={profile.role} />
            <ProfileItem disabled={editProfile} label="Restaurant" value={restaurant.name} />
            {/* <ProfileItem disabled={editProfile} label="Joined On" value={profile.joined} /> */}

            {/* {profile.shift && (
              <ProfileItem label="Working Shift" value={profile.shift} />
            )} */}
          </div>

          {/* ACTIONS */}
          <div className="mt-10 flex flex-wrap gap-4">
            {/* <button className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition">
              {editProfile ? "Save Profile":"Edit Profile"}
            </button> */}

            {/* <button className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
              Change Password
            </button> */}
          </div>

        </div>
      </div>
    </main>
  )
}

/* ---------- COMPONENT ---------- */
function ProfileItem({
  label,
  value,
  disabled = false
}: {
  label: string
  value: string
  disabled: boolean
}) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <input defaultValue={value} disabled={disabled} className="font-semibold text-gray-800" />
    </div>
  )
}
