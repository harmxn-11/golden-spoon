"use client"

import { createMenuItem, createMenuSection, deleteMenuItem, deleteMenuSection, getMenu, toggleMenuItemStatus } from "@/firebase/Menus"
import { useState } from "react"
import { useEffect } from "react"
import { userStore } from "@/store/UserInfoStore"
interface MenuItem {
  id: string
  name: string
  price: number
  available: boolean
}

interface MenuSection {
  id: string
  title: string
  items: MenuItem[]
}

export default function AdminMenuPage() {
  const [sections, setSections] = useState<MenuSection[]>([]);
  const [newSection, setNewSection] = useState("")
  const [newItem, setNewItem] = useState({ name: "", price: "" })
  const {user} = userStore();
  const ROLE = user?.role || "CHEF";
  // SECTION CRUD
  const addSection = async () => {
    if (!newSection.trim()) return;
    const newSectionID = await createMenuSection(newSection);
    setSections([
      ...sections,
      { id: newSectionID as string, title: newSection, items: [] },
    ])
    setNewSection("")
  }

  const deleteSection = async (id: string) => {
    await deleteMenuSection(id);
    setSections(sections.filter((s) => s.id !== id))
  }
  useEffect(()=>{
    const fetchData = async () => {
      const data = await getMenu();
      setSections(data as MenuSection[]);
    };
    fetchData();
  },[]);
  // ITEM CRUD
  const addItem = async (sectionId: string) => {
    if (!newItem.name || !newItem.price) return
    const createdMenuItemId = await createMenuItem(newItem.name,parseInt(newItem.price),sectionId);
    setSections((prev) =>
      prev.map((sec) =>
        sec.id === sectionId
          ? {
              ...sec,
              items: [
                ...sec.items,
                {
                  id: createdMenuItemId,
                  name: newItem.name,
                  price: Number(newItem.price),
                  available: true,
                },
              ],
            }
          : sec
      )
    )

    setNewItem({ name: "", price: "" })
  }

  const toggleAvailability = async (sectionId: string, itemId: string) => {
    await toggleMenuItemStatus(itemId,sectionId);
    setSections((prev) =>
      prev.map((sec) =>
        sec.id === sectionId
          ? {
              ...sec,
              items: sec.items.map((item) =>
                item.id === itemId
                  ? { ...item, available: !item.available }
                  : item
              ),
            }
          : sec
      )
    )
  }

  const deleteItem = async (sectionId: string, itemId: string) => {
    await deleteMenuItem(itemId,sectionId);
    setSections((prev) =>
      prev.map((sec) =>
        sec.id === sectionId
          ? {
              ...sec,
              items: sec.items.filter((item) => item.id !== itemId),
            }
          : sec
      )
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black px-6 py-16 text-white">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="bg-white/10 backdrop-blur rounded-3xl p-8 mb-10 border border-white/10">
          <h1 className="text-3xl font-extrabold">Menu Management</h1>
          <p className="text-gray-300 mt-1">
            Create categories and manage menu items
          </p>
        </div>

        {/* ADD SECTION */}
        { ROLE==="ADMIN" &&
        <div className="bg-white/10 backdrop-blur rounded-3xl p-6 mb-10 border border-white/10 flex gap-4">
          <input
            value={newSection}
            onChange={(e) => setNewSection(e.target.value)}
            placeholder="New Section Name"
            className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-white/20 outline-none focus:border-orange-500"
          />
          <button
            onClick={addSection}
            className="bg-orange-500 px-6 rounded-xl font-semibold hover:bg-orange-600 transition"
          >
            Add Section
          </button>
        </div>
        }
        {/* SECTIONS */}
        <div className="space-y-10">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/10"
            >
              {/* SECTION HEADER */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{section.title}</h2>
                {ROLE==="ADMIN" && <button
                  onClick={() => deleteSection(section.id)}
                  className="text-red-400 hover:text-red-500"
                >
                  Delete Section
                </button>}
              </div>

              {/* ITEMS */}
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-black/40 p-4 rounded-xl"
                  >
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-400 text-sm">
                        ₹{item.price}
                      </p>
                    </div>

                    <div className="flex gap-3 items-center">
                      <button
                        onClick={() =>
                          toggleAvailability(section.id, item.id)
                        }
                        className={`px-4 py-1 rounded-full text-xs font-semibold ${
                          item.available
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {item.available ? "Available" : "Disabled"}
                      </button>

                      {ROLE==="ADMIN" && <button
                        onClick={() =>
                          deleteItem(section.id, item.id)
                        }
                        className="text-red-400 hover:text-red-500"
                      >
                        Remove
                      </button>}
                    </div>
                  </div>
                ))}
              </div>

              {/* ADD ITEM */}
              {
                ROLE==="ADMIN" && 
              <div className="flex gap-4 mt-6">
                <input
                  placeholder="Item name"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-white/20 outline-none focus:border-orange-500"
                />

                <input
                  type="number"
                  placeholder="Price"
                  value={newItem.price}
                  onChange={(e) =>
                    setNewItem({ ...newItem, price: e.target.value })
                  }
                  className="w-32 px-4 py-3 rounded-xl bg-black/40 border border-white/20 outline-none focus:border-orange-500"
                />

                <button
                  onClick={() => addItem(section.id)}
                  className="bg-orange-500 px-6 rounded-xl font-semibold hover:bg-orange-600 transition"
                >
                  Add
                </button>
              </div>
              }
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}
