import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST() {
  try {
    // 1. Log the failure state to the immutable DB for the mock ID.
    const targetId = "marcus-t-mock-id";
    
    await prisma.complianceLog.create({
      data: {
        probationerId: targetId,
        status: "MISSED",
        notes: "Automated cron sweep: Check-in window (08:00-10:00) expired without valid biometric receipt."
      }
    });

    // 2. Simulate standard external API request (like Resend, Sendgrid). 
    console.log(`
      ======================================================
      [COMPLAVI EMAIL AUTOMATION DISPATCHED]
      TO: officer.assigned@county.gov
      SUBJECT: Check-In Alert: M. Thomas missed their 10am window.
      BODY: The participant failed to register a zero-knowledge hardware token 
            within their required 08:00 AM - 10:00 AM block.
      ======================================================
    `);

    return NextResponse.json({ success: true, message: "Alert simulation triggered successfully." });
  } catch (error) {
    console.error("Alert simulation failed:", error);
    return NextResponse.json({ error: "Failed to process alert." }, { status: 500 });
  }
}
