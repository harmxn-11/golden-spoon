"use client"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { Menu, X, LayoutDashboard, User, History, ClipboardList, MenuIcon, Banknote, Users,Scale } from "lucide-react"
import { SITE_NAME } from "@/lib/constants"

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  const links = [
    { name: "Dashboard", href: "/u", icon: LayoutDashboard },
    { name: "Menu", href: "/u/menu", icon: MenuIcon },
    { name: "Withdrawal Requests", href: "/u/payments", icon: Banknote },
    { name: "Users", href: "/u/users", icon: Users },
    { name: "Orders", href: "/u/orders", icon: ClipboardList },
    { name: "Balance", href: "/u/balance", icon: Scale },
    { name: "history", href: "/u/history", icon: History },
    { name: "Profile", href: "/u/profile", icon: User },
  ]
  const pathName = usePathname();

  return (
    <>
      {/* Hamburger Button (Mobile Only) */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-6 left-6 z-50 bg-emerald-600 text-white p-3 rounded-xl shadow-lg"
      >
        <Menu size={22} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed! top-0 left-0 h-full w-72 text-white bg-background p-6 shadow-2xl transform transition-transform duration-300 z-50
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:block`}
      >
        {/* Close Button (Mobile) */}
        <div className="flex justify-between items-center mb-10 md:hidden">
          <h2 className="text-xl font-bold">{SITE_NAME}</h2>
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* Logo / Title (Desktop) */}
        <Link href={"/"}>
        <h2 className="hidden md:block text-2xl font-extrabold mb-12">
          {SITE_NAME}
        </h2>
        </Link>

        {/* Links */}
        <nav className="space-y-3">
          {links.map((link) => {
            const Icon = link.icon
            const active = pathName.endsWith(link.href)
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-emerald-600/20 ${active && "bg-emerald-600/20"} hover:text-emerald-400 transition`} 
              >
                <Icon size={20} />
                {link.name}
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}