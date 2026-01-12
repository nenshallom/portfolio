import { createClient } from "next-sanity"; // Import createClient directly
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { email, topic, message } = data;

    if (!email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // --- CREATE A WRITE CLIENT JUST FOR THIS ACTION ---
    const writeClient = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
      useCdn: false, 
      token: process.env.SANITY_API_TOKEN, // <--- Token used ONLY here
    });

    // 1. Save to Sanity
    await writeClient.create({
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