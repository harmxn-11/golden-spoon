import { NextResponse } from "next/server";
import { transporter } from "@/lib/transporter";
import { getGoldenSpoonContactEmail } from "@/lib/templates";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    await transporter.sendMail({
      from: `"Contact Form" <${process.env.SMTP_USER}>`,
      to: ADMIN_EMAIL, // send to yourself
      subject: `New Contact Message from ${name}`,
      html: getGoldenSpoonContactEmail({ name, email, message }),
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to send message",
      },
      { status: 500 }
    );
  }
}
