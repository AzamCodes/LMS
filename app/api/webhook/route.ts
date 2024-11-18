import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Error constructing event:", error);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  console.log("Received event:", event);

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const courseId = session?.metadata?.courseId;

  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {
      console.error("Missing userId or courseId in metadata");
      return new NextResponse(`Webhook Error: Missing metadata`, {
        status: 400,
      });
    }

    try {
      // Create the purchase record
      await db.purchase.create({
        data: {
          courseId: courseId,
          userId: userId,
        },
      });

      // Fetch chapters for the purchased course
      const chapters = await db.chapter.findMany({
        where: { courseId: courseId },
      });

      // Create user progress records for each chapter
      await Promise.all(
        chapters.map((chapter) => {
          return db.userProgress.create({
            data: {
              userId: userId,
              chapterId: chapter.id,
              isCompleted: false, // or true if you want to mark them as completed immediately
            },
          });
        })
      );
    } catch (dbError) {
      console.error("Database operation failed:", dbError);
      return new NextResponse("Internal Error", { status: 500 });
    }
  } else if (event.type === "charge.updated") {
    console.log("Charge updated event received:", event);
  } else {
    console.error(`Unhandled event type: ${event.type}`);
    return new NextResponse(
      `Webhook Error: Unhandled Event type ${event.type}`,
      { status: 200 }
    );
  }
  return new NextResponse(null, { status: 200 });
}
