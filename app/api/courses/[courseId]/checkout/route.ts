import Stripe from "stripe";
import { metadata } from "@/app/layout";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();
    console.log("Current User:", user);

    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      },
    });

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: user?.id,
          courseId: params.courseId,
        },
      },
    });

    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 });
    }
    if (!course) {
      return new NextResponse("Not Found", {
        status: 404,
      });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          product_data: {
            name: course.title,
            description: course.description!,
          },
          unit_amount: Math.round(course.price! * 100),
        },
      },
    ];

    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });
    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
      });

      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customer.id,
        },
      });
    }
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items: line_items,
      mode: "payment",
      success_url: `https://lmsofficial.vercel.app/courses/${course.id}?success=1`,
      cancel_url: `https://lmsofficial.vercel.app/courses/${course.id}?canceled=1`,
      metadata: {
        courseId: course.id,
        userId: user.id,
      },
    });

    console.log("Stripe instance:", stripe);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[COURSE_ID_CHECKOUT ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
