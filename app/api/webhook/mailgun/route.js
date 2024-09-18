import { NextResponse } from "next/server";
import { sendEmail } from "@/libs/mailgun";
import config from "@/config";

// This route is used to receive emails from Mailgun and forward them to our customer support email.
// See more: https://shipfa.st/docs/features/emails
export async function POST(req) {
  try {
    const formData = await req.formData();
    const sender = formData.get("From");
    const subject = formData.get("Subject");
    const html = formData.get("body-html");

    console.log("Received webhook:", { sender, subject });

    if (config.mailgun.forwardRepliesTo && html && subject && sender) {
      console.log(
        "Attempting to forward email to:",
        config.mailgun.forwardRepliesTo
      );
      try {
        await sendEmail({
          to: config.mailgun.forwardRepliesTo,
          subject: `${config?.appName} | ${subject}`,
          html: `<div><p><b>- Subject:</b> ${subject}</p><p><b>- From:</b> ${sender}</p><p><b>- Content:</b></p><div>${html}</div></div>`,
          replyTo: sender,
        });
        console.log("Email forwarded successfully");
      } catch (emailError) {
        console.error("Error forwarding email:", emailError);
        // You might want to return an error status here
        return NextResponse.json(
          { error: "Failed to forward email" },
          { status: 500 }
        );
      }
    } else {
      console.log("Not forwarding email due to missing information");
    }

    return NextResponse.json({ status: "success" });
  } catch (e) {
    console.error("Error in Mailgun webhook:", e);
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
