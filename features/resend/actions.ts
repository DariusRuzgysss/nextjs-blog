"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
  email: string,
  subject: string,
  message: string,
) {
  try {
    await resend.emails.send({
      from: "Skonių pasaulis",
      to: email,
      subject,
      replyTo: email,
      text: message,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
