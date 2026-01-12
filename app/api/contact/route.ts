import { client } from "@/sanity/client";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { email, topic, message } = data;

    if (!email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 1. Save to Sanity
    await client.create({
      _type: "message",
      email,
      topic,
      message,
      status: "New",
      timestamp: new Date().toISOString(),
    });

    // 2. Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `[Portfolio] New Message from ${email}: ${topic}`,
      text: `From: ${email}\nTopic: ${topic}\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}