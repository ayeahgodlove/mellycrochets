import { NextResponse } from "next/server";

/**
 * Server-side proxy for geolocation-db.com to avoid CORS when called from the browser.
 * Returns country_code so the client can set currency (e.g. CM → XAF).
 */
export async function GET() {
  const base = process.env.GEOLOCATION_API || "https://geolocation-db.com/json";
  const key = process.env.GEOLOCATION_API_KEY || "f2431d4f714497";
  const url = `${base}/${key}`;

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      return NextResponse.json(
        { country_code: null, error: "Geolocation service unavailable" },
        { status: 502 }
      );
    }
    const data = await res.json();
    return NextResponse.json({
      country_code: data.country_code ?? null,
    });
  } catch (err) {
    return NextResponse.json(
      { country_code: null, error: err.message || "Geolocation fetch failed" },
      { status: 502 }
    );
  }
}
