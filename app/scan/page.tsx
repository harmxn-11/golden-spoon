"use client"

import { useEffect, useRef, useState } from "react"
import { Html5Qrcode } from "html5-qrcode"
import { useRouter } from "next/navigation"

export default function ScanQRPage() {
  const router = useRouter()

  const qrScannerRef = useRef<Html5Qrcode | null>(null)
  const scanningRef = useRef(false)

  const [status, setStatus] = useState<"scanning" | "error">("scanning")
  const [message, setMessage] = useState("Point your camera at the QR code")

  // ---------- QR VALIDATION ----------
  const extractTableId = (text: string): string | null => {
    try {
      if (text.startsWith("http")) {
        const url = new URL(text)
        return url.pathname.split("/").pop() || null
      }

      if (text.startsWith("table:")) {
        return text.replace("table:", "")
      }

      if (/^\d+$/.test(text)) {
        return text
      }
    } catch {}

    return null
  }

  // ---------- REDIRECT SAFE ----------
  const redirectToTable = (tableId: string) => {
    if (scanningRef.current) return
    scanningRef.current = true

    qrScannerRef.current?.stop().catch(() => {})
    router.push(`/table/${tableId}`)
  }

  // ---------- CAMERA START ----------
  const startCamera = async () => {
    try {
      const scanner = new Html5Qrcode("qr-reader")
      qrScannerRef.current = scanner
      await scanner.start(
  { facingMode: "environment" },
  { fps: 10, qrbox: 250 },

  // ✅ SUCCESS CALLBACK
  (decodedText: string) => {
    const tableId = extractTableId(decodedText)

    if (!tableId) {
      setStatus("error")
      setMessage("Invalid QR code. Please scan restaurant QR.")
      return
    }

    redirectToTable(tableId)
  },

  // ⚠️ QR ERROR CALLBACK
  (errorMessage: string) => {
    // Ignore common scan noise

    if (
      errorMessage.includes("No QR code found") ||
      errorMessage.includes("Not Found") ||
      errorMessage.includes("parse")
    ) {
      return
    }

    // Optional: show gentle scanning feedback
    setStatus("scanning")
    setMessage("Scanning for QR code…")
  }
)

    } catch (err) {
      setStatus("error")
      setMessage("Camera access denied. Please upload QR image.")
    }
  }

  // ---------- IMAGE UPLOAD FALLBACK ----------
const handleImageUpload = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0]
  if (!file) return

  try {
    const scanner =
      qrScannerRef.current ??
      new Html5Qrcode("qr-reader")

    qrScannerRef.current = scanner

    const decodedText = await scanner.scanFile(file, true)

    const tableId = extractTableId(decodedText)

    if (!tableId) {
      setStatus("error")
      setMessage("Invalid QR code. Please upload restaurant QR.")
      return
    }

    redirectToTable(tableId)
  } catch (err) {
    setStatus("error")
    setMessage(
      "Unable to read QR from image. Try clearer image or use camera scan."
    )
  }
}



  // ---------- AUTO START ----------
  useEffect(() => {
    startCamera()

    return () => {
      qrScannerRef.current?.stop().catch(() => {})
    }
  }, [])

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow p-8 text-center">

        <h1 className="text-2xl font-bold mb-4">Scan Table QR</h1>

        <p
          className={`mb-6 ${
            status === "error" ? "text-red-500" : "text-gray-600"
          }`}
        >
          {message}
        </p>

        <div
          id="qr-reader"
          className="w-full border rounded-xl overflow-hidden mb-6"
        />

        <p className="text-sm text-gray-500 mb-3">
          Camera not working?
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-3 file:px-4
            file:rounded-xl file:border-0
            file:bg-orange-500 file:text-white
            hover:file:bg-orange-600"
        />
      </div>
    </main>
  )
}
