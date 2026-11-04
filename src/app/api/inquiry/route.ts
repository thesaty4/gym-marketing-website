import { NextResponse } from "next/server";
import { z } from "zod";

const inquirySchema = z.object({
  name: z.string().min(1).max(200),
  phone: z.string().min(1).max(30),
  message: z.string().max(2000).optional().default(""),
  // Honeypot: real users never fill this in; bots usually do. Accept any
  // string here — the handler decides what to do with a non-empty value.
  honeypot: z.string().max(500).optional().default(""),
});

/**
 * Simple in-memory fixed-window rate limiter keyed by client IP. This is a
 * stub suitable for a single-instance deployment; replace with a shared
 * store (e.g. Redis/Upstash) before scaling to multiple instances.
 */
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(key, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid inquiry data" }, { status: 400 });
  }

  // Honeypot filled in => silently accept without actually processing, so
  // bots don't learn their submission was rejected.
  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true });
  }

  // TODO: deliver the inquiry (e.g. send an email, push to a CRM, or notify
  // the gym on WhatsApp via a business API). For now this just validates
  // and accepts the submission.
  const { name, phone, message } = parsed.data;
  console.info("New gym inquiry:", { name, phone, message });

  return NextResponse.json({ ok: true });
}
