import { NextResponse } from "next/server";

export async function GET() {
  const hasServerKey = !!process.env.OPENROUTER_API_KEY;
  
  return NextResponse.json({
    status: hasServerKey ? "configured" : "not_configured",
    message: hasServerKey 
      ? "Server-side default key is active." 
      : "No server-side key found. User must provide their own key (BYOK)."
  });
}

export const runtime = "edge";
