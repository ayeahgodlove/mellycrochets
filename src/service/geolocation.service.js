import axios from "axios";

const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const CACHE_TTL_FAIL_MS = 5 * 60 * 1000; // 5 minutes on failure
let cached = { countryCode: undefined, expiresAt: 0 };
let inFlight = null;

/**
 * Resolve country code via our API proxy. Result is cached in memory for 24h
 * and concurrent callers share a single request.
 */
export const getGeolocation = async () => {
  const now = Date.now();
  if (cached.countryCode !== undefined && cached.expiresAt > now) {
    return cached.countryCode;
  }
  if (inFlight) {
    return inFlight;
  }
  inFlight = (async () => {
    try {
      const response = await axios.get("/api/geolocation");
      const countryCode = response.data?.country_code ?? null;
      cached = { countryCode, expiresAt: now + CACHE_TTL_MS };
      return countryCode;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Geolocation (using default currency):", error?.message || error);
      }
      cached = { countryCode: null, expiresAt: now + CACHE_TTL_FAIL_MS };
      return null;
    } finally {
      inFlight = null;
    }
  })();
  return inFlight;
};
